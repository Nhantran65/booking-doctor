package com.bookingdoctor.backend.service.jwt;

import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final UserEntity user;

    public CustomUserDetails(UserEntity user) {
        this.user = user;
    }

    // Override các phương thức của UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = "ROLE_" + user.getRole().toString().toUpperCase();
        return Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    // Thêm các phương thức getter cho các thuộc tính của UserEntity
    public int getId() {
        return user.getId();
    }

    public String getFirstname() {
        return user.getFirstname();
    }

    public String getLastname() {
        return user.getLastname();
    }

    public String getProfilePicture() {
        return user.getProfilePicture();
    }

    public String getBio() {
        return user.getBio();
    }

    public Role getRole() {
        return user.getRole();
    }

    // Các phương thức còn lại giữ nguyên
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
