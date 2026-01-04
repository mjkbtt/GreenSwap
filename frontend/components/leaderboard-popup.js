class LeaderboardPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = [];
  }

  // Popup-ыг гаднаас нээх функц
  open() {
    this.shadowRoot.querySelector('.trophy-popup').classList.add('active');
    this.loadLeaderboard();
  }

  close() {
    this.shadowRoot.querySelector('.trophy-popup').classList.remove('active');
  }

  async loadLeaderboard() {
    const container = this.shadowRoot.querySelector('.achievements-list');
    container.innerHTML = `<p class="status-text">⏳ Ачааллаж байна...</p>`;

    try {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) throw new Error();
      this.data = await res.json();
      this.renderList();
    } catch (err) {
      container.innerHTML = `<p class="status-text error">⚠️ Холболтын алдаа гарлаа</p>`;
    }
  }

  renderList() {
    const container = this.shadowRoot.querySelector('.achievements-list');
    if (!this.data.length) {
      container.innerHTML = `<p class="status-text">Мэдээлэл алга</p>`;
      return;
    }

    container.innerHTML = this.data.map((user, index) => {
      const rank = index + 1;
      const config = {
        1: { medal: '🥇', class: 'gold' },
        2: { medal: '🥈', class: 'silver' },
        3: { medal: '🥉', class: 'bronze' }
      }[rank] || { medal: rank, class: '' };

      return `
        <div class="achievement-item ${config.class}">
          <div class="achievement-left">
            <div class="${rank <= 3 ? 'achievement-icon' : 'achievement-rank'}">${config.medal}</div>
            <div class="achievement-info">
              <h3>${user.username}</h3>
              <p>${user.count || 0} хаягдал тушаасан</p>
            </div>
          </div>
          <div class="achievement-score">
            <div class="points">${user.points || 0}</div>
            <div class="label">оноо</div>
          </div>
        </div>
      `;
    }).join('');
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.close-popup').onclick = () => this.close();
    this.shadowRoot.querySelector('.trophy-popup').onclick = (e) => {
      if (e.target.classList.contains('trophy-popup')) this.close();
    };
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        .trophy-popup {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.6); display: flex; align-items: center;
          justify-content: center; z-index: 3000; opacity: 0; visibility: hidden; transition: 0.3s;
        }
        .trophy-popup.active { opacity: 1; visibility: visible; }
        
        .popup-content {
          background: var(--white, white); border-radius: 20px; padding: 30px;
          max-width: 450px; width: 90%; position: relative;
          transform: translateY(20px); transition: 0.3s;
        }
        .trophy-popup.active .popup-content { transform: translateY(0); }

        .close-popup {
          position: absolute; top: 15px; right: 15px; border: none;
          background: #eee; width: 30px; height: 30px; border-radius: 50%;
          cursor: pointer; font-size: 20px;
        }

        .popup-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .popup-header img { width: 45px; }
        .popup-header h2 { margin: 0; font-size: 20px; color: #333; }
        .popup-header p { margin: 0; font-size: 13px; color: #777; }

        .achievements-list { display: flex; flex-direction: column; gap: 10px; max-height: 400px; overflow-y: auto; padding-right: 5px; }
        
        .achievement-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px; background: #f9f9f9; border-radius: 12px; border: 2px solid transparent;
        }
        .achievement-item.gold { background: #fffbeb; border-color: #fcd34d; }
        .achievement-item.silver { background: #f3f4f6; border-color: #d1d5db; }
        .achievement-item.bronze { background: #fff7ed; border-color: #fdba74; }

        .achievement-left { display: flex; align-items: center; gap: 12px; }
        .achievement-icon { font-size: 30px; }
        .achievement-rank { width: 30px; text-align: center; font-weight: bold; color: #999; }
        .achievement-info h3 { margin: 0; font-size: 16px; }
        .achievement-info p { margin: 0; font-size: 12px; color: #888; }
        
        .points { font-size: 20px; font-weight: bold; color: #10b981; text-align: right; }
        .label { font-size: 11px; color: #10b981; text-align: right; }
        
        .status-text { text-align: center; padding: 20px; color: #666; }
        .status-text.error { color: #ef4444; }

        /* Dark mode compatibility */
        :host-context([data-theme="dark"]) .popup-content { background: #222; color: white; }
        :host-context([data-theme="dark"]) .achievement-item { background: #333; }
        :host-context([data-theme="dark"]) .popup-header h2 { color: white; }
      </style>

      <div class="trophy-popup">
        <div class="popup-content">
          <button class="close-popup">×</button>
          <div class="popup-header">
            <img src="zurags/trophy2.png">
            <div>
              <h2>Тэргүүлэгчид</h2>
              <p>Хамгийн их хувь нэмэр оруулсан хэрэглэгчид</p>
            </div>
          </div>
          <div class="achievements-list"></div>
        </div>
      </div>
    `;
  }
}
customElements.define("leaderboard-popup", LeaderboardPopup);