package com.alchemy.repository;

import com.alchemy.entity.TrainerSkill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerSkillRepository extends JpaRepository<TrainerSkill, Integer> {
    public TrainerSkill findTrainerSkillBySid(byte[] sid);
}
