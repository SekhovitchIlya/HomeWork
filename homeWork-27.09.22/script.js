/*объект для потестить*/
let obj = {
    id: 1,
    name: 'Ilya',
    email: 'ilya@gmsil.com',
    address: 'Minsk-city',
    phone: '+375336858120'
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
        this.data = [];
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
        let input_id = document.querySelector('.id_input').value,
            input_name = document.querySelector('.name_input').value,
            input_email = document.querySelector('.email_input').value,
            input_address = document.querySelector('.address_input').value,
            input_phone = document.querySelector('.phone_input').value;
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

        return obj; 
    };

    onEdit() {
        const id_edit = document.querySelector('.id_input').value;
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
        if( (checked !== 1) || (id_edit == '') ) { 
            alert('Choose one contact and input ID!');
        } else {

            if(name_edit == '') {
                name_edit = super.get()[j].name;
            }
            if(email_edit == '') {
                email_edit = super.get()[j].email;
            }
            if(address_edit == '') {
                address_edit = super.get()[j].address;
            } 
            if(phone_edit == '') {
                phone_edit = super.get()[j].phone;
            } 
            
            let obj = {
                id: id_edit,
                name: name_edit,
                email: email_edit,
                address: address_edit,
                phone: phone_edit
            }
    
            super.edit(id_edit, obj);
            contacts_list[j].innerText = id_edit + ' ' + 
                                         name_edit + ' ' +
                                         email_edit + ' ' +
                                         address_edit + ' ' +
                                         phone_edit + ' ';

        } 

        this.clear_form();
        checked = 0;
    };

    onRemove() {
        let contact_list = document.getElementsByTagName('li'),
            checked = 0,
            j = 0,
            id_remove = '';

        for(let i = 0; i < contact_list.length; i++) {
            if(contact_list[i].classList == 'checked') {
                checked++;
                j = i;
                id_remove = j; 
            }         
        }

        if(checked !== 1 ) {
            alert('choose one contact!');
        } else {
            contact_list[j].remove();
            id_remove = super.get()[j].id;
            super.remove(id_remove);
        } 

        checked = 0;
    };

    get() { 
        let count = super.get().length,  // количесвто объектов в массиве data 
            contact_info = document.createTextNode(super.get()[count - 1].id + ' ' + 
                                                   super.get()[count - 1].name + ' ' + 
                                                   super.get()[count - 1].email + ' ' + 
                                                   super.get()[count - 1].address + ' ' + 
                                                   super.get()[count - 1].phone),
            li = document.createElement('li'); 

        li.appendChild(contact_info);
        document.querySelector('.contacts_list').appendChild(li);      
    };

    clear_form() {
        //чищу форму
        document.querySelector('.id_input').value = '';
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

        //id_block
        this.id_block = document.createElement('div');
        this.id_block.classList.add('id_block');
        this.up_side.appendChild(this.id_block);

        this.id = document.createElement('p');
        this.id.innerHTML = 'ID: ';
        this.id_block.appendChild(this.id);

        this.id_input = document.createElement('input');
        this.id_input.classList.add('id_input');
        this.id_input.setAttribute('placeholder', 'ID...');
        this.id_block.appendChild(this.id_input);

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

        this.contacts_list = document.createElement('ul');
        this.contacts_list.classList.add('contacts_list');
        this.down_side.appendChild(this.contacts_list);
       
    };   
}

let app = new ContactsApp(obj);

app.app();
app.add_button.addEventListener('click', function() {
    app.onAdd();
    app.get();
});

app.remove_button.addEventListener('click', function() {
    app.onRemove();
});

app.edit_button.addEventListener('click', function() {
    app.onEdit();
})

let checked = document.querySelector('ul');
checked.addEventListener('click', function(element) {    
    if(element.target.tagName == 'LI') {
        element.target.classList.toggle('checked');
    }    
}, false);
