package com.mycompany.router.rest;

import com.mycompany.router.model.Partner;
import com.mycompany.router.service.PartnerService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/v1/partners")
@AllArgsConstructor
public class PartnerRest {


    private final PartnerService partnerService;


    @PostMapping
    public Partner save(@RequestBody Partner partner) {
        return partnerService.save(partner);
    }

    @GetMapping
    public Page<Partner> findAll(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size,
                                      @RequestParam(defaultValue = "id") String sortBy) {
        return partnerService.findAll(page, size, sortBy);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        partnerService.deletePartner(id);
    }

}
