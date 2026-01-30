package com.example.SpringProjet.controller;

import com.example.SpringProjet.model.Paiement;
import com.example.SpringProjet.model.Produit;
import com.example.SpringProjet.model.Utilisateur;
import com.example.SpringProjet.repository.PaiementRepository;
import com.example.SpringProjet.repository.ProduitRepository;
import com.example.SpringProjet.repository.UtilisateurRepository;
import com.example.SpringProjet.service.ProduitService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Controller
public class PageController {

    private final ProduitService produitService;
    private final UtilisateurRepository utilisateurRepository;
    private final PaiementRepository paiementRepository;

    public PageController( ProduitService produitService, UtilisateurRepository utilisateurRepository, PaiementRepository paiementRepository) {
        this.produitService = produitService;
        this.utilisateurRepository = utilisateurRepository;
        this.paiementRepository = paiementRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("message", "Bienvenue sur la page d'acceuil 🚀");
        return "index";
    }

    @GetMapping("/produit")
    public String produit(Model model) {
        model.addAttribute("produits", produitService.getTousLesProduits());
        return "produit";
    }

    @GetMapping("/produit/{id}")
    public String produitParId(@PathVariable Long id, Model model) {
        Optional<Produit> produit = produitService.getProduitParId(id);

        if (produit.isPresent()) {
            model.addAttribute("produit", produit.get());
        } else {
            model.addAttribute("message", "Produit non trouvé !");
        }

        return "produit_details";
    }

    @PostMapping("/add-produit")
    public String ajouterProduit(
            @ModelAttribute Produit produit,
            @RequestParam("imageFile") MultipartFile imageFile
    ) throws IOException {

        if (!imageFile.isEmpty()) {
            String uploadDir = "uploads/";
            File uploadFolder = new File(uploadDir);

            if (!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, imageFile.getBytes());

            produit.setImage(fileName); // OK ✅
        }

        produitService.ajouterProduit(produit);
        return "redirect:/dashboard";
    }


    @PostMapping("/produit/supprimer/{id}")
    public String supprimerProduit(@PathVariable Long id) {
        produitService.supprimerProduit(id);
        return "redirect:/produit";
    }

    @GetMapping("/les_utilisateurs")
    public String utilisateurs(Model model) {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        model.addAttribute("utilisateurs", utilisateurs);
        return "liste_utilisateur";
    }


    @GetMapping("/teste")
    @ResponseBody
    public List<Utilisateur> test() {
        // Récupère tous les utilisateurs depuis la base de données
        return utilisateurRepository.findAll();
    }
    @PostMapping("/paiement-wave-session")
    @ResponseBody
    public Map<String, String> creerCheckoutSession(@RequestParam Double montant) {
        System.out.println("✅ Endpoint paiement-wave-session appelé");

        String reference = "REF-" + UUID.randomUUID().toString().substring(0,8);

        String waveLaunchUrl = "https://pay.wave.com/test_launch_url?reference=" + reference;

        return Map.of(
                "wave_launch_url", waveLaunchUrl,
                "reference", reference
        );
    }


    // 2️⃣ Webhook Wave
    @PostMapping("/wave-webhook")
    public String webhookWave(@RequestBody Map<String,Object> payload) {
        System.out.println("Webhook reçu : " + payload);
        String reference = (String) payload.get("reference");
        String statut = (String) payload.get("status"); // SUCCESS ou FAILED

        Optional<Paiement> paiementOpt = paiementRepository.findByReferenceTransaction(reference);
        paiementOpt.ifPresent(p -> {
            p.setStatut(statut);
            paiementRepository.save(p);
        });

        return "OK"; // Wave attend 200
    }

    // 3️⃣ Vérifier le statut côté frontend
    @GetMapping("/paiement-status/{reference}")
    public Map<String,String> paiementStatus(@PathVariable String reference){
        Optional<Paiement> paiementOpt = paiementRepository.findByReferenceTransaction(reference);
        return Map.of("statut", paiementOpt.map(Paiement::getStatut).orElse("PENDING"));
    }



    @GetMapping("/paiement-wave")
    public String paiement(Model model) {
        return "paiement";
    }
    @GetMapping("/dashboard")
    public String dashboard(Model model){
        model.addAttribute("produits", produitService.getTousLesProduits());
        return "dashboard";
    }

    @GetMapping("/icons")
    public String icons(){
        return "icons";
    }

    @GetMapping("/map")
    public String map(){
        return "map";
    }

    @GetMapping("/notifications")
    public String notifications(){
        return "notifications";
    }

    @GetMapping("/tables")
    public String tables(){
        return "tables";
    }
    @GetMapping("/template")
    public String template(){
        return "template";
    }
    @GetMapping("/typography")
    public String typography(){
        return "typography";
    }

    @GetMapping("/user")
    public String user(){
        return "user";
    }





}

