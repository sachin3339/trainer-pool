package com.alchemy.repository;

import com.alchemy.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    public Course findCourseBySid(byte[] sid);
}
