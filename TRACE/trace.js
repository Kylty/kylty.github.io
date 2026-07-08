function parseMarkdown(text) {
  let result = text;
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>');
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*(.+?)\*/g, '<i>$1</i>');
  result = result.replace(/==(.+?)==/g, '<mark>$1</mark>');
  return result;
}

async function setupTabs() {
  const response = await fetch("trace.json");
  const data = await response.json();

  const buttons = document.querySelectorAll('.tab-btn');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      buttons.forEach(otherBtn => otherBtn.classList.remove('active'));
      event.target.classList.add('active');

      const version = event.target.dataset.version;
      const versionData = data[version];

      let HTML = '';
      
      HTML += `<div class="version-notes">`;
      HTML += `<h3>版本說明：${versionData.date}</h3>`;
      HTML += `<ul>`;
      for (const commit of versionData.commits) {
        HTML += `<li>${parseMarkdown(commit)}</li>`;
      }
      HTML += `</ul>`;
      HTML += `</div>`;


      for (const step of versionData.steps) {
        HTML += `<h3>${step.name}</h3>`;
        HTML += `<ul>`;
        for (const question of step.questions) {
          HTML += `<li>${parseMarkdown(question)}</li>`;
        }
        HTML += `</ul>`;
      }
      document.getElementById('trace-content').innerHTML = HTML;
    });
  });

  document.querySelector('[data-version="ver4"]').click();
}

setupTabs();