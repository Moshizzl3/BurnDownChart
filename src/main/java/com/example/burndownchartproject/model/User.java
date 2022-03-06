package com.example.burndownchartproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int userId;
  @Column
  private String userName;
  @Column
  private String password;

  @OneToMany
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private Set<Task> taskSet = new HashSet<>();

  public int getUserId() {
    return userId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Task> getTaskSet() {
    return taskSet;
  }

  public void setTaskSet(Set<Task> taskSet) {
    this.taskSet = taskSet;
  }
}
