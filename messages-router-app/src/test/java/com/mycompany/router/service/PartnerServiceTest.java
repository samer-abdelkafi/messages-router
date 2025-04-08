package com.mycompany.router.service;

import com.mycompany.router.model.Partner;
import com.mycompany.router.model.PartnerDirectionEnum;
import com.mycompany.router.model.PartnerFlowTypeEnum;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class PartnerServiceTest {


    @Autowired
    private PartnerService partnerService;

    @Test
    void testSavePartnerWithValidData() {
        Partner partner = new Partner();
        partner.setAlias("alias");
        partner.setDescription("description");
        partner.setType("type");
        partner.setApplication("application");
        partner.setFlowType(PartnerFlowTypeEnum.MESSAGE);
        partner.setDirection(PartnerDirectionEnum.INBOUND);

        Partner savedPartner = partnerService.save(partner);

        assertNotNull(savedPartner);
        assertNotNull(savedPartner.getId());
        assertEquals("alias", savedPartner.getAlias());
        assertEquals("description", savedPartner.getDescription());
        assertEquals("type", savedPartner.getType());
        assertEquals(PartnerFlowTypeEnum.MESSAGE, savedPartner.getFlowType());
        assertEquals(PartnerDirectionEnum.INBOUND, savedPartner.getDirection());
    }

    @Test
    void testSavePartnerWithAliasNull() {
        Partner partner = new Partner();
        partner.setAlias(null);
        partner.setDescription("description");
        partner.setType("type");
        partner.setApplication("application");
        partner.setFlowType(PartnerFlowTypeEnum.MESSAGE);
        partner.setDirection(PartnerDirectionEnum.INBOUND);

        assertThrows(Exception.class, () -> partnerService.save(partner));
    }

}