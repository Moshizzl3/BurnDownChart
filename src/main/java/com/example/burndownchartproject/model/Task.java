package com.example.burndownchartproject.model;


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
  private LocalDate date;

  @Column
  private String status;

  @Column
  private String description;

  @Column
  private double timeSpent;


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

  public void setTaskId(int taskId) {
    this.taskId = taskId;
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
}