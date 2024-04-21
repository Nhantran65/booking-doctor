package com.bookingdoctor.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.enums.Role;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findFirstByEmail(String email);

    List<UserEntity> findAllByRole(Role role);
}
