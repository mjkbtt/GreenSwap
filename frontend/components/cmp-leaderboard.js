class CmpLeaderboard extends HTMLElement {
  constructor() {
    super();
    this.leaderboardData = [];
    this.isLoading = false;
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  addEvents() {
    const closeBtn = this.querySelector(".close-popup");
    const popup = this.querySelector(".trophy-popup");
    
    closeBtn.addEventListener("click", () => {
      this.close();
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        this.close();
      }
    });
  }

  // Popup нээх
  open() {
    const popup = this.querySelector(".trophy-popup");
    popup.classList.add("active");
    this.loadLeaderboard();
  }

  // Popup хаах
  close() {
    const popup = this.querySelector(".trophy-popup");
    popup.classList.remove("active");
  }

  // API-аас өгөгдөл татах
  async loadLeaderboard() {
    const container = this.querySelector('.achievements-list');
    
    if (this.isLoading) return;
    this.isLoading = true;
    
    // Loading харуулах
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #999;">
          <div style="font-size: 48px; margin-bottom: 15px;">⏳</div>
          <p>Өгөгдөл татаж байна...</p>
        </div>
      `;
    }

    try {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) throw new Error('Leaderboard load failed');

      const data = await res.json();
      this.leaderboardData = data;
      this.renderLeaderboard(data);
    } catch (err) {
      console.error('Leaderboard error:', err);
      this.showError();
    } finally {
      this.isLoading = false;
    }
  }

  // Leaderboard жагсаалт харуулах
  renderLeaderboard(list) {
    const container = this.querySelector('.achievements-list');
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #999;">
          <div style="font-size: 48px; margin-bottom: 15px;">📊</div>
          <p>Одоогоор мэдээлэл алга</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map((u, index) => {
      const rank = index + 1;

      const medal =
        rank === 1 ? '🥇' :
        rank === 2 ? '🥈' :
        rank === 3 ? '🥉' : rank;

      const medalClass =
        rank === 1 ? 'gold' :
        rank === 2 ? 'silver' :
        rank === 3 ? 'bronze' : '';

      return `
        <div class="achievement-item ${medalClass}">
          <div class="achievement-left">
            ${
              rank <= 3
                ? `<div class="achievement-icon">${medal}</div>`
                : `<div class="achievement-rank">${medal}</div>`
            }
            <div class="achievement-info">
              <h3>${u.username || 'Хэрэглэгч'}</h3>
              <p>${u.count ?? 0} хаягдал тушаасан</p>
            </div>
          </div>
          <div class="achievement-score">
            <div class="points">${u.points ?? 0}</div>
            <div class="label">оноо</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Алдааны мессеж
  showError() {
    const container = this.querySelector('.achievements-list');
    if (!container) return;

    container.innerHTML = /*html*/ `
      <div style="text-align: center; padding: 40px 20px; color: #999;">
        <div style="font-size: 48px; margin-bottom: 15px;">😔</div>
        <p style="color: #ff5252; margin-bottom: 15px;">⚠️ Холболтын алдаа гарлаа</p>
        <button 
          class="retry-btn"
          style="padding: 10px 20px; background: var(--green1); color: white; 
                 border: none; border-radius: 8px; cursor: pointer; font-size: 14px;"
          onclick="this.closest('cmp-leaderboard').loadLeaderboard()">
          🔄 Дахин оролдох
        </button>
      </div>
    `;
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="trophy-popup">
        <div class="popup-content">
          <button class="close-popup">×</button>
          
          <div class="popup-header">
            <img src="zurags/trophy2.webp" alt="Trophy">
            <div class="popup-header-text">
              <h2>Тэргүүлэгчдийн самбар</h2>
              <p>Дахин боловсруулалтад хамгийн их хувь нэмэр оруулсан хэрэглэгчид</p>
            </div>
          </div>

          <div class="achievements-list">
            <div style="text-align: center; padding: 40px 20px; color: #999;">
              <div style="font-size: 48px; margin-bottom: 15px;">🏆</div>
              <p>Trophy дарж өгөгдөл харна уу</p>
            </div>
          </div>

          <div class="popup-footer">
            <div class="popup-footer-icon">💡</div>
            <div class="popup-footer-text">Санамж: Хаягдал тушаах бүрт та оноо цуглуулна</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("cmp-leaderboard", CmpLeaderboard);