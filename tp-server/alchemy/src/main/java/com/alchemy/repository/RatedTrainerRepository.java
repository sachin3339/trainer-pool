package com.alchemy.repository;

import com.alchemy.entity.RatedTrainer;
import com.alchemy.entity.Trainer;
import com.alchemy.value.AlchemyEnums;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatedTrainerRepository extends JpaRepository<RatedTrainer, Integer> {
    public RatedTrainer findTrainerBySid(byte[] sid);
    public RatedTrainer findTrainerByEmail(String email);
    public List<RatedTrainer> findAllByStatus(AlchemyEnums.TrainerStatus trainerStatus);

    @Query(value = "SELECT DISTINCT(location) from alchemy_trainer", nativeQuery = true)
    public List<String> findListOfLocations();
}
		 

