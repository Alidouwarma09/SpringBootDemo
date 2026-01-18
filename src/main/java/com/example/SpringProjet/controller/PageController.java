package com.example.SpringProjet.controller;

import com.example.SpringProjet.model.Produit;
import com.example.SpringProjet.model.Utilisateur;
import com.example.SpringProjet.repository.ProduitRepository;
import com.example.SpringProjet.repository.UtilisateurRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class PageController {

    private final ProduitRepository produitRepository;
    private final UtilisateurRepository utilisateurRepository;

    public PageController(ProduitRepository produitRepository, UtilisateurRepository utilisateurRepository) {
        this.produitRepository = produitRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("message", "Bienvenue sur la page d'acceuil 🚀");
        return "index";
    }

    @GetMapping("/produit")
    public String produit(Model model) {
        List<Produit> produits = produitRepository.findAll();
        model.addAttribute("produits", produits);
        return "produit";
    }

    @GetMapping("/les_utilisateurs")
    public String utilisateurs(Model model) {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        model.addAttribute("utilisateurs", utilisateurs);
        return "liste_utilisateur";
    }


    @GetMapping("/produit/{id}")
    public String produitParId(@PathVariable("id") Long id, Model model) {
        Optional<Produit> produit = produitRepository.findById(id);
        if (produit.isPresent()) {
            model.addAttribute("produit", produit.get());
        } else {
            model.addAttribute("produit", null);
            model.addAttribute("message", "Produit non trouvé !");
        }
        return "produit_details";  // vue produit.html
    }



    @PostMapping("/produit/supprimer/{id}") // Utilisation de PostMapping car les navigateurs gèrent mal DeleteMapping via HTML simple
    public String supprimerProduit(@PathVariable("id") Long id) {
        // On vérifie si le produit existe avant de supprimer
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
        }

        // On redirige vers la liste des produits pour rafraîchir l'affichage
        return "redirect:/produit";
    }

    @PostMapping("/produit")
    public String ajouterProduit(@RequestParam String nom,
                                 @RequestParam int stock) {
        Produit p = new Produit(nom, stock);
        produitRepository.save(p);
        return "redirect:/produit"; // recharge la page pour afficher le nouveau produit
    }
}
