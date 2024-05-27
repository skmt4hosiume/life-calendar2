function unknownfunction() {
    document.querySelectorAll('.help-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(this.dataset.content).style.display = 'block';
        });
    });
}

function changeTheme() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const themeColor = localStorage.getItem("theme")
    header.style.backgroundColor = themeColor;
    footer.style.backgroundColor = themeColor;
}

document.addEventListener('DOMContentLoaded', () => {
    unknownfunction();
    changeTheme();
});
