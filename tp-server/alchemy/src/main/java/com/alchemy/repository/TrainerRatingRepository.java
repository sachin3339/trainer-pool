package com.alchemy.repository;

import com.alchemy.entity.TrainerRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerRatingRepository extends JpaRepository<TrainerRating, Integer> {
    public TrainerRating findTrainerRatingBySid(byte[] sid);
}
