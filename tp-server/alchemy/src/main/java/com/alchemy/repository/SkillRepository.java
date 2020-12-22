package com.alchemy.repository;

import com.alchemy.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    public Skill findSkillBySid(byte[] sid);
}
