package com.example.SpringProjet.repository;

import com.example.SpringProjet.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // tu peux ajouter des méthodes de recherche custom ici si besoin
}
