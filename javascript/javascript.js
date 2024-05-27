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
            dayDiv.id = `${index + 1}-${day}`; // id 값을 "월-일" 형식으로 설정
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
            const selectedDate = `${monthName} ${selectedDay.textContent}일`;
            sidebar.textContent = selectedDate;
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
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = (hours % 12) || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${ampm} ${formattedHours}:${minutes}:${seconds} | ${year}년 ${month}월 ${date}일`;
    document.querySelector('.indicator-date').innerText = timeString;
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
        'shadow-100': 1.1,
        'shadow-75': 0.8,
        'shadow-50': 0.6,
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
    document.getElementById('shadow-100').style.backgroundColor = shadeCalc(color, 1.1);
    document.getElementById('shadow-75').style.backgroundColor = shadeCalc(color, 0.8);
    document.getElementById('shadow-50').style.backgroundColor = shadeCalc(color, 0.6);
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

// '색칠 삭제' 버튼 클릭 이벤트 함수
function resetColorEvent() {
    const resetButton = document.getElementById('reset-color');
    resetButton.addEventListener('click', () => {
        // 선택된 날짜 요소 찾기
        const selectedDay = document.querySelector('.day.selected');

        // 선택된 날짜가 있을 경우 색상 초기화
        if (selectedDay) {
            selectedDay.classList.remove('color-effect');
            selectedDay.style.backgroundColor = ''; // 배경색 초기화
            selectedDay.dataset.constant = ''; // 데이터 초기화
            removeColorToPHP(selectedDay.id); // 색칠 삭제시 데이터베이스에도 반영해야함
        }
    });
}

// 데이터베이스에 있는 색깔 정보 삭제
function removeColorToPHP(delete_id) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'src/remove_color.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(delete_id); // remove_color.php로 delete_id 데이터 전송

    // 이 부분은 콘솔, 디버깅 용도
    xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.log("음..? 보내졌나?");
        }
    }
}

function saveTextButton() {
    const saveButton = document.getElementById('textbutton');
    const memoTextarea = document.querySelector('.input')
    const selectedDay = document.getElementById('select-day');

    saveButton.addEventListener('click', () => {
        const note = memoTextarea.value;
        localStorage.setItem(selectedDay.textContent, note)
    })
}

function dayClickEvent() {
    const allDays = document.querySelectorAll('.day');

    allDays.forEach(day => {
        day.addEventListener('click', () => {
            if (day.classList.contains('selected')) {
                const memoTextarea = document.querySelector('.input');
                const selectedDay = document.getElementById('select-day');
                const savedNote = localStorage.getItem(selectedDay.textContent)
                
                memoTextarea.value = savedNote;
            }
        })
    })
}

function changeFont(){
    const textarea = document.querySelector('.input');
    const changefontbutton = document.getElementById('fontbutton');
    
    changefontbutton.addEventListener('click', () => {
        const selectedFont = fontchange.value;
        textarea.style.fontFamily = selectedFont;
    })
}

// 테마 바꾸는 함수
function changeTheme() {
    const header = document.querySelector('.header');
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('.footer');
    const monthNameAll = document.querySelectorAll('.month');
    const themeOptionAll = document.querySelectorAll('.theme-option');
    
    const themeValue = localStorage.getItem("theme");

    if (!themeValue) {
        localStorage.setItem("theme", window.getComputedStyle(header).backgroundColor);
    }
    
    firstStartTheme(localStorage.getItem("theme"));

    themeOptionAll.forEach(themeOption => {
        themeOption.addEventListener('click', () => {
            const themeColor = window.getComputedStyle(themeOption).backgroundColor;
            localStorage.setItem("theme", themeColor);
            
            header.style.backgroundColor = themeColor;
            sidebar.style.backgroundColor = themeColor;
            footer.style.backgroundColor = themeColor;
            monthNameAll.forEach(monthName => {
                monthName.style.backgroundColor = themeColor;
            })

        })
    })
}

// 저장된 테마 색깔을 최소 한번 적용하는걸 실행시키는 함수
function firstStartTheme(color) {
    const header = document.querySelector('.header');
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('.footer');
    const monthNameAll = document.querySelectorAll('.month');

    header.style.backgroundColor = color;
    sidebar.style.backgroundColor = color;
    footer.style.backgroundColor = color;
    monthNameAll.forEach(monthName => {
        monthName.style.backgroundColor = color;
    })
}


// 로그인 여부에 따라 헤더 부분에 표기
function AJAXRequest() {
    // AJAX 요청으로 로그인 상태 확인
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'src/check_login.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.logged_in) {
                document.getElementById('logout-item').style.display = 'inline';
                loadInfomation();
            } else {
                document.getElementById('login-item').style.display = 'inline';
                document.getElementById('register-item').style.display = 'inline';
            }
        }
    };
    xhr.send();
}

// 날짜 색깔 저장하는 함수 (웹페이지 닫거나 새로고침 시 DB에 반영)
function dayColorSave() {
    function saveData() {
        const dayColorEffectElements = document.querySelectorAll('.day.color-effect');
        const dataArray = [];

        // dataArray 형식
        // [ {id : {shade, backgroundcolor}, {id : {shade, backgroundcolor} ... }]
        dayColorEffectElements.forEach(element => {
            const data = {
                [element.id]: {
                    shade: element.dataset.constant,
                    backgroundcolor: element.style.backgroundColor
                }
            };
            dataArray.push(data);
        });

        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'src/dataSave.php', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(dataArray)); //stringify = 문자열로 변환하는 메소드

        // 이 부분은 콘솔, 디버깅 용도
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) { //xhr.status = 200 : 요청이 성공적으로 처리되면 200값을 가짐 
                    console.log(xhr.responseText);
                } else {
                    console.log("음..? 보내졌나?");
                }
            }
        }
    }

    // 페이지를 떠나기 전에 데이터 저장
    window.addEventListener('beforeunload', saveData);
}

// 페이지 열때 정보 불러오기 
function loadInfomation() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'src/get_colordata.php', true); //get_colordata.php를 이용해 데이터 불러오기
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.responseText !== "") {
            // xhr.responseText = 각 날짜의 id, data.constant, backgroundcolor의 정보가 담긴 배열
            var colordata = JSON.parse(xhr.responseText);
            loadDayColor(colordata);
        }
    };
    xhr.send();
}

// 파라미터로 받은 값을 이용해 날짜에 정보 반영
function loadDayColor(colordata) {
    colordata.forEach(element => {
        for (const key in element) {
            const day = document.getElementById(key);
            const values = element[key];
            day.dataset.constant = values.shade;
            day.style.backgroundColor = values.backgroundcolor;
            day.classList.add('color-effect');
        }
    })
}


// 함수 실행 부분들
document.addEventListener('DOMContentLoaded', () => {
    setShadowColor("green"); // 초기값은 green
    updateTime();
    setInterval(updateTime, 1000);
    generateDaysForMonth(new Date().getFullYear()); 
    appendSelected();
    colorPickerEvent();
    colorShadowEvent();
    resetColorEvent();
    dayClickEvent()
    saveTextButton()
    changeTheme()
    changeFont();
    AJAXRequest();
    dayColorSave();
});

