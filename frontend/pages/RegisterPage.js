// frontend/pages/RegisterPage.js
// User Registration Page

export class RegisterPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="auth-page">
        <div class="auth-container">
          <div class="auth-header">
            <div class="logo">♻️ GreenSwap</div>
            <h1>Бүртгүүлэх</h1>
            <p>Шинэ бүртгэл үүсгэнэ үү</p>
          </div>

          <form class="auth-form" id="registerForm">
            <div class="form-group">
              <label for="username">Хэрэглэгчийн нэр *</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                required 
                placeholder="yourname"
                minlength="3"
              >
            </div>

            <div class="form-group">
              <label for="email">Имэйл *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="example@email.com"
              >
            </div>

            <div class="form-group">
              <label for="phone">Утас</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+976 9999-9999"
              >
            </div>

            <div class="form-group">
              <label for="location">Хаяг/Байршил</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                placeholder="Улаанбаатар"
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
                minlength="6"
              >
              <small class="hint">Хамгийн багадаа 6 тэмдэгт</small>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Нууц үг баталгаажуулах *</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                required 
                placeholder="••••••••"
              >
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" name="terms" required>
                <span>Би <a href="#/terms" target="_blank">үйлчилгээний нөхцөл</a>-тэй танилцсан</span>
              </label>
            </div>

            <button type="submit" class="auth-button">
              Бүртгүүлэх
            </button>
          </form>

          <div class="auth-footer">
            <p>Аль хэдийн бүртгэлтэй юу? <a href="#/login" data-link>Нэвтрэх</a></p>
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
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-height: 90vh;
          overflow-y: auto;
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

        .hint {
          display: block;
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }

        .checkbox-group {
          margin: 24px 0;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #666;
        }

        .checkbox-label input {
          margin-top: 2px;
          cursor: pointer;
        }

        .checkbox-label a {
          color: #4CAF50;
          text-decoration: none;
        }

        .checkbox-label a:hover {
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

        .auth-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .auth-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }

        .auth-footer a {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 600;
        }

        .auth-footer a:hover {
          text-decoration: underline;
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
    const form = container.querySelector('#registerForm');
    const messageDiv = container.querySelector('#message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate passwords match
      if (form.password.value !== form.confirmPassword.value) {
        messageDiv.textContent = '✗ Нууц үг таарахгүй байна';
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
        return;
      }

      const userData = {
        username: form.username.value,
        email: form.email.value,
        phone: form.phone.value,
        location: form.location.value,
        password: form.password.value,
        role: 'user' // Regular user
      };

      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
          messageDiv.textContent = '✓ Амжилттай бүртгэгдлээ! Нэвтэрч байна...';
          messageDiv.className = 'message success';
          messageDiv.style.display = 'block';

          // Auto login and redirect
          setTimeout(() => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.hash = '#/';
          }, 1500);
        } else {
          throw new Error(data.message || 'Бүртгэл амжилтгүй');
        }
      } catch (error) {
        console.error('Register error:', error);
        messageDiv.textContent = '✗ ' + error.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });
  }
}

export default RegisterPage;