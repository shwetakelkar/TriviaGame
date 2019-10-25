$(document).ready(function() {
    var objArray = [
            
        {
        question:"Finish the quote. 'Life is like a box of_______.",
        options:[
            ["chocolate", true], 
            ["fruit", false],
            ["suprise",false],
            ["fun", false]
        ],
        image:"assets/images/chocolate-img5.jpg"
            
        },
        {
        question:"What was the name of the shrimping business?",
        options:[
            ["Gump bubba shrimp company",false],
            ["Bubba gump shrimp company",true],
            ["Bubba gump fish company",false],
            ["Bubba gump prawn company",false]
        ],
        image:"assets/images/shrimpcomp-img4.jpg"

        },

        {
            question:"What bus number was Forrest supposed to take to get to Jenny's house?",
            options:[
                ["5", true], 
                ["6", false],
                ["9",false],
                ["11", false]
            ],
            image:"assets/images/bus.jpg"
        },
        {
            question:"Which country did the American ping-pong team travel to?",
            options:[
                ["Hong kong", false], 
                ["Vietnam", false],
                ["China",true],
                ["India", false]
            ],
            image:"assets/images/pingpong.jpg"
        },
        {
            question:"Who was the girl that Forrest ended up marrying?",
            options:[
                ["Susan", false], 
                ["Dorthy", false],
                ["Anna",false],
                ["Jenny", true]
            ],
            image:"assets/images/forrest-gump-img1.jpg"
        },
        {
            question:"What did Forrest name his boat?",
            options:[
                ["Bubba", false], 
                ["Gump", false],
                ["Jenny",true],
                ["Bubba Gump", false]
            ],
            image:"assets/images/boat-img3.jpg"
        },
        {
            question:"At the beginning of the movie, what does the principal say that Forrest's IQ is?",
            options:[
                ["45", false], 
                ["60", false],
                ["75",true],
                ["90", false]
            ],
            image:"assets/images/teacher-img.jpg"
        },
        {
            question:"What foods did Forrest use to describe him and Jenny?",
            options:[
                ["spaghetti and meatballs ", false], 
                ["peas and  carrot", true],
                ["bread and butter",false],
                ["Wine and whiskey ", false]
            ],
            image:"assets/images/forrest-gump-img1.jpg"
        }
    ];
    //Defining Global variables
    var correct = 0;
    var unAnswered=0;
    var inCorrect = 0;
    var correctAnswer="";
    var imgSrc ="";
    var counter = 0;
    var intervalId,intervalTimerId;
/*------------------------------------------
This event call when 'start' and 'start over'
button get clicked.
-----------------------------------------*/

    $("#buttonId").on("click",function(){
       
        $("#buttonId").hide();
        
        newquestionAnswerPageCall(objArray);
       
    });
/*--------------------------------------
This event call when answer link get
clicked.and give the user choice.
----------------------------------------*/    
    $('#optionsDiv').on("click",'a',function(e){
        e.preventDefault();
        var userChoice = e.target.text;
        resultFunction(userChoice);
    });
    
/*
----------------------------------------
 this function rander the new set of question
 and answer with DOM changes with some
  dynamic html elements.
 it also update the value count 'i'
 and empty previous page informations.
 This is also avail the functionality of 
 start over or reset.

 param:None
 return:None
-----------------------------------------
*/
function newquestionAnswerPageCall() {

    $("#optionsDiv").empty();
    $("#quetionId").empty();
    $("#timer").empty();
    
    if(counter === (objArray.length))
    {
        stop();
        $("#timer").html("<h4>All done, heres how you did</h4><br> Correct Answers: "+ correct +"<br> Incorrect Answers : "+ inCorrect +"<br> Unanswered: "+unAnswered);
        $("#buttonId").show();
        $("#buttonId").text("start over?");
        counter = 0,correct =0, inCorrect=0, unAnswered=0;

    }else{
        
        runTimer();
        
        var question = objArray[counter].question;
        var options = objArray[counter].options;
        imgSrc = objArray[counter].image;

        $("#headerId").append("<br><br>");
    
        var questionElement = $("<div>");
        questionElement.text(question);
        questionElement.attr("id","divId");
        $("#quetionId").append(questionElement);
        
        for (var j = 0; j < options.length; j++) {

            var optionList = [];
            optionList.push(options[j][0]);
            if(options[j][1])
            {
                correctAnswer = options[j][0];
                
            }

            var listElement = $("<li>");
            var optionsElement = $("<a>");
            

            optionsElement.attr("href","javascript:void[0]");
            optionsElement.attr("class","linkcls");
            optionsElement.text(optionList);
            optionsElement.appendTo(listElement);
            listElement.appendTo($('#optionsDiv'));
                
        }
        counter++;
    }
}
/*-----------------------------------------
This function use window method setInterval 
to set a timer of 30 second for each set of
quetion answer options.
and display it on screen 

param:None
return:None
-----------------------------------------*/
 
function runTimer()
{
    
    var num = 30;
    $("#timer").html("<div>Time Remaining : "+ num +" seconds</div>");
    intervalTimerId = setInterval(function decrement(){
        
        num --;
        $("#timer").html("<div>Time Remaining : "+ num +" seconds</div>");
       
        if(num === 0)
        {
            resultFunction("TimeOut");
        }
        
    },1000);
}
/*
----------------------------------------
 this function call the result page with
 correct answer and time count.
 it also update the value of total correct
 answers, incorrect answers and unanswered 
 one.
 param:Userchoice :string
-----------------------------------------
*/
function resultFunction(userChoice) {

    $("#optionsDiv").empty();
    clearInterval(intervalTimerId);

    if (userChoice == correctAnswer) {
        $("<p>").text("Correct!!").appendTo("#optionsDiv");
        correct++;
    }
    
    else {
        if(userChoice === "TimeOut"){
            $("<p>").text("Out of Time!!").appendTo("#optionsDiv");
            unAnswered++;
        }  
        else{
            $("<p>").text("Nope!!").appendTo("#optionsDiv");
            inCorrect++;
        }

        $("<p>").text("The correct answer was:  " + correctAnswer).appendTo("#optionsDiv");
        
    }
    var imageElement = $("<img>");
    imageElement.attr("src", imgSrc);
    imageElement.appendTo("#optionsDiv");
    
    resume();
    
}
/*--------------------------------------------
This function use window method setTimeout 
to set a timer of 2 second for each set of
between result page and next question answer
set.

param:None
return:None
--------------------------------------------*/
function resume()
{
    intervalId = setTimeout(newquestionAnswerPageCall,2*1000);
    
}
/*--------------------------------------------
This function use window method to clear the 
interval set earlier

param:None
return:None
--------------------------------------------*/ 
function stop()
{
    clearTimeout(intervalId);
}
   

})


