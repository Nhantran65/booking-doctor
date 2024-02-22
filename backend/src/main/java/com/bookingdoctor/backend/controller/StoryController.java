package com.bookingdoctor.backend.controller;

import com.bookingdoctor.backend.dao.StoryDAO;
import com.bookingdoctor.backend.entity.StoryEntity;
import com.bookingdoctor.backend.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/story")
public class StoryController {

    private StoryService storyService;

    @Autowired
    public StoryController(StoryService storyService){
        this.storyService = storyService;
    }

    @GetMapping("")
    public StoryEntity getStory(int id){
        Optional<StoryEntity> story = storyService.getStory(id);
        return (StoryEntity) story.orElse(null);
    }

    @GetMapping("/all")
    public List<StoryEntity> getAllStory(){
        return storyService.getAll();
    }

    @PostMapping("/add")
    public StoryEntity addStory(@RequestBody StoryDAO newStory){
        return storyService.addStory(newStory);
    }

    @PutMapping("/update")
    public void updateStory(@RequestBody StoryDAO storyDAO, @RequestParam int id){
        storyService.updateStory(storyDAO,id);
    }

    @DeleteMapping("/delete")
    public void deleteStory(@RequestParam int id){
        storyService.deleteStory(id);
    }


}
