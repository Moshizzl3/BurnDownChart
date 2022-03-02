package com.example.burndownchartproject.service;


import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class TaskService {

  @Autowired
  TaskRepository taskRepository;

  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }
}
