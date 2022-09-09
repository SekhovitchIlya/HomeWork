function gallery(imgs) {
    let img = document.getElementById('img');
    
    img.src = imgs.src;
    img.parentElement.style.display = 'block';
}