package com.netflix.stream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/stream")
public class StreamController {

    @Value("${netflix.storage.location}")
    private String videoStorageLocation;

    @GetMapping(value = "/{videoName}", produces = "video/mp4")
    public ResponseEntity<Resource> streamVideo(@PathVariable String videoName) {
        Path videoPath = Paths.get(videoStorageLocation, videoName);
        Resource video = new FileSystemResource(videoPath);

        if (!video.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("video/mp4"))
                .body(video);
    }
}
