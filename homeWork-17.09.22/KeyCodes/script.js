document.addEventListener('keyup', function(event){
    let key = document.getElementById('key'),
        code = document.getElementById('code');

    code.value = event.code;
    key.value = event.key;
});
    
