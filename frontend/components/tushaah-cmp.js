class TushaahCmp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });  // ← заавал хэрэгтэй

        
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = /*html*/`
            <style>
                .body-container {
                    display: grid;
                    grid-template-columns: 0.4fr 0.6fr;
                    grid-template-areas:"form map";
                    gap: 50px;
                    background-color: #f9fdf9;
                    border-radius: 12px;
                    padding: 20px;
                    justify-content: center;
                    align-items: stretch;
                    }

                
                @media (max-width: 1024px) {
                    .body-container {
                        grid-template-columns: 1fr;
                        grid-area: "map"
                                    "form";
                        gap: 20px;
                    }
                    .map {
                        width: 100%;
                        height: 400px;
                    }
                }
            </style>
            <div class="body-container">
                <search-waste link="./data/data.json"></search-waste>
                <div id="map" class="map"></div>
                
            </div>
    `;
    this.setupMap();
}


    setupMap() {
        const checkMaps = () => {
            if (window.google && window.google.maps) {
                // Map element олж байгаа эсэх шалгана
                const mapEl = this.shadowRoot.querySelector('#map');
                const searchWaste = this.querySelector('search-waste');
                
                if (mapEl && searchWaste) {
                    console.log("Map element found, initializing...");
                    // SearchWaste компонентын initMap дуудна
                    if (searchWaste.initMap) {
                        searchWaste.initMap();
                    }
                }
            }
        };
        checkMaps();
        document.addEventListener("google-maps-ready", () => {
            this.setupMap();
        });

    }
    
    initializeSearchWaste() {
        const searchWaste = this.querySelector('search-waste');
        if (searchWaste && searchWaste.initMap) {
            // SearchWaste дээрх initMap функц дахин дуудна
            searchWaste.initMap();
        }
    }

    disconnectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('tushaah-cmp', TushaahCmp);