package com.bookingdoctor.backend.entity;

import com.bookingdoctor.backend.enums.Gender;
import com.bookingdoctor.backend.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname ;

    @Column
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column
    private String bio;

    @Enumerated(EnumType.STRING)
    private Role role;







}
