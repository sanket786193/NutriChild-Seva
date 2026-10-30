package org.nutrichild.controller;

import org.nutrichild.service.AiAssistantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/ai")
public class AiAssistantController {

    private final AiAssistantService aiService;

    public AiAssistantController(AiAssistantService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/voice-assist")
    public ResponseEntity<?> askAssistant(@RequestBody Map<String, String> request) {
        String question = request.getOrDefault("question", "What should I feed my child?");
        String language = request.getOrDefault("language", "hi");
        String context = request.getOrDefault("context", "");

        Map<String, Object> result = aiService.askAssistant(question, language, context);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/food-analyze")
    public ResponseEntity<?> analyzeMeal(@RequestBody Map<String, String> request) {
        String foodName = request.getOrDefault("foodName", "Khichdi with Greens");
        String description = request.getOrDefault("description", "");

        Map<String, Object> result = aiService.analyzeFoodPlate(foodName, description);
        return ResponseEntity.ok(result);
    }
}
