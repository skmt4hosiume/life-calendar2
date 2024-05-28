function updateActiveLink(newActiveLink) {
    document.querySelectorAll('.help-link').forEach(link => {
        link.classList.remove('active');
    });
    newActiveLink.classList.add('active');
}

function unknownfunction() {
    document.querySelectorAll('.help-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(this.dataset.content).style.display = 'block';
            updateActiveLink(this);
        });
    });
}

function changeTheme() {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const themeColor = localStorage.getItem("theme");
    header.style.backgroundColor = themeColor;
    footer.style.backgroundColor = themeColor;
}

document.addEventListener('DOMContentLoaded', () => {
    unknownfunction();
    changeTheme();
    const firstLink = document.querySelector('.help-link');
    if (firstLink) {
        firstLink.classList.add('active');
        document.getElementById(firstLink.dataset.content).style.display = 'block';
    }
});
