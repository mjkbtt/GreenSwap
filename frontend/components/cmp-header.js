class CmpHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.addEvents();
    }
    addEvents() {
        const searchBtn = this.shadowRoot.querySelector(".search-btn");
        searchBtn.addEventListener("click", () => {
            alert("Хайх үйлдэл эхэллээ!");

        });
    }
    render() {  
        this.shadowRoot.innerHTML = /*html*/`
        <style>
        :root {
            --green1: #3ca054;         /* logo, nav hover, profile bg, action btn text */
            --green-light: #c9e6cb;    /* action btn border */
            --green-lightest: #e6f7e8; /* hero bg */
            /* Yellow */
            --yellow1: rgba(255, 251, 234, 1);
            --gray-dark: #333;          /* text */
            --gray: #555;               /* nav links */
            --gray-light: #888;         /* search icon */
            --gray-lighter: #eee;       /* header border */

            /* Backgrounds */
            --bg-light: #f9fff9;        /* body bg */
            --white: #ffffff;           /* header, action btn bg, profile text */

            /* Font sizes */
            --font-size-1: 1em;
            --font-size-2: 1.5em;
            --font-size-3: 2em;
            --font-size-4: 2.5em;
            --font-size-5: 3em;
        }            
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--white); 
            border-bottom: 1px solid var(--gray-lighter);
            padding: 10px 0; 
            height: 50px;
            flex-shrink: 0;
            min-width: 800px;
        }
        .nav-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            flex-wrap: nowrap;
            gap: 10px;
            
        }
        .logo img {
            margin-left: 15px;
            width: 80px;
            height: 60px;
        }   
        .nav-links {
            display: flex;
            flex-wrap: nowrap;
            gap: 15px;
        }
        .nav-links a {
            text-decoration: none;
            color: var(--gray);
            margin: 0 50px;  
            font-size: var(--font-size-1);
            white-space: nowrap; /* Текстийг хоёр мөр болохоос сэргийлнэ */
        }

        .nav-links a:hover {
            color: var(--green1);
            font-weight: 500;
        }

        .profile-img {
            width: 40px;
            height: 40px;
            cursor:pointer;
            margin: 15px;
            flex-shrink: 0;

        }

        .search-bar {
            display: flex;
            border: 1px solid #ccc;
            border-radius: 20px;
            padding: 5px 10px; 
            background-color: #f0f0f0; 
            height: 30px;
            flex:1; /*allow stretchig between nav and profile*/
            min-width: 120px;
            max-width: 300px;
            gap: 5px;
            margin: 30px;
        }

        .search-btn {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
            width: 40px;
            height: 30px;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--gray-light);
        }
        .search-btn img{
            width: 20px;
            height: 20px;
        }
        .search-bar input {
            flex: 1;
            border: none;
            background: transparent;
            outline: none;
            font-size: 16px;
        }


        </style>
        <header class="header">
            <div class="container nav-bar">
                <div class="logo">
                    <img src="zurags/logo.png" alt="Green Swap Logo">            
                </div>
                <nav class="nav-links">
                    <a href="#/">Нүүр</a>
                    <a href="#/about">Бидний тухай</a>
                    <a href="#/contact">Холбоо барих</a>
                </nav>
                <div class="search-bar">
                    <button class="search-btn">
                        <img src="zurags/search.png" alt="Search">
                        <input type="text" placeholder="Хайх">
                    </button>
                </div>
                </div>
                    <img src="zurags/profile.png" class="profile-img" alt="" >
                </div>
            </div>
        </header>
        `;
    }

    disconnectedCallback() {
    
    }

    attributeChangedCallback(name, oldVal, newVal) {
    
    }

    adoptedCallback() {
    
    }

}

window.customElements.define('cmp-header', CmpHeader);