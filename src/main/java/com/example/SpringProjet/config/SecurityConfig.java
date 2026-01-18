package com.example.SpringProjet.config;

import com.example.SpringProjet.model.Utilisateur;
import com.example.SpringProjet.repository.UtilisateurRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final UtilisateurRepository utilisateurRepository;

    public SecurityConfig(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    // 🔐 Encoder les mots de passe
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 👤 Lien entre Spring Security et la base de données
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("Utilisateur non trouvé")
                    );

            return new User(
                    utilisateur.getUsername(),
                    utilisateur.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        };
    }

    // 🔑 AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    // 🔒 Sécurité des routes
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "accuel",
                                "/login",
                                "/inscription",
                                "/css/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/accueil", true)
                        .failureUrl("/login?error")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login")
                );

        return http.build();
    }
}
