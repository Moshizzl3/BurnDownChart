package com.example.burndownchartproject.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
class JpaConfig {

    @Bean
    public DataSource getDataSource() {
        return DataSourceBuilder.create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url(getDataSourceUrl())
                .username(System.getenv("JDBC_USERNAME"))
                .password(System.getenv("JDBC_PASSWORD"))
                .build();
    }

    private String getDataSourceUrl() {
        return System.getenv("JDBC_DATABASE_URL");
    }

}