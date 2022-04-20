package com.example.burndownchartproject.service;

import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.model.UserStory;
import com.example.burndownchartproject.repository.TaskRepository;
import com.example.burndownchartproject.repository.UserStoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserStoryService {

  @Autowired
  UserStoryRepository userStoryRepository;

  public List<UserStory> getAllUserStories() {
    return userStoryRepository.findAll();
  }

  public Optional<UserStory> findById(int id) {
    return userStoryRepository.findById(id);

  }

  public void savetask(UserStory userStory) {
    userStoryRepository.save(userStory);
  }

  public void deleteUserStoryById(int id) {
    userStoryRepository.deleteById(id);
  }

  public UserStory createUserStory(UserStory userStory) {
    return userStoryRepository.save(userStory);
  }
}
