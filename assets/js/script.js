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


var printQuestions = function(){
    var oldMainEl = document.querySelector(".content");
    //console.log(getBodyEl);
    //console.log(oldMainEl);
  
    chosenQuestion = quizArray.pop();
    //console.log(chosenQuestion);
  
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
}

var printFinalScore = function(){
}

var printHighScores = function(){
}

var updatePageHandler = function(event){

    event.preventDefault();
    var buttonClicked = event.target;
    
    if (buttonClicked.matches("#start-btn"))
    {
      console.log("start button clicked");
      printQuestions();    
      startTimer();
    }  
}


getBodyEl.addEventListener("click", updatePageHandler);
getBodyEl.addEventListener("submit", updatePageHandler);