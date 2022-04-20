package com.example.burndownchartproject.controller;

import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.model.UserStory;
import com.example.burndownchartproject.service.UserStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserStoryRESTController {

  @Autowired
  UserStoryService userStoryService;

  @GetMapping("/getAllUserStories")
  public List<UserStory> getAllUserStories() {
    return userStoryService.getAllUserStories();
  }

  @PostMapping("/postUserStory")
  @ResponseStatus(HttpStatus.CREATED)
  public UserStory postUserStory(@RequestBody UserStory userStory){
    System.out.println("bla bla");
    return userStoryService.createUserStory(userStory);
  }

  @PutMapping("userStory/{id}")
  public ResponseEntity<UserStory> updateUserStory(@PathVariable int id, @RequestBody UserStory userStory){
    Optional<UserStory> optUserStory = userStoryService.findById(id);
    if (optUserStory.isPresent()){
      userStoryService.savetask(userStory);
      return new ResponseEntity<>(userStory, HttpStatus.OK);
    } else {
      UserStory userStoryNotFound = new UserStory();
      userStoryNotFound.setName("No userStory with id: " + id);
      return  new ResponseEntity<>(userStory, HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/userStory/{id}")
  public ResponseEntity<String> deleteUserStory(@PathVariable int id){
    try {
      userStoryService.deleteUserStoryById(id);
      return new ResponseEntity<>("Deleted task by id: " + id, HttpStatus.OK);
    }catch (Exception err){
      return new ResponseEntity<>("Could not delete task by id: " + id, HttpStatus.NOT_FOUND);
    }

  }

}
