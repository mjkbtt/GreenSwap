class App extends HTMLElement {
  constructor() {
    super();
    this.contentDiv = document.getElementById('app-content');
    this.currentPage = null;
  
  }

  connectedCallback() {
  
  }

  disconnectedCallback() {
    
  }

  attributeChangedCallback(name, oldVal, newVal) {
  
  }

  adoptedCallback() {
  
  }

}

window.customElements.define('app', App);