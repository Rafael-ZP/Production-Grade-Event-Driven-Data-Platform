package com.netflix.analytics;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsConsumer {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    public AnalyticsConsumer(StringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "user-events", groupId = "analytics-group")
    @SneakyThrows
    public void consume(String eventJson) {
        UserEvent event = objectMapper.readValue(eventJson, UserEvent.class);

        if ("PLAY".equals(event.getEventType())) {
            redisTemplate.opsForValue().increment("video:view_count:" + event.getVideoId());
            System.out.println("Incremented view count for video: " + event.getVideoId());
        }
    }
}
