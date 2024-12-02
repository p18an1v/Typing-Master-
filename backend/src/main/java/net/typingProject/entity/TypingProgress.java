package net.typingProject.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypingProgress {
    @Id
    private ObjectId id;

    @NonNull
    @Indexed(unique = true)
    private String email;  // Unique identifier for the user

    private List<Double> speeds;          // Cumulative WPM for each session
    private List<Double> accuracies;      // Cumulative accuracy for each session
    private List<LocalDateTime> timestamps; // Cumulative session timestamps
    private int totalWordsTyped;          // Sum of words typed across sessions
    private int totalSessions;            // Total number of typing sessions
    private double bestSpeed;             // Highest speed achieved
    private double bestAccuracy;          // Highest accuracy achieved
}



