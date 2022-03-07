package com.example.burndownchartproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Sprint {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "sprint_id")
  private int sprintId;

  @Column
  private String sprintName;
  @Column
  private LocalDate startDate;
  @Column
  private LocalDate endDate;

  @OneToMany
  @JoinColumn(name = "sprint_id")
  @JsonBackReference
  private Set<Task> taskSet = new HashSet<>();

  public int getSprintId() {
    return sprintId;
  }

  public String getSprintName() {
    return sprintName;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public Set<Task> getTaskSet() {
    return taskSet;
  }

  public void setSprintName(String sprintName) {
    this.sprintName = sprintName;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }

  public void setTaskSet(Set<Task> taskSet) {
    this.taskSet = taskSet;
  }
}
