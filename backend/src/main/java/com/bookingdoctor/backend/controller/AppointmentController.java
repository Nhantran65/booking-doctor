package com.bookingdoctor.backend.controller;

import com.bookingdoctor.backend.dao.AppointmentDAO;
import com.bookingdoctor.backend.dao.CommentDAO;
import com.bookingdoctor.backend.entity.AppointmentEntity;
import com.bookingdoctor.backend.entity.CommentEntity;
import com.bookingdoctor.backend.service.AppointmentService;
import com.bookingdoctor.backend.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/appointment")
@RestController
public class AppointmentController {
    private AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService){

        this.appointmentService = appointmentService;
    }

    @GetMapping("")
    public AppointmentEntity getAppointment(@RequestParam int id){
        Optional<AppointmentEntity> appointment = appointmentService.getAppointment(id);
        return (AppointmentEntity) appointment.orElseThrow();
    }

    @GetMapping("/all")
    public List<AppointmentEntity> getAll(){
        return appointmentService.getAll();
    }

    @PostMapping("/add")
    public AppointmentEntity addAppointment(@RequestBody AppointmentDAO appointment){
        return appointmentService.addAppointment(appointment);
    }

    @PutMapping("/update")
    public void updateAppointment(@RequestBody AppointmentDAO appointment,@RequestParam int id){
        appointmentService.updateAppointment(appointment,id);
    }

    @DeleteMapping("/delete")
    public void deleteAppointment(@RequestParam int id){
        appointmentService.deleteAppointment(id);
    }


}
