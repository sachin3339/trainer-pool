package com.alchemy.repository;

import com.alchemy.entity.TrainerCalculatedRating;
import com.alchemy.entity.TrainingSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainerCalculatedRatingRepository extends JpaRepository<TrainerCalculatedRating, Integer> {
    Optional<TrainerCalculatedRating> findById(Integer integer);
}
