package com.example.burndownchartproject.repository;


import com.example.burndownchartproject.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer>  {


}
