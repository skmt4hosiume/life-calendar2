// 윤년 판정
function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

// 각 월마다 날짜 생성 
function generateDaysForMonth(year) {
    const months = [
        { month: 'January',   days: 31 },
        { month: 'February',  days: isLeapYear(year) ? 29 : 28 },
        { month: 'March',     days: 31 },
        { month: 'April',     days: 30 },
        { month: 'May',       days: 31 },
        { month: 'June',      days: 30 },
        { month: 'July',      days: 31 },
        { month: 'August',    days: 31 },
        { month: 'September', days: 30 },
        { month: 'October',   days: 31 },
        { month: 'November',  days: 30 },
        { month: 'December',  days: 31 }
    ];

    months.forEach((m, index) => {
        // 각 월 month 클래스 찾기
        const monthDiv = document.querySelector(`.month:nth-child(${index + 1})`);
        
        // 월 이름 추가
        const monthNameDiv = document.createElement('div');
        monthNameDiv.className = 'month-name';
        monthNameDiv.textContent = m.month;
        
        // 날짜 부모 daysContainer 추가
        const daysContainer = document.createElement('div');
        daysContainer.className = 'days-container';
        
        // 부모 daysContainer클래스에 날짜 추가
        for (let day = 1; day <= m.days; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;
            daysContainer.appendChild(dayDiv);
        }
        
        // month 클래스에 monthNameDiv, daysContainer클래스 추가
        monthDiv.appendChild(monthNameDiv);
        monthDiv.appendChild(daysContainer);
    });
}

// 올해 년도 generateDaysForMonth() 함수 실행
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    generateDaysForMonth(currentYear);
});