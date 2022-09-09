let modalWindow = document.getElementById('modal_Window'),
    btn = document.getElementById('btn'),
    span = document.getElementById('close'),
    timer = 3000;

setTimeout("modalWindow.style.display = 'block'", timer);

btn.onclick = function () {
    modalWindow.style.display = 'block';
}

span.onclick = function() {
    modalWindow.style.display = 'none';
}