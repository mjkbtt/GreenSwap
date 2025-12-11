class GsImpactCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const too = this.getAttribute('ttl') || '...';
        const inf = this.getAttribute('inf') || '...';
        const img = this.getAttribute('img') || '...';
        const extraClass = this.getAttribute('class') || '';
        this.innerHTML = `
            <article class="impact-card">
                <img src="${img}" alt="Impact icon">
                <h3>${too}</h3>
                <p>${inf}</p>
            </article>`;
        }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('gs-impact-card', GsImpactCard);