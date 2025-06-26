# 💊 Basic Medicine Inventory – FrontEnd System

This is the front system for a simple **Medicine Inventory** application.  
It is built using **Typescript** and the **React - Vite** framework, primarily as a **practice project** to enhance my front development skills.

📌 Note: This is a practice project. More features may be added in the future as I continue learning.

### 🖥️ Programming Languages
- **TypeScript** – Main language for frontend development (React with Vite)
- **JavaScript** – Base language of the web; used alongside TypeScript

### 🧪 Frameworks & Libraries

- **React (with Vite)** – Frontend library for building user interfaces, configured with Vite for fast development and hot module replacement (HMR)
- **Axios** – For making HTTP requests to the backend API
- **React Router** – For managing page navigation and routing
- **Tailwind CSS** – Utility-first CSS framework for rapid UI styling
- **Shadcn UI** – Component library built on top of Tailwind CSS for beautiful and accessible design
- **Zustand** – Lightweight state management library for managing application state

### 🛠️ Tools & Utilities
- **Postman** – API testing
- **VS Code** – Code editor
- **Git** – Version control
- **GitHub** – Code repository
  
## 🎯 Features
- 🧾 Add, update, and delete medicine items
- 📊 Dashboard Design
- 🔐 User login 

### 🧪 Status
🚧 Finish – features and logic are being added and refined.

### 👨‍💻 Developer
str_vns – Full Stack Developer


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
