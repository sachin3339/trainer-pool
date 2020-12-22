package com.alchemy.repository;

import com.alchemy.entity.Certificate;
import com.alchemy.entity.Trainer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Integer> {
    public Certificate findCertificateBySid(byte[] sid);

}
		 

