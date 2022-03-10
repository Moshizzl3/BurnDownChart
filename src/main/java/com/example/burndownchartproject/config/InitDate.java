package com.example.burndownchartproject.config;

import com.example.burndownchartproject.model.Sprint;
import com.example.burndownchartproject.model.Task;
import com.example.burndownchartproject.model.User;
import com.example.burndownchartproject.repository.SprintRepository;
import com.example.burndownchartproject.repository.TaskRepository;
import com.example.burndownchartproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
public class InitDate implements CommandLineRunner {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

/*      Set<Task> taskSet = new HashSet<>();


        //tasks
        for (int i = 0; i < 10; i++) {

        heej

            Task task = new Task();
            task.setName("Task " + (i + 1));
            task.setDescription("Det er virkelig en task");
            task.setStatus("notstarted");
            taskRepository.save(task);
            taskSet.add(task);
        }

        //Sprint
        Sprint sprint = new Sprint();
        sprint.setSprintName("Sprint 1");
        sprint.setStartDate(LocalDate.parse("2022-03-07"));
        sprint.setEndDate(LocalDate.parse("2022-03-10"));
        sprint.setTaskSet(taskSet);
        sprintRepository.save(sprint);

        Sprint sprint2 = new Sprint();
        sprint2.setSprintName("Sprint 2");
        sprint2.setStartDate(LocalDate.parse("2022-03-11"));
        sprint2.setEndDate(LocalDate.parse("2022-03-14"));
        sprint2.setTaskSet(taskSet);
        sprintRepository.save(sprint2);

        //user
        User user = new User();
        user.setUserName("finn");
        user.setPassword("1234");
        user.setTaskSet(taskSet);
        userRepository.save(user);

        //user
        User user2 = new User();
        user2.setUserName("Bo");
        user2.setPassword("1234");
        user2.setTaskSet(taskSet);
        userRepository.save(user2);*/
    }
}
