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
var startPageEl = document.querySelector("#start-page");     
var questionPageEl = document.querySelector("#question-page");  
var quizCompletePageEl = document.querySelector("#quizComplete-page");   
var scoresPageEl = document.querySelector("#scores-page");   

var pages ={startPageEl: true, 
             };

var printQuestions = function(){
    chosenQuestion = quizArray.pop(); 
    var questionEl = document.querySelector("#question");
    questionEl.textContent = chosenQuestion.question;  
    //Add div and list containing the possible answers for the question
    var listContainerEl = document.querySelector("#answer");  
    var cleanUpPageEl = document.querySelector(".options"); 
    if(cleanUpPageEl)
    {
        cleanUpPageEl.remove();
    }
    
    var listEl = document.createElement("ul");
    listEl.className ="options";
  
    var options = chosenQuestion.options; 
    
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
    listContainerEl.appendChild(listEl);
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
    var scoreEl = document.querySelector("#finalScore");
    scoreEl.textContent = finalScore;
}

var printHighScores = function(){
    var oldHeaderEl = document.querySelector("header");
    oldHeaderEl.hidden = true;

    var scoreArray = JSON.parse(localStorage.getItem("scores"));

    //To DO : fix bug with highscores screen when link is pressed.
    if(scoreArray)
    {
        var ulListEl = document.querySelector("#score-list");
        for (var i=0; i<scoreArray.length; i++)
        {
            var listEl = document.createElement("li");
            listEl.textContent=scoreArray[i].user +" - "+  scoreArray[i].score;
            ulListEl.appendChild(listEl);
        }      
    }
}

var updatePageHandler = function(event){

    event.preventDefault();
    var buttonClicked = event.target;
    
    if (buttonClicked.matches("#start-btn"))
    {      
      startPageEl.hidden= true;        
      questionPageEl.hidden= false;
      quizCompletePageEl.hidden = true;
      scoresPageEl.hidden = true;   
      
      printQuestions();
    }  
    else if(buttonClicked.matches(".user-choice"))
    {      
      if(quizArray.length === 0)
      {
        startPageEl.hidden= true;        
        questionPageEl.hidden= true;
        quizCompletePageEl.hidden = false;
        scoresPageEl.hidden = true;  

        printFinalScore();
      }
      else{
        printQuestions();
      }      
    }
    else if(buttonClicked.matches("#submit-score-btn"))
    {   
        var userId = document.querySelector("input[name='testUser']").value;
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

            startPageEl.hidden= true;        
            questionPageEl.hidden= true;
            quizCompletePageEl.hidden = true;
            scoresPageEl.hidden = false; 

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
