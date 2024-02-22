package com.bookingdoctor.backend.service;

import com.bookingdoctor.backend.dao.StoryDAO;
import com.bookingdoctor.backend.entity.StoryEntity;
import com.bookingdoctor.backend.entity.UserEntity;
import com.bookingdoctor.backend.repository.StoryRepository;
import com.bookingdoctor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StoryService {

    private StoryRepository storyRepository;
    private final UserRepository userRepository;

    @Autowired
    public StoryService(StoryRepository storyRepository, UserRepository userRepository){
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
    }

    public Optional<StoryEntity> getStory(int id){
        return storyRepository.findById(id);
    }

    public List<StoryEntity> getAll(){
        return storyRepository.findAll();
    }

    public StoryEntity addStory(StoryDAO storyEntity){
        Optional<UserEntity> userEntityOptional = userRepository.findById(storyEntity.getUser_id());
        UserEntity user = userEntityOptional.orElseThrow();

        StoryEntity story = new StoryEntity();

        story.setUser(user);
        story.setTitle(storyEntity.getTitle());
        story.setContent(storyEntity.getContent());
        story.setImage(storyEntity.getImage());
        story.setCreate_at(new Date());

        return storyRepository.save(story);
    }

    public void deleteStory(int id){
        storyRepository.deleteById(id);
    }

    public StoryEntity updateStory(StoryDAO story, int id){
        Optional<StoryEntity> optionalStoryEntity = storyRepository.findById(id);

        Optional<UserEntity> userEntityOptional = userRepository.findById(story.getUser_id());

        UserEntity user = userEntityOptional.orElseThrow();

        if (optionalStoryEntity.isPresent()){
            StoryEntity newStory = new StoryEntity();

            newStory.setUser(user);
            newStory.setTitle(story.getTitle());
            newStory.setImage(story.getImage());

            return storyRepository.save(newStory);
        }
        else {
            return null;
        }
    }


}
