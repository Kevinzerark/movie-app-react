# 🎬 Movie App

**Movie App** is a web application built with **React** and **TailwindCSS** that consumes **The Movie Database (TMDb) API** to display popular movies, allow searching by title, show full movie details, and manage favorites.  

---

## 🚀 Features

- 🔍 **Movie Search** – Search for movies by title.  
- 🎥 **Popular Movies** – Initial list of the most popular movies from the API.  
- ⭐ **Favorites** – Mark movies as favorites and view only them.  
- 📄 **Movie Details** – Click a movie to see poster, rating, votes, release date, genres, and synopsis.  
- ⬇️ **Infinite Scroll** – Automatically load more movies when scrolling (disabled on favorites view).  
- 📱 **Responsive Design** – Adaptive Navbar with hamburger menu for mobile devices.  
- ⚡ **Loading Indicator** – Animated loader while fetching API data.  

---

## 🛠️ Tech Stack

- **React** (Hooks: `useState`, `useEffect`)  
- **TailwindCSS** for styling and responsiveness  
- **React Icons** (`react-icons/fa`)  
- **TMDb API** for movie data  

---

## 📂 Main Components

### **App.jsx**
- Main application state (`movies`, `search`, `favorites`, `selectedMovie`, etc.)  
- Controls which movies are displayed (all or only favorites)  
- Handles infinite scroll and API calls  

### **Navbar.jsx**
- Top navigation bar with:
  - Movie search input
  - Favorites toggle
  - Home button
  - Mobile hamburger menu  

### **MovieGrid.jsx**
- Displays movies in a responsive grid using **MovieCard**  

### **MovieCard.jsx**
- Individual movie card featuring:
  - Poster
  - Hover overlay with rating and favorite button
  - Movie title  

### **MovieDetails.jsx**
- Movie details screen  
- Shows poster, title, rating, votes, release date, genres, and synopsis  
- Back button and favorite toggle  

### **Loader.jsx**
- Animated loading spinner  

---

## 📖 User Flow

1. Open the app → popular movies are displayed.  
2. Search for a movie → results update.  
3. Click a movie → full details appear.  
4. Mark as favorite → stored in **localStorage**.  
5. Click “Favorites” → only favorited movies are shown.  
6. Scroll the list → more movies are loaded automatically.  

---

## 📌 How to Run

1. Install dependencies:
```bash
npm install
```
2. Start the development server:
```bash
npm run dev
```
3. Open in browser:
[http://localhost:5173](http://localhost:5173)  

---

## 📌 API Setup
- Insert your TMDb API key in `App.jsx`:
```js
const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.themoviedb.org/3";
```

---

## 🎨 UI Highlights

- **Desktop:** Full Navbar with search bar and favorites button.  
- **Mobile:** Hamburger menu with overlay navigation.  
- Cards with smooth hover animations and zoom effect.  
- Gradient background and CSS variable-based color palette.  

---

## 👤 Author

**Raul Kevin**  
- [GitHub](https://github.com/Kevinzerark)  
- [LinkedIn](https://www.linkedin.com/in/kevin-cardoso-/)

