package net.typingProject.service;

import net.typingProject.dto.UserDto;
import net.typingProject.entity.User;
import net.typingProject.exception.DuplicateEmailException;
import net.typingProject.exception.DuplicateUsernameException;
import net.typingProject.mapper.UserMapper;
import net.typingProject.repository.TypingProgressRepository;
import net.typingProject.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder; // Use BCryptPasswordEncoder or similar

    @Autowired
     private TypingProgressRepository typingProgressRepository;


    /**
     * Save a new user to the database.
     *
     * @param userDto the user details to save
     * @return the saved UserDto object
     */
    @Transactional
    public UserDto saveUser(UserDto userDto) {

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new DuplicateEmailException("Email already exists.");
        }
        // Check if username already exists
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new DuplicateUsernameException("Username already exists.");
        }
        User userEntity = userMapper.toEntity(userDto);
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword())); // Encode password
        userEntity.setRole(Collections.singletonList("USER"));
        User savedUser = userRepository.save(userEntity);
        return userMapper.toDto(savedUser);
    }

    @Transactional
    public boolean deleteUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Log user info for debugging
            System.out.println("User found for deletion: " + user.getId());
            typingProgressRepository.deleteByEmail(user.getEmail());
            userRepository.deleteByEmail(user.getEmail());
            return true;
        }

        return false;
    }

    @Autowired
    private ModelMapper modelMapper; // For converting entities to DTOs

    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return modelMapper.map(user, UserDto.class); // Map User entity to UserDto
    }
}
