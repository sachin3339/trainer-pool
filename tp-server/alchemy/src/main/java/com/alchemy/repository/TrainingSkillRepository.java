package com.alchemy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alchemy.entity.TrainingSkill;

public interface TrainingSkillRepository extends JpaRepository<TrainingSkill, Integer> {
    public TrainingSkill findTrainingSkillBySid(byte[] sid);
}
