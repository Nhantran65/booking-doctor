package com.bookingdoctor.backend.dao;

import com.bookingdoctor.backend.enums.Gender;
import com.bookingdoctor.backend.enums.Role;
import lombok.Data;

@Data
public class SignupDAO {

    private String profilepicture;

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    private Role role;
}
