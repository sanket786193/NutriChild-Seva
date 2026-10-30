package org.nutrichild.monitoring;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestPerformanceFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestPerformanceFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        long startTime = System.currentTimeMillis();
        try {
            filterChain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            response.setHeader("X-Response-Time-Ms", String.valueOf(duration));

            // Log slow queries (> 500ms) or standard API operations
            if (duration > 500) {
                log.warn("[PERF-SLOW] {} {} took {}ms (Status: {})",
                        request.getMethod(), request.getRequestURI(), duration, response.getStatus());
            } else if (request.getRequestURI().startsWith("/api/")) {
                log.debug("[PERF] {} {} took {}ms (Status: {})",
                        request.getMethod(), request.getRequestURI(), duration, response.getStatus());
            }
        }
    }
}
