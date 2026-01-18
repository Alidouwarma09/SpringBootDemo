package com.example.SpringProjet.controller;

import com.example.SpringProjet.model.Produit;
import com.example.SpringProjet.repository.ProduitRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Controller
public class PageController {

    private final ProduitRepository produitRepository;

    public PageController(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @GetMapping("/accueil")
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

    @PostMapping("/produit")
    public String ajouterProduit(@RequestParam String nom,
                                 @RequestParam int stock) {
        Produit p = new Produit(nom, stock);
        produitRepository.save(p);
        return "redirect:/produit"; // recharge la page pour afficher le nouveau produit
    }
}
