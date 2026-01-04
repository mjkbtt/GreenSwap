// frontend/pages/CenterLoginPage.js
// Center Login Page (User Login адил загвар)

export class CenterLoginPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-header">
            <div class="logo">🏢</div>
            <h1>Цэг нэвтрэх</h1>
            <p>Дахин боловсруулах цэгийн систем</p>
          </div>

          <form class="auth-form" id="centerLoginForm">
            <div class="form-group">
              <label for="email">Имэйл хаяг *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="center@greenswap.mn"
              >
            </div>

            <div class="form-group">
              <label for="password">Нууц үг *</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder="••••••••"
              >
            </div>

            <button type="submit" class="auth-button">
              Нэвтрэх
            </button>
          </form>

          <div class="auth-footer">
            <p>Шинэ цэг үүсгэх үү? <a href="#/center-register" data-link>Бүртгүүлэх</a></p>
            <p class="switch-mode">
              <a href="#/login" data-link>👤 Хэрэглэгчээр нэвтрэх</a>
            </p>
          </div>

          <div class="message" id="message" style="display: none;"></div>
        </div>
      </div>

      <style>
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .auth-container {
          background: white;
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 450px;
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
          color: #1e293b;
          margin-bottom: 8px;
        }

        .auth-header p {
          color: #64748b;
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
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .auth-button {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .auth-button:hover {
          background: #5a67d8;
          transform: translateY(-2px);
        }

        .auth-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #64748b;
        }

        .auth-footer p {
          margin: 8px 0;
        }

        .auth-footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        .switch-mode {
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          margin-top: 16px;
        }

        .message {
          margin-top: 16px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
        }

        .message.success {
          background: #d1fae5;
          color: #065f46;
        }

        .message.error {
          background: #fee2e2;
          color: #991b1b;
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 32px 24px;
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

      const loginData = {
        email: form.email.value,
        password: form.password.value
      };

      try {
        const response = await fetch('/api/center-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
          messageDiv.textContent = '✓ Амжилттай нэвтэрлээ!';
          messageDiv.className = 'message success';
          messageDiv.style.display = 'block';

          // Save center data to localStorage
          localStorage.setItem('center', JSON.stringify(data));
          
          setTimeout(() => {
            window.location.hash = '#/center-profile';
          }, 1000);
        } else {
          throw new Error(data.error || 'Нэвтрэх амжилтгүй');
        }
      } catch (error) {
        console.error('Login error:', error);
        messageDiv.textContent = '✗ ' + error.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });
  }
}

export default CenterLoginPage;