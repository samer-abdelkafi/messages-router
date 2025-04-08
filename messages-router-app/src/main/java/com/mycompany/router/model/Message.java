package com.mycompany.router.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "MESSAGE_AUDIT")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "JMS_ID")
    private String jmsId;

    @Column(name = "INPUT_DATE")
    private Date inputDate;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "TARGET_QUEUE")
    private String targetQueue;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private MessageAuditStatus status;


    public enum MessageAuditStatus {
        ERROR, // Sent to Error thread
        PENDING, // Before trying to send the message
        OK // Message routed with success
    }

}
