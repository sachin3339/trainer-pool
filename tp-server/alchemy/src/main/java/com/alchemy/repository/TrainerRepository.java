package com.alchemy.repository;

import com.alchemy.entity.Trainer;

import java.util.List;

import com.alchemy.value.AlchemyEnums;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Integer> {
    public Trainer findTrainerBySid(byte[] sid);
    public Trainer findTrainerByEmail(String email);
    public List<Trainer> findAllByStatus(AlchemyEnums.TrainerStatus trainerStatus);

    @Query(value = "SELECT DISTINCT(location) from alchemy_trainer", nativeQuery = true)
    public List<String> findListOfLocations();
}
		 

