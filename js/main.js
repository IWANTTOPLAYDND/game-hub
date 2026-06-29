const wallpapers = [
  "wallpapers/purple-neon.jpg",
  "wallpapers/cyber-blue.jpg",
  "wallpapers/galaxy.jpg",
  "wallpapers/stars.jpg",
  "wallpapers/sunset.jpg"
];

function setWallpaper(path) {
  const desktop = document.getElementById("desktop");
  if (!desktop) return;

  desktop.style.backgroundImage = `url('${path}')`;
  localStorage.setItem("wallpaper", path);
}

function loadWallpaper() {
  const saved = localStorage.getItem("wallpaper");
  if (saved) {
    setWallpaper(saved);
  } else {
    setWallpaper(wallpapers[0]);
  }
}

document.addEventListener("DOMContentLoaded", loadWallpaper);
