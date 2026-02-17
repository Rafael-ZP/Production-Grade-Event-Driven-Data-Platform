package com.netflix.analytics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEvent {
    private String userId;
    private String videoId;
    private String eventType; // PLAY, PAUSE, STOP
    private long timestamp;
}
