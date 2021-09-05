const date = new Date();

// 날짜 설정 
function setDate() {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let today = `${year}-${month}-${day}`;

    const date_section = document.querySelector('.date_section');
    date_section.textContent = today;    
}

setDate();