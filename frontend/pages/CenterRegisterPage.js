// frontend/pages/CenterRegisterPage.js
// Waste Collection Center Registration

export class CenterRegisterPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="auth-page center">
        <div class="auth-container">
          <div class="auth-header">
            <div class="logo">🏭</div>
            <h1>Хог цэгийн бүртгэл</h1>
            <p>Дахин боловсруулах цэгээ бүртгүүлнэ үү</p>
          </div>

          <form class="auth-form" id="centerRegisterForm">
            <div class="form-group">
              <label for="centerName">Цэгийн нэр</label>
              <input
                type="text"
                id="centerName"
                name="name"
                required
                placeholder="Green Point СБД"
              >
            </div>

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

            <div class="form-group">
              <label for="centerConfirm">Нууц үг давтах</label>
              <input
                type="password"
                id="centerConfirm"
                name="confirm"
                required
                placeholder="••••••••"
              >
            </div>

            <div class="form-group">
              <label for="centerDistrict">Дүүрэг</label>
              <select id="centerDistrict" required>
                <option value="">Сонгох</option>
                <option value="СБД">СБД</option>
                <option value="БГД">БГД</option>
                <option value="ХУД">ХУД</option>
                <option value="БЗД">БЗД</option>
              </select>
            </div>

            <button type="submit" class="auth-button center-button">
              Бүртгүүлэх
            </button>
          </form>

          <div class="auth-footer">
            <p>Аль хэдийн бүртгэлтэй юу?
              <a href="#/center-login" data-link>Нэвтрэх</a>
            </p>
            <p class="center-link">
              <a href="#/login" data-link>👤 Хэрэглэгчээр нэвтрэх</a>
            </p>
          </div>

          <div class="message" id="message" style="display:none;"></div>
        </div>

        <!-- Info panel -->
        <div class="info-panel">
          <h2>Цэг бүртгүүлснээр</h2>
          <ul class="benefits-list">
            <li>
              <span class="benefit-icon">🗺️</span>
              <div>
                <strong>Газрын зураг дээр харагдана</strong>
                <p>Хэрэглэгчид таны цэгийг амархан олно</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">📈</span>
              <div>
                <strong>Автомат тайлан</strong>
                <p>Хүлээн авсан хаягдлын статистик</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">🤝</span>
              <div>
                <strong>Илүү хэрэглэгч</strong>
                <p>Eco community-д нэгдэнэ</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style>
        ${this.sharedStyles()}
      </style>
    `;

    this.addEventListeners(container);
  }

  addEventListeners(container) {
    const form = container.querySelector('#centerRegisterForm');
    const messageDiv = container.querySelector('#message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (form.password.value !== form.confirm.value) {
        messageDiv.textContent = '✗ Нууц үг таарахгүй байна';
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
        return;
      }

      const payload = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        district: form.centerDistrict.value,
        role: 'center'
      };

      try {
        const response = await fetch('http://localhost:3000/api/auth/center-register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Бүртгэл амжилтгүй');
        }

        messageDiv.textContent = '✓ Амжилттай бүртгэгдлээ! Нэвтэрч байна...';
        messageDiv.className = 'message success';
        messageDiv.style.display = 'block';

        setTimeout(() => {
          window.location.hash = '#/center-login';
        }, 1200);

      } catch (err) {
        console.error('Center register error:', err);
        messageDiv.textContent = '✗ ' + err.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });
  }

  sharedStyles() {
    return `
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
      .auth-header { text-align: center; margin-bottom: 32px; }
      .logo { font-size: 64px; margin-bottom: 16px; }
      .auth-header h1 { color: #c62828; }
      .form-group { margin-bottom: 18px; }
      label { font-weight: 600; font-size: 14px; margin-bottom: 6px; display:block; }
      input, select {
        width:100%;
        padding:12px;
        border-radius:8px;
        border:2px solid #e5e7eb;
      }
      .center-button {
        width:100%;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        padding:14px;
        color:white;
        border:none;
        border-radius:8px;
        font-weight:600;
      }
      .auth-footer { text-align:center; margin-top:20px; }
      .auth-footer a { color:#f5576c; font-weight:600; text-decoration:none; }
      .info-panel {
        background: rgba(255,255,255,0.95);
        border-radius:24px;
        padding:48px;
      }
      .benefits-list { list-style:none; padding:0; display:flex; flex-direction:column; gap:24px; }
      .benefits-list li { display:flex; gap:16px; }
      .benefit-icon { font-size:32px; }
      .message { margin-top:16px; padding:12px; border-radius:8px; text-align:center; }
      .message.success { background:#d4edda; color:#155724; }
      .message.error { background:#f8d7da; color:#721c24; }
      @media(max-width:1024px){
        .auth-page.center{grid-template-columns:1fr}
        .info-panel{display:none}
      }
    `;
  }
}

export default CenterRegisterPage;
