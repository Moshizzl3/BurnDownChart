package com.example.burndownchartproject.service;

import com.example.burndownchartproject.model.Sprint;
import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SprintService {

    @Autowired
    SprintRepository sprintRepository;

    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    public Sprint getSprintById(int id){
        return sprintRepository.findById(id).get();
    }
}
