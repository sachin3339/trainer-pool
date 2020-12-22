package com.alchemy.repository;

import com.alchemy.entity.CourseTrainer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseTrainerRepository extends JpaRepository<CourseTrainer, Integer> {
    public CourseTrainer findCourseTrainerBySid(byte[] sid);
}
