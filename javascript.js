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
function generateDaysForMonth(year, language) {
    const monthNames = {
        'ko': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'jp': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    };
    const months = [
        { month: monthNames[language][0], days: 31 },
        { month: monthNames[language][1], days: isLeapYear(year) ? 29 : 28 },
        { month: monthNames[language][2], days: 31 },
        { month: monthNames[language][3], days: 30 },
        { month: monthNames[language][4], days: 31 },
        { month: monthNames[language][5], days: 30 },
        { month: monthNames[language][6], days: 31 },
        { month: monthNames[language][7], days: 31 },
        { month: monthNames[language][8], days: 30 },
        { month: monthNames[language][9], days: 31 },
        { month: monthNames[language][10], days: 30 },
        { month: monthNames[language][11], days: 31 }
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

//선택한 날짜를 표시하는 효과 추가
function appendSelected() {
    let selectedDay = null; // 초기에는 선택한 날짜가 없음

    // 각 날짜 요소에 이벤트 리스너 추가
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', () => {
            // 선택한 날짜를 업데이트하고 이전 선택을 취소
            if (selectedDay) {
                selectedDay.classList.remove('selected');
            }
            selectedDay = day;
            selectedDay.classList.add('selected');
        });
    });
}

// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();

    generateDaysForMonth(currentYear, 'ko'); //초기에는 한국어로 설정
    appendSelected()
    
   // 언어가 변경될 때마다 새로운 언어로 달력을 생성
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (event) => {
        const language = event.target.value;
        document.querySelectorAll('.month').forEach(month => month.innerHTML = '');
        generateDaysForMonth(currentYear, language);
        appendSelected(); // 다시 이벤트 리스너를 추가하여 선택한 날짜 표시를 유지
    });
});

