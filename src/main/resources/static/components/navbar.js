class AtelierNavbar extends HTMLElement {
    constructor() {
        super();
        this.cartCount = 0;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
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

                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
                    transition: all 0.3s ease;
                }

                :host-context(.dark) .navbar {
                    background: rgba(15, 23, 42, 0.9);
                    border-bottom-color: rgba(75, 85, 99, 0.5);
                }

                .container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .nav-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 4rem;
                }

                .logo {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #be185d;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                :host-context(.dark) .logo {
                    color: #f472a6;
                }

                .nav-links {
                    display: none;
                    align-items: center;
                    gap: 2rem;
                }

                @media (min-width: 768px) {
                    .nav-links {
                        display: flex;
                    }
                }

                .nav-link {
                    text-decoration: none;
                    color: #475569;
                    font-weight: 500;
                    font-size: 0.95rem;
                    transition: color 0.2s;
                    position: relative;
                }

                :host-context(.dark) .nav-link {
                    color: #94a3b8;
                }

                .nav-link:hover {
                    color: #db2777;
                }

                :host-context(.dark) .nav-link:hover {
                    color: #f472a6;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #ec4899;
                    transition: width 0.3s;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 9999px;
                    color: #475569;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                :host-context(.dark) .icon-btn {
                    color: #94a3b8;
                }

                .icon-btn:hover {
                    background: #fce7ef;
                    color: #db2777;
                }

                :host-context(.dark) .icon-btn:hover {
                    background: rgba(219, 39, 119, 0.2);
                    color: #f472a6;
                }

                .cart-btn {
                    position: relative;
                }

                .cart-badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: #ec4899;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 9999px;
                    display: none;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-menu-btn {
                    display: flex;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    color: #475569;
                }

                @media (min-width: 768px) {
                    .mobile-menu-btn {
                        display: none;
                    }
                }

                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border-bottom: 1px solid #e5e7eb;
                    padding: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }

                :host-context(.dark) .mobile-menu {
                    background: #0f172a;
                    border-bottom-color: #374151;
                }

                .mobile-menu.open {
                    display: block;
                }

                .mobile-link {
                    display: block;
                    padding: 0.75rem 0;
                    color: #475569;
                    text-decoration: none;
                    font-weight: 500;
                    border-bottom: 1px solid #f3f4f6;
                }

                :host-context(.dark) .mobile-link {
                    color: #94a3b8;
                    border-bottom-color: #1f2937;
                }

                .mobile-link:last-child {
                    border-bottom: none;
                }
            </style>

            <nav class="navbar">
                <div class="container">
                    <div class="nav-content">
                        <a href="#" class="logo">
                            <span>🧵</span>
                            <span>L'Atelier</span>
                        </a>

                        <div class="nav-links">
                            <a href="#collection" class="nav-link">Collection</a>
                            <a href="#contact" class="nav-link">Sur Mesure</a>
                            <a href="#contact" class="nav-link">Contact</a>
                        </div>

                        <div class="nav-actions">
                            <button class="icon-btn" onclick="toggleDarkMode()" title="Mode sombre/clair">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                            </button>

                            <button class="icon-btn cart-btn" onclick="toggleCart()" title="Panier">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                <span class="cart-badge">0</span>
                            </button>

                            <button class="mobile-menu-btn" id="mobileMenuBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mobile-menu" id="mobileMenu">
                    <a href="#collection" class="mobile-link" onclick="this.closest('.mobile-menu').classList.remove('open')">Collection</a>
                    <a href="#contact" class="mobile-link" onclick="this.closest('.mobile-menu').classList.remove('open')">Sur Mesure</a>
                    <a href="#contact" class="mobile-link" onclick="this.closest('.mobile-menu').classList.remove('open')">Contact</a>
                </div>
            </nav>

            <div style="height: 4rem;"></div>
        `;
    }

    setupEventListeners() {
        const mobileMenuBtn = this.shadowRoot.getElementById('mobileMenuBtn');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }
}

customElements.define('atelier-navbar', AtelierNavbar);