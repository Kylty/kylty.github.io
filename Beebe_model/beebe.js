class FunctionPosition {
  constructor(rank, code, archetype, score, content) {
    this.rank = rank;
    this.code = code;
    this.archetype = archetype;
    this.score = score;
    this.content = content;
  }
  get consciousness() {
    if (this.rank > 4) {
      return "unconsciousness";
    } else {
      return "consciousness";
    }
  }
}

function renderPositions(positions, svgElement) {
  const highest = Math.max(...positions.map(item => item.score));
  positions.forEach(function(position) {
    const y = (position.rank - 1) * 58 + 20;
    const color = (position.consciousness === "consciousness") ? "#d9c9ae" : "#3d4a42";
    svgElement += `<rect x="0" y="${y}" width="220" height="40" fill="${color}" rx="4" class="position" data-rank="${position.rank}"/>`;
    const barWidth = position.score / highest * 212;
    svgElement += `<rect x="4" y="${y + 4}" width="${barWidth}" height="32" fill="#9a6850" rx="4" />`;
    svgElement += `<text x="250" y="${y + 24}">${position.code}. ${position.archetype} </text>`;
  });
  return svgElement;
}

function bindHoverEvents(positions) {
  const blocks = document.querySelectorAll(".position");
  blocks.forEach(function(block) {
    block.addEventListener("mouseover", function() {
      const rank = Number(block.getAttribute("data-rank"));
      const partnerRank = rank <= 4 ? rank + 4 : rank - 4;
      const self = positions.find(function(p) { return p.rank === rank; });
      const partner = positions.find(function(p) { return p.rank === partnerRank; });
      const conscious = (self.consciousness === "consciousness") ? self : partner;
      const shadow = (self.consciousness === "consciousness") ? partner : self;

      document.getElementById("label-conscious").innerText = `意識 · ${conscious.code}`;
      document.getElementById("info-conscious").innerText = conscious.content;
      document.getElementById("label-shadow").innerText = `陰影 · ${shadow.code}`;
      document.getElementById("info-shadow").innerText = shadow.content;

      const path_y = (rank - 1) * 58 + 40;
      const path_partner_y = (partnerRank - 1) * 58 + 40;
      document.getElementById("pairing-curve").setAttribute(
        "d",
        `M 220 ${path_y} C 240 ${path_y}, 240 ${path_partner_y}, 220 ${path_partner_y}`
      );
    });
  });
}

async function initBeebeChart() {
  try {
    const response = await fetch("positions.json");
    const data = await response.json();
    const positions = data.map(function(item) {
      return new FunctionPosition(item.rank, item.code, item.archetype, item.score, item.content);
    });

    const chart = document.getElementById("position-chart");
    chart.innerHTML += renderPositions(positions, "");

    bindHoverEvents(positions);
  } catch (error) {
    console.log("載入 positions.json 失敗：", error.message);
  }
}

if (typeof document !== 'undefined') {
  initBeebeChart();
}
