class SearchWaste extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.map = null;
        this.markers = [];
        this.data = [];
        this.weight = 0;
        this.filterVal = { type: "all", location: "all" };
        this.hasSearched = false;
        this.estimatedPrice = 0;
    }

    async connectedCallback() {
        this.link = this.getAttribute("link") || "/data/tseguud.json";

       
        this.render();

        
        await this.loadData();
        this.Eventuud();

        const attrFilter = this.getAttribute("filter");
        if (attrFilter) {
            this.filterVal.type = attrFilter;
            const typeSel = this.shadowRoot.querySelector("#type");
            if (typeSel) typeSel.value = attrFilter;
            this.hasSearched = true;
        }

        // initialize map when google maps is ready
        if (window.google && window.google.maps) {
            this.initMap();
        } else {
            window.addEventListener("load", () => {
                if (window.google && window.google.maps) this.initMap();
            });
            window.addEventListener("google-maps-ready", () => {
                if (window.google && window.google.maps) this.initMap();
            });
        }

        this.renderFiltered();
    }


    async loadData() {
        try {
            const res = await fetch(this.link);
            const raw = await res.json();

            
            this.data = raw.map(item => ({
                ...item,
                type: Array.isArray(item.type) ? item.type : [item.type]
            }));

            console.log("search-waste: loaded data", this.data);
        } catch (err) {
            console.error("search-waste: failed to load data", err);
            this.data = [];
        }
    }

    
    render() {
        this.shadowRoot.innerHTML = /*html*/`
            <style>
                .body-container{
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
                .search-container {
                    grid-area: "form";
                    padding: 20px;
                    background: #fff;
                    border-radius: 12px;
                    border: 1px solid #ddd;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    box-sizing: border-box;
                }

                label { font-weight: 600; font-size: 13px; }
                select, input, button {
                    padding: 10px;
                    border-radius: 6px;
                    border: 1px solid #c9e6cb;
                    font-size: 14px;
                    box-sizing: border-box;
                    height: 40px;
                    
                    
                }

                button {
                    background: #4CAF50;
                    color: white;
                    cursor: pointer;
                    transition: 0.15s;
                }
                button:hover { background: #3e9c45; }

                .price-box { font-weight: 700; text-align: right; }

                #map {
                    grid-area: "map";
                    height: 500px;
                    margin-top: 10px;
                    border-radius: 12px;
                    border: 1px solid #ccc;
                }

                .item {
                    background: #e8fbe8;
                    padding: 10px;
                    border-left: 4px solid #2ecc71;
                    border-radius: 6px;
                    margin-bottom: 10px;
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
                <div class="search-container">
                    <label for="type">Хаягдлын төрөл</label>
                    <select id="type">
                        <option value="all">Бүгд</option>
                        <option value="plastic">Пластик</option>
                        <option value="paper">Цаас</option>
                        <option value="metal">Төмөр</option>
                    </select>

                    <label for="weight">Жин (кг)</label>
                    <input type="number" id="weight" value="0" min="0" step="0.1">

                    <label for="location">Дүүрэг</label>
                    <select id="location">
                        <option value="all">Бүгд</option>
                        <option value="Баянзүрх">Баянзүрх</option>
                        <option value="Хан-Уул">Хан-Уул</option>
                        <option value="Сонгинохайрхан">Сонгинохайрхан</option>
                    </select>

                    <button id="search-btn">Хайх</button>

                    <div class="price-box">
                        Үнийн дүн: <span id="price">0₮</span>
                    </div>

                    <div id="results"></div>
                </div>

                <div id="map"></div>
            </div>
        `;
    }

    
    Eventuud() {
        const typeSel = this.shadowRoot.querySelector("#type");
        const locSel = this.shadowRoot.querySelector("#location");
        const weightInput = this.shadowRoot.querySelector("#weight");
        const searchBtn = this.shadowRoot.querySelector("#search-btn");

        if (!typeSel || !locSel || !weightInput || !searchBtn) return;
        // ХАЙХ button дарсан үед
        searchBtn.addEventListener("click", () => {
            this.filterVal.type = typeSel.value;
            this.filterVal.location = locSel.value;
            this.weight = parseFloat(weightInput.value) || 0;
            this.hasSearched = true;
            this.renderFiltered();
        });
        // Жин өөрчлөгдөх үед
        weightInput.addEventListener("input", () => {
            this.weight = parseFloat(weightInput.value) || 0;
            if (this.hasSearched) {
                this.shadowRoot.querySelector("#price").textContent =
                    this.displayPrice(this.estimatedPrice);
            }
        });
    }

    
    filterData() {
        return this.data.filter(item => {
            const t = this.filterVal.type;
            const l = this.filterVal.location;

            const matchType = (t === "all") ||
                (Array.isArray(item.type) ? item.type.includes(t) : item.type === t);

            const matchLoc = (l === "all") || (item.district === l);

            return matchType && matchLoc;
        });
    }

    
    displayPrice(pricePerKg) {
        const total = Math.round((pricePerKg || 0) * (this.weight || 0));
        return `${total}₮`;
    }


    initMap() {
        const mapDiv = this.shadowRoot.querySelector("#map");
        if (!mapDiv) {
            console.error("search-waste: map element not found");
            return;
        }

        if (!window.google || !window.google.maps) {
            console.error("search-waste: google.maps not available yet");
            return;
        }

        this.map = new google.maps.Map(mapDiv, {
            center: { lat: 47.918, lng: 106.918 },
            zoom: 12,
        });

        // show all points initially on the map
        this.updateMap(this.data);
    }

    updateMap(points) {
        if (!this.map) {
            if (window.google && window.google.maps) {
                this.initMap();
            } else {
                console.warn("search-waste: map not ready yet");
                return;
            }
        }

        // remove old markers
        this.markers.forEach(m => m.setMap(null));
        this.markers = [];

        let totalPricePerKg = 0;
        let countMatching = 0;

        points.forEach(p => {
            // check whether this point matches the current type filter
            const typeMatches = this.filterVal.type === "all" ||
                (Array.isArray(p.type) ? p.type.includes(this.filterVal.type) : p.type === this.filterVal.type);

            // only add marker if it matches both type & location filters
            const locMatches = this.filterVal.location === "all" || p.district === this.filterVal.location;
            if (!(typeMatches && locMatches)) return;

            // create marker
            const marker = new google.maps.Marker({
                position: { lat: p.lat, lng: p.lng },
                map: this.map,
                title: p.name
            });
            this.markers.push(marker);

            if (typeof p.price_per_kg === "number") {
                totalPricePerKg += p.price_per_kg;
                countMatching++;
            }
        });

        // estimate average price per kg among matching points
        this.estimatedPrice = countMatching > 0 ? (totalPricePerKg / countMatching) : 0;

        // update price display if user already searched
        if (this.hasSearched) {
            const priceEl = this.shadowRoot.querySelector("#price");
            if (priceEl) priceEl.textContent = this.displayPrice(this.estimatedPrice);
        }
    }

    renderFiltered() {
        const resultsDiv = this.shadowRoot.querySelector("#results");
        if (!resultsDiv) return;

        const filtered = this.filterData();

        if (!this.hasSearched) {
            resultsDiv.innerHTML = "";
            // show all points on map initially
            this.updateMap(this.data);
            return;
        }

        resultsDiv.innerHTML = filtered.length > 0
            ? filtered.map(i => `
                <div class="item">
                    <strong>${i.name}</strong><br>
                    Дүүрэг: ${i.district || i.location || "-"}<br>
                    Төрөл: ${Array.isArray(i.type) ? i.type.join(", ") : i.type}
                </div>
            `).join("")
            : `<p>Илэрц олдсонгүй.</p>`;

        // update markers for the filtered items
        this.updateMap(filtered);
    }
}

customElements.define("search-waste", SearchWaste);
