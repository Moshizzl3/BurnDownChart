package com.example.burndownchartproject.service;


import com.example.burndownchartproject.model.User;
import com.example.burndownchartproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {
       return  userRepository.findAll();
    }


    public User getUserById(int id) {
        return userRepository.findById(id).get();
    }
}
