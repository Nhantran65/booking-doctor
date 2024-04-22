package com.bookingdoctor.backend.controller;

import com.bookingdoctor.backend.entity.NotificationEntity;
import com.bookingdoctor.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/notification")
@RestController
public class NotificationController {
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/all")
    public List<NotificationEntity> getAllNotificationsByRecipientId(@RequestParam int recipientId) {
        return notificationService.getAllNotificationsByRecipientId(recipientId);
    }

    @DeleteMapping("/delete")
    public void deleteNotification(@RequestParam int id) {
        notificationService.deleteNotification(id);
    }
}
