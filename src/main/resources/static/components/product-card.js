class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.product = null;
    }

    static get observedAttributes() {
        return ['product-id', 'product-name', 'product-price', 'product-image', 'product-category', 'product-description'];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        const id = this.getAttribute('product-id');
        const name = this.getAttribute('product-name') || 'Produit';
        const price = this.getAttribute('product-price') || '0';
        const image = this.getAttribute('product-image') || 'https://static.photos/white/640x360/1';
        const category = this.getAttribute('product-category') || 'Autre';
        const description = this.getAttribute('product-description') || '';

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

                .card {
                    background: white;
                    border-radius: 1rem;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border: 1px solid #f3f4f6;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                :host-context(.dark) .card {
                    background: #1e293b;
                    border-color: #374151;
                }

                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }

                .image-container {
                    position: relative;
                    height: 16rem;
                    overflow: hidden;
                    background: #f3f4f6;
                }

                :host-context(.dark) .image-container {
                    background: #374151;
                }

                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .card:hover .image-container img {
                    transform: scale(1.05);
                }

                .price-tag {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(255, 255, 255, 0.95);
                    padding: 0.5rem 1rem;
                    border-radius: 9999px;
                    font-weight: 700;
                    color: #db2777;
                    font-size: 0.875rem;
                    backdrop-filter: blur(4px);
                }

                .content {
                    padding: 1.5rem;
                }

                .category {
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #db2777;
                    margin-bottom: 0.5rem;
                }

                .title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }

                :host-context(.dark) .title {
                    color: #f9fafb;
                }

                .description {
                    font-size: 0.875rem;
                    color: #6b7280;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                :host-context(.dark) .description {
                    color: #9ca3af;
                }

                .footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .price {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #111827;
                }

                :host-context(.dark) .price {
                    color: #f9fafb;
                }

                .add-btn {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 9999px;
                    background: #fce7ef;
                    border: none;
                    color: #db2777;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                :host-context(.dark) .add-btn {
                    background: rgba(219, 39, 119, 0.2);
                }

                .add-btn:hover {
                    background: #db2777;
                    color: white;
                    transform: scale(1.1);
                }
            </style>

            <article class="card" data-id="${id}">
                <div class="image-container">
                    <img src="${image}" alt="${name}">
                    <span class="price-tag">${price} €</span>
                </div>
                <div class="content">
                    <div class="category">${category}</div>
                    <h3 class="title">${name}</h3>
                    <p class="description">${description}</p>
                    <div class="footer">
                        <span class="price">${price} €</span>
                        <button class="add-btn" aria-label="Ajouter au panier">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    setupEventListeners() {
        const card = this.shadowRoot.querySelector('.card');
        const addBtn = this.shadowRoot.querySelector('.add-btn');

        card.addEventListener('click', (e) => {
            if (e.target !== addBtn && !addBtn.contains(e.target)) {
                // Dispatch custom event for modal opening
                this.dispatchEvent(new CustomEvent('product-click', {
                    detail: { productId: this.getAttribute('product-id') },
                    bubbles: true,
                    composed: true
                }));
            }
        });

        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('add-to-cart', {
                detail: { productId: this.getAttribute('product-id') },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('product-card', ProductCard);