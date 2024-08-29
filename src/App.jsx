import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game";
import PomodoroTimer from "./components/PomodoroTimer";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to the Productivity App</h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </header>
      <main className="app-content">
        <div className="horizontal-layout">
          <section className="game-section">
            <Game />
          </section>
          <section className="pomodoro-section">
            <PomodoroTimer />
          </section>
        </div>
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Productivity App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
