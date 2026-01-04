// frontend/pages/CenterProfilePage.js
// Center Profile Page (API based)

export class CenterProfilePage {
  async render(container) {
    container.innerHTML = `<p style="padding:40px">⏳ Ачааллаж байна...</p>`;

    try {
      // 1️⃣ LocalStorage-с center авах
      const storedCenter = JSON.parse(localStorage.getItem('center'));
      if (!storedCenter?.id) {
        window.location.hash = '#/center-login';
        return;
      }

      // 2️⃣ API-аас бодит data татах
      const res = await fetch(`/api/center/${storedCenter.id}`);
      if (!res.ok) throw new Error('Цэгийн мэдээлэл олдсонгүй');

      const center = await res.json();

      // 3️⃣ Render
      container.innerHTML = /*html*/`
        <div class="profile-page">
          <div class="profile-card">

            <!-- Header -->
            <div class="profile-header">
              <div class="header-left">
                <div class="avatar">🏢</div>
                <div>
                  <h2>${center.name}</h2>
                  <p>${center.email}</p>
                  <span class="badge">Дүүрэг: ${center.district}</span>
                </div>
              </div>

              <button class="logout-btn" id="logoutBtn">
                Гарах
              </button>
            </div>

            <!-- Stats -->
            <div class="stats-grid">
              <div class="stat">
                <h3>${center.total_collected_kg ?? 0} кг</h3>
                <p>Нийт цуглуулсан</p>
              </div>
              <div class="stat">
                <h3>${center.active_users ?? 0}</h3>
                <p>Идэвхтэй хэрэглэгч</p>
              </div>
              <div class="stat">
                <h3>${center.rating ?? 5.0}</h3>
                <p>Үнэлгээ</p>
              </div>
            </div>

            <!-- Info -->
            <div class="info-section">
              <h3>ℹ️ Цэгийн мэдээлэл</h3>
              <ul>
                <li><strong>Имэйл:</strong> ${center.email}</li>
                <li><strong>Дүүрэг:</strong> ${center.district}</li>
                <li><strong>Бүртгэгдсэн:</strong> ${new Date(center.created_at).toLocaleDateString()}</li>
              </ul>
            </div>

          </div>
        </div>

        ${this.styles()}
      `;

      this.addEvents(container);

    } catch (err) {
      console.error(err);
      container.innerHTML = `
        <p style="color:red; padding:40px">
          ⚠️ Алдаа гарлаа
        </p>
      `;
    }
  }

  addEvents(container) {
    container.querySelector('#logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('center');
      window.location.hash = '#/center-login';
    });
  }

  styles() {
    return /*css*/`
      <style>
        .profile-page {
          min-height: 100vh;
          background: #f4fff6;
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .profile-card {
          background: white;
          width: 100%;
          max-width: 900px;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .header-left {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .avatar {
          width: 70px;
          height: 70px;
          background: #4CAF50;
          color: white;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }

        .profile-header h2 {
          margin: 0;
          font-size: 24px;
        }

        .profile-header p {
          margin: 4px 0;
          color: #666;
        }

        .badge {
          font-size: 12px;
          background: #e8f5e9;
          padding: 4px 10px;
          border-radius: 20px;
          color: #2e7d32;
        }

        .logout-btn {
          background: #ff5252;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: #e53935;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat {
          background: #f0fdf4;
          padding: 24px;
          border-radius: 18px;
          text-align: center;
        }

        .stat h3 {
          margin: 0;
          font-size: 26px;
          color: #2e7d32;
        }

        .stat p {
          margin-top: 6px;
          font-size: 14px;
          color: #555;
        }

        .info-section h3 {
          margin-bottom: 12px;
        }

        .info-section ul {
          list-style: none;
          padding: 0;
        }

        .info-section li {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
      </style>
    `;
  }
}

export default CenterProfilePage;
