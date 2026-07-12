function parseMarkdown(text) {
  let result = text;
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>');
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*(.+?)\*/g, '<i>$1</i>');
  result = result.replace(/==(.+?)==/g, '<mark>$1</mark>');
  return result;
}

async function setupTabs() {
  try {
    const response = await fetch("trace.json");
    const data = await response.json();

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function(event) {
        try {
          buttons.forEach(otherBtn => otherBtn.classList.remove('active'));
          event.target.classList.add('active');

          const version = event.target.dataset.version;
          const versionData = data[version];

          let HTML = '';
          for (const step of versionData.steps) {
            HTML += `<h3>${step.name}</h3>`;
            HTML += `<ul>`;
            for (const question of step.questions) {
              HTML += `<li>${parseMarkdown(question)}</li>`;
            }
            HTML += `</ul>`;
          }
          document.getElementById('trace-content').innerHTML = HTML;
        } catch (error) {
          console.log("渲染內容時發生錯誤：", error.message);
        }
      });
    });

    document.querySelector('[data-version="ver4"]').click();
  } catch (error) {
    console.log("載入 trace.json 失敗：", error.message);
  }
}

setupTabs();