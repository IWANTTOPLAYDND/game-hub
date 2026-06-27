window.onload = function () {

  const lockscreen = document.getElementById("lockscreen");
  const desktop = document.getElementById("desktop");
  const clock = document.getElementById("clock");

  let z = 10;

  // =========================
  // 🔓 UNLOCK SYSTEM
  // =========================
  function unlock() {
    lockscreen.style.display = "none";
    desktop.style.display = "block";
  }

  lockscreen.onclick = unlock;
  document.addEventListener("keydown", unlock);

  // =========================
  // 🕒 CLOCK
  // =========================
  function updateClock() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  // =========================
  // 🪟 OPEN APP SYSTEM (FIXED)
  // =========================
  window.openApp = function (name) {

    // if window already exists → just show it
    const existing = document.querySelector(`.window[data-app="${name}"]`);

    if (existing) {
      existing.style.display = "block";
      bringToFront(existing);
      return;
    }

    const win = document.createElement("div");
    win.className = "window";
    win.setAttribute("data-app", name);
    win.style.zIndex = z++;

    let content = "";

    if (name === "library") {
      content = `
        <div class="window-header">
          🎮 Library
          <span onclick="closeWindow(this)">✖</span>
        </div>
        <p>Game Library coming next phase 👀</p>
      `;
    }

    else if (name === "settings") {
      content = `
        <div class="window-header">
          ⚙ Settings
          <span onclick="closeWindow(this)">✖</span>
        </div>
        <p>Settings panel coming next phase 💜</p>
      `;
    }

    win.innerHTML = content;
    document.body.appendChild(win);

    makeDraggable(win);
    bringToFront(win);
  };

  // =========================
  // 🔁 TOGGLE SYSTEM
  // =========================
  window.toggleApp = function (name) {

    const win = document.querySelector(`.window[data-app="${name}"]`);

    if (!win) {
      openApp(name);
      return;
    }

    if (win.style.display === "none") {
      win.style.display = "block";
      bringToFront(win);
    } else {
      win.style.display = "none";
    }
  };

  // =========================
  // ❌ CLOSE WINDOW (FIXED)
  // =========================
  window.closeWindow = function (el) {
    const win = el.parentElement.parentElement;
    win.remove();
  };

  // =========================
  // 🧠 BRING TO FRONT
  // =========================
  function bringToFront(win) {
    win.style.zIndex = z++;
  }

  // =========================
  // 🖱 DRAG SYSTEM
  // =========================
  function makeDraggable(win) {
    let isDown = false;
    let offsetX = 0;
    let offsetY = 0;

    const header = win.querySelector(".window-header");

    header.addEventListener("mousedown", (e) => {
      isDown = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      bringToFront(win);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      win.style.left = (e.clientX - offsetX) + "px";
      win.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      isDown = false;
    });
  }

};
