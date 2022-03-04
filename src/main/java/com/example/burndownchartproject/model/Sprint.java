package com.example.burndownchartproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Sprint {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int sprintId;

  @Column
  private String sprintName;
  @Column
  private LocalDate startDate;
  @Column
  private LocalDate endDate;


}
