package com.mycompany.router.repository;

import com.mycompany.router.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepo extends JpaRepository<Partner, Integer> {


}
