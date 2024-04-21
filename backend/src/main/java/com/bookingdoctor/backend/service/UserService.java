package com.bookingdoctor.backend.service;

import com.bookingdoctor.backend.dao.SignupDAO;
import com.bookingdoctor.backend.dao.UserDAO;
import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.enums.Role;
import com.bookingdoctor.backend.repository.UserRepository;
import com.bookingdoctor.backend.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Autowire the AuthService to handle user sign-up
    @Autowired
    private AuthService authService;

    public Optional<UserEntity> getUser(int id) {
        return userRepository.findById(id);
    }

    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    public UserEntity addUser(UserDAO user) {
        UserEntity newUser = new UserEntity();

        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setRole(user.getRole());

        return userRepository.save(newUser);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public UserEntity updateUser(UserDAO userUpdate, int id) {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);

        if (optionalUserEntity.isPresent()) {
            UserEntity user = optionalUserEntity.get();

            user.setFirstname(userUpdate.getFirstname());
            user.setLastname(userUpdate.getLastname());
            user.setEmail(userUpdate.getEmail());
            user.setRole(userUpdate.getRole());

            return userRepository.save(user);
        } else {
            return null;
        }
    }

    // Doctor
    public List<UserEntity> getAllDoctor() {
        return userRepository.findAllByRole(Role.doctor);
    }

    public UserDAO addDoctor(SignupDAO doctor) {
        SignupDAO newDoctor = new SignupDAO();

        newDoctor.setFirstname(doctor.getFirstname());
        newDoctor.setLastname(doctor.getLastname());
        newDoctor.setEmail(doctor.getEmail());
        newDoctor.setRole(Role.doctor);
        newDoctor.setPassword(doctor.getPassword());

        return authService.createUser(newDoctor);
    }

    public UserEntity updateDoctor(UserDAO doctorUpdate, int id) {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);

        if (optionalUserEntity.isPresent()) {
            UserEntity doctor = optionalUserEntity.get();

            doctor.setFirstname(doctorUpdate.getFirstname());
            doctor.setLastname(doctorUpdate.getLastname());
            doctor.setEmail(doctorUpdate.getEmail());
            doctor.setRole(Role.doctor);

            return userRepository.save(doctor);
        } else {
            return null;
        }
    }

    // Patient
    public List<UserEntity> getAllPatient() {
        return userRepository.findAllByRole(Role.patient);
    }

    public UserDAO addPatient(SignupDAO doctor) {
        SignupDAO newPatient = new SignupDAO();

        newPatient.setFirstname(doctor.getFirstname());
        newPatient.setLastname(doctor.getLastname());
        newPatient.setEmail(doctor.getEmail());
        newPatient.setRole(Role.doctor);
        newPatient.setPassword(doctor.getPassword());

        return authService.createUser(newPatient);
    }

    public UserEntity updatePatient(UserDAO doctorUpdate, int id) {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);

        if (optionalUserEntity.isPresent()) {
            UserEntity doctor = optionalUserEntity.get();

            doctor.setFirstname(doctorUpdate.getFirstname());
            doctor.setLastname(doctorUpdate.getLastname());
            doctor.setEmail(doctorUpdate.getEmail());
            doctor.setRole(Role.doctor);

            return userRepository.save(doctor);
        } else {
            return null;
        }
    }
}
