package com.alchemy.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${cors.origins}")
    private String corsOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String mappingPattern = "/**";
        registry
                .addMapping(mappingPattern).allowedMethods("PUT", "POST", "GET", "DELETE", "OPTIONS")
                .allowedOrigins(corsOrigins.split(","));
        log.info(String.format("CORS configuration set to %s for mapping %s", corsOrigins, mappingPattern));
    }
}