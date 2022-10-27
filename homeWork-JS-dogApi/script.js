let select = document.querySelector('.dogs');
let get_random = document.querySelector('.btn');
let option = document.querySelector('.breed');
let img = document.querySelector('.dog_img');

const searchRandom = async() => {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
        const data = await response.json();
        if(data.status == 'success') {
            img.src = data.message;
        }
    }
    catch(error) {
        alert(error);
    } 
}

const chooseBreed = async(breed) => {
    try { 
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        if(data.status == 'success') {
            img.src = data.message[0];
        }
    }
    catch(error) {
        alert(error);
    } 
}

const displayList = async() => {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
        const data = await response.json();
        if(data.status == 'success') {
            for (let key in data.message) {
                option = document.createElement('option');
                option.classList.add('breed');
                option.innerHTML = key;
                select.appendChild(option);
                
            }
        }   
    }
    catch(error) {
        alert(error);
    }
}

//--------------------------------------------------------
//--------------------------------------------------------

displayList();
searchRandom();
get_random.addEventListener('click', function() {
    searchRandom();
    select.value = 'Choose Breed';
});
select.addEventListener('change', function() {
    chooseBreed(select.value);
});
