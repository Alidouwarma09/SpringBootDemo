package com.example.SpringProjet.controller;

import com.example.SpringProjet.model.Utilisateur;
import com.example.SpringProjet.service.UtilisateurService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    private final UtilisateurService utilisateurService;

    public AuthController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    // Page d'inscription
    @GetMapping("/inscription")
    public String inscriptionForm(Model model) {
        model.addAttribute("utilisateur", new Utilisateur());
        return "inscription";
    }

    @PostMapping("/inscription")
    public String inscrireUtilisateur(@ModelAttribute Utilisateur utilisateur, Model model) {
        try {
            utilisateurService.inscrire(utilisateur);
            model.addAttribute("messageSuccess", "Inscription réussie ! Vous pouvez maintenant vous connecter.");
            return "login";
        } catch (Exception e) {
            model.addAttribute("messageError", e.getMessage());
            return "inscription";
        }
    }

    // Page de connexion
    @GetMapping("/login")
    public String connexionForm(Model model) {
        model.addAttribute("utilisateur", new Utilisateur());
        return "login";
    }

}
