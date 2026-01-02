// frontend/pages/CenterLoginPage.js
// Waste Collection Center Login

export class CenterLoginPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="auth-page center">
        <div class="auth-container">
          <div class="auth-header">
            <div class="logo">🏢</div>
            <h1>Хог цэгийн нэвтрэх</h1>
            <p>Цэгийн бүртгэлээр нэвтэрнэ үү</p>
          </div>

          <form class="auth-form" id="centerLoginForm">
            <div class="form-group">
              <label for="centerEmail">Цэгийн имэйл</label>
              <input 
                type="email" 
                id="centerEmail" 
                name="email" 
                required 
                placeholder="center@greenswap.mn"
              >
            </div>

            <div class="form-group">
              <label for="centerPassword">Нууц үг</label>
              <input 
                type="password" 
                id="centerPassword" 
                name="password" 
                required 
                placeholder="••••••••"
              >
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" name="remember">
                <span>Намайг сана</span>
              </label>
            </div>

            <button type="submit" class="auth-button center-button">
              Нэвтрэх
            </button>
          </form>

          <div class="auth-footer">
            <p>Цэг бүртгүүлэх үү? <a href="#/center-register" data-link>Цэг бүртгүүлэх</a></p>
            <p class="center-link">
              <a href="#/login" data-link>👤 Хэрэглэгчээр нэвтрэх</a>
            </p>
          </div>

          <div class="message" id="message" style="display: none;"></div>
        </div>

        <!-- Info Panel -->
        <div class="info-panel">
          <h2>Цэгийн бүртгэлийн давуу тал</h2>
          <ul class="benefits-list">
            <li>
              <span class="benefit-icon">📊</span>
              <div>
                <strong>Статистик мэдээлэл</strong>
                <p>Өдөр тутмын хүлээн авсан хог хаягдлын тайлан</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">🚚</span>
              <div>
                <strong>Pickup захиалга</strong>
                <p>Хэрэглэгчдийн pickup захиалгыг удирдах</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">💰</span>
              <div>
                <strong>Орлогын тайлан</strong>
                <p>Санхүүгийн тайлан, мэдээлэл</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">👥</span>
              <div>
                <strong>Хэрэглэгчид удирдах</strong>
                <p>Бүртгэлтэй хэрэглэгчдийн мэдээлэл</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style>
        .auth-page.center {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          display: grid;
          grid-template-columns: 450px 1fr;
          gap: 40px;
          padding: 40px;
        }

        .auth-container {
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .auth-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #c62828;
          margin-bottom: 8px;
        }

        .auth-header p {
          color: #666;
          font-size: 14px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
        }

        .form-group input:focus {
          outline: none;
          border-color: #f5576c;
        }

        .form-options {
          margin-bottom: 24px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .center-button {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          width: 100%;
          padding: 14px;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .center-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
        }

        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
        }

        .auth-footer p {
          margin: 8px 0;
        }

        .auth-footer a {
          color: #f5576c;
          text-decoration: none;
          font-weight: 600;
        }

        .center-link {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .info-panel {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 48px;
          backdrop-filter: blur(10px);
        }

        .info-panel h2 {
          font-size: 24px;
          font-weight: 700;
          color: #c62828;
          margin-bottom: 32px;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .benefits-list li {
          display: flex;
          gap: 16px;
        }

        .benefit-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .benefits-list strong {
          display: block;
          font-size: 16px;
          color: #333;
          margin-bottom: 4px;
        }

        .benefits-list p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        .message {
          margin-top: 16px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
        }

        .message.success {
          background: #d4edda;
          color: #155724;
        }

        .message.error {
          background: #f8d7da;
          color: #721c24;
        }

        @media (max-width: 1024px) {
          .auth-page.center {
            grid-template-columns: 1fr;
          }

          .info-panel {
            display: none;
          }
        }
      </style>
    `;

    this.addEventListeners(container);
  }

  addEventListeners(container) {
    const form = container.querySelector('#centerLoginForm');
    const messageDiv = container.querySelector('#message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const credentials = {
        email: form.email.value,
        password: form.password.value,
        role: 'center' // Important: specify center role
      };

      try {
        const response = await fetch('http://localhost:3000/api/center-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('center', JSON.stringify(data.center));

          messageDiv.textContent = '✓ Амжилттай нэвтэрлээ!';
          messageDiv.className = 'message success';
          messageDiv.style.display = 'block';

          // Redirect to center dashboard
          setTimeout(() => {
            window.location.hash = '#/center-dashboard';
          }, 1000);
        } else {
          throw new Error(data.message || 'Нэвтрэх амжилтгүй');
        }
      } catch (error) {
        console.error('Center login error:', error);
        messageDiv.textContent = '✗ ' + error.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });
  }
}

export default CenterLoginPage;