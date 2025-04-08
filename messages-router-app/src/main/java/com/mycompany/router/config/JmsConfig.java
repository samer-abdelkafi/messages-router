package com.mycompany.router.config;


import com.ibm.mq.jakarta.jms.MQConnectionFactory;
import com.ibm.msg.client.jakarta.jms.JmsConnectionFactory;
import com.ibm.msg.client.jakarta.wmq.WMQConstants;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class JmsConfig {

    @Value("${jms.mq.channel}")
    private String channel;

    @Value("${jms.mq.port}")
    private Integer port;

    @Value("${jms.mq.host}")
    private String host;

    @Value("${jms.mq.queue.manager}")
    private String queueManager;


    @Bean
    @SneakyThrows
    public JmsConnectionFactory getMqConnectionFactory() {
        MQConnectionFactory mqConnectionFactory = new MQConnectionFactory();
        mqConnectionFactory.setHostName(host);
        mqConnectionFactory.setPort(port);
        mqConnectionFactory.setChannel(channel);
        mqConnectionFactory.setQueueManager(queueManager);
        mqConnectionFactory.setTransportType(WMQConstants.WMQ_CM_CLIENT);
        return mqConnectionFactory;
    }




}
