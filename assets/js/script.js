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

//use body of the html for event propogation since the content of the page will change based on
//button clicks.
var getBodyEl = document.querySelector("body");
var expectedAnswer;
var actualAnswer;
var quizArray = jsonData.quiz;
var timerRunner;
var timer =60;
var scores =[];
var chosenQuestion;
var startPageEl = document.querySelector("#start-page");     
var questionPageEl = document.querySelector("#question-page");  
var quizCompletePageEl = document.querySelector("#quizComplete-page");   
var scoresPageEl = document.querySelector("#scores-page");   
var result;

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
      buttonEl.className = "user-choice btn";     
      buttonEl.textContent =options[i].id+". "+options[i].option;
      buttonEl.setAttribute("button-id",options[i].id );
      listItemEl.appendChild(buttonEl);
      listEl.appendChild(listItemEl);
    }     
    listContainerEl.appendChild(listEl);
}

var setTimerValue = function(){
    var timerEl = document.querySelector(".timerValue");   
    timerEl.textContent =timer;
    }
  
var startTimer = function(){
    timerRunner = setInterval(function(){
       
      if(timer <=0 )
      { 
        // Set to 0 incase the timer value has dropped below 0.
        timer = 0;     
        clearInterval(timerRunner);   
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
    document.querySelector(".lastpage").textContent = result;  
}

var printAllScores = function(){ 
    // Hide the header for this screen.
    var oldHeaderEl = document.querySelector("header");
    oldHeaderEl.remove();

    var scoreArray = JSON.parse(localStorage.getItem("scores"));
    if(scoreArray)
    {
        var ulListEl = document.querySelector("#score-list");
        for (var i=0; i<scoreArray.length; i++)
        {
            var listEl = document.createElement("li");
            listEl.textContent= (i+1)+". "+scoreArray[i].user +" - "+  scoreArray[i].score;
            ulListEl.appendChild(listEl);
        }      
    }
    scoresPageEl.hidden = false;   
}

// Save the scores in local storage.
var saveScores = function(userId, score)
{
     var scoreObj = {
            user : userId,
            score : score
            }; 
            
            var scoreArray = JSON.parse(localStorage.getItem("scores"));           
            if(!scoreArray)
            {
                scoreArray = [];                
            }   
            scoreArray.push(scoreObj);           
            localStorage.setItem("scores", JSON.stringify(scoreArray));
}

// This function will hide all sections. It will be used as a reset before setting any section to visible.
var hideAllPages = function(){
    startPageEl.hidden= true;        
    questionPageEl.hidden= true;
    quizCompletePageEl.hidden = true;
    scoresPageEl.hidden = true;   
}

var calculateScores = function(event) {
    actualAnswer = event.target.getAttribute("button-id");
    expectedAnswer = chosenQuestion.answer;   
    result = "Wrong!";
    if(expectedAnswer === actualAnswer)
    {
        result = "Correct!";
    }
    else
    {
        timer -=15;        
        if(timer < 0)
        {
            timer =0;
            setTimerValue();
        }
    }
}

/* The following is the main page handler that receives all button click events.
   The function will hide/unhide pages as required. 
   It will also call other functions to display dynamic content on the page. */
var updatePageHandler = function(event){
    var buttonClicked = event.target; 
    event.preventDefault(); 
    // When user clicks the start button start showing the questions and answer choices.
    // Also start the timer run.
    if (buttonClicked.matches("#start-btn"))
    {      
      // Hide all pages to start with. 
      // Conditionally unhide required sections in the following code.
      hideAllPages();
      questionPageEl.hidden= false;
      startTimer();
      printQuestions();      
    }  
    // When user chooses an answer show the next question or final score screen.
    else if(buttonClicked.matches(".user-choice"))
    { 
      hideAllPages();
      // When user chooses an answer calculate the result.
      calculateScores(event);      
      if(quizArray.length === 0)
      {
        //debugger;
        clearInterval(timerRunner);
        quizCompletePageEl.hidden = false;
        printFinalScore();       
      }
      else
      {
        questionPageEl.hidden= false;
        printQuestions();
        document.querySelector(".result").textContent = result;
      }
    }
    // On quiz completion allow user to enter intials and save the score.
    else if(buttonClicked.matches("#submit-score-btn"))
    {                                
        var userId = document.querySelector("input[name='testUser']").value;
        if(userId)
        {
            hideAllPages();
            saveScores(userId, timer);                      
            printAllScores();
        }
        else{
            alert("Please enter initials to save score!");
            return false;
        }  
    } 
    // When clear scores is pressed delete all scores from UI.
    // clean up localStorage.
    else if(buttonClicked.matches("#clearButton"))
    {    
        localStorage.clear();
        var ulEl = document.querySelector("ul");
        ulEl.remove();   
    } 
    // Show the start page again. Which can be achieved here by reloading the application.
    else if(buttonClicked.matches("#backButton"))
    {    
        location.reload();
    } 
    // Show user all saved scores when view scores is pressed.
    else if(buttonClicked.matches("#viewScores"))
    {
        hideAllPages();
        scoresPageEl.hidden = false; 
        printAllScores();
    }
}

//Set listeners on the 
getBodyEl.addEventListener("click", updatePageHandler);
getBodyEl.addEventListener("submit", updatePageHandler);
