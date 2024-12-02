package net.typingProject.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import net.typingProject.dto.UserDto;
import net.typingProject.entity.AuthResponse;
import net.typingProject.entity.LoginRequest;
import net.typingProject.exception.EmailSendFailedException;
import net.typingProject.service.*;
import net.typingProject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private RedisService redisService; // Redis integration for token blacklisting

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<UserDto> createUser(@RequestBody @Valid UserDto userDto) {
        // Validate email format
//        if (!isValidEmail(userDto.getEmail())) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return 400 if the email is invalid
//        }
        // Save the user in the database
        UserDto createdUser = userService.saveUser(userDto);

        // Try to send the confirmation email
        try {
            emailService.sendEmail(createdUser.getEmail(), "User Registration", "You have been successfully registered.");
        } catch (Exception e) {
            log.error("Error sending email to {}: {}", userDto.getEmail(), e.getMessage());

            // If email sending fails, throw an exception to trigger the rollback
            throw new EmailSendFailedException("Failed to send email, user not created.");
        }

        // If email is sent successfully, return the user object
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            log.debug("Authenticating user with email: {}", loginRequest.getEmail());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            log.debug("Authentication successful for: {}", loginRequest.getEmail());
        } catch (BadCredentialsException e) {
            log.error("Invalid credentials for user: {}", loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } catch (Exception e) {
            log.error("Authentication failed due to: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByEmail(loginRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        log.debug("Generated JWT for user: {}", loginRequest.getEmail());
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            long expirationTime = jwtUtil.extractExpiration(jwt).getTime() - System.currentTimeMillis();
            redisService.saveToken(jwt, expirationTime); // Blacklist token in Redis
            log.debug("Token blacklisted successfully: {}", jwt);
        }
        return ResponseEntity.ok("Logged out successfully.");
    }


    @Autowired
    private OTPService otpService;

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> sendOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        otpService.generateAndSendOTP(email);
        return ResponseEntity.ok("OTP sent to your email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");

        try {
            String result = passwordResetService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
