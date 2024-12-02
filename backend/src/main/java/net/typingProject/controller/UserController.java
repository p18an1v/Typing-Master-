package net.typingProject.controller;


import jakarta.servlet.http.HttpServletRequest;
import net.typingProject.dto.UserDto;
import net.typingProject.service.UserService;
import net.typingProject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;



    @GetMapping
    public ResponseEntity<String> userDashboard(){
        return new ResponseEntity<>("Welcome to UserDashboard",HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        // Extract JWT from the Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token); // Extract user email from JWT

        // Fetch user details
        UserDto userDto = userService.getUserByEmail(email);

        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteUserAccount(HttpServletRequest request) {
        // Extract JWT from the Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token); // Extract user email from JWT

        // Check if user exists
        boolean userDeleted = userService.deleteUserByEmail(email);

        if (userDeleted) {
            return ResponseEntity.ok("User account deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
}

