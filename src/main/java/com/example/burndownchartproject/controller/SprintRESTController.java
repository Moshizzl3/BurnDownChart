package com.example.burndownchartproject.controller;


import com.example.burndownchartproject.model.Sprint;
import com.example.burndownchartproject.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class SprintRESTController {

    @Autowired
    SprintService sprintService;

    @GetMapping("/getAllSprint")
    public List<Sprint> getAllTasks() {
        return sprintService.getAllSprints();
    }

    @GetMapping("/sprint/{id}")
    public Sprint getSprintById(@PathVariable int id) {
        return sprintService.getSprintById(id);

    }
}
