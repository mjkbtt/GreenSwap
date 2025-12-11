class ComRouter extends HTMLElement {
    constructor() {
        super();
        this.routes = new Map();
    }

    registerRoute(path, componentName) {
        this.routes.set(path, componentName);
        console.log(`Route registered: ${path} -> ${componentName}`);
    }

    connectedCallback() {
        window.addEventListener('hashchange', () => this.renderRoute());
        window.addEventListener('DOMContentLoaded', () => this.renderRoute());
    }

    renderRoute() {
        const hash = window.location.hash.slice(1);
        const target = document.getElementById('content');
        const landing = document.getElementById('landing-content');

        if (!target) {
            console.error("Element with id='content' not found");
            return;
        }

        
        target.innerHTML = "";

        // Landing page nuuh 
        if (!hash || hash === "/" || hash === "") {
            landing?.classList.remove("hidden");
            return;
        }

        if (this.routes.has(hash)) {

            const component = this.routes.get(hash);

            // Hide landing
            landing?.classList.add("hidden");

            // Render component dynamically
            target.innerHTML = `<${component}></${component}>`;
            return;
        }

        target.innerHTML = "<h2>404 - Page Not Found</h2>";
    }
}

customElements.define("com-router", ComRouter);
