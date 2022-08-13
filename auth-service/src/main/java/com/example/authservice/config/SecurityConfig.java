package com.example.authservice.config;

import com.example.authservice.jwt.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(this.passwordEncoder());
        return auth;
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationManagerBuilder authenticationManagerBuilder,
                                                           UserService userService) throws Exception {
        return authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder()).and().build();
    }

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        return new JdbcUserDetailsManager(dataSource);
    }

//    @Bean
//    public SecurityFilterChain webSecurityCustomizer(HttpSecurity http) throws Exception {
//        return http
//                .authorizeRequests()
//                .antMatchers("/login", "/register/**", "/static/img/**", "/static/css/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/login").defaultSuccessUrl("/forum", true).permitAll()
//                .and()
//                .csrf()
//                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .and()
//                .logout(logout -> logout
//                        .logoutUrl("/logout")
//                        .addLogoutHandler(new SecurityContextLogoutHandler()))
//                .build();
//    }
}
