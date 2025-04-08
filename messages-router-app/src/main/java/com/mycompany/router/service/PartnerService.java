package com.mycompany.router.service;


import com.mycompany.router.model.Partner;
import com.mycompany.router.repository.PartnerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepo partnerRepo;

    public Partner save(Partner partner) {
        return partnerRepo.save(partner);
    }

    public Page<Partner> findAll(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return partnerRepo.findAll(pageable);
    }

    public void deletePartner(int id) {
        partnerRepo.deleteById(id);
    }



}
