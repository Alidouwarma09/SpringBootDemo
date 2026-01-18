package com.example.SpringProjet.service;

import com.example.SpringProjet.model.Utilisateur;
import com.example.SpringProjet.repository.UtilisateurRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Inscrire un nouvel utilisateur
    public Utilisateur inscrire(Utilisateur utilisateur) throws Exception {
        // Vérifier si le username ou l'email existe déjà
        Optional<Utilisateur> userByUsername = utilisateurRepository.findByUsername(utilisateur.getUsername());
        Optional<Utilisateur> userByEmail = utilisateurRepository.findByEmail(utilisateur.getEmail());

        if (userByUsername.isPresent()) {
            throw new Exception("Nom d'utilisateur déjà utilisé !");
        }
        if (userByEmail.isPresent()) {
            throw new Exception("Email déjà utilisé !");
        }

        // Encoder le mot de passe
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));

        return utilisateurRepository.save(utilisateur);
    }

    // Vérifier la connexion
    public boolean connexion(String username, String password) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByUsername(username);
        if (utilisateur.isPresent()) {
            return passwordEncoder.matches(password, utilisateur.get().getPassword());
        }
        return false;
    }
}
