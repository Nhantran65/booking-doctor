package com.bookingdoctor.backend.controller;

import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.service.jwt.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping
    public UserDetails getCurrentUser() {
        return (UserDetails)userDetailsService.getCurrentUser();
    }
}

