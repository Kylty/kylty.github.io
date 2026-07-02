const icons = {
  coffee: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 19h24v9a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10v-9z"/>
    <path d="M34 21h3a4.5 4.5 0 0 1 0 9h-3"/>
    <path d="M17 19c0-3 1.5-4 1.5-6.5S17 9 17 6"/>
    <path d="M24 19c0-3 1.5-4 1.5-6.5S24 9 24 6"/>
  </svg>`,
  chart: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 40V8"/>
    <path d="M8 40h32"/>
    <rect x="13" y="28" width="5" height="12"/>
    <rect x="22" y="20" width="5" height="20"/>
    <rect x="31" y="24" width="5" height="16"/>
    <path d="M13 18l9-6 9 5 6-9" stroke-dasharray="1 4"/>
  </svg>`,
  scatter: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <circle cx="11" cy="13" r="2" fill="currentColor" stroke="none"/>
    <circle cx="19" cy="29" r="2" fill="currentColor" stroke="none"/>
    <circle cx="31" cy="11" r="2" fill="currentColor" stroke="none"/>
    <circle cx="38" cy="25" r="2" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="21" r="2" fill="currentColor" stroke="none"/>
    <circle cx="27" cy="37" r="4.5" fill="none" stroke="currentColor"/>
  </svg>`
};

async function renderWorks(containerId, limit) {
  const response = await fetch("works.json")
  let data = await response.json()
  const div = document.getElementById(containerId);

  // 1. 排序：依 date 新到舊
  data.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    } else if (a.date == b.date) {
      return 0;
    } else {
      return 1;
    }
  });

  // 2. 依 limit 決定要顯示全部還是前 limit 筆
  if (limit == null) {
    data = data;
  } else {
    data = data.slice(0, limit);
  }

  // 3. 組成 HTML 字串（卡片版：圖示 + 文字資訊）
  let HTML = '';
  for (const article of data) {
    HTML += `
      <div class="work-card">
        <div class="work-thumb">${icons[article.icon]}</div>
        <div class="work-info">
          <a href="${article.link}">${article.title}</a>
          <p class="work-date">${article.date}</p>
          <p class="work-desc">${article.description}</p>
        </div>
      </div>`;
  }

  // 4. 塞進畫面
  div.innerHTML = HTML;
}
