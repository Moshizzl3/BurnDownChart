package com.example.burndownchartproject.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;

@Entity

public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int taskId;

  @Column
  private String name;

  @Column
  private LocalDate date = LocalDate.now();

  @Column
  private LocalDate CompletionDate;

  @Column
  private String status = "notstarted";

  @Column
  private String description;

  @Column
  private double timeSpent;

  @Column
  private double estimatedTime;

  @ManyToOne
  @JoinColumn(name = "sprint_id")
  private Sprint sprint;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;


  public int getTaskId() {
    return taskId;
  }

  public String getName() {
    return name;
  }

  public LocalDate getDate() {
    return date;
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

  public void setDate(LocalDate date) {
    this.date = date;
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


  public Sprint getSprint() {
    return sprint;
  }

  public void setSprint(Sprint sprint) {
    this.sprint = sprint;
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
    return CompletionDate;
  }

  public void setCompletionDate(LocalDate completionDate) {
    CompletionDate = completionDate;
  }

}