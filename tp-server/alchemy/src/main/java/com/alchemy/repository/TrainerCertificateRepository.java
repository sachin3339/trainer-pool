package com.alchemy.repository;

import com.alchemy.entity.TrainerCertificate;
import com.alchemy.entity.TrainerRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerCertificateRepository extends JpaRepository<TrainerCertificate, Integer> {
    public TrainerCertificate findTrainerCertificateBySid(byte[] sid);
}
