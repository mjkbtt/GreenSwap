// frontend/pages/UserProfilePage.js
export class UserProfilePage {
  async render(container) {
    container.innerHTML = `<div style="text-align:center; padding: 50px;">⏳ Ачааллаж байна...</div>`;

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser?.id) {
        window.location.hash = '#/login';
        return;
      }

      // API дуудалт
      const res = await fetch(`/api/user/${storedUser.id}`);
      if (!res.ok) throw new Error('Хэрэглэгчийн мэдээлэл татаж чадсангүй');

      const user = await res.json();

      container.innerHTML = /*html*/`
        <div class="profile-page">
          <div class="profile-card">

            <div class="profile-header">
              <div class="header-left">
                <div class="avatar-circle">👤</div>
                <div class="title-section">
                  <h2>${user.username}</h2>
                  <p class="subtitle">${user.email}</p>
                  <span class="user-badge">Хэрэглэгч</span>
                </div>
              </div>
              <button class="logout-btn" id="logoutBtn">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Гарах
              </button>
            </div>

            <div class="stats-grid">
              <div class="stat-box main-stat">
                <div class="stat-content">
                  <p class="stat-label">Миний ногоон оноо</p>
                  <h3 class="stat-value">${user.green_points || 0} <span>оноо</span></h3>
                </div>
                <div class="stat-icon">🍃</div>
              </div>
              
              <div class="stat-box">
                <p class="stat-label">Тушаасан хаягдал</p>
                <h3 class="stat-value">0 <span>кг</span></h3>
              </div>

              <div class="stat-box">
                <p class="stat-label">Орсон дэлгүүр</p>
                <h3 class="stat-value">0</h3>
              </div>
            </div>

            <div class="activity-section">
              <div class="section-header">
                <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3>Миний үйл ажиллагаа</h3>
              </div>
              
              <div class="history-list">
                <div class="empty-state">
                  <p>Одоогоор түүх байхгүй байна.</p>
                  <small>Та дахивар тушааж ногоон оноогоо цуглуулаарай.</small>
                </div>
              </div>
            </div>

          </div>
        </div>
        ${this.styles()}
      `;

      this.addEvents(container);

    } catch (err) {
      console.error(err);
      container.innerHTML = `
        <div style="text-align:center; padding: 50px; color: #ff5252;">
          <p>⚠️ Мэдээлэл татахад алдаа гарлаа</p>
          <button onclick="location.reload()" class="logout-btn" style="margin: 0 auto;">Дахин оролдох</button>
        </div>
      `;
    }
  }

  addEvents(container) {
    const logoutBtn = container.querySelector('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        window.location.hash = '#/login';
      });
    }
  }

  styles() {
    return /*css*/`
      <style>
        .profile-page {
          min-height: 100vh;
          background: #f9fff9;
          display: flex;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'Inter', sans-serif;
        }

        .profile-card {
          background: #fff;
          width: 100%;
          max-width: 800px;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          height: fit-content;
        }

        .profile-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .header-left {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          background: #F0FDF4;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          border: 1px solid #c9e6cb;
        }

        .title-section h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #111;
        }

        .subtitle {
          margin: 4px 0;
          color: #666;
          font-size: 14px;
        }

        .user-badge {
          display: inline-block;
          font-size: 11px;
          background: #22c55e;
          padding: 3px 10px;
          border-radius: 20px;
          color: #white;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #ff5252;
          border: 1px solid #ffebeb;
          padding: 10px 18px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: #fff5f5;
          border-color: #ff5252;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 15px;
          margin-bottom: 40px;
        }

        .stat-box {
          background: #F8FAFC;
          padding: 20px;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
        }

        .main-stat {
          background: #F0FDF4;
          border-color: #c9e6cb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-label {
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
          margin: 0 0 5px 0;
        }

        .stat-value {
          color: #1e293b;
          font-size: 28px;
          font-weight: 800;
          margin: 0;
        }

        .main-stat .stat-value {
          color: #166534;
        }

        .stat-value span {
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
        }

        .stat-icon {
          font-size: 32px;
        }

        .activity-section {
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          padding: 24px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: #22c55e;
        }

        .section-header h3 {
          margin: 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
        }

        .section-icon {
          width: 22px;
          height: 22px;
        }

        .empty-state {
          text-align: center;
          padding: 30px;
          background: #fafafa;
          border-radius: 12px;
          border: 1px dashed #e0e0e0;
        }

        .empty-state p {
          margin: 0;
          color: #64748b;
          font-weight: 500;
        }

        .empty-state small {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .profile-header {
            flex-direction: column;
            gap: 20px;
          }
          .logout-btn {
            width: 100%;
            justify-content: center;
          }
          .header-left {
            flex-direction: column;
            text-align: center;
          }
        }
      </style>
    `;
  }
}

export default UserProfilePage;