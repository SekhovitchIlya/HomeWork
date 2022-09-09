function accordion() {
    let accord = document.getElementsByClassName('accordion_item');

    for(let i = 0; i < accord.length; i++) {
        accord[i].addEventListener('click', function() {          
            this.classList.toggle('active');

            let accordion_title = this.nextElementSibling;
            if(accordion_title.style.display === 'block') {
                accordion_title.style.display = 'none';
            } else {
                accordion_title.style.display = 'block';
            }
        });
    }
}
accordion();