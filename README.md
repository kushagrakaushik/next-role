<div align="center">
  <img src="https://img.icons8.com/color/150/000000/briefcase.png" alt="Next Role Logo" width="100" />
  
  # 🚀 Next Role

  *A web application to discover jobs and manage your skills.*

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

---

## ✨ Features

- **🔐 Authentication:** Signup and login powered by Firebase.
- **📊 Dashboard:** View career insights and job matches based on your profile.
- **💼 Role Exploration:** Browse and search jobs across different categories fetched from the jSearch API.
- **🛠️ Skills Management:** Add and manage your technical skills.
- **👤 Profile Management:** Manage your user profile.
- **📱 Responsive Design:** Built with Tailwind CSS to work on any device.

---

## 🛠️ Tech Stack

| Frontend | Backend & DB | APIs & Tools |
| :--- | :--- | :--- |
| ⚛️ **React 19** | 🔥 **Firebase** | 📡 **Axios** |
| ⚡ **Vite** | 🗄️ **Supabase** | 🔍 **jSearch API** |
| 🎨 **Tailwind CSS v4** | | 🧩 **Lucide Icons** |
| 🛣️ **React Router v7** | | 🌊 **Flowbite React** |
| 🔄 **XYFlow React** | | |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/next-role.git
   cd next-role
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and configure your keys based on `.env.example`:
   - Firebase config keys
   - Supabase keys
   - RapidAPI jSearch keys

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` to see the app running!

---

## 📁 Project Structure

```text
next-role/
├── src/
│   ├── components/    # Reusable UI components (Navbar, SignupForm, etc.)
│   ├── pages/         # Application routes (Landing, Dashboard, Roles, etc.)
│   ├── services/      # API integrations (jSearch, etc.)
│   ├── App.jsx        # Main application component & routing
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

---

## 🤝 Contributing

Contributions are always welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add a NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---