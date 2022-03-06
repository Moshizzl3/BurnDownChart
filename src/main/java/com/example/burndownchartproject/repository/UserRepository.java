package com.example.burndownchartproject.repository;

import com.example.burndownchartproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
