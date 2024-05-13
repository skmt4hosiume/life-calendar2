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
    const selectedColor = document.getElementById('selected-color'); // selectedColor 요소 선택
    const sidebar = document.getElementById('select-day'); // sidebar 요소 선택
    days.forEach(day => {
        day.addEventListener('click', () => {
            // 선택한 날짜를 업데이트하고 이전 선택을 취소
            if (selectedDay) {
                selectedDay.classList.remove('selected');
            }
            selectedDay = day;
            selectedDay.classList.add('selected');

            // 선택한 날짜가 있을 때 selectedColor를 보여줌
            selectedColor.style.display = 'block';

            // sidebar에 선택한 날짜 추가
            const monthName = selectedDay.parentElement.parentElement.querySelector('.month-name').textContent;
            sidebar.textContent = `${monthName} ${selectedDay.textContent}일`;
        });
    });
}

// 현재 시간 나타내는 함수
function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = (hours % 12) || 12;

    const timeString = `${ampm} ${formattedHours}:${minutes}:${seconds} ${year}-${month}-${date}`;
    document.querySelector('.indicator-date').innerText = timeString;
}


// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    
    updateTime();
    setInterval(updateTime, 1000);
    
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

document.addEventListener('DOMContentLoaded', function () {
    const selectedColor = document.getElementById('selected-color');
    const colorPicker = document.getElementById('color-picker');
    
    // 선택한 색상을 selected-color에 반영하는 함수
    function setSelectedColor(color) {
        selectedColor.style.backgroundColor = color;
    }
    
    // 선택한 색상을 보여주는 함수
    function showSelectedColor() {
        selectedColor.style.display = 'block';
    }
    
    // color-picker를 표시하거나 숨기는 함수
    function toggleColorPicker() {
        if (colorPicker.style.display === 'block') {
            colorPicker.style.display = 'none';
        } else {
            colorPicker.style.display = 'block';
        }
    }
    
    // selected-color를 클릭했을 때 color-picker를 표시하거나 숨김
    selectedColor.addEventListener('click', function () {
        toggleColorPicker();
    });
    
    // 각 색상 옵션을 클릭했을 때의 동작
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            const color = option.id;
            setSelectedColor(color);
            toggleColorPicker();
        });
    });
    
    // 페이지 로드 후 color-picker를 숨김
    colorPicker.style.display = 'none';
    selectedColor.style.display = 'none';
})
