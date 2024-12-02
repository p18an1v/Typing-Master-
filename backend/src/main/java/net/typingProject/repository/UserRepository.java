package net.typingProject.repository;

import net.typingProject.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);
    void deleteByEmail(String email);
    // Custom query method to check if an email exists
    boolean existsByEmail(String email);

    // Custom query method to check if a username exists
    boolean existsByUsername(String username);
}
