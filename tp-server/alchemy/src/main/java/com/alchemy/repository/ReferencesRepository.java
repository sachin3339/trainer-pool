package com.alchemy.repository;

import com.alchemy.entity.References;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferencesRepository extends JpaRepository<References, Integer> {
    public References findReferencesBySid(byte[] sid);
}
