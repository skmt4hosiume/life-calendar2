function changeTheme() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const themeColor = localStorage.getItem("theme")
    header.style.backgroundColor = themeColor;
    footer.style.backgroundColor = themeColor;
}

document.addEventListener('DOMContentLoaded', () => {
    changeTheme();
});
