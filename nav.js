const navItems = [
  { "label": "首頁", "link": "/index.html" },
  { "label": "全部作品", "link": "/works.html" },
  { "label": "關於", "link": "/index.html#about" }
];

function renderNav(containerId) { 
    let HTML = '';
        for (const nav of navItems) {
        let isActive;
        if(nav.label === "首頁") {
            isActive = window.location.pathname.includes(nav.link) 
            || window.location.pathname.endsWith("/");
        } else{
        isActive = window.location.pathname.includes(nav.link)}
        HTML += `<a class="${isActive ? 'nav-active' : ''}" href="${nav.link}">${nav.label}</a>
            `;
        }
    document.getElementById(containerId).innerHTML = HTML; 
}
