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
    <span onclick="this.parentElement.parentElement.remove()">✖</span>
  </div>

  <div class="game-grid">

    <div class="game" onclick="loadGame('clicker')">
      🖱 Clicker
    </div>

    <div class="game" onclick="loadGame('guess')">
      🎲 Guess
    </div>

    <div class="game" onclick="loadGame('reaction')">
      ⚡ Reaction
    </div>

  </div>
`;
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

window.loadGame = function(type) {

  const win = document.createElement("div");
  win.className = "window";
  win.style.zIndex = 999;

  let content = "";

  // 🖱 CLICKER
  if (type === "clicker") {

    let count = 0;

    content = `
      <div class="window-header">
        🖱 Clicker
        <span onclick="this.parentElement.parentElement.remove()">✖</span>
      </div>

      <p id="clickerValue">0</p>
      <button id="clickBtn">Click</button>
    `;

    win.innerHTML = content;
    document.body.appendChild(win);
    makeDraggable(win);

    const value = win.querySelector("#clickerValue");
    const btn = win.querySelector("#clickBtn");

    btn.onclick = () => {
      count++;
      value.innerText = count;
    };
  }

  // 🎲 GUESS
  else if (type === "guess") {

    const secret = Math.floor(Math.random() * 5) + 1;

    content = `
      <div class="window-header">
        🎲 Guess
        <span onclick="this.parentElement.parentElement.remove()">✖</span>
      </div>

      <input id="guessInput" placeholder="1-5">
      <button id="guessBtn">Check</button>
      <p id="guessOut"></p>
    `;

    win.innerHTML = content;
    document.body.appendChild(win);
    makeDraggable(win);

    const input = win.querySelector("#guessInput");
    const out = win.querySelector("#guessOut");

    win.querySelector("#guessBtn").onclick = () => {
      out.innerText =
        Number(input.value) === secret ? "Correct 🎉" : "Nope 💀";
    };
  }

  // ⚡ REACTION
  else if (type === "reaction") {

    let start = Date.now();

    content = `
      <div class="window-header">
        ⚡ Reaction
        <span onclick="this.parentElement.parentElement.remove()">✖</span>
      </div>

      <p>Click fast!</p>
      <button id="reactBtn">Click</button>
      <p id="reactOut"></p>
    `;

    win.innerHTML = content;
    document.body.appendChild(win);
    makeDraggable(win);

    const btn = win.querySelector("#reactBtn");
    const out = win.querySelector("#reactOut");

    btn.onclick = () => {
      const time = Date.now() - start;
      out.innerText = time + "ms";
      start = Date.now();
    };
  }

  bringToFront(win);
  makeDraggable(win);
};
