package com.example.burndownchartproject.model;


import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;

@Entity

public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int taskId;
  private String name;
  private LocalDate creationDate = LocalDate.now();
  private LocalDate completionDate;
  private String status = "notstarted";
  private String description;
  private double timeSpent;
  private double estimatedTime;
  @Column(name = "user_story_id")
  private int userStoryId;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "user_story_id",insertable = false, updatable = false)
  @JsonBackReference
  private UserStory userStory;


  public int getTaskId() {
    return taskId;
  }

  public String getName() {
    return name;
  }

  public LocalDate getCreationDate() {
    return creationDate;
  }

  public String getStatus() {
    return status;
  }

  public String getDescription() {
    return description;
  }

  public double getTimeSpent() {
    return timeSpent;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCreationDate(LocalDate date) {
    this.creationDate = date;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setTimeSpent(double timeSpent) {
    this.timeSpent = timeSpent;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setTaskId(int taskId) {
    this.taskId = taskId;
  }

  public double getEstimatedTime() {
    return estimatedTime;
  }

  public void setEstimatedTime(double estimatedTime) {
    this.estimatedTime = estimatedTime;
  }

  public LocalDate getCompletionDate() {
    return completionDate;
  }

  public void setCompletionDate(LocalDate completionDate) {
    this.completionDate = completionDate;
  }

  public UserStory getUserStory() {
    return userStory;
  }

  public void setUserStory(UserStory userStory) {
    this.userStory = userStory;
  }

  public int getUserStoryId() {
    return userStoryId;
  }

  public void setUserStoryId(int userStoryId) {
    this.userStoryId = userStoryId;
  }
}