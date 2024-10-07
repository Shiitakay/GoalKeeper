function make_cross() {
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  //viewBox="0 0 300 300"
  rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  // x="40" y="120" width="220" height="60" transform="translate(-62.1 150) rotate(-45)"
  rect1.setAttribute("x", "40");
  rect1.setAttribute("y", "120");
  rect1.setAttribute("width", "220");
  rect1.setAttribute("height", "60");
  rect1.setAttribute("transform", "translate(-62.1 150) rotate(-45)");

  rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  //x="120" y="40" width="60" height="220" transform="translate(-62.1 150) rotate(-45)"/
  rect2.setAttribute("x", "120");
  rect2.setAttribute("y", "40");
  rect2.setAttribute("width", "60");
  rect2.setAttribute("height", "220");
  rect2.setAttribute("transform", "translate(-62.1 150) rotate(-45)");

  svg.appendChild(rect1);
  svg.appendChild(rect2);
  return svg;
}

function make_tick() {
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");

  // <rect class="cls-1" x="75.4" y="134.3" width="220" height="60" transform="translate(-61.9 179.2) rotate(-45)"/>
  rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect1.setAttribute("x", "75.4");
  rect1.setAttribute("y", "134.3");
  rect1.setAttribute("width", "220");
  rect1.setAttribute("height", "60");
  rect1.setAttribute("transform", "translate(-61.9 179.2) rotate(-45)");
  // <rect class="cls-1" x="63.4" y="105.5" width="60" height="160" transform="translate(-103.8 120.4) rotate(-45)"/>
  rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect2.setAttribute("x", "63.4");
  rect2.setAttribute("y", "105.5");
  rect2.setAttribute("width", "60");
  rect2.setAttribute("height", "160");
  rect2.setAttribute("transform", "translate(-103.8 120.4) rotate(-45)");

  svg.appendChild(rect1);
  svg.appendChild(rect2);
  return svg;
}

function make_arrow() {
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");

  //  <polygon class="cls-1" points="243.6 150 56.4 43.9 56.4 256.1 243.6 150"/>
  tri = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  tri.setAttribute("points", "243.6 150 56.4 43.9 56.4 256.1 243.6 150");

  svg.appendChild(tri);
  return svg;
}

function make_edit() {
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "111.51 285.46 182.45 235.79 268.55 51.14 190.06 14.54 103.96 199.19 111.51 285.46 31.45 285.46");
  // <polyline class="cls-1" points="111.51 285.46 182.45 235.79 268.55 51.14 190.06 14.54 103.96 199.19 111.51 285.46 31.45 285.46"/>
  svg.appendChild(polyline);
  return svg;
}