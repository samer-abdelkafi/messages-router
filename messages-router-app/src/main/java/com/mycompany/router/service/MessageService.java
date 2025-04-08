package com.mycompany.router.service;

import com.mycompany.router.model.Message;
import com.mycompany.router.repository.MessageAuditRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageAuditRepo messageAuditRepo;

    public void save(Message message) {
        messageAuditRepo.save(message);
    }

    @Transactional
    public void updateStatusAndTargetQueue(String jmsMessageId,
                                           Message.MessageAuditStatus messageAuditStatus,
                                           String targetQueue) {
        messageAuditRepo.updateStatusAndTargetQueue(jmsMessageId, messageAuditStatus, targetQueue);
    }


    public Page<Message> findAll(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return messageAuditRepo.findAll(pageable);
    }







}
