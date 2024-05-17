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
        { month: '1월', days: 31 },
        { month: '2월', days: isLeapYear(year) ? 29 : 28 },
        { month: '3월', days: 31 },
        { month: '4월', days: 30 },
        { month: '5월', days: 31 },
        { month: '6월', days: 30 },
        { month: '7월', days: 31 },
        { month: '8월', days: 31 },
        { month: '9월', days: 30 },
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
            dayDiv.dataset.constant = '';
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
    const sidebar = document.getElementById('select-day'); // sidebar 요소 선택
    days.forEach(day => {
        day.addEventListener('click', () => {

            // 선택한 날짜를 업데이트하고 이전 선택을 취소
            if (selectedDay) {
                selectedDay.classList.remove('selected');
            }
            selectedDay = day;
            selectedDay.classList.add('selected');
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
        if (day.classList.contains('color-effect')) {
            const shadowID = day.dataset.constant;
            const alpha = alphaValue(shadowID);
            day.style.backgroundColor = shadeCalc(color, alpha);
        }
    });
}

function colorEffectShadow(color, id) {
    const allDays = document.querySelectorAll('.day');

    // 모든 day 클래스를 가진 요소에 대해 반복문을 실행합니다.
    allDays.forEach(function (day) {

        // 선택된 요소에만 color-effect 클래스를 추가합니다.
        if (day.classList.contains('selected')) {
            day.classList.add('color-effect');
            day.style.backgroundColor = color;
            day.dataset.constant = id
        }
    });
}

// shadow강도에 따른 숫자값 반환
function alphaValue(id) {
    const alpha = {
        'shadow-100': 1,
        'shadow-75': 0.75,
        'shadow-50': 0.5,
        'shadow-40': 0.4,
        'shadow-30': 0.3,
    }
    return alpha[id];
}

function setSelectedColor(color) {
    const selectedColor = document.querySelector('.selected-color');
    selectedColor.style.backgroundColor = color;
}

function colorMap(color) {
    const colorMaps = {
        'red': '#ff0000',
        'orange': '#ffa500',
        'yellow': '#ffff00',
        'green': '#20a020',
        'turquoise': '#40e0d0',
        'blue': '#0000ff',
        'purple': '#ee82ee',
        'gray': '#b0b0b0',
    };
    return colorMaps[color];
}

// 명암 계산
function shadeCalc(color, alpha) {
    const rgb = hexToRgb(colorMap(color));
    return `rgb(${Math.round(rgb.r * alpha)}, ${Math.round(rgb.g * alpha)}, ${Math.round(rgb.b * alpha)})`
}

function setShadowColor(color) {

    // 각 명암 요소에 색상 적용
    document.getElementById('shadow-100').style.backgroundColor = shadeCalc(color, 1);
    document.getElementById('shadow-75').style.backgroundColor = shadeCalc(color, 0.75);
    document.getElementById('shadow-50').style.backgroundColor = shadeCalc(color, 0.5);
    document.getElementById('shadow-40').style.backgroundColor = shadeCalc(color, 0.4);
    document.getElementById('shadow-30').style.backgroundColor = shadeCalc(color, 0.3);
}

function hexToRgb(hex) {
    // hex 코드가 '#' 문자로 시작하는지 확인
    hex = hex.replace(/^#/, '');

    // hex 코드의 유효성을 확인하고, 3자리 코드를 6자리로 확장
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    // 16진수를 10진수로 변환하여 RGB 값을 추출
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}

// 사이드바 색깔 선택 이벤트 함수
function colorPickerEvent() {

    // 각 색상 옵션을 클릭했을 때의 동작
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.id;
            setSelectedColor(color);
            setShadowColor(color);
            colorEffect(color);
        });
    });
}

// 사이드바 명암 선택 이벤트 함수
function colorShadowEvent() {
    const colorShadowOptions = document.querySelectorAll('.shadow-option');
    colorShadowOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.style.backgroundColor;
            const id = option.id
            setSelectedColor(color);
            colorEffectShadow(color, id);
        })
    })
}

// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    setShadowColor("green");
    updateTime();
    setInterval(updateTime, 1000);
    generateDaysForMonth(new Date().getFullYear()); //초기에는 한국어로 설정
    appendSelected();
    colorPickerEvent();
    colorShadowEvent();
});