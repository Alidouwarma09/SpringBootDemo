package com.example.SpringProjet.service;


import com.example.SpringProjet.model.Produit;
import com.example.SpringProjet.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    // 🔹 Ajouter un produit
    public Produit ajouterProduit(Produit produit) {

        return produitRepository.save(produit);
    }

    // 🔹 Lister tous les produits
    public List<Produit> getTousLesProduits() {
        return produitRepository.findAll();
    }

    // 🔹 Trouver un produit par ID
    public Optional<Produit> getProduitParId(Long id) {
        return produitRepository.findById(id);
    }

    // 🔹 Supprimer un produit
    public void supprimerProduit(Long id) {
        if (produitRepository.existsById(id)) {
            produitRepository.deleteById(id);
        }
    }
}
