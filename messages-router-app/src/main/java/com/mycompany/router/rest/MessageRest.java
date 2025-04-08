package com.mycompany.router.rest;


import com.mycompany.router.model.Message;
import com.mycompany.router.service.MessageService;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/v1/messages")
@AllArgsConstructor
public class MessageRest {

    private final MessageService messageService;

    @GetMapping
    public Page<Message> findAll(@RequestParam(defaultValue = "0") @Min(0) int page,  // page number
                                 @RequestParam(defaultValue = "10") @Min(0) int size, // page size
                                 @RequestParam(defaultValue = "jmsId") String sortBy) {
        return messageService.findAll(page, size, sortBy);
    }


}
