window.onload = function () {
const openWindows = {};
  
  // =========================
  // 🔒 CORE ELEMENTS
  // =========================
  const lockscreen = document.getElementById("lockscreen");
  const desktop = document.getElementById("desktop");
  const clock = document.getElementById("clock");

  // safety check (prevents silent breaking)
  if (!lockscreen || !desktop) {
    alert("ERROR: Missing lockscreen or desktop in HTML");
    return;
  }

  // =========================
  // 🔓 UNLOCK SYSTEM
  // =========================
  function unlock() {
    lockscreen.style.opacity = "0";
    lockscreen.style.pointerEvents = "none";

    setTimeout(() => {
      lockscreen.style.display = "none";
      desktop.style.display = "block";
    }, 200);
  }

  lockscreen.onclick = unlock;
  document.addEventListener("keydown", unlock);

  // =========================
  // 🕒 CLOCK
  // =========================
  function updateClock() {
    if (!clock) return;

    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  // =========================
  // 🪟 WINDOW SYSTEM
  // =========================
  let z = 20;
window.openApp = function (name) {

  // if already open → bring to front
  if (openWindows[name]) {
    bringToFront(openWindows[name]);
    return;
  }

  const win = document.createElement("div");
  win.className = "window";
  win.style.zIndex = z++;

  let content = "";

  if (name === "library") {
    content = `
      <div class="window-header">
        🎮 Library
        <div>
          <span onclick="minimizeWindow('${name}')" style="cursor:pointer;">➖</span>
          <span onclick="this.parentElement.parentElement.parentElement.remove(); closeWindow('${name}')" style="cursor:pointer;">✖</span>
        </div>
      </div>

      <p>Game Library Window</p>
    `;
  }
window.bringToFront = function(win){
  win.style.zIndex = z++;
};

window.closeWindow = function(name){
  delete openWindows[name];
};

window.minimizeWindow = function(name){
  if (!openWindows[name]) return;
  openWindows[name].style.display = "none";
};
  else if (name === "settings") {
    content = `
      <div class="window-header">
        ⚙ Settings
        <div>
          <span onclick="minimizeWindow('${name}')">➖</span>
          <span onclick="this.parentElement.parentElement.parentElement.remove(); closeWindow('${name}')">✖</span>
        </div>
      </div>

      <p>Control Panel</p>
    `;
  }

  win.innerHTML = content;
  document.body.appendChild(win);

  makeDraggable(win);

  openWindows[name] = win;

  bringToFront(win);
};

    else {
      content = `
        <div class="window-header">
          ❓ App
          <span class="close" onclick="this.parentElement.parentElement.remove()">✖</span>
        </div>

        <p>Unknown app: ${name}</p>
      `;
    }

    win.innerHTML = content;
    document.body.appendChild(win);

    makeDraggable(win);
  };

  // =========================
  // 🖱 DRAG SYSTEM
  // =========================
  function makeDraggable(el) {
    let isDown = false;
    let offsetX = 0;
    let offsetY = 0;

    const header = el.querySelector(".window-header");

    header.addEventListener("mousedown", (e) => {
      isDown = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;

      el.style.zIndex = z++;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      el.style.left = (e.clientX - offsetX) + "px";
      el.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
      isDown = false;
    });
  }

};
