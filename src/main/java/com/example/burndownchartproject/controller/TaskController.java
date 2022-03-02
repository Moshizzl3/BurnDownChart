package com.example.burndownchartproject.controller;


import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

  @Autowired
  TaskService taskService;

  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }
}
