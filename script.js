var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if i click start/reset button
document.getElementById("startreset").onclick =
    function () {
//    if we are playing
    if (playing == true) {
            location.reload();//reload page
        } else {//changing mode to playing
            playing = true; 
//         setting score to 0
            score = 0;
            document.getElementById("scorevalue").innerHTML = score;
           
//           showing time box
            show("timeremaining");
            timeremaining = 60;
            document.getElementById("timeremainingvalue").innerHTML = timeremaining;
           // hide game over box
            hide("gameover");
           
           // changing button to reset game
            document.getElementById("startreset").innerHTML = "Reset Game";
           // play start game sound
			playsound("startgamesound");
			//paly sound as game continues
//			playsound("playsound");
			
//           startcountdown
            startcountdown();
			generateQA();
            
        }
    }

//clicking o answer box
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        // checking if we are playing
        if(playing == true){//yes
            if(this.innerHTML == correctAnswer){
                //correct
                //increasing score
                score++
                document.getElementById("scorevalue").innerHTML = score;
    
                //hide wrong box and show correct
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");         
                }, 1000);
				playsound("correctsound");
            // generate new Question
            generateQA();
    
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");         
                }, 1000);
				playsound("wrongsound");
                // generate QA
                //generateQA();

    
            }
    
        }
    }
}

//Function

//start counter
function startcountdown(){
   action = setInterval(function(){
        timeremaining -= 1;
       document.getElementById("timeremainingvalue").innerHTML = timeremaining;
       if(timeremaining == 0){
           stopcountdown();
           show("gameover");
		   playsound("gameoversound");
           document.getElementById("gameover").innerHTML ="<p>game over!</p><p>your score is "+ score +".</p>";
		   playing = false;
           hide("timeremaining");
           hide(correct);
           hide(wrong);
           document.getElementById("startreset").innerHTML ="Start Game";
          }
    },1000)
}
//stop counter
function stopcountdown(){
    clearInterval(action);
}

//hide elements
function hide(id){
    document.getElementById(id).style.display ="none";
}

//shop elements
function show(id){
    document.getElementById(id).style.display ="block";
}
//play sound function
function playsound(id){
	document.getElementById(id).play();
}

// generate mutiples question and answers
function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
   
    document.getElementById("question").innerHTML = x +"x" +y;
    var correctposition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctposition).innerHTML = correctAnswer;//one box filled with correct ans.
	//filling other boxes with wrong answers

	for(i=1;i<5;i++){
		if(i!==correctposition){
			var wrongAnswer;
			do {
				wrongAnswer =(1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random()));
			document.getElementById("box"+i).innerHTML = wrongAnswer;
			} while(wrongAnswer == correctAnswer)
			
		}
	}

}