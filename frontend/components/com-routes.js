class ComRoutes extends HTMLElement {

    connectedCallback() {
        const router = document.querySelector("com-router");
        if (!router) {
            console.error("com-router not found");
            return;
        }

        this.querySelectorAll("[data-zam]").forEach(routeEl => {
            const path = routeEl.getAttribute("data-zam");
            const component = routeEl.getAttribute("data-com");

            if (!path || !component) return;

            router.registerRoute(path, component);
        });

        console.log("All routes registered");
    }
}

customElements.define("com-routes", ComRoutes);
