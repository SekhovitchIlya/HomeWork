let Work_with_DOM = function() {
    this.addAtr = function(tag, atr, value) {
        let htmlTag = document.querySelector(tag);
        return htmlTag.setAttribute(atr, value);
    }
    this.createTag = function(tagName) {
        return document.createElement(tagName);
    }
    this.addClass = function(className, tag) {
        return tag.classList.add(className);        
    }
    this.app = function(tag, tagName) {
        return tag.appendChild(tagName);
    }
    this.addHTMLValue = function(tag, value) {
        return tag.innerHTML = value;
    }
}

// Начало. Создание HTML
let dom = new Work_with_DOM();

dom.addAtr('html', 'lang', 'ru');

let title_tag = dom.createTag('title');
dom.addHTMLValue(title_tag, 'JS Lesson 10');
dom.app(document.head, title_tag);

let metaUtf8 = dom.createTag('meta');
dom.app(document.head, metaUtf8);
dom.addAtr('meta', 'charset', 'UTF-8');

// body
let wrapper_tag = dom.createTag('div');
dom.addClass('wrapper', wrapper_tag);
dom.app(document.body, wrapper_tag);

let up_side_tag = dom.createTag('div');
dom.addClass('up_side', up_side_tag);
dom.app(wrapper_tag, up_side_tag);

let down_side_tag = dom.createTag('div');
dom.addClass('down_side', down_side_tag);
dom.app(wrapper_tag, down_side_tag);

//up_side
let contact_title_tag = dom.createTag('h2');
contact_title_tag.innerHTML = 'New contact';
dom.app(up_side_tag, contact_title_tag);

//name_block
let name_block = dom.createTag('div');
dom.addClass('name_block', name_block);
dom.app(up_side_tag, name_block);

let name_title_tag = dom.createTag('p');
name_title_tag.innerHTML = 'Name: ';
dom.app(name_block, name_title_tag);

let name_input_tag = dom.createTag('input');
dom.addClass('name_input', name_input_tag);
dom.app(name_block, name_input_tag);

//age_block
let age_block = dom.createTag('div');
dom.addClass('age_block', age_block);
dom.app(up_side_tag, age_block);

let age_title_tag = dom.createTag('p');
age_title_tag.innerHTML = 'Age:   ';
dom.app(age_block, age_title_tag);

let age_input_tag = dom.createTag('input');
dom.addClass('age_input', age_input_tag);
dom.app(age_block, age_input_tag);

//phone_block
let phone_block = dom.createTag('div');
dom.addClass('phone_block', phone_block);
dom.app(up_side_tag, phone_block);

let phone_title_tag = dom.createTag('p');
phone_title_tag.innerHTML = 'Phone:';
dom.app(phone_block, phone_title_tag);

let phone_input = dom.createTag('input');
dom.addClass('phone_input', phone_input);
dom.app(phone_block, phone_input);

// buttons
let btn_add_tag = dom.createTag('button');
btn_add_tag.innerHTML = 'Add contact';
dom.addClass('btn_add', btn_add_tag);
dom.app(up_side_tag, btn_add_tag);

let btn_clearAll_tag = dom.createTag('button');
btn_clearAll_tag.innerHTML = 'Delete All';
dom.addClass('btn_clearAll', btn_clearAll_tag);
dom.app(up_side_tag, btn_clearAll_tag);

let btn_clear_edit = dom.createTag('button');
btn_clear_edit.innerHTML = 'Delete Contact';
dom.addClass('btn_clear_edit', btn_clear_edit);
dom.app(up_side_tag, btn_clear_edit);

//down_side
let down_title_tag = dom.createTag('h2');
down_title_tag.innerHTML = 'Contacts List';
dom.app(down_side_tag, down_title_tag);

let ulList_tag = dom.createTag('ul');
dom.addClass('ulList', ulList_tag);
dom.app(down_side_tag, ulList_tag);
// Конец. Создание HTML

// ф-ция коструктор Contact
let Contact = function() {
    this.name = document.querySelector('.name_input').value;
    this.age = document.querySelector('.age_input').value;
    this.phone = document.querySelector('.phone_input').value;     

    this.addInfo = function() {  
        if(this.name == '' || this.age == '' || this.phone == '') {
            alert('All fields must be filled!');
            return false;
        } else {
            this.contact_info = document.createTextNode(this.name + '(' + this.age + ')  -  ' + this.phone);  
            document.querySelector('.name_input').value = '';    
            document.querySelector('.age_input').value = ''; 
            document.querySelector('.phone_input').value = '';
            return true;
        }       
    };

    this.showContact = function() {
        let li = document.createElement('li');
            checked_symbol = dom.createTag('div');
        
        li.appendChild(this.contact_info);
        document.querySelector('.ulList').appendChild(li);            
    };    

    this.clear = function() {
        let clearList = document.getElementsByTagName('li');   
        for(let i = clearList.length - 1; i >= 0; i--) {
            clearList[i].remove();
        }
    };
};

// ф-ция коструктор User
let User = function() { 
    Contact.apply(this, arguments);       // унаследовал 
    this.contactClear = this.clear;       // сохранил родительский метод
    
    this.clear = function() {             // переопределил метод родителя 
    // contactClear.call(this);           // вызов родительского метода
        let clearList = document.getElementsByTagName('li'),
            checked = 0,
            j = 0;

        for(let i = 0; i < clearList.length; i++) {
            if(clearList[i].classList == 'checked') {
                checked++;
                j = i; 
            }         
        }

        if(checked !== 1 ) {
            alert('choose one contact!');
        } else {
            clearList[j].remove();
        } 

        checked = 0;
    };  
};

let btnAddContact = document.querySelector('.btn_add'),
    btn_clearAll = document.querySelector('.btn_clearAll');
    
btnAddContact.addEventListener('click', function() {  
    let user = new User();
    if(user.addInfo() == true) {
        user.showContact();
    }     
});

btn_clearAll.addEventListener('click', function() {
    let user = new User();
    user.contactClear();
});

btn_clear_edit.addEventListener('click', function() {
    let user = new User();
    user.clear();
});

let clearL = document.querySelector('ul');
clearL.addEventListener('click', function(element) {    
    if(element.target.tagName == 'LI') {
        element.target.classList.toggle('checked');
    }    
}, false);