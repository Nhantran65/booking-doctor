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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/doctor")
@RestController
public class DoctorController {

    private UserService userService;

    @Autowired
    public DoctorController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public UserEntity getDoctor(int id) {
        Optional<UserEntity> user = userService.getUser(id);
        return (UserEntity) user.orElse(null);
    }

    @GetMapping("/all")
    public List<UserEntity> getAllDoctors() {
        return userService.getAllDoctor();
    }

    @PostMapping("/add")
    public void addDoctor(@RequestBody SignupDAO doctor) {
        userService.addDoctor(doctor);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody UserDAO doctor, @RequestParam int id) {
        userService.updateDoctor(doctor, id);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUser(id);
    }

}
