const jsonData = {
    "quiz":[
        {"question": "Arrays in JavaScript can be used to store ________.",
         "id" : "1",
          "options":[{"id":"1","option":"numbers and strings"}, 
                      {"id":"2", "option": "other arrays"},
                      {"id": "3", "option": "boolens"},
                      {"id": "4", "option" : "all of the above" }
                    ],             
           "answer": "4"         
         },
         {"question": "A very userful tool used during development and debugging for printing content to debugger is:",
           "id" : "2",
           "options":[{"id":"1","option":"JavaScript"}, 
                      {"id":"2", "option": "terminal/bash"},
                      {"id":"3", "option": "for loops"},
                      {"id":"4", "option" : "console.log" }
                    ],             
             "answer": "4"         
           },
           {"question": "Which of the following is NOT a reason to validate a user's responses?",
           "id" : "3",
           "options":[{"id":"1","option":"Offers the user an opportunity to enter a correct response."}, 
                      {"id":"2", "option": "Reduces bogus answers getting stored in the database."},
                      {"id":"3", "option": "Improves the user experience."},
                      {"id":"4", "option" : "Increases the overall quality of the user data." }
                    ],             
             "answer": "3"         
           },
           {"question": "Which statement correctly stores data into the Web Storage API?",
           "id" : "4",
           "options":[{"id":"1","option":"localStorage.getItem('lunch', 'sandwich');"}, 
                      {"id":"2", "option": "localStorage.setItem('lunch', 'sandwich');"},
                      {"id":"3", "option": "getItem.localStorage.('lunch', 'sandwich');"},
                      {"id":"4", "option" : "setItem.localStorage('lunch', 'sandwich');" }
                    ],             
             "answer": "4"         
           }  
       ] 
 };

//To do: form.reset();
//Error message if username is empty

//use body of the html for event propogation since the content of the page will change based on
//button clicks.
var getBodyEl = document.querySelector("body");
var expectedAnswer;
var actualAnswer;
var quizArray = jsonData.quiz;
var timerRunner;
var timer =60;
var scores =[];
var scoreCount=0;
var chosenQuestion;

var printQuestions = function(){
    var oldMainEl = document.querySelector(".content");
    chosenQuestion = quizArray.pop();
 
    //Create the new main section for the page.
    var newMainEl = document.createElement("main");
    newMainEl.className="content";
  
    //Added header for the main section. A div with h3 element.
    var divHeaderEl = document.createElement("div");
    var questionEl = document.createElement("h3");
    questionEl.className="row-header";
    questionEl.textContent = chosenQuestion.question;
  
    //Add div and list containing the possible answers for the question
    var divListEl = document.createElement("div");
    var listEl = document.createElement("ul");
    listEl.className ="options";
  
    var options = chosenQuestion.options;
    //debugger;
    for (var i=0; i< options.length; i++)
    {
      var listItemEl = document.createElement("li");
      var buttonEl = document.createElement("button");
      buttonEl.type ="button";
      buttonEl.className = "user-choice";
      buttonEl.className +=" btn";
      buttonEl.textContent =options[i].id+". "+options[i].option;
      buttonEl.setAttribute("button-id",options[i].id );
      listItemEl.appendChild(buttonEl);
      listEl.appendChild(listItemEl);
    }  
      //Being reset to current question not the previous one  
      divListEl.appendChild(listEl);
      divHeaderEl.appendChild(questionEl);
  
      newMainEl.appendChild(divHeaderEl);
      newMainEl.appendChild(divListEl) 
      getBodyEl.replaceChild(newMainEl, oldMainEl); 
}

var printResults = function(result) {    
    var mainWithResultEl = document.querySelector(".content");
    console.log(mainWithResultEl);

    var checkForResultEl = document.querySelector(".result");

    if(!checkForResultEl)
    {
      var divResultEl = document.createElement("div");
      var resultEl = document.createElement("h3");
      resultEl.className = "row-header";
      resultEl.className += " result";
      resultEl.textContent = result;
      console.log(resultEl);
  
      divResultEl.appendChild(resultEl);
      mainWithResultEl.appendChild(divResultEl);   
    }
    else
    {
      checkForResultEl.textContent = result;
    } 
}

var setTimerValue = function(){
    var timerEl = document.querySelector(".timerValue");   
    timerEl.textContent =timer;
    }
  
  var startTimer = function(){
    timerRunner = setInterval(function(){
       
      if(timer <=0 )
      {      
        clearInterval(timerRunner);
        console.log("show score"); 
        printFinalScore(); 
      }
      else{
        timer -=1;
        setTimerValue();     
      }
    },1000);
  }
  

var printFinalScore = function(){
    var finalScore = timer;
    setTimerValue();
    var oldMainEl = document.querySelector(".content");

    var newFinalScoreMainEl = document.createElement("main");
    newFinalScoreMainEl.className = "content";
    newFinalScoreMainEl.className +=" score-content";

    var divHeaderEl = document.createElement("div");
    var h3HeaderEl = document.createElement("h3");
    h3HeaderEl.textContent = "All done!";
    divHeaderEl.appendChild(h3HeaderEl);

    var divScoreEl = document.createElement("div");
    var h4ScoreEl = document.createElement("h4");
    h4ScoreEl.innerHTML = "Your final score is <span class='scoreSpan'>"+finalScore+"</span>";
    divScoreEl.appendChild(h4ScoreEl);

    var formEl = document.createElement("form");
    formEl.className ="submitForm";
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter initials:";
    labelEl.htmlFor = "test-user";
    var inputEl = document.createElement("input");
    inputEl.name = "test-user";
    inputEl.id = "test-user";
    inputEl.required = true;
    var submitButtonEl = document.createElement("button");
    submitButtonEl.className="btn";
    submitButtonEl.type ="button";
    submitButtonEl.id = "submit-score-btn";
    submitButtonEl.textContent ="Submit"
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitButtonEl);

    newFinalScoreMainEl.appendChild(divHeaderEl);
    newFinalScoreMainEl.appendChild(divScoreEl);
    newFinalScoreMainEl.appendChild(formEl);

    getBodyEl.replaceChild(newFinalScoreMainEl, oldMainEl);
}

var printHighScores = function(){
    var oldHeaderEl = document.querySelector("header");
    var newHeaderEl = document.createElement("header");
    var divEl = document.createElement("div");
    divEl.className="highscore";
    var h2El = document.createElement("h2");
    h2El.textContent ="High Scores";
    divEl.appendChild(h2El);
    newHeaderEl.appendChild(divEl);

    getBodyEl.replaceChild(newHeaderEl, oldHeaderEl);

    var scoreArray = JSON.parse(localStorage.getItem("scores"));

    //To DO : fix bug with highscores screen when link is pressed.
    if(scoreArray)
    {
        var oldMainEl = document.querySelector("main");
        var newMainEl = document.createElement("main");
        var divScoreEl = document.createElement("div");
        divScoreEl.className = "highscore";
        var ulListEl = document.createElement("ul");  
        for (var i=0; i<scoreArray.length; i++)
        {
        var listEl = document.createElement("li");
        listEl.textContent=scoreArray[i].user +" - "+  scoreArray[i].score;
        ulListEl.appendChild(listEl);
        }
        divScoreEl.appendChild(ulListEl);
        newMainEl.appendChild(divScoreEl);
    }

    var divNextEl = document.createElement("div");
    divNextEl.className = "highscore";
    var buttonBackEl = document.createElement("button");
    buttonBackEl.textContent  ="Go Back";
    buttonBackEl.id = "backButton";
    buttonBackEl.type ="submit";
    buttonBackEl.className="btn";
    var buttonClearEl = document.createElement("button");
    buttonClearEl.textContent = "Clear high scores";
    buttonClearEl.id = "clearButton";
    buttonClearEl.type ="submit";
    buttonClearEl.className="btn";
    divNextEl.appendChild(buttonBackEl);
    divNextEl.appendChild(buttonClearEl);  
    newMainEl.appendChild(divNextEl);

    getBodyEl.replaceChild(newMainEl, oldMainEl);
}

var updatePageHandler = function(event){

    event.preventDefault();
    var buttonClicked = event.target;
    
    if (buttonClicked.matches("#start-btn"))
    {
      var hiddenSection = document.querySelector("#question-page");
      console.log(hiddenSection);
      hiddenSection.hidden= false;
      console.log(hiddenSection);
      console.log("start button clicked");
      printQuestions();    
      startTimer();
    }  
    else if(buttonClicked.matches(".user-choice"))
    {
        actualAnswer = event.target.getAttribute("button-id");
        expectedAnswer = chosenQuestion.answer;  

        console.log(expectedAnswer);
        console.log(actualAnswer);   
        var result = "Wrong!";
        if(expectedAnswer === actualAnswer)
        {
        result = "Correct!";
        }
        else{
            timer -=15;
            
            if(timer < 0)
            {
            timer =0;
            setTimerValue();
            }
        }
        console.log(result);

        if(quizArray.length >0)
        {
        console.log("Answered the question");
        printQuestions();
        }
        else
        {
        clearInterval(timerRunner);
        console.log("show score"); 
        printFinalScore(); 
        } 
        printResults(result);    
    }
    else if(buttonClicked.matches("#submit-score-btn"))
    {    
        var userId = document.querySelector("input[name='test-user']").value;

        if(userId)
        {
            var score =timer; 
            scoreCount++;
            var scoreObj = {
            user : userId,
            score : score
            }; 

            console.log(scoreObj);
            var scoreArray = JSON.parse(localStorage.getItem("scores"));
            console.log("scoreAray ", scoreArray);

            if(!scoreArray)
            {
            scoreArray = [];
            }   
            console.log("scoreAray ", scoreArray);
            scoreArray.push(scoreObj);
            console.log("scoreAray ", scoreArray);
            //debugger;
            localStorage.setItem("scores", JSON.stringify(scoreArray));
            printHighScores();
        }
        else{
            alert("Please enter intials to save score!");
        }        
    } 
    else if(buttonClicked.matches("#clearButton"))
    {    
        localStorage.clear();
        var ulEl = document.querySelector("ul");
        ulEl.remove();   
    } 
    else if(buttonClicked.matches("#backButton"))
    {    
        location.reload();
    } 
    else if(buttonClicked.matches("#viewScores"))
    {
        printHighScores();
    }
}


getBodyEl.addEventListener("click", updatePageHandler);
getBodyEl.addEventListener("submit", updatePageHandler);
