package com.bookingdoctor.backend.service;

import com.bookingdoctor.backend.dao.SpecializationDAO;
import com.bookingdoctor.backend.entity.SpecializationEntity;
import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.repository.SpecializationRepository;
import com.bookingdoctor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecializationService {

    private final SpecializationRepository repo;

    private final UserRepository userRepository;

    @Autowired
    public SpecializationService(SpecializationRepository repo, UserRepository userRepository){
        this.repo = repo;
        this.userRepository = userRepository;
    }

    public Optional<SpecializationEntity> getSpecialization(int id){
        return repo.findById(id);
    }

    public List<SpecializationEntity> getAll(){
        return repo.findAll();
    }

    public SpecializationEntity addSpecialization(SpecializationDAO specialization){
        Optional<UserEntity> userEntityOptional = userRepository.findById(specialization.getDoctor_id());
        UserEntity doctor = userEntityOptional.orElseThrow();

        SpecializationEntity newSpecialization = new SpecializationEntity();
        newSpecialization.setUser(doctor);
        newSpecialization.setSpecialization(specialization.getSpecialization());
        newSpecialization.setDescription(specialization.getDescription());

        return newSpecialization;
    }

    public void deleteSpecialization(int id){
        repo.deleteById(id);
    }

    public SpecializationEntity updateSpecialization(SpecializationDAO specialization, int id){
        Optional<SpecializationEntity> optionalSpecialization = repo.findById(id);

        Optional<UserEntity> userEntityOptional = userRepository.findById(specialization.getDoctor_id());

        UserEntity user = userEntityOptional.orElseThrow();

        if(optionalSpecialization.isPresent()){
            SpecializationEntity newSpecialization = new SpecializationEntity();

            newSpecialization.setDescription(specialization.getDescription());
            newSpecialization.setSpecialization(specialization.getSpecialization());
            newSpecialization.setUser(user);

            return repo.save(newSpecialization);
        }
        else {
            return null;
        }

    }
}
