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
        { month: '1월',  days: 31 },
        { month: '2월',  days: isLeapYear(year) ? 29 : 28 },
        { month: '3월',  days: 31 },
        { month: '4월',  days: 30 },
        { month: '5월',  days: 31 },
        { month: '6월',  days: 30 },
        { month: '7월',  days: 31 },
        { month: '8월',  days: 31 },
        { month: '9월',  days: 30 },
        { month: '10월', days: 31 },
        { month: '11월', days: 30 },
        { month: '12월', days: 31 }
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
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');

    let ampm = '오전';
    let formattedHours = hours;
    if (hours >= 12) {
        ampm = '오후';
        formattedHours = (hours % 12) || 12;
    }

    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${ampm} ${formattedHours}:${minutes}:${seconds} | ${year}년 ${month}월 ${date}일`;
    document.querySelector('.indicator-date').innerText = timeString;

    backgroundColor(hours); // 배경색 업데이트
}

//시간에 따라 배경 변경(오전 6시~ 오후6시까지)
function backgroundColor(hour) {
    if (hour >= 6 && hour < 18) {
        document.body.style.backgroundColor = "white"; // 오전 6시부터 오후 6시까지 흰색 배경색
    } else {
        document.body.style.backgroundColor = "lightgrey"; // 그 외 시간에는 회색 배경색
    }
}

//캘린더에 색깔 부여하는 함수
function colorEffect(color) {
    const allDays = document.querySelectorAll('.day');

    // 모든 day 클래스를 가진 요소에 대해 반복문을 실행합니다.
    allDays.forEach(function (day) {

        // 선택된 요소에만 color-effect 클래스를 추가합니다.
        if (day.classList.contains('selected')) {
            day.classList.add('color-effect');
        }

        if (day.classList.contains('color-effect')) {
            day.style.backgroundColor = color; // 색상 변경
        }
    });
}

// 사이드바 색깔 선택 이벤트 함수
function colorPickerEvent() {
    const selectedColor = document.getElementById('selected-color');
    const colorPicker = document.getElementById('color-picker');
    const opacityButton = document.querySelector('.opacity');
    
    // 선택한 색상을 selected-color에 반영하는 함수
    function setSelectedColor(color) {
        selectedColor.style.backgroundColor = color;
    }
    
    // color-picker를 표시하거나 숨기는 함수
    function toggleColorPicker() {
        if (colorPicker.style.display === 'block') {
            colorPicker.style.display = 'none';
        } else {
            colorPicker.style.display = 'block';
        }
    }

    function toggleopacityButton(){
        if (opacityButton.style.display === 'flex') {
        } else {
            opacityButton.style.display = 'flex';
        }
    }
    // selected-color를 클릭했을 때 color-picker를 표시하거나 숨김
    selectedColor.addEventListener('click', () => {
        toggleColorPicker();
        toggleopacityButton();} 
    );
    
    // 페이지 로드 후 color-picker를 숨김
    colorPicker.style.display = 'none';
    selectedColor.style.display = 'none';
    opacityButton.style.display = 'none';
}


// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    generateDaysForMonth(new Date().getFullYear()); //초기에는 한국어로 설정
    appendSelected();
    colorPickerEvent();
});

