package com.covidlore.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.util.Objects;

@Configuration
@PropertySource("classpath:application.properties")
public class DataSourceConfig {

    private final Environment env;

    public DataSourceConfig(Environment env) {
        this.env = env;
    }

    private int propertyToInt(String str) {
        return Integer.parseInt(Objects.requireNonNull(env.getProperty(str)));
    }

    @Bean
    public DataSource dataSource() {

        ComboPooledDataSource dataSource = new ComboPooledDataSource();

        try {
            dataSource.setDriverClass(env.getProperty("spring.datasource.driver"));
        } catch (PropertyVetoException err) {
            throw new RuntimeException(err);
        }

        dataSource.setJdbcUrl(env.getProperty("spring.datasource.url"));
        dataSource.setUser(env.getProperty("spring.datasource.username"));
        dataSource.setPassword(env.getProperty("spring.datasource.password"));

        dataSource.setInitialPoolSize(propertyToInt("connection.pool.initialPoolSize"));
        dataSource.setMinPoolSize(propertyToInt("connection.pool.minPoolSize"));
        dataSource.setMaxPoolSize(propertyToInt("connection.pool.maxPoolSize"));
        dataSource.setMaxIdleTime(propertyToInt("connection.pool.maxIdleTime"));

        return dataSource;
    }

}
