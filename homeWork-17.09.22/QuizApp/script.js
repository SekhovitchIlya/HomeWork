const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

function quizApp() {

    let btn = document.getElementById('btn'),
        btn_reload = document.getElementById('btn_reload'),
        question = document.getElementById('question'),
        rezult = document.getElementById('rezult'),
        rezult_block = document.getElementById('rezult_block'),
        answers_block = document.getElementById('answers_block'),
        answ_a = document.getElementById('answ_a'),
        answ_b = document.getElementById('answ_b'),
        answ_c = document.getElementById('answ_c'),
        answ_d = document.getElementById('answ_d'),
        radio = document.getElementsByName('answer'),
        correct_count = 0,
        checked_count = 0,
        count = 0;  
        
    btn_reload.style.display = 'none';
    rezult_block.style.display = 'none';

    btn.addEventListener('click', function() {  
        // Проверка если не выбран ни один из вариантов ответа
        for (let i = 0; i < radio.length; i++) {
            if(radio[i].checked == true) {            
                checked_count ++;
            }
        }

        if(checked_count == 0) {
            alert('You must choose one of the answers');
        } else {
            checked_count = 0;
            // Проверка ответа на правильность
            for ( i = 0; i < quizData.length; i++) {
                if(radio[i].checked == true && radio[i].id == quizData[count].correct) {
                    correct_count++;
                }                 
                radio[i].checked = false;
            }
            // Отображение результатов
            if(count == 3) {
                answers_block.style.display = 'none';
                question.style.display = 'none';
                btn.style.display = 'none';
                rezult.textContent = ('You answered ' + correct_count + '/' + quizData.length + ' questions correctly');
                rezult_block.style.display = 'block' ;          
                btn_reload.style.display = 'block';
               
                btn_reload.addEventListener('click', function() {
                    rezult_block.style.display = 'none' ;          
                    btn_reload.style.display = 'none';
                    answers_block.style.display = 'block';
                    question.style.display = 'block';
                    btn.style.display = 'block';
                })
            }
    
            count++ ;
            // Обнуляю счетчики
            if(count > quizData.length - 1) {           
                count = 0;
                correct_count = 0;
            }
            // Следующий вопрос
            question.textContent = quizData[count].question;
            answ_a.textContent = quizData[count].a;
            answ_b.textContent = quizData[count].b;
            answ_c.textContent = quizData[count].c;
            answ_d.textContent = quizData[count].d;     
        }         
    })  
} 

quizApp();