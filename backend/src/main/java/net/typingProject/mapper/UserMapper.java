package net.typingProject.mapper;

import net.typingProject.dto.UserDto;
import net.typingProject.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UserMapper {


    //from entity -> dto
    public UserDto toDto(User newUser){
        return new UserDto(
                newUser.getUsername(),
                newUser.getEmail(),
                newUser.getPassword(),
                newUser.getRole()
        );
    }

    //from dto to entity
    public User toEntity(UserDto userDTO){
        return  new User(
                null,
                userDTO.getUsername(),
                userDTO.getEmail(),
                userDTO.getPassword(),
                new ArrayList<>()
        );
    }
}