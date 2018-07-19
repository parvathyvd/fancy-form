//Questions Array

const questions = [
    { question: 'Enter your first name'},
    { question: 'Enter your last name'},
    { question: 'Enter your email',pattern: /\S+@\S+\.\S+/},
    { question: 'Create a password', type: 'password'}
]

//transition times

const shakeTime = 100;
const switchTime  = 200;


// init position at first question

let position = 0;

//init DOM elements

const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');



const getQuestion = ()=> {

//get the current question
inputLabel.innerHTML = questions[position].question;

//get type
inputField.type = questions[position].type || 'text';

//get current answer
inputField.value = questions[position].answer || '';

//Focus on the current element
inputField.focus();

//Progress bar width variable to questions lenght
progress.style.width = (position*100)/questions.length + '%';

//add user icon or back arrow depending upon question

prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

showQuestion();
}

const showQuestion = () =>{

    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

//Hide question

const hideQuestion = () => {
    inputGroup.style.opacity = 0;
    inputProgress.style.transition = '';
    inputProgress.style.width = 0;
    inputGroup.style.border = null;
}

// Transform to make a shake motion

const transform = (x,y) => {
    formBox.style.transform = `translate(${x}px,${y}px)`;
}


// Validate 

const validate = () => {
    // Make sure pattern matches if there is one

    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    }else{
            inputPass();
        }
}

// Field Input Fail

const inputFail = ()=>{
    formBox.className = 'error';
    //repeat shake motion
    for (i=0; i<6; i++){
        setTimeout(transform, shakeTime * i,((i%2)*2-1)*20,0);
        setTimeout(transform, shakeTime*6, 0, 0);
        inputField.focus();
    }
}

//input pass
const inputPass = ()=>{
    formBox.className = '';
    setTimeout(transform,shakeTime*0,0,10);
    setTimeout(transform,shakeTime*1,0,0);

    //Increment postion
    position++;

    //if new question hide current and get next

    if(questions[position]){
        hideQuestion();
        getQuestion();
    }
    else{
        //Remove if no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';
        formComplete();
    }
}

// All fields Complete h1 show

const formComplete = () => {
    const h1 = document.createElement('h1');
    h1.addClass('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are
    registered and will get an email shortly`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
    })
}



// Events

//Get questions on DOM load

document.addEventListener('DOMContentLoaded',getQuestion);

//Next button click

nextBtn.addEventListener('click', validate);

//input field event

inputField.addEventListener('keyup', e=> {
    if(event.keyCode == 13){
        validate();
    }
})


