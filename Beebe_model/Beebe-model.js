class FunctionPosition {
  constructor(rank, code, archetype, score, content) {
    // 這裡負責：把外部傳進來的資料，存進 this.屬性
    this.rank = rank;
    this.code = code;
    this.archetype = archetype;
    this.score = score;
    this.content = content;
  }

  get consciousness() {
    // 這裡負責：不接收外部傳入的值，而是讀取 this.rank，
    // 當場判斷回傳「意識」或「無意識」
    if(this.rank > 4){
      return "unconsciousness"
    } else {
      return "consciousness"
    }
  }
}

const positions = data.map(function(item){
  return new FunctionPosition(item.rank, item.code, item.archetype, item.score, item.content);
});

function renderPositions(positions, svgElement) {
  const highest = Math.max(...positions.map(item => item.score));
  positions.forEach(function(position) {
    // 1. 用 position.rank 算出這個方塊的 y 座標
    const y = (position.rank - 1) * 58 + 20;
    // 2. 用 position.consciousness 決定這個方塊的顏色
    const color = (position.consciousness === "consciousness")? "#d9c9ae" : "#3d4a42";
    // 3. 建立 rect 元素，設定 x, y, width, height, fill 等屬性
    // 4. 把 rect 加進 svgElement
    svgElement += `<rect x="0" y="${y}" width="220" height="40" fill="${color}" rx="4" class="position" data-rank="${position.rank}"/>`;
    // 1. 內部分數橫條：用 highest 當比例尺，算出這個方塊的橫條寬度
    const barWidth = position.score / highest * 212;
    // 2. 文字標籤：放在方塊右側（x=250），顯示 code、archetype
    svgElement += `<rect x="4" y="${y + 4}" width="${barWidth}" height="32" fill="#9a6850" rx="4"/>`;
    svgElement += `<text x="250" y="${y + 24}">${position.code}‧ ${position.archetype} </text>`;
  });
  return svgElement;
  }

document.getElementById('position-chart').innerHTML = renderPositions(positions,"");

const blocks = document.querySelectorAll('.position');
blocks.forEach(function(block) {
  block.addEventListener('mouseover', function() {
    // 1. 從 block 讀出 data-rank（記得屬性讀出來是字串，rank 存的是數字）
    const rankStr  = block.getAttribute('data-rank');
    // 2. 用 .find() 從 positions 陣列查出對應物件
    const found = positions.find(function(p){
      return p.rank === Number(rankStr);
    });
    // 3. 把 content 顯示到 #position-info 裡
    const info = document.getElementById('position-info')
    info.innerText = "";
    info.innerText = found.content;
  });
});