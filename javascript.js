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
        { month: 'January', days: 31 },
        { month: 'February', days: isLeapYear(year) ? 29 : 28 },
        { month: 'March', days: 31 },
        { month: 'April', days: 30 },
        { month: 'May', days: 31 },
        { month: 'June', days: 30 },
        { month: 'July', days: 31 },
        { month: 'August', days: 31 },
        { month: 'September', days: 30 },
        { month: 'October', days: 31 },
        { month: 'November', days: 30 },
        { month: 'December', days: 31 }
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


// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {

    updateTime();
    setInterval(updateTime, 1000);
    generateDaysForMonth(new Date().getFullYear()); //초기에는 한국어로 설정
    appendSelected()
});

document.addEventListener('DOMContentLoaded', () => {
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
    selectedColor.addEventListener('click', () => {
        toggleColorPicker();
    });

    // 각 색상 옵션을 클릭했을 때의 동작
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.id;
            setSelectedColor(color);
            toggleColorPicker();
            colorEffect(color)
        });
    });

    // 페이지 로드 후 color-picker를 숨김
    colorPicker.style.display = 'none';
    selectedColor.style.display = 'none';
})
