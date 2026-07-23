function parseMarkdown(text) {
  let result = text;
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>');
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*(.+?)\*/g, '<i>$1</i>');
  result = result.replace(/==(.+?)==/g, '<mark>$1</mark>');
  return result;
}
class TraceVersion {
  static count = 0
  #steps;
  constructor(name, date, commits, steps) {
    this.name = name;
    this.date = date;
    this.commits = commits;
    this.#steps = steps;
    TraceVersion.count ++;
  }
  renderHTML() {
    let HTML = '';
    for (const step of this.#steps) {
      HTML += `<h3>${step.name}</h3>`;
      HTML += `<ul>`;
      for (const question of step.questions) {
        HTML += `<li>${parseMarkdown(question)}</li>`;
      }
      HTML += `</ul>`;
    }
    return HTML;
  }
    get questionCount() {
    let total = 0;
    for (const step of this.#steps) {
      total += step.questions.length;
    }
    return total;
  }
}

if (typeof module !== 'undefined') {
  module.exports = TraceVersion;
}

async function setupTabs() {
  try {
    const response = await fetch("trace.json");
    const data = await response.json();

    const buttons = document.querySelectorAll('.tab-btn');
    
    // 建立實例（跟渲染邏輯是完全分開的兩件事）
    const versions = {};
    for (const [name, versionData] of Object.entries(data)) {
      versions[name] = new TraceVersion(
        name,
        versionData.date,
        versionData.commits,
        versionData.steps
      );
    }
       buttons.forEach(function(btn) {
      btn.addEventListener('click', function(event) {
        try {
          buttons.forEach(otherBtn => otherBtn.classList.remove('active'));
          event.target.classList.add('active');




    // 在 click handler 裡使用
    const version = event.target.dataset.version;
    document.getElementById('trace-content').innerHTML = versions[version].renderHTML();

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

if (typeof document !== 'undefined') {
  setupTabs();
}