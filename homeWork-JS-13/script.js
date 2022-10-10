/*объект для потестить*/
let obj1 = {
    id: 1,
    name: 'Ilya',
    email: 'ilya@gmail.com',
    phone: '+375331234567'
}

class User {
    constructor() {
        this.data = {
            id: '',
            name: '',
            email: '',
            phone: '', 
        }              
    };   

    edit(obj) {
        this.data.id = obj.id; 
        this.data.name = obj.name;
        this.data.email = obj.email;
        this.data.phone = obj.phone; 
        return this.data;
    };

    get() {
        return this.data;
    };
}

class Contacts extends User {
    data = [];
    
    add(obj) {      
        this.data.push(obj);
        return this.data;
    };

    edit(id, obj) {
        if (this.data.find(item => item.id == id) !== undefined) {  
            let i = this.data.indexOf(this.data.find(item => item.id == id), 0);
            this.data[i] = super.edit = obj;
        }     
        return this.data;  
    };

    removeContact(id) {
       return this.data = this.data.filter(item => item.id !== id);     
    };

    get() {
        return this.data;
    };     
}

class ContactsApp extends Contacts {   
    onAdd() {
        let input_id = Math.floor(Math.random() * 99),
            input_name = document.querySelector('.name_input').value,
            input_email = document.querySelector('.email_input').value,
            input_phone = document.querySelector('.phone_input').value;
            input_id = input_id.toString();    

        if( (input_name == '') || (input_phone == '') ) {
            alert('Name AND Phone must be filled!');
        } else {
            //создаю объект из введенных значений для передачи в функцию добавления    
            let obj = {
                id: input_id,
                name: input_name,
                email: input_email,
                phone: input_phone
            }

            super.add(obj); // вызываю метод добавления из класса Contacts
            this.clear_form();
            this.get();
            this.storage = super.get();
            return obj; 
        }      
    };

    onEdit(id_edit) {
        let contact = document.querySelector(`.contact${id_edit}`),
            nameTag = contact.querySelector('.name'),
            emailTag = contact.querySelector('.email'),
            phoneTag = contact.querySelector('.phone'),
            remBtn = contact.querySelector(`.removeBtn${id_edit}`),
            edtBtn = contact.querySelector(`.editBtn${id_edit}`);

        let nameText = nameTag.textContent,
            emailText = emailTag.textContent,
            phoneText = phoneTag.textContent;

        //скрываю все, что лежит в li-шке    
        nameTag.style.display = 'none';
        emailTag.style.display = 'none';
        phoneTag.style.display = 'none';
        remBtn.style.display = 'none';
        edtBtn.style.display = 'none';
        contact.style.backgroundColor = 'white';
        
        //добавляю в li-шку элементы, для редактирования
        let name_edit = document.createElement('input'),
            email_edit = document.createElement('input'),
            phone_edit = document.createElement('input'),
            okBtn = document.createElement('button');
 
        name_edit.value = nameText;
        email_edit.value = emailText;
        phone_edit.value = phoneText;
        okBtn.textContent = 'OK';
        okBtn.classList.add('OK');
             
        contact.appendChild(name_edit);
        contact.appendChild(email_edit);
        contact.appendChild(phone_edit);
        contact.appendChild(okBtn);

        okBtn.addEventListener('click', () => {
            nameTag.textContent = name_edit.value;
            emailTag.textContent = email_edit.value;
            phoneTag.textContent = phone_edit.value;
            
            // возвращаю обратно вид li-шки
            name_edit.style.display = 'none';
            email_edit.style.display = 'none';
            phone_edit.style.display = 'none';
            okBtn.style.display = 'none';
    
            nameTag.style.display = 'block';
            emailTag.style.display = 'block';
            phoneTag.style.display = 'block';
            remBtn.style.display = 'block';
            edtBtn.style.display = 'block';
    
            let obj_edit = {
                id: id_edit,
                name: nameTag.textContent,
                email: emailTag.textContent,
                phone: phoneTag.textContent
            };

            super.edit(id_edit, obj_edit);
            this.storage = super.get();
            this.get();  
        })       
    };

    onRemove(id_remove) {
        super.removeContact(id_remove); 
        this.storage = super.get(); 
        this.get();           
    };

    get() {
        let list = document.querySelectorAll('li');
        if(list.length !== 0) {
            list.forEach((item) => {
                item.remove();
            })
        }
        if( super.get().length !== 0 ) {
            super.get().forEach((item) => {
            let li = document.createElement('li'),
                name = document.createElement('p'),
                email = document.createElement('p'),
                phone = document.createElement('p'),
                removeBtn = document.createElement('button'),
                editBtn = document.createElement('button');

                li.classList.add(`contact${item.id}`)
                name.classList.add('name');
                email.classList.add('email');
                phone.classList.add('phone');
                removeBtn.classList.add(`removeBtn${item.id}`);
                editBtn.classList.add(`editBtn${item.id}`);

                name.innerHTML = `${item.name}`;
                email.innerHTML = `${item.email}`;
                phone.innerHTML = `${item.phone}`;
                removeBtn.innerHTML = '&#10006';
                removeBtn.style.backgroundColor = 'rgb(229, 50, 50)';
                editBtn.innerHTML = '&#9998';
                editBtn.style.backgroundColor = 'rgb(83, 50, 229)';

                li.appendChild(name);
                li.appendChild(email);
                li.appendChild(phone);
                li.appendChild(editBtn);
                li.appendChild(removeBtn);
                document.querySelector('.contacts_list').appendChild(li);
            })
        }    
    };

    clear_form() {
        document.querySelector('.name_input').value = '';
        document.querySelector('.email_input').value = '';
        document.querySelector('.phone_input').value = '';
    }

    get storage () {
        let obj;
        if(localStorage.getItem('ContactList') !== null) {
            let returnObj = JSON.parse(localStorage.getItem('ContactList')); // распарсил
            for(let i = 0; i < returnObj.length; i++) {
                obj = returnObj[i];
                super.add(obj);
                this.get();
            }           
        } 
    };
    
    set storage(obj) {       
        let date = new Date(Date.now() + ( 3 * 24 * 3600 * 1000)); // 3 days       
        date = date.toUTCString();
        document.cookie = `contact=${obj.name}; expires=` + date;
       
        let serialObj = JSON.stringify(obj); //сериализуем объект
        localStorage.setItem('ContactList', serialObj);
    };

    app() {       
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');
        document.body.appendChild(this.wrapper);

        this.up_side = document.createElement('div');
        this.up_side.classList.add('up_side');
        this.wrapper.appendChild(this.up_side);

        this.down_side = document.createElement('div');
        this.down_side.classList.add('down_side');
        this.wrapper.appendChild(this.down_side);

        //up_side
        this.title = document.createElement('h2');
        this.title.innerHTML = 'New contact';
        this.up_side.appendChild(this.title);

        //name_block
        this.name_block = document.createElement('div');
        this.name_block.classList.add('name_block');
        this.up_side.appendChild(this.name_block);

        this.name = document.createElement('p');
        this.name.innerHTML = 'Name: ';
        this.name_block.appendChild(this.name);

        this.name_input = document.createElement('input');
        this.name_input.classList.add('name_input');
        this.name_input.setAttribute('placeholder', 'Name...');
        this.name_block.appendChild(this.name_input);

        //email_block
        this.email_block = document.createElement('div');
        this.email_block.classList.add('email_block');
        this.up_side.appendChild(this.email_block);

        this.email = document.createElement('p');
        this.email.innerHTML = 'Email: ';
        this.email_block.appendChild(this.email);

        this.email_input = document.createElement('input');
        this.email_input.classList.add('email_input');
        this.email_input.setAttribute('placeholder', 'Email...');
        this.email_block.appendChild(this.email_input);

        //phone_block
        this.phone_block = document.createElement('div');
        this.phone_block.classList.add('phone_block');
        this.up_side.appendChild(this.phone_block);

        this.phone = document.createElement('p');
        this.phone.innerHTML = 'Phone: ';
        this.phone_block.appendChild(this.phone);

        this.phone_input = document.createElement('input');
        this.phone_input.classList.add('phone_input');
        this.phone_input.setAttribute('placeholder', 'Phone...');
        this.phone_block.appendChild(this.phone_input);

        //buttons
        this.add_button = document.createElement('button');
        this.add_button.classList.add('add_button');
        this.add_button.innerHTML = 'Add Contact ';
        this.up_side.appendChild(this.add_button);

        //down_side
        this.down_title = document.createElement('h2');
        this.down_title.innerHTML = 'Contacts List';
        this.down_side.appendChild(this.down_title);

        this.column = document.createElement('div');
        this.column.classList.add('column');
        this.down_side.appendChild(this.column);

        this.name_column = document.createElement('h4');
        this.name_column.innerHTML = 'Name';
        this.column.appendChild(this.name_column);

        this.email_column = document.createElement('h4');
        this.email_column.innerHTML = 'Email';
        this.column.appendChild(this.email_column);

        this.phone_column = document.createElement('h4');
        this.phone_column.innerHTML = 'Phone';
        this.column.appendChild(this.phone_column);

        this.contacts_list = document.createElement('ul');
        this.contacts_list.classList.add('contacts_list');
        this.down_side.appendChild(this.contacts_list);
    }; 

    getData = async function() {
        if(localStorage.getItem('ContactList') === null) {
            let url = 'https://jsonplaceholder.typicode.com/users',
            response = await fetch(url),
            data;

            if(response.status == 200 && response.ok) {
                data = await response.json();
                this.storage = data;
                this.storage;
            }
        } else {
            this.storage;
        }     
    };
}

let app = new ContactsApp();
app.app();
app.getData();


// 3 дня Хранение LocalStorage
let lim = 3 * 24 * 3600 * 1000; 
let localStorageInitTime = localStorage.getItem('localStorageInitTime');
if(localStorageInitTime === null) {
    localStorage.setItem('localStorageInitTime', + new Date());
} else if(+new Date() - localStorageInitTime > lim) {
    localStorage.clear();
    localStorage.setItem('localStorageInitTime', + new Date());
}

// добавление
app.add_button.addEventListener('click', function() {
    app.onAdd();
});

//удаление
let removeBtn = document.querySelector('ul');      
removeBtn.addEventListener('click', function(element) {
    if(element.composedPath()[0].tagName == 'BUTTON') {
        let id_contact = element.composedPath()[0].classList.value,
            id_remove = id_contact.slice(9),
            button_class = id_contact.slice(0, 6);

        if(button_class === 'remove') {
            app.onRemove(id_remove); 
        }       
    }  
});

//редактирование 
let editBtn = document.querySelector('ul');      
editBtn.addEventListener('click', function(element) {
    if(element.composedPath()[0].tagName == 'BUTTON') {
        let id_contact = element.composedPath()[0].classList.value,
            id_edit = id_contact.slice(7),
            button_class = id_contact.slice(0, 4);

        if(button_class === 'edit') {
            app.onEdit(id_edit); 
        }  
    }  
});