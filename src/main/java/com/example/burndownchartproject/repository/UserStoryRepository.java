package com.example.burndownchartproject.repository;

import com.example.burndownchartproject.model.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {
}
