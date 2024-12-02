package net.typingProject.controller;

import jakarta.servlet.http.HttpServletRequest;
import net.typingProject.entity.TypingProgress;
import net.typingProject.service.TypingProgressService;
import net.typingProject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/typing-progress")
public class TypingProgressController {

    @Autowired
    private TypingProgressService typingProgressService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Save or update typing progress for the authenticated user.
     */
    @PostMapping
    public ResponseEntity<?> saveOrUpdateProgress(HttpServletRequest request, @RequestBody Map<String, Object> payload) {
        try {
            System.out.println("Incoming Payload: " + payload);

            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Missing or invalid token"));
            }

            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);

            double speed = Double.parseDouble(payload.get("speed").toString());
            double accuracy = Double.parseDouble(payload.get("accuracy").toString());
            int wordsTyped = Integer.parseInt(payload.get("wordsTyped").toString());

            TypingProgress progress = typingProgressService.saveOrUpdateProgress(email, speed, accuracy, wordsTyped);
            return ResponseEntity.ok(Map.of(
                    "message", "Progress saved successfully!",
                    "progress", progress
            ));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Failed to save progress: " + e.getMessage()));
        }
    }


    /**
     * Get typing progress for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<?> getProgress(HttpServletRequest request) {
        try {
            // Extract Authorization header
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
            }

            // Extract token and email
            String token = authHeader.substring(7);
            String email = jwtUtil.extractEmail(token);

            // Fetch typing progress
            Optional<TypingProgress> progressOptional = typingProgressService.getProgressByEmail(email);

            if (progressOptional.isPresent()) {
                return ResponseEntity.ok(progressOptional.get());
            } else {
                // Explicitly wrap the error response in a consistent structure
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Typing progress not found");
            }
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve progress: " + e.getMessage());
        }
    }



}

