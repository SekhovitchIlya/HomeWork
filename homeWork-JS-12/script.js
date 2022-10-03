/*объект для потестить*/
let obj1 = {
    id: 1,
    name: 'Ilay',
    email: 'ilya@gmail.com',
    address: 'Minsk',
    phone: '+375331234567'
}
/*Начало*/
class User {
    constructor(obj) {
        this.data = {
            id: obj.id,
            name: obj.name,
            email: obj.email,
            address: obj.address,
            phone: obj.phone, 
        }              
    };   

    edit(obj) {
        this.data.id = obj.id; 
        this.data.name = obj.name;
        this.data.email = obj.email;
        this.data.address = obj.address;
        this.data.phone = obj.phone; 
        return this.data;
    };

    get() {
        return this.data;
    };
}

class Contacts extends User {
    constructor(obj) {
        super(obj);
        this.data = [obj1];
    }
    
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

    remove(id) {
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
            input_address = document.querySelector('.address_input').value,
            input_phone = document.querySelector('.phone_input').value;

        if( (input_name == '') || (input_phone == '') ) {
            alert('Name AND Phone must be filled!')
        } else {
            //создаю объект из введенных значений для передачи в функцию добавления    
            let obj = {
                id: input_id,
                name: input_name,
                email: input_email,
                address: input_address,
                phone: input_phone
            }

            super.add(obj); // вызываю метод добавления из класса Contacts
            this.clear_form();
            this.get();
            this.storage = super.get();
            return obj; 
        }      
    };

    onEdit() {      
        let name_edit = document.querySelector('.name_input').value,
            email_edit = document.querySelector('.email_input').value,
            address_edit = document.querySelector('.address_input').value,
            phone_edit = document.querySelector('.phone_input').value,
            contacts_list = document.getElementsByTagName('li'), 
            checked = 0,
            j = 0;

        for(let i = 0; i < contacts_list.length; i++) {
            if(contacts_list[i].classList == 'checked') {
                checked++;
                j = i;                
            }         
        }
        // Для редактирования ввести ID нужной записи и выбрать ее в списке. Заполнить поля, которые нужно изменить
        if( checked !== 1 ) { 
            alert('Choose one contact!');
        } else {
            if(name_edit == '') { name_edit = super.get()[j].name; }
            if(email_edit == '') { email_edit = super.get()[j].email; }
            if(address_edit == '') { address_edit = super.get()[j].address; } 
            if(phone_edit == '') { phone_edit = super.get()[j].phone; } 
            
            let obj = {
                id: super.get()[j].id,
                name: name_edit,
                email: email_edit,
                address: address_edit,
                phone: phone_edit
            }
    
            super.edit(super.get()[j].id, obj);
            document.querySelector('.checked').querySelector('.name').textContent = name_edit;
            document.querySelector('.checked').querySelector('.email').textContent = email_edit;
            document.querySelector('.checked').querySelector('.address').textContent = address_edit;
            document.querySelector('.checked').querySelector('.phone').textContent = phone_edit;
        } 

        this.clear_form();       
        this.storage = super.get();
        checked = 0;
    };

    onRemove() {
        let contact_list = document.getElementsByTagName('li'),
            j = 0,
            id_remove = '';

        for(let i = 0; i < contact_list.length; i++) {
            if(contact_list[i].classList == 'checked') {
                checked++;
                j = i;
                id_remove = j; 
            }         
        }

        contact_list[j].remove();
        id_remove = super.get()[j].id;
        super.remove(id_remove);
        this.clear_form();
        this.storage = super.get();
    };

    get() { 
        if( super.get().length !==0 ) {
            let count = super.get().length, 
                li = document.createElement('li'),
                name = document.createElement('p'),
                email = document.createElement('p'),
                address = document.createElement('p'),
                phone = document.createElement('p');

            name.classList.add('name');
            email.classList.add('email');
            address.classList.add('address');
            phone.classList.add('phone');

            name.innerHTML = `${super.get()[count - 1].name}`;
            email.innerHTML = `${super.get()[count - 1].email}`;
            address.innerHTML = `${super.get()[count - 1].address}`;
            phone.innerHTML = `${super.get()[count - 1].phone}`;

            li.appendChild(name);
            li.appendChild(email);
            li.appendChild(address);
            li.appendChild(phone);
            document.querySelector('.contacts_list').appendChild(li);         
        }      
    };

    clear_form() {
        document.querySelector('.name_input').value = '';
        document.querySelector('.email_input').value = '';
        document.querySelector('.address_input').value = '';
        document.querySelector('.phone_input').value = '';
    }

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

        //address_block
        this.address_block = document.createElement('div');
        this.address_block.classList.add('address_block');
        this.up_side.appendChild(this.address_block);

        this.address = document.createElement('p');
        this.address.innerHTML = 'Address: ';
        this.address_block.appendChild(this.address);

        this.address_input = document.createElement('input');
        this.address_input.classList.add('address_input');
        this.address_input.setAttribute('placeholder', 'Address...');
        this.address_block.appendChild(this.address_input);

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

        this.edit_button = document.createElement('button');
        this.edit_button.classList.add('edit_button');
        this.edit_button.innerHTML = 'Edit Contact ';
        this.up_side.appendChild(this.edit_button);

        this.remove_button = document.createElement('button');
        this.remove_button.classList.add('remove_button');
        this.remove_button.innerHTML = 'Remove Contact ';
        this.up_side.appendChild(this.remove_button);

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

        this.address_column = document.createElement('h4');
        this.address_column.innerHTML = 'Address';
        this.column.appendChild(this.address_column);

        this.phone_column = document.createElement('h4');
        this.phone_column.innerHTML = 'Phone';
        this.column.appendChild(this.phone_column);

        this.contacts_list = document.createElement('ul');
        this.contacts_list.classList.add('contacts_list');
        this.down_side.appendChild(this.contacts_list);
    }; 

    get storage () {
        let obj;
        if(localStorage.getItem('ContactList') !== null) {
            let returnObj = JSON.parse(localStorage.getItem('ContactList')); // распарсил
            console.log(returnObj);
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
}

let app = new ContactsApp(obj1);
app.app();
app.storage;

app.add_button.addEventListener('click', function() {
    app.onAdd();
});

app.remove_button.addEventListener('click', function() {
    app.onRemove();
});

app.edit_button.addEventListener('click', function() {
    app.onEdit();
})
  
let checked = document.querySelector('ul');
checked.addEventListener('click', function(element) { 
    let one_checked = document.querySelector('.checked');
       
    if(one_checked === null) {
        if(element.composedPath()[1].tagName == 'LI') {
            element.composedPath()[1].classList.toggle('checked');
            document.querySelector('.name_input').value = document.querySelector('.checked').querySelector('.name').textContent;
            document.querySelector('.email_input').value = document.querySelector('.checked').querySelector('.email').textContent;
            document.querySelector('.address_input').value = document.querySelector('.checked').querySelector('.address').textContent;
            document.querySelector('.phone_input').value = document.querySelector('.checked').querySelector('.phone').textContent;
        }   
    } else {
        one_checked.classList.remove('checked');
        app.clear_form();      
    } 
}, false);

let limit = 3 * 24 * 3600 * 1000; // 3 days Хранение LocalStorage
let localStorageInitTime = localStorage.getItem('localStorageInitTime');
if(localStorageInitTime === null) {
    localStorage.setItem('localStorageInitTime', + new Date());
} else if(+new Date() - localStorageInitTime > limit) {
    localStorage.clear();
    localStorage.setItem('localStorageInitTime', + new Date());
}