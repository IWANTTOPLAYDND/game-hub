console.log("CORE JS LOADED");
"use strict";

/* =========================
   🧠 NEON OS - CLEAN CORE
========================= */

const OS = {
  z: 10,

  /* =========================
     🚀 BOOT
  ========================= */
  init() {
    this.cache();
    this.lockSetup();
    this.taskbarSetup();

    console.log("NeonOS booted clean 💜");
  },

  /* =========================
     📦 CACHE DOM
  ========================= */
  cache() {
    this.lock = document.getElementById("lockscreen");
    this.desktop = document.getElementById("desktop");
  },

  /* =========================
     🔒 LOCK SCREEN (ROBUST)
  ========================= */
  lockSetup() {
    if (!this.lock || !this.desktop) {
      console.error("Missing lock or desktop element");
      return;
    }

    let unlocked = false;

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;

      console.log("Unlocked 🔓");

      this.lock.style.display = "none";
      this.desktop.style.display = "block";
    };

    this.lock.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock, { once: true });
  },

  /* =========================
     📊 TASKBAR SYSTEM
  ========================= */
  taskbarSetup() {
    document.addEventListener("click", (e) => {
      const app = e.target.dataset.app;

      if (!app) return;

      if (app === "library") this.openLibrary();
      if (app === "settings") this.openSettings();
    });
  },

  /* =========================
     🪟 WINDOW ENGINE (STABLE)
  ========================= */
  createWindow(title, content) {
    const win = document.createElement("div");
    win.className = "window";

    win.style.position = "absolute";
    win.style.top = "120px";
    win.style.left = "120px";
    win.style.zIndex = ++this.z;

    win.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <button class="close">✖</button>
      </div>
      <div class="window-body">
        ${content}
      </div>
    `;

    document.body.appendChild(win);

    /* close */
    win.querySelector(".close").onclick = () => win.remove();

    /* drag */
    this.makeDraggable(win);

    return win;
  },

  /* =========================
     🖱 DRAG SYSTEM (SAFE)
  ========================= */
  makeDraggable(win) {
    const header = win.querySelector(".window-header");

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.onmousedown = (e) => {
      dragging = true;

      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;

      win.style.zIndex = ++this.z;
    };

    document.onmousemove = (e) => {
      if (!dragging) return;

      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    };

    document.onmouseup = () => {
      dragging = false;
    };
  },

  /* =========================
     🎮 APPS
  ========================= */
  openLibrary() {
    this.createWindow("🎮 Library", `
      <button onclick="OS.openGame()">Clicker</button>
    `);
  },

  openSettings() {
    this.createWindow("⚙ Settings", `
      <p>NeonOS is running clean.</p>
    `);
  },

  openGame() {
    let count = 0;

    const win = this.createWindow("🖱 Clicker", `
      <p id="count">0</p>
      <button id="btn">Click</button>
    `);

    const countEl = win.querySelector("#count");
    const btn = win.querySelector("#btn");

    btn.onclick = () => {
      count++;
      countEl.textContent = count;
    };
  }
};

/* =========================
   🚀 START SAFE (IMPORTANT FIX)
========================= */
window.addEventListener("DOMContentLoaded", () => {
  OS.init();
});
