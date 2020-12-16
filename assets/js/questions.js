//questions
let quest = [
    {
    numb: 1,
    question: "From a group of 7 men and 6 women, five persons are to be selected to form a committee so that at least 3 men are there on the committee. In how many ways can it be done?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
  // you can uncomment the below codes and make duplicate as more as you want to add question
  // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....

  //   {
  //   numb: 6,
  //   question: "Your Question is Here",
  //   answer: "Correct answer of the question is here",
  //   options: [
  //     "Option 1",
  //     "option 2",
  //     "option 3",
  //     "option 4"
  //   ]
  // },
];


const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer_sec");
const next_btn = document.querySelector(".next_btn");
const timeText = document.querySelector(".timer .time_left_txt");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");


var que_count=0;
var timeValue=5;
var userScore=0;

result_box.style.display="none"
// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    const question = document.querySelector(".question");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ quest[index].question +'</span>';
    let option_tag =
    '<div class="option"><span class="option_txt"><img class="option_alph" src="A.png">'+ quest[index].options[0] +'</span></div>'
    + '<div class="option"><span class="option_txt"><img class="option_alph" src="B.png">'+ quest[index].options[1] +'</span></div>'
    + '<div class="option"><span class="option_txt"><img class="option_alph" src="C.png">'+ quest[index].options[2] +'</span></div>'
    + '<div class="option"><span class="option_txt"><img class="option_alph" src="D.png">'+ quest[index].options[3] +'</span></div>';

    question.innerHTML='Question no. '+quest[index].numb;
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

showQuetions(0);


function showResult() {
  console.log(userScore);
  quiz_box.classList.add("hide");
  quiz_box.style.display="none";
  result_box.style.display="block";
  result_box.innerHTML = 'Your score is : '+userScore;
}

next_btn.onclick = ()=>{
    if(que_count < quest.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        showQuetions(que_count); //calling showQestions function
        clearInterval(counter); //clear counter
        startTimer(10); //calling startTimer function
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        showResult(); //calling showResult function
    }
}

function optionSelected(answer){
  let userAns = answer.textContent; //getting user selected option
  let correcAns = quest [que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  answer.classList.add("selected"); //adding green color to matched option


  for(i=0; i < allOptions; i++){
    if(option_list.children[i].textContent != userAns){ //if there is an option which is matched to an array answer
      option_list.children[i].setAttribute("class", "option"); //adding green color to matched option
      console.log("Auto selected correct answer.");
    }
  }


  if(userAns == correcAns){ //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
  }

  /*else{
    answer.classList.add("incorrect"); //adding red color to correct selected option

    for(i=0; i < allOptions; i++){
      if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for(i=0; i < allOptions; i++){
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }*/
  next_btn.classList.add("show"); //show the next button if user selected any option
  console.log(userAns);
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if(time < 9){ //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if(time < 0){ //if timer is less than 0
      clearInterval(counter); //clear counter
      timeCount.textContent = "Time Out"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = quest[que_count].answer; //getting correct answer from array
      for(i=0; i < allOptions; i++){
        if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

startTimer(1);

//if user clicked on option
