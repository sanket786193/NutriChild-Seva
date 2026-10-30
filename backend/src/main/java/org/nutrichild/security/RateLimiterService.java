package org.nutrichild.security;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long LOCK_DURATION_MS = 15 * 60 * 1000L; // 15 minutes

    private static class Attempt {
        int count;
        long lastAttemptTimestamp;

        Attempt(int count, long lastAttemptTimestamp) {
            this.count = count;
            this.lastAttemptTimestamp = lastAttemptTimestamp;
        }
    }

    private final Map<String, Attempt> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String key) {
        Attempt attempt = attempts.get(key);
        if (attempt == null) return false;

        long now = Instant.now().toEpochMilli();
        if (now - attempt.lastAttemptTimestamp > LOCK_DURATION_MS) {
            attempts.remove(key);
            return false;
        }

        return attempt.count >= MAX_FAILED_ATTEMPTS;
    }

    public void recordFailedAttempt(String key) {
        long now = Instant.now().toEpochMilli();
        attempts.compute(key, (k, existing) -> {
            if (existing == null || (now - existing.lastAttemptTimestamp > LOCK_DURATION_MS)) {
                return new Attempt(1, now);
            }
            existing.count += 1;
            existing.lastAttemptTimestamp = now;
            return existing;
        });
    }

    public void resetAttempts(String key) {
        attempts.remove(key);
    }
}
