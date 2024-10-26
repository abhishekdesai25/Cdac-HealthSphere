package com.healthsphere.health.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthsphere.health.entity.Admins;

public interface AdminRepository extends JpaRepository<Admins, Integer> {
	Admins findByUsername(String username);
}
