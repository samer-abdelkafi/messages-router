package com.mycompany.router.rest;

import com.mycompany.router.model.Message;
import com.mycompany.router.service.MessageService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class MessageRestTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MessageService messageService;

    @Test
    void testFindAll_WithDefaultParams() throws Exception {
        List<Message> messages = Arrays.asList(
                Message.builder()
                        .id(1L)
                        .jmsId("jms123")
                        .inputDate(new Date())
                        .content("Message Content 1")
                        .targetQueue("Queue1")
                        .status(Message.MessageAuditStatus.OK)
                        .build(),
                Message.builder()
                        .id(2L)
                        .jmsId("jms124")
                        .inputDate(new Date())
                        .content("Message Content 2")
                        .targetQueue("Queue2")
                        .status(Message.MessageAuditStatus.PENDING)
                        .build()
        );
        Page<Message> page = new PageImpl<>(messages, PageRequest.of(0, 10, Sort.by("jmsId")), messages.size());
        Mockito.when(messageService.findAll(0, 10, "jmsId")).thenReturn(page);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/messages")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testFindAll_WithCustomParams() throws Exception {
        List<Message> messages = Collections.singletonList(
                Message.builder()
                        .id(3L)
                        .jmsId("jms125")
                        .inputDate(new Date())
                        .content("Message Content 3")
                        .targetQueue("Queue3")
                        .status(Message.MessageAuditStatus.ERROR)
                        .build()
        );
        Page<Message> page = new PageImpl<>(messages, PageRequest.of(1, 5, Sort.by("content")), messages.size());
        Mockito.when(messageService.findAll(1, 5, "content")).thenReturn(page);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/messages")
                        .param("page", "1")
                        .param("size", "5")
                        .param("sortBy", "content")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testFindAll_InvalidPageSize() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/messages")
                        .param("size", "-1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

}