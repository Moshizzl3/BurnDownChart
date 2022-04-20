package com.example.burndownchartproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.apache.catalina.LifecycleState;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.List;

@Entity
public class UserStory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int userStoryId;
  private String name;
  private LocalDate creationDate = LocalDate.now();
  private LocalDate completionDate;
  private String status = "notstarted";
  private String description;
  private int storyPoints;

  @OneToMany
  @JoinColumn(name = "user_story_id")
  @JsonBackReference
  private List<Task> tasks;

  public int getUserStoryId() {
    return userStoryId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDate getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(LocalDate creationDate) {
    this.creationDate = creationDate;
  }

  public LocalDate getCompletionDate() {
    return completionDate;
  }

  public void setCompletionDate(LocalDate completionDate) {
    this.completionDate = completionDate;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getStoryPoints() {
    return storyPoints;
  }

  public void setStoryPoints(int storyPoints) {
    this.storyPoints = storyPoints;
  }

  public List<Task> getTasks() {
    return tasks;
  }

  public void setTasks(List<Task> tasks) {
    this.tasks = tasks;
  }
}