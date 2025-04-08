package com.mycompany.router.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.router.model.Partner;
import com.mycompany.router.service.PartnerService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PartnerRest.class)
public class PartnerRestTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PartnerService partnerService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testSave_ShouldReturnCreatedPartner() throws Exception {
        // Prepare input Partner object
        Partner inputPartner = new Partner();
        inputPartner.setAlias("Test Partner");
        inputPartner.setType("Test Type");
        inputPartner.setDirection(null); // Assuming this value is nullable
        inputPartner.setApplication("Test App");
        inputPartner.setFlowType(null); // Assuming this value is nullable
        inputPartner.setDescription("This is a test partner");

        // Prepare expected Partner response (usually includes an ID after saving)
        Partner savedPartner = new Partner();
        savedPartner.setId(1);
        savedPartner.setAlias(inputPartner.getAlias());
        savedPartner.setType(inputPartner.getType());
        savedPartner.setDirection(inputPartner.getDirection());
        savedPartner.setApplication(inputPartner.getApplication());
        savedPartner.setFlowType(inputPartner.getFlowType());
        savedPartner.setDescription(inputPartner.getDescription());

        // Mock service call
        when(partnerService.save(any(Partner.class))).thenReturn(savedPartner);

        // Perform POST request
        mockMvc.perform(post("/api/v1/partners")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputPartner)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(savedPartner)));

        // Verify service interaction
        Mockito.verify(partnerService).save(any(Partner.class));
    }
}