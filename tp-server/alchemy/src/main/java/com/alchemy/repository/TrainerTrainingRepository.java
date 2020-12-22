package com.alchemy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alchemy.entity.TrainerTraining;

public interface TrainerTrainingRepository extends JpaRepository<TrainerTraining, Integer> {
    public TrainerTraining findTrainerTrainingBySid(byte[] sid);
}
