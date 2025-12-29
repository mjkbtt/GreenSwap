class footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const footerId = this.getAttribute("footer");
    this.innerHTML = `
      <footer>
        <p>© 2025 Эко Монгол. Бүх эрх хуулиар хамгаалагдсан.</p>
        <p class="subtitle">Дахин боловсруулалтаар ирээдүйгээ хамгаалья</p>
      </footer>
      <style>
        footer {
          background: #065f46;
          color: white;
          padding: 25px;
          text-align: center;
        }

        footer p {
          margin-bottom: 5px;
          font-weight: 600;
        }

        footer .subtitle {
          color: #d1fae5;
          font-size: 14px;
          font-weight: 400;
        }
      </style>
    `
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldVal, newVal) {
  }

  adoptedCallback() {
  }

}

window.customElements.define('footer-h', footer);