package com.mycompany.router.repository;

import com.mycompany.router.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface MessageAuditRepo extends JpaRepository<Message, Long> {

    @Modifying
    @Query(value = "UPDATE Message ma SET ma.status = :status, ma.targetQueue = :targetQueue WHERE ma.jmsId = :jmsMessageId")
    void updateStatusAndTargetQueue(@Param("jmsMessageId") String jmsMessageId,
                                    @Param("status") Message.MessageAuditStatus status,
                                    @Param("targetQueue") String targetQueue);


}
