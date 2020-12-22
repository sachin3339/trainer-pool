package com.alchemy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"com.alchemy.repository", "com.alchemy.customrepository"})
public class PersistenceConfig {

}
