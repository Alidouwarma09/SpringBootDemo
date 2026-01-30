package com.example.SpringProjet.model;

import jakarta.persistence.*;

// 🔥 IMPORTS LOMBOK (IL MANQUAIT ÇA)
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private int stock;
    @Column(precision = 10, scale = 2)
    private BigDecimal prix;
    private String image;
}
