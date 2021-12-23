
function addElement(colors, i) {
  if (i === colors.length) {
    return;
  }

  const color = colors[i];
  const displayColor = (i === 0) ? '3.14159' : color;
  $('#container').append(`<div style="background: #${color};">${displayColor}</div>`);
  setTimeout(() => {
    addElement(colors, i + 1);
  }, 2);
}

function makeColors(num) {
  // split into 6's
  const colors = num.match(/.{1,6}/g);
  // recursivley add elements
  addElement(colors, 0);
}

// Main

$.get('./src/numbers/pi.txt').then(pi => {
  makeColors(pi)
});
