package net.typingProject.repository;

import net.typingProject.entity.TypingProgress;
import net.typingProject.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypingProgressRepository extends MongoRepository<TypingProgress, ObjectId> {
    Optional<TypingProgress> findByEmail(String email);
    void deleteByEmail(String email);
}

