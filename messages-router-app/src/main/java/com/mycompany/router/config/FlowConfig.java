package com.mycompany.router.config;

import com.mycompany.router.model.Message;
import com.mycompany.router.service.MessageService;
import jakarta.jms.ConnectionFactory;
import lombok.extern.slf4j.Slf4j;
import org.aopalliance.aop.Advice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.core.GenericHandler;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.integration.handler.advice.RequestHandlerRetryAdvice;
import org.springframework.integration.jms.dsl.Jms;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.messaging.MessageHandlingException;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;

import java.util.Date;
import java.util.Map;

import static com.mycompany.router.model.Message.MessageAuditStatus.*;

@Slf4j
@Configuration
public class FlowConfig {

    @Value("${flow.input.queue}")
    private String inputQueueName;

    @Value("${flow.output.queue1}")
    private String outQueueName1;

    @Value("${flow.output.queue2}")
    private String outQueueName2;

    @Value("${flow.error.queue}")
    private String errorQueueName;


    @Bean
    public IntegrationFlow jmsInboundFlow(ConnectionFactory connectionFactory, MessageService messageService) {
        return IntegrationFlow
                .from(Jms.messageDrivenChannelAdapter(connectionFactory)
                        .destination(inputQueueName)
                        .errorChannel("errorChannel")
                )
                // save audit to the database
                .handle((payload, headers) -> {
                    String jmsId = headers.get("jms_messageId", String.class);
                    messageService.save(Message.builder().inputDate(new Date())
                            .content((String) payload)
                            .jmsId(jmsId)
                            .status(PENDING)
                            .build());
                    return payload;
                })// route message
                .<Object, String>route(payload -> payload.toString().contains("{2:I103") ? "SWIFT" : "OTHER",
                        mapping -> mapping
                                .subFlowMapping("SWIFT",
                                        subFlow -> getJmsOutputSubFlow(connectionFactory, messageService, subFlow, outQueueName1))
                                .subFlowMapping("OTHER",
                                        subFlow -> getJmsOutputSubFlow(connectionFactory, messageService, subFlow, outQueueName2))
                ).get();
    }

    private void getJmsOutputSubFlow(ConnectionFactory connectionFactory,
                                     MessageService messageService,
                                     IntegrationFlowDefinition<?> subFlow,
                                     String queueName) {
        subFlow
                .enrichHeaders(Map.of("target_queue", queueName))
                .handle((payload, headers) -> {
                    // test error case
                    if (payload.toString().contains("ERROR")) {
                        throw new RuntimeException("Test error");
                    }
                    return payload;
                })
                .handle((GenericHandler<Object>) (payload, headers) -> {
                    Jms.outboundAdapter(connectionFactory)
                            .destination(queueName);
                    return payload;
                }, e -> e.advice(retryAdvice()))
                // Update message status
                .handle(message -> messageService.updateStatusAndTargetQueue(getJmsMessageId(message), OK, queueName));
    }

    private static String getJmsMessageId(org.springframework.messaging.Message<?> message) {
        return message.getHeaders().get("jms_messageId", String.class);
    }


    @Bean
    public IntegrationFlow errorHandlingFlow(ConnectionFactory connectionFactory, MessageService messageService) {
        return IntegrationFlow.from("errorChannel")
                .handle((payload, headers) -> {
                    MessageHandlingException messageHandlingException = (MessageHandlingException) payload;
                    org.springframework.messaging.Message<?> failedMessage = messageHandlingException.getFailedMessage();

                    assert failedMessage != null;
                    messageService.updateStatusAndTargetQueue(getJmsMessageId(failedMessage), ERROR, null);
                    return MessageBuilder.fromMessage(failedMessage)
                            .copyHeadersIfAbsent(failedMessage.getHeaders())
                            .setHeader("ERROR_MESSAGE", messageHandlingException.getCause().getMessage())  // add new header
                            .build();
                })
                .handle(Jms.outboundAdapter(connectionFactory).destination(errorQueueName))
                .get();

    }

    @Bean
    public Advice retryAdvice() {
        RetryTemplate retryTemplate = new RetryTemplate();
        SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
        retryPolicy.setMaxAttempts(3);
        retryTemplate.setRetryPolicy(retryPolicy);

        RequestHandlerRetryAdvice advice = new RequestHandlerRetryAdvice();
        advice.setRetryTemplate(retryTemplate);
        return advice;
    }



}
