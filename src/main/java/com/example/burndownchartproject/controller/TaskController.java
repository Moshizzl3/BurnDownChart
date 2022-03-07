package com.example.burndownchartproject.controller;


import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class TaskController {

  @Autowired
  TaskService taskService;

  @GetMapping("/getAllTasks")
  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @PostMapping("/postTask")
  @ResponseStatus(HttpStatus.CREATED)
  public Task postTask(@RequestBody Task task){
    System.out.println("bla bla");
    return taskService.createTask(task);
  }

  @PutMapping("task/{id}")
  public ResponseEntity<Task> updateTask(@PathVariable int id, @RequestBody Task task){
    Optional<Task> optTask = taskService.findById(id);
    if (optTask.isPresent()){
      taskService.savetask(task);
      return  new ResponseEntity<>(task, HttpStatus.OK);
    } else {
      Task taskNotFound = new Task();
      taskNotFound.setName("No task with id: " + id);
      return  new ResponseEntity<>(task, HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/task/{id}")
  public ResponseEntity<String> deleteTask(@PathVariable int id){
    try {
      taskService.deleteTaskById(id);
      return new ResponseEntity<>("Deleted task by id: " + id, HttpStatus.OK);
    }catch (Exception err){
      return new ResponseEntity<>("Could not delete task by id: " + id, HttpStatus.NOT_FOUND);
    }

  }
}

