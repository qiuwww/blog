

function getPai (n) {
  const angle = 2 * Math.PI / n;
  const l = 2 * Math.sin(angle/ 2);
  return n * l / 2;
}

getPai(3);
getPai(6);
getPai(9);
getPai(30);
getPai(300);
