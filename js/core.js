const OS = {
  z: 10,
  soundEnabled: true,

  init() {
    this.lock = document.getElementById("lockscreen");
    this.desktop = document.getElementById("desktop");

    this.setupLock();
    this.setupTaskbar();
  },

  /* 🔒 LOCK */
  setupLock() {
    let unlocked = false;

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;

      this.playStartup();

      this.lock.style.display = "none";
      this.desktop.style.display = "block";
    };

    this.lock.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock, { once: true });
  },

  /* 📊 TASKBAR */
  setupTaskbar() {
    document.addEventListener("click", (e) => {
      const app = e.target.dataset.app;

      if (app === "library") this.openLibrary();
      if (app === "settings") this.openSettings();

      if (e.target.tagName === "BUTTON") {
        this.playClick();
      }
    });
  },

  /* 🪟 WINDOW */
  createWindow(title, content) {
    const win = document.createElement("div");
    win.className = "window";

    win.style.top = "120px";
    win.style.left = "120px";
    win.style.zIndex = ++this.z;

    win.innerHTML = `
      <div class="window-header">
        <span>${title}</span>
        <button class="close">X</button>
      </div>
      <div class="window-body">${content}</div>
    `;

    document.body.appendChild(win);

    win.querySelector(".close").onclick = () => win.remove();

    this.makeDraggable(win);

    return win;
  },

  /* 🖱 DRAG */
  makeDraggable(win) {
    const header = win.querySelector(".window-header");

    let dragging = false;
    let ox = 0;
    let oy = 0;

    header.onmousedown = (e) => {
      dragging = true;

      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;

      win.style.zIndex = ++this.z;
    };

    document.onmousemove = (e) => {
      if (!dragging) return;

      win.style.left = (e.clientX - ox) + "px";
      win.style.top = (e.clientY - oy) + "px";
    };

    document.onmouseup = () => dragging = false;
  },

  /* 🎮 APPS */
  openLibrary() {
    this.createWindow("Library", `
      <button onclick="OS.openGame()">Clicker</button>
    `);
  },

  openSettings() {
    this.createWindow("Settings", `
      <p>System running</p>
    `);
  },

  openGame() {
    let count = 0;

    const win = this.createWindow("Clicker", `
      <p id="c">0</p>
      <button id="b">Click</button>
    `);

    const c = win.querySelector("#c");
    const b = win.querySelector("#b");

    b.onclick = () => {
      count++;
      c.textContent = count;
      this.playClick();
    };
  },

  /* 🔊 SOUND */
  playStartup() {
    if (!this.soundEnabled) return;
    const a = new Audio("assets/sounds/startup.mp3");
    a.volume = 0.35;
    a.play().catch(()=>{});
  },

  playClick() {
    if (!this.soundEnabled) return;
    const a = new Audio("assets/sounds/click.mp3");
    a.volume = 0.15;
    a.play().catch(()=>{});
  }
};

OS.init();
