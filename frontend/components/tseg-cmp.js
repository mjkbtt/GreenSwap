class TsegCmp extends HTMLElement {
    constructor() {
        super();
        this.data = [];
        this.map = null;
        this.markers = [];
    }

    async connectedCallback() {
        
        this.render();
        
        
        try {
            await this.waitForGoogleMaps();
            this.initMap();
        } catch (e) {
            console.error("Google Maps ачаалагдсангүй:", e);
        }

        const loader = document.querySelector('tseguud-load');
        
        loader.addEventListener('data-loaded', (e) => {
            this.data = e.detail;
            console.log("TsegCmp өгөгдөл ирлээ:", this.data);
            this.addMarkers();

            const countElem = this.querySelector("#tseg-count");
            if (countElem) {
                countElem.textContent = this.data.length;
            }
        });
}

    render() {
        this.innerHTML = /*html*/`
            <style>
                body {
                    background: var(--white);
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .main-body {
                    display: flex;
                    gap: 100px;
                    padding: 20px;
                    max-width: 100%;
                    min-height: calc(100vh - 100px);
                    margin-right: 20px;
                    background: var(--white);
                }
                .body-container { 
                    flex: 0 0 60%;
                    width: 60%;
                    background: var(--white);
                }
                .tseg-stats { 
                    flex: 0 0 40%;
                    width: 40%;
                    margin-right: 20px;
                }
                article {
                    background-color: white;
                    width: 100%;
                    border-radius: 20px;
                    padding: 30px 40px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .map {
                    width: 100%;
                    height: 500px;
                    border: 2px solid #c9e6cb;
                    border-radius: 20px;
                    margin-top: 10px;
                    background: red;
                }
                .tseg-count {
                    margin-top: 10px;
                    font-size: 0.9em;
                    color: #777;
                }
                
                /* Stats box styles */
                .tseg-detail-card {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    margin-bottom: 20px;
                }
                .tseg-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 30px;
                }
                .tseg-title {
                    font-size: 24px;
                    font-weight: 600;
                    margin: 0 0 5px 0;
                }
                .tseg-subtitle {
                    color: #999;
                    font-size: 16px;
                    margin: 0;
                }
                .status-badge {
                    background: #22c55e;
                    color: white;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                }
                .info-row {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 25px;
                }
                .info-icon {
                    width: 24px;
                    height: 24px;
                    color: #22c55e;
                    flex-shrink: 0;
                }
                .info-content h3 {
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0 0 5px 0;
                }
                .info-content p {
                    font-size: 16px;
                    margin: 0;
                    color: #333;
                }
                .types-section {
                    margin-top: 30px;
                }
                .types-section h3 {
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0 0 12px 0;
                }
                .types-badges {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .type-badge {
                    background: #f3f4f6;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    color: #333;
                }
                .stats-card {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                .stats-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .stats-header svg {
                    width: 24px;
                    height: 24px;
                    color: #22c55e;
                }
                .stats-header h2 {
                    font-size: 20px;
                    font-weight: 600;
                    margin: 0;
                }
                .stats-grid {
                    display: flex;
                    gap: 15px;
                }
                .stat-box {
                    background: #F0FDF4;
                    border-radius: 12px;
                    padding: 25px 20px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    min-height: 120px;
                }
                .stat-box h3 {
                    font-size: 15px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                    line-height: 1.4;
                }
                .stat-box p {
                    font-size: 28px;
                    font-weight: 700;
                    color: #111;
                    margin: 0;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .main-body {
                        flex-direction: column;
                    }
                    .body-container,
                    .tseg-stats {
                        flex: 1;
                        width: 100%;
                    }
                }
            </style>

            <div class="main-body">
                <div class="body-container">
                    <article>
                        <h1>Дахивар авах цэгүүд</h1>
                        <p>Газрын зураг дээр цэг сонгоод дэлгэрэнгүй мэдээлэл аваарай.</p>
                        <div id="map" class="map"></div>
                        <p class="tseg-count">Нийт цэг: <span id="tseg-count">0</span></p>
                    </article>
                </div>
                <div class="tseg-stats" id="stats-container">
                    <p style="color:#777; font-size:1.1em; text-align:center;">
                        Газрын зураг дээрх цэг дээр дарж мэдээллийг үзнэ үү.
                    </p>
                </div>
            </div>
        `;
    }

    

    // Google Maps бэлэн болтол хүлээнэ
    waitForGoogleMaps() {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                console.log("Google Maps already loaded");
                resolve();
                return;
            }

            const maxWait = 15000; 
            let waited = 0;

            const check = () => {
                if (window.google && window.google.maps) {
                    console.log("Google Maps loaded after", waited, "ms");
                    resolve();
                } else {
                    waited += 100;
                    if (waited >= maxWait) {
                        reject(new Error("Google Maps API not loaded after " + maxWait + "ms"));
                    } else {
                        setTimeout(check, 100);
                    }
                }
            };

            console.log("Waiting for Google Maps to load...");
            check();
        });
    }

    initMap() {
        const mapElement = this.querySelector("#map");
        if (!mapElement) {
            console.error("#map element not found");
            return;
        }

        console.log("Initializing map...", mapElement);

        try {
            this.map = new google.maps.Map(mapElement, {
                center: { lat: 47.918, lng: 106.917 },
                zoom: 12,
            });
            console.log("Map initialized successfully!", this.map);
        } catch (error) {
            console.error("Error initializing map:", error);
        }
    }

    addMarkers() {
        if (!this.map) {
            console.error("Map not initialized, cannot add markers");
            return;
        }

        console.log("Adding", this.data.length, "markers to map");

        this.data.forEach((tseg) => {
            const marker = new google.maps.Marker({
                position: { lat: tseg.lat, lng: tseg.lng },
                map: this.map,
                title: tseg.name,
            });

            marker.addListener("click", () => this.showStats(tseg));
            this.markers.push(marker);
        });

        console.log("Added", this.markers.length, "markers");
    }

    showStats(tseg) {
        const statsBox = this.querySelector("#stats-container");
        if (!statsBox) return;

        // Төрлүүдийг массиваас авах
        const types = Array.isArray(tseg.type) ? tseg.type : tseg.type.split(',').map(t => t.trim());

        statsBox.innerHTML = /*html*/`
            <div class="tseg-detail-card">
                <div class="tseg-header">
                    <div>
                        <h1 class="tseg-title">${tseg.name}</h1>
                        <p class="tseg-subtitle">${tseg.district}</p>
                    </div>
                    <span class="status-badge">Нээлттэй</span>
                </div>

                <div class="info-row">
                    <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div class="info-content">
                        <h3>Хаяг:</h3>
                        <p>${tseg.location}</p>
                    </div>
                </div>

                <div class="info-row">
                    <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="info-content">
                        <h3>Цагийн хуваарь:</h3>
                        <p>${tseg.working_hours}</p>
                    </div>
                </div>

                <div class="info-row">
                    <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <div class="info-content">
                        <h3>Утас:</h3>
                        <p>${tseg.phone}</p>
                    </div>
                </div>

                <div class="types-section">
                    <h3>Хаягдал хүлээн авдаг төрөл:</h3>
                    <div class="types-badges">
                        ${types.map(type => `<span class="type-badge">${type}</span>`).join('')}
                    </div>
                </div>
            </div>

            <div class="stats-card">
                <div class="stats-header">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    <h2>Статистик</h2>
                </div>

                <div class="stats-grid">
                    <div class="stat-box">
                        <h3>Нийт цуглуулсан</h3>
                        <p>${tseg.total_collected_kg} кг</p>
                    </div>

                    <div class="stat-box">
                        <h3>Идэвхтэй хэрэглэгчид</h3>
                        <p>${tseg.active_users}</p>
                    </div>

                    <div class="stat-box">
                        <h3>Үнэлгээ</h3>
                        <p>${tseg.rating} / 5</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('tseg-cmp', TsegCmp);