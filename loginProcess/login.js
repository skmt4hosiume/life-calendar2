function changeTheme() {
    const header = document.querySelector('.header');
    const themeColor = localStorage.getItem("theme")
    header.style.backgroundColor = themeColor;
}

document.addEventListener('DOMContentLoaded', () => {
    changeTheme();
});
