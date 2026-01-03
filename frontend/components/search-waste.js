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
        this.link = this.getAttribute("link") || "/api/tseguud";

        this.render();
        await this.loadData();
        this.bindEvents();

        const attrFilter = this.getAttribute("filter");
        if (attrFilter) {
            this.filterVal.type = attrFilter;
            const typeSel = this.shadowRoot.querySelector("#type");
            if (typeSel) typeSel.value = attrFilter;
            this.hasSearched = true;
        }

        //  GOOGLE MAPS хүлээх
        await this.waitForGoogleMaps();
        this.initMap();

        this.renderFiltered();
    }

    waitForGoogleMaps() {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve();
                return;
            }

            const maxWait = 15000;
            let waited = 0;

            const check = () => {
                if (window.google && window.google.maps) {
                    resolve();
                } else {
                    waited += 100;
                    if (waited >= maxWait) {
                        reject(new Error("Google Maps API not loaded"));
                    } else {
                        setTimeout(check, 100);
                    }
                }
            };
            check();
        });
    }

    async loadData() {
        try {
            const res = await fetch('/api/tseguud');
            const raw = await res.json();

            this.data = raw.map(item => ({
                ...item,
                type: Array.isArray(item.type) ? item.type : [item.type]
            }));

            console.log("search-waste loaded:", this.data);
        } catch (e) {
            console.error("search-waste data error:", e);
            this.data = [];
        }
    }

    initMap() {
        const mapDiv = this.shadowRoot.querySelector("#map");
        if (!mapDiv) return;

        this.map = new google.maps.Map(mapDiv, {
            center: { lat: 47.918, lng: 106.918 },
            zoom: 12,
        });

        setTimeout(() => {
            google.maps.event.trigger(this.map, "resize");
            this.map.setCenter({ lat: 47.918, lng: 106.918 });
        }, 0);

        this.updateMap(this.data);
    }

    updateMap(points) {
        if (!this.map) return;

        this.markers.forEach(m => m.setMap(null));
        this.markers = [];

        let totalPrice = 0;
        let count = 0;
        const bounds = new google.maps.LatLngBounds();

        points.forEach(p => {
            if (isNaN(p.lat) || isNaN(p.lng)) return;
            const typeMatch =
                this.filterVal.type === "all" ||
                p.type.includes(this.filterVal.type);

            const locMatch =
                this.filterVal.location === "all" ||
                p.district === this.filterVal.location;

            if (!(typeMatch && locMatch)) return;

            const marker = new google.maps.Marker({
                position: { lat: p.lat, lng: p.lng },
                map: this.map,
                title: p.name
            });

            this.markers.push(marker);
            bounds.extend(marker.getPosition());

            if (typeof p.price_per_kg === "number") {
                totalPrice += p.price_per_kg;
                count++;
            }
        });

        if (this.markers.length > 0) {
            this.map.fitBounds(bounds);
        }

        this.estimatedPrice = count > 0 ? totalPrice / count : 0;

        if (this.hasSearched) {
            const priceEl = this.shadowRoot.querySelector("#price");
            if (priceEl) priceEl.textContent = this.displayPrice(this.estimatedPrice);
        }
    }

    filterData() {
        return this.data.filter(item => {
            const t = this.filterVal.type;
            const l = this.filterVal.location;

            const matchType = t === "all" || item.type.includes(t);
            const matchLoc = l === "all" || item.district === l;

            return matchType && matchLoc;
        });
    }

    displayPrice(pricePerKg) {
        const total = Math.round((pricePerKg || 0) * (this.weight || 0));
        return `${total}₮`;
    }

    renderFiltered() {
        const results = this.shadowRoot.querySelector("#results");
        if (!results) return;

        const filtered = this.filterData();

        if (!this.hasSearched) {
            results.innerHTML = "";
            this.updateMap(this.data);
            return;
        }

        results.innerHTML = filtered.length
            ? filtered.map(i => `
                <div class="item">
                    <strong>${i.name}</strong><br>
                    Дүүрэг: ${i.district}<br>
                    Төрөл: ${i.type.join(", ")}
                </div>
            `).join("")
            : `<p>Илэрц олдсонгүй.</p>`;

        this.updateMap(filtered);
    }

    bindEvents() {
        const typeSel = this.shadowRoot.querySelector("#type");
        const locSel = this.shadowRoot.querySelector("#location");
        const weightInput = this.shadowRoot.querySelector("#weight");
        const searchBtn = this.shadowRoot.querySelector("#search-btn");

        searchBtn.addEventListener("click", () => {
            this.filterVal.type = typeSel.value;
            this.filterVal.location = locSel.value;
            this.weight = parseFloat(weightInput.value) || 0;
            this.hasSearched = true;
            this.renderFiltered();
        });

        weightInput.addEventListener("input", () => {
            this.weight = parseFloat(weightInput.value) || 0;
            if (this.hasSearched) {
                const priceEl = this.shadowRoot.querySelector("#price");
                if (priceEl) priceEl.textContent =
                    this.displayPrice(this.estimatedPrice);
            }
        });
    }
    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            .body-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
                background: var(--background);
                padding: 20px;
                border-radius: 12px;
            }
            .action-buttons {
                display: flex;
                justify-content: center;
                width: 100%;
                gap: 50px;
                margin-top:10px;
            }

            .action-btn {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: 250px; 
                height: 10px;
                padding: 20px 0; 
                gap:10px;
                border: 1px solid var(--green-light); 
                border-radius: 8px; 
                background-color: var(--white);
                text-decoration: none;
                color: var(--green1);
                font-weight: 500;
                transition: box-shadow 0.3s;
                
            }
            .action-btn img{
                width: 25px;
                height: 25px;

            }
            .action-btn:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .tushaah-map{
                display: grid;
                grid-template-columns: 0.4fr 0.6fr;
                padding: 20px;
                border-radius: 12px;
                gap: 20px;
            }
            .search-container {
                background: var(--white);
                padding: 20px;
                border-radius: 12px;
                border: 1px solid var(--gray-lighter);
                display: flex;
                flex-direction: column;
                gap: 12px;
                color: var(--black);
            }
            label { font-weight: 600; font-size: 13px; }
            select, button {
                padding: 10px;
                border-radius: 6px;
                border: 1px solid var(--green-light);
                height: 40px;
                background: var(--white);
                color: var(--black);
            }
            input{
                padding: 10px;
                border-radius: 6px;
                border: 1px solid var(--green-light);
                height: 20px;
                background: var(--white);
                color: var(--black);
            }
            button {
                background: var(--green2);
                color: white;
                cursor: pointer;
            }
            #map {
                height: 500px;
                border-radius: 12px;
                border: 1px solid var(--gray-lighter);
            }
            .item {
                background: #e8fbe8;
                padding: 10px;
                border-left: 4px solid #2ecc71;
                border-radius: 6px;
                margin-bottom: 8px;
            }
         
            @media (max-width: 768px) {
                .body-container {
                    padding: 10px;
                }
                .action-buttons {
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }
                .action-btn {
                    width: 100%;
                    max-width: 300px;
                }

                .tushaah-map {
                    grid-template-columns: 1fr;
                }

                .search-container {
                    padding: 15px;
                }

                #map {
                    height: 400px;
                }
        }
            
        </style>

        <div class="body-container">
            <div class="action-btns">
                    <section class="action-buttons ">
                        <a href="#/tseguud" class="action-btn" data-link>
                            <img src="zurags/map.png" alt="">
                            <span>Цэгүүд</span>
                        </a>
                        <a href="#/tushaah" class="action-btn" data-link>
                            <img src="zurags/recycle-2.png" alt="">
                            <span>Тушаах</span>
                        </a>
                        <a href="#/angilah" class="action-btn" data-link>
                            <img src="zurags/waste.png" alt="">
                            <span>Хаягдлыг ангилах</span>
                        </a>
                    </section>
                </div>
            <div class="tushaah-map">
                <div class="search-container">
                    <label>Хаягдлын төрөл</label>
                    <select id="type">
                        <option value="all">Бүгд</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Paper">Paper</option>
                        <option value="Metal">Metal</option>
                    </select>

                    <label>Жин (кг)</label>
                    <input id="weight" type="number" value="0" min="0">

                    <label>Дүүрэг</label>
                    <select id="location">
                        <option value="all">Бүгд</option>
                        <option value="СБД">СБД</option>
                        <option value="БГД">БГД</option>
                    </select>

                    <button id="search-btn">Хайх</button>

                    <div>Үнийн дүн: <strong id="price">0₮</strong></div>
                    <div id="results"></div>
                </div>

                <div id="map"></div>
            </div>
        </div>
        `;
    }
}

customElements.define("search-waste", SearchWaste);
