package com.example.burndownchartproject.repository;

import com.example.burndownchartproject.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

}
