// frontend/components/tseg-info.js
class TsegInfo extends HTMLElement {
  constructor() {
    super();
    this._data = null;
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  render() {
    const styles = /*html*/`
      <style>
        * {
          box-sizing: border-box;
        }
        .tseg-detail-card, .stats-card {
          background: var(--white); border-radius: 20px; padding: 30px; margin-right: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; border: 1px solid var(--gray-lighter); color: var(--black);
        }
        .tseg-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        .tseg-title { font-size: 24px; font-weight: 600; margin: 0 0 5px 0; }
        .tseg-subtitle { color: var(--black); font-size: 16px; margin: 0; }
        .status-badge { background: #22c55e; color: var(--white); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; }
        .info-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 25px; }
        .info-icon { width: 24px; height: 24px; color: #22c55e; flex-shrink: 0; }
        .info-content h3 { font-size: 14px; font-weight: 600; margin: 0 0 5px 0; }
        .info-content p { font-size: 16px; margin: 0; color: var(--black); }
        .types-section { margin-top: 30px; }
        .types-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .type-badge { background: #f3f4f6; padding: 8px 16px; border-radius: 20px; font-size: 14px; color: #333; }
        .stats-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .stats-header svg { width: 24px; height: 24px; color: #22c55e; }
        .stats-grid { display: flex; gap: 15px; }
        .stat-box { background: #F0FDF4; border-radius: 12px; padding: 25px 20px; flex: 1; display: flex; flex-direction: column; gap: 15px; }
        .stat-box h3 { font-size: 15px; font-weight: 600; color: #333; margin: 0; }
        .stat-box p { font-size: 28px; font-weight: 700; color: #111; margin: 0; }
      </style>
    `;

    if (!this._data) {
      this.innerHTML = styles + `<p style="color:#777; text-align:center; padding: 40px;">Газрын зураг дээрх цэг дээр дарж мэдээллийг үзнэ үү.</p>`;
      return;
    }

    const t = this._data;
    const types = Array.isArray(t.type) ? t.type : (t.type || "").split(',').map(x => x.trim());

    this.innerHTML = styles + /*html*/`
      <div class="tseg-detail-card">
        <div class="tseg-header">
          <div>
            <h1 class="tseg-title">${t.name}</h1>
            <p class="tseg-subtitle">${t.district ?? '-'}</p>
          </div>
          <span class="status-badge">Нээлттэй</span>
        </div>

        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <div class="info-content"><h3>Хаяг:</h3><p>${t.location ?? t.address ?? '-'}</p></div>
        </div>

        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div class="info-content"><h3>Цагийн хуваарь:</h3><p>${t.working_hours ?? '-'}</p></div>
        </div>

        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <div class="info-content"><h3>Утас:</h3><p>${t.phone ?? '-'}</p></div>
        </div>

        <div class="types-section">
          <h3>Хаягдал хүлээн авдаг төрөл:</h3>
          <div class="types-badges">${types.map(type => `<span class="type-badge">${type}</span>`).join('')}</div>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-header">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          <h2>Статистик</h2>
        </div>
        <div class="stats-grid">
          <div class="stat-box"><h3>Нийт цуглуулсан</h3><p>${t.total_collected_kg ?? 0} кг</p></div>
          <div class="stat-box"><h3>Идэвхтэй хэрэглэгчид</h3><p>${t.active_users ?? 0}</p></div>
          <div class="stat-box"><h3>Үнэлгээ</h3><p>${t.rating ?? 0} / 5</p></div>
        </div>
      </div>
    `;
  }
}

customElements.define('tseg-info', TsegInfo);