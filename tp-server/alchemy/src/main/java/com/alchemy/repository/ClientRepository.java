package com.alchemy.repository;

import com.alchemy.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    public Client findClientBySid(byte[] sid);
}
