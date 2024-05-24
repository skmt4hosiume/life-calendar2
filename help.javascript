document.querySelectorAll('.help-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(this.dataset.content).style.display = 'block';
    });
});
