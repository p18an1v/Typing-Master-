package net.typingProject.service;

import lombok.extern.slf4j.Slf4j;
import net.typingProject.entity.User;
import net.typingProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Load a user by email for authentication.
     *
     * @param email the email of the user
     * @return UserDetails object containing user information and authorities
     * @throws UsernameNotFoundException if the user is not found
     */
    // Load user by email
    public UserDetails loadUserByEmail(String email) {
        log.debug("Looking up user by email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        log.debug("User found: {}", user.getEmail());
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getRole().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
        );
    }

    /**
     * Disable username-based login by throwing an exception.
     *
     * @param username the username of the user
     * @return throws UnsupportedOperationException
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

}

