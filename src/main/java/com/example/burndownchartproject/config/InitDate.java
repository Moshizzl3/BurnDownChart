package com.example.burndownchartproject.config;

import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class InitDate implements CommandLineRunner {

    @Autowired
    private TaskRepository taskRepository;


    @Override
    public void run(String... args) throws Exception {

        Task task = new Task();
        task.setDate(LocalDate.now());
        task.setName("Dette er en task");
        task.setDescription("Det er virkelig en task");
        task.setStatus("Not startet");
        taskRepository.save(task);
    }
}
