package net.typingProject.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId Id;
    @NonNull
    @Indexed(unique = true)
    private String username;
    @Indexed(unique = true )
    private String email;
    @NonNull
    private String password;
    @NonNull
    private List<String> role;
}
