// frontend/pages/LoginPage.js
// User Login Page

export class LoginPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-header">
            <div class="logo">♻️ GreenSwap</div>
            <h1>Нэвтрэх</h1>
            <p>Өөрийн бүртгэлээр нэвтэрнэ үү</p>
          </div>

          <form class="auth-form" id="loginForm">
            <div class="form-group">
              <label for="email">Имэйл</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="example@email.com"
                autocomplete="email"
              >
            </div>

            <div class="form-group">
              <label for="password">Нууц үг</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder="••••••••"
                autocomplete="current-password"
              >
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" name="remember">
                <span>Намайг сана</span>
              </label>
              <a href="#/forgot-password" class="forgot-link">Нууц үг мартсан?</a>
            </div>

            <button type="submit" class="auth-button">
              Нэвтрэх
            </button>

            <div class="divider">
              <span>эсвэл</span>
            </div>

            <button type="button" class="google-button" id="googleLogin">
              <span class="google-icon">G</span>
              Google-ээр нэвтрэх
            </button>
          </form>

          <div class="auth-footer">
            <p>Бүртгэлгүй юу? <a href="#/register" data-link>Бүртгүүлэх</a></p>
            <p class="center-link">
              <a href="#/center-login" data-link>🏢 Хог цэгийн нэвтрэх</a>
            </p>
          </div>

          <div class="message" id="message" style="display: none;"></div>
        </div>
      </div>

      <style>
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
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
          font-size: 48px;
          margin-bottom: 16px;
        }

        .auth-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1b5e20;
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
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-label input {
          cursor: pointer;
        }

        .forgot-link {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .auth-button {
          width: 100%;
          padding: 14px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .auth-button:hover {
          background: #45a049;
          transform: translateY(-2px);
        }

        .divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: #e5e7eb;
        }

        .divider span {
          position: relative;
          background: white;
          padding: 0 16px;
          color: #999;
          font-size: 14px;
        }

        .google-button {
          width: 100%;
          padding: 14px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.2s;
        }

        .google-button:hover {
          background: #f9f9f9;
          border-color: #4CAF50;
        }

        .google-icon {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #4285f4, #ea4335);
          color: white;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }

        .auth-footer p {
          margin: 8px 0;
        }

        .auth-footer a {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }

        .center-link {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
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
    const form = container.querySelector('#loginForm');
    const messageDiv = container.querySelector('#message');
    const googleBtn = container.querySelector('#googleLogin');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const credentials = {
        email: form.email.value,
        password: form.password.value,
        remember: form.remember.checked
      };

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
          // Save token
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          messageDiv.textContent = '✓ Амжилттай нэвтэрлээ!';
          messageDiv.className = 'message success';
          messageDiv.style.display = 'block';

          // Redirect to home
          setTimeout(() => {
            window.location.hash = '#/';
          }, 1000);
        } else {
          throw new Error(data.message || 'Нэвтрэх амжилтгүй');
        }
      } catch (error) {
        console.error('Login error:', error);
        messageDiv.textContent = '✗ ' + error.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });

    googleBtn.addEventListener('click', () => {
      alert('Google нэвтрэх удахгүй нээгдэнэ!');
    });
  }
}

export default LoginPage;