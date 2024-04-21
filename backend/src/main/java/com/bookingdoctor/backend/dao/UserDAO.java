package com.bookingdoctor.backend.dao;

import com.bookingdoctor.backend.enums.Role;
import lombok.Data;

@Data
public class UserDAO {

    private int id;

    private String firstname;

    private String lastname;

    private String email;

    private Role role;

    private String profilepicture;
}
