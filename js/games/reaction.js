let start = Date.now();
setTimeout(()=> start = Date.now(), 2000);

function reactionGame(){

  window.react = function(){
    document.getElementById("out").innerText =
      (Date.now() - start) + " ms";
  };

  return `
    <div class="card">
      <h2>Reaction</h2>
      <p id="out">Wait...</p>
      <button onclick="react()">Click</button>
    </div>
  `;
}
