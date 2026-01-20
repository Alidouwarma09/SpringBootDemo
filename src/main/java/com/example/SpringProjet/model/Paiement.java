package com.example.SpringProjet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "paiements")
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 utilisateur qui effectue le paiement
    @ManyToOne
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    // 💰 montant payé
    @Column(nullable = false)
    private Double montant;

    // 💱 devise (XOF pour Wave)
    @Column(nullable = false)
    private String devise;

    // 🧾 référence Wave
    @Column(unique = true)
    private String referenceTransaction;

    // ⏳ statut du paiement
    @Column(nullable = false)
    private String statut;
    // PENDING | SUCCESS | FAILED

    // 📅 date du paiement
    @Column(nullable = false)
    private LocalDateTime datePaiement;

    public Paiement() {}

    public Paiement(Utilisateur utilisateur, Double montant, String devise,
                    String referenceTransaction, String statut) {
        this.utilisateur = utilisateur;
        this.montant = montant;
        this.devise = devise;
        this.referenceTransaction = referenceTransaction;
        this.statut = statut;
        this.datePaiement = LocalDateTime.now();
    }

    // getters / setters

    public Long getId() {
        return id;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public String getReferenceTransaction() {
        return referenceTransaction;
    }

    public void setReferenceTransaction(String referenceTransaction) {
        this.referenceTransaction = referenceTransaction;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(LocalDateTime datePaiement) {
        this.datePaiement = datePaiement;
    }
}
