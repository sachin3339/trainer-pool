package com.alchemy.repository;

import com.alchemy.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    public Admin findAdminBySid(byte[] sid);

    public Admin findAdminByEmail(String email);
}
