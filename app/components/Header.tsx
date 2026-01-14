"use client";

import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="logo" role="img" aria-label="Empiiu logo">
          {/* space reserved for logo */}
        </div>

        <nav className={`menu ${open ? "open" : ""}`} aria-hidden={!open}>
          <a href="/calendar">Calendar</a>
          <a href="/">Home</a>
          <a href="/news">News</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="social-links">
          <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com/@your-profile" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>

        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
