class GsAdCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const ner = this.getAttribute('ttl') || '...';
        const img = this.getAttribute('img') || '...';
        const extraClass = this.getAttribute('class') || '';
        this.innerHTML = `
            <article class="card ${extraClass}">
                <h3>${ner}</h3>
                <img src="zurags/${img}" alt="">
            </article>`;
        }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('gs-ad-card', GsAdCard);