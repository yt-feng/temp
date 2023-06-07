// 噪声
function random() {
  return Math.random();
}
function noise(x, y) {
  const xFloor = Math.floor(x);
  const yFloor = Math.floor(y);
  const xCeil = xFloor + 1;
  const yCeil = yFloor + 1;
  const topLeft = random(); 
  const topRight = random();
  const bottomLeft = random();
  const bottomRight = random();
  const xLerpTop = lerp( topLeft, topRight, x - xFloor );
  const xLerpBottom = lerp( bottomLeft, bottomRight, x - xFloor );
  const yLerp = lerp( xLerpTop, xLerpBottom, y - yFloor );
  return yLerp;
}
// 变速递增加波动
const Noise = function fluctuatingFunction(x) {
  x = x/200
  const perlinNoise = noise(x, x);
  const sineWave = Math.sin(x * Math.PI);
  const waveValue = perlinNoise + sineWave;
  // const exponentialValue = Math.exp(waveValue/100000-1);
  const exponentialValue = x/(x+1)
  const lerpValue = lerp(0, 95, exponentialValue+waveValue/100);
  return lerpValue;
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
exports.noise = Noise;