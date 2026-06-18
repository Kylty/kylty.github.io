fetch("openness_summary.json")
  .then(response => response.json())
  .then(data => {
    const div = document.getElementById("summary-container");
    const comparison = data["維度比較"];

    let html = `<p>樣本：高開放性 ${data["高開放性樣本數"].toLocaleString()} 人 ／ 低開放性 ${data["低開放性樣本數"].toLocaleString()} 人</p>`;

    for (const [trait, values] of Object.entries(comparison)) {
      html += `<p>${trait}：高 O ${values["高開放性平均"]} vs 低 O ${values["低開放性平均"]}（效果量 ${values["效果量"]}）</p>`;
    }

    div.innerHTML = html;
  });
