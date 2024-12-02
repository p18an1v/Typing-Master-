package net.typingProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OTPService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final int OTP_EXPIRY_MINUTES = 15;

    @Autowired
    private EmailService emailService;

    public void generateAndSendOTP(String email) {
        // Generate a random 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Store OTP in Redis with an expiration time
        redisTemplate.opsForValue().set(getRedisKey(email), otp, OTP_EXPIRY_MINUTES, TimeUnit.MINUTES);

        // Send OTP via email
        emailService.sendEmail(email, "Reset Password OTP", "Your OTP is: " + otp);
    }

    public boolean validateOTP(String email, String otp) {
        // Retrieve OTP from Redis
        String storedOtp = (String) redisTemplate.opsForValue().get(getRedisKey(email));
        return otp != null && otp.equals(storedOtp);
    }

    public void deleteOTP(String email) {
        redisTemplate.delete(getRedisKey(email));
    }

    private String getRedisKey(String email) {
        return "OTP_" + email;
    }
}

