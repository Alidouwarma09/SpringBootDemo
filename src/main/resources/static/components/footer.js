class AtelierFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .footer {
                    background: #0f172a;
                    color: #f8fafc;
                    padding: 3rem 0 1.5rem;
                }

                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 2fr 1fr 1fr 1fr;
                    }
                }

                .brand-section h3 {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #f472a6;
                }

                .brand-section p {
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                }

                .social-link {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 9999px;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #cbd5e1;
                    transition: all 0.2s;
                    text-decoration: none;
                }

                .social-link:hover {
                    background: #ec4899;
                    color: white;
                    transform: translateY(-2px);
                }

                .footer-column h4 {
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: white;
                }

                .footer-links {
                    list-style: none;
                }

                .footer-links li {
                    margin-bottom: 0.5rem;
                }

                .footer-links a {
                    color: #94a3b8;
                    text-decoration: none;
                    transition: color 0.2s;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .footer-links a:hover {
                    color: #f472a6;
                }

                .footer-bottom {
                    border-top: 1px solid #1e293b;
                    padding-top: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .footer-bottom {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }

                .footer-bottom p {
                    color: #64748b;
                    font-size: 0.875rem;
                }

                .payment-methods {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .payment-icon {
                    width: 2.5rem;
                    height: 1.5rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    color: #94a3b8;
                }
            </style>

            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="brand-section">
                            <h3>🧵 L'Atelier Mode Élégance</h3>
                            <p>Artisan confectionnaire depuis 1985. Nous créons des vêtements d'exception avec passion et savoir-faire, en privilégiant les matériaux nobles et la confection sur mesure.</p>
                            <div class="social-links">
                                <a href="#" class="social-link" aria-label="Facebook">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                </a>
                                <a href="#" class="social-link" aria-label="Instagram">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                </a>
                                <a href="#" class="social-link" aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                                </a>
                            </div>
                        </div>

                        <div class="footer-column">
                            <h4>Boutique</h4>
                            <ul class="footer-links">
                                <li><a href="#collection">Nouveautés</a></li>
                                <li><a href="#collection">Robes</a></li>
                                <li><a href="#collection">Costumes</a></li>
                                <li><a href="#collection">Accessoires</a></li>
                                <li><a href="#collection">Promotions</a></li>
                            </ul>
                        </div>

                        <div class="footer-column">
                            <h4>Service Client</h4>
                            <ul class="footer-links">
                                <li><a href="#contact">Contactez-nous</a></li>
                                <li><a href="#">Livraison & Retours</a></li>
                                <li><a href="#">Guide des tailles</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Suivi de commande</a></li>
                            </ul>
                        </div>

                        <div class="footer-column">
                            <h4>Légal</h4>
                            <ul class="footer-links">
                                <li><a href="#">Mentions légales</a></li>
                                <li><a href="#">CGV</a></li>
                                <li><a href="#">Politique de confidentialité</a></li>
                                <li><a href="#">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>&copy; 2024 L'Atelier Mode Élégance. Tous droits réservés.</p>
                        <div class="payment-methods">
                            <div class="payment-icon">CB</div>
                            <div class="payment-icon">VISA</div>
                            <div class="payment-icon">MC</div>
                            <div class="payment-icon">AMEX</div>
                            <div class="payment-icon">PP</div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('atelier-footer', AtelierFooter);