package com.bookingdoctor.backend.controller;

import com.bookingdoctor.backend.dao.SpecializationDAO;
import com.bookingdoctor.backend.entity.SpecializationEntity;
import com.bookingdoctor.backend.entity.StoryEntity;
import com.bookingdoctor.backend.service.SpecializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/specialization")
@RestController
public class SpecializationController {

    private SpecializationService specializationService;

    @Autowired
    public SpecializationController(SpecializationService specializationService){
        this.specializationService = specializationService;
    }

    @GetMapping("")
    public SpecializationEntity getSpecialization(@RequestParam int id){
        Optional<SpecializationEntity> specialization = specializationService.getSpecialization(id);
        return (SpecializationEntity) specialization.orElse(null);
    }

    @GetMapping("/all")
    public List<SpecializationEntity> getAllSpecialization(){
        return specializationService.getAll();
    }

    @PostMapping("/add")
    public SpecializationEntity addSpecialization(@RequestBody SpecializationDAO specialization){
        return specializationService.addSpecialization(specialization);
    }

    @PutMapping("/update")
    public void updateSpecialization(@RequestBody SpecializationDAO specialization,@RequestParam int id){
        specializationService.updateSpecialization(specialization,id);
    }

    @DeleteMapping("/delete")
    public void deleteSpecialization(@RequestParam int id){
        specializationService.deleteSpecialization(id);
    }


}
