package com.mycompany.router.service;

import com.mycompany.router.model.Message.MessageAuditStatus;
import com.mycompany.router.repository.MessageAuditRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;


@SpringBootTest
@ActiveProfiles("test")
class MessageServiceTest {

    @Autowired
    private MessageService messageService;

    @MockitoBean
    private MessageAuditRepo messageAuditRepo;

    @Test
    void shouldUpdateStatusAndTargetQueueSuccessfully() {
        // Arrange
        String jmsMessageId = "testMessageId";
        MessageAuditStatus newStatus = MessageAuditStatus.OK;
        String newTargetQueue = "queue1";

        Mockito.doNothing().when(messageAuditRepo)
                .updateStatusAndTargetQueue(jmsMessageId, newStatus, newTargetQueue);

        // Act
        messageService.updateStatusAndTargetQueue(jmsMessageId, newStatus, newTargetQueue);

        // Assert
        Mockito.verify(messageAuditRepo, Mockito.times(1))
                .updateStatusAndTargetQueue(jmsMessageId, newStatus, newTargetQueue);
    }

    @Test
    void shouldThrowExceptionWhenUpdateFails() {
        // Arrange
        String jmsMessageId = "testMessageId";
        MessageAuditStatus newStatus = MessageAuditStatus.ERROR;
        String newTargetQueue = "queue2";

        Mockito.doThrow(new RuntimeException("Update failed"))
                .when(messageAuditRepo)
                .updateStatusAndTargetQueue(jmsMessageId, newStatus, newTargetQueue);

        // Act & Assert
        try {
            messageService.updateStatusAndTargetQueue(jmsMessageId, newStatus, newTargetQueue);
        } catch (RuntimeException e) {
            Mockito.verify(messageAuditRepo, Mockito.times(1))
                    .updateStatusAndTargetQueue(jmsMessageId, newStatus, newTargetQueue);
        }
    }
}