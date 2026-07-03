document.getElementById('bfi-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const scores = {
        O: document.getElementById('o-score').value,
        C: document.getElementById('c-score').value,
        E: document.getElementById('e-score').value,
        A: document.getElementById('a-score').value,
        N: document.getElementById('n-score').value
    };
    console.log(scores);
    fetch("percentile_lookup.json")
        .then(response => response.json())
        .then(data => {
            const roundedScores = {};

            let hasError = false;

            for (const [trait, value] of Object.entries(scores)) {
                const result = validateAndRound(value);
                if (result === null) {
                    hasError = true;
                } else {
                    roundedScores[trait] = result.toFixed(1);
                }
            }
            if (hasError) {
                document.getElementById('result-container').innerHTML = '<p2>請確認所有欄位都填入 24 到 120 之間的數字。</p2>';
            } else {
                let html = ''
                const traitNames = {
                    O: '開放性',
                    C: '嚴謹性',
                    E: '外向性',
                    A: '親和性',
                    N: '神經質'
                };                
            for (const [trait,value] of Object.entries(roundedScores)) {
                    const percentile = data[trait][value]

                    const chineseName = traitNames[trait];
                    html += `
                        <p>${chineseName}：你在${percentile}%的位置</p>
                        <div class="track">
                            <div class="marker" style="left: ${percentile}%;"></div>
                        </div>
                    `;
                }
                document.getElementById('result-container').innerHTML = html;     
            }
        });

    function validateAndRound(value) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 24 || num > 120) {
        return null;  // 不合理，回傳 null 代表「這個輸入有問題」
    }
    return num /24;
}
  

    });

