package net.typingProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void storeToken(String token, String email, long durationInSeconds) {
        redisTemplate.opsForValue().set(token, email, durationInSeconds, TimeUnit.SECONDS);
    }

    // Save token with expiration
    public void saveToken(String token, long duration) {
        redisTemplate.opsForValue().set(token, "blacklisted", duration, TimeUnit.MILLISECONDS);
    }

    // Check if token exists
    public boolean isTokenBlacklisted(String token) {
        return redisTemplate.hasKey(token);
    }
}

