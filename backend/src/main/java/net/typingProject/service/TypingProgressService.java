package net.typingProject.service;

import net.typingProject.entity.TypingProgress;
import net.typingProject.repository.TypingProgressRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class TypingProgressService {

    @Autowired
    private TypingProgressRepository typingProgressRepository;

    public TypingProgress saveOrUpdateProgress(String email, double speed, double accuracy, int wordsTyped) {
        TypingProgress progress = typingProgressRepository.findByEmail(email)
                .orElse(new TypingProgress(
                        new ObjectId(),
                        email,
                        new ArrayList<>(),
                        new ArrayList<>(),
                        new ArrayList<>(),
                        0,
                        0,
                        0,
                        0
                ));

        // Update progress
        progress.getSpeeds().add(speed);
        progress.getAccuracies().add(accuracy);
        progress.getTimestamps().add(LocalDateTime.now());
        progress.setTotalWordsTyped(progress.getTotalWordsTyped() + wordsTyped);
        progress.setTotalSessions(progress.getTotalSessions() + 1);
        progress.setBestSpeed(Math.max(progress.getBestSpeed(), speed));
        progress.setBestAccuracy(Math.max(progress.getBestAccuracy(), accuracy));

        return typingProgressRepository.save(progress);
    }


    public Optional<TypingProgress> getProgressByEmail(String email) {
        return typingProgressRepository.findByEmail(email);
    }
}

