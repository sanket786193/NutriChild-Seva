package org.nutrichild.common;

import java.time.Instant;
import java.util.List;

/**
 * Standardized API Error Representation
 * Prevents sensitive stack traces from leaking to clients.
 */
public class ApiError {

    private int status;
    private String errorCode;
    private String message;
    private List<String> details;
    private String path;
    private long timestamp;

    public ApiError() {
        this.timestamp = Instant.now().toEpochMilli();
    }

    public ApiError(int status, String errorCode, String message, List<String> details, String path) {
        this();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
        this.details = details;
        this.path = path;
    }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getErrorCode() { return errorCode; }
    public void setErrorCode(String errorCode) { this.errorCode = errorCode; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public List<String> getDetails() { return details; }
    public void setDetails(List<String> details) { this.details = details; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
}
