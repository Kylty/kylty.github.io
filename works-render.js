function renderWorks(containerId, limit) {
  fetch("works.json")
    .then(response => response.json())
    .then(data => {
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

      // 3. 組成 HTML 字串
      let HTML = '';
      for (const article of data) {
        HTML += `
          <div class="work-item">
          <a href="${article.link}">${article.title}</a>
          <p>${article.date}</p>
          <p>${article.description}</p>
          </div>`;
      }

      // 4. 塞進畫面
      div.innerHTML = HTML;
    });
}
