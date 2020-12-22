package com.alchemy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alchemy.entity.Training;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Integer> {
    public Training findTrainingBySid(byte[] sid);
}
		 

