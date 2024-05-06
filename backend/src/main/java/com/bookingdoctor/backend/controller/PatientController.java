package com.bookingdoctor.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookingdoctor.backend.dao.SignupDAO;
import com.bookingdoctor.backend.dao.UserDAO;
import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.service.UserService;

@RequestMapping("/patient")
@RestController
public class PatientController {

    private UserService userService;

    @Autowired
    public PatientController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserEntity> getAllPatients() {
        return userService.getAllPatient();
    }

    @PostMapping("/add")
    public void addPatient(@RequestBody SignupDAO doctor) {
        userService.addPatient(doctor);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody UserDAO doctor, @RequestParam int id) {
        userService.updatePatient(doctor, id);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }

}
