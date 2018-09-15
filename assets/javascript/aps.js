var dummyGame = {
    "questionText": "",
    "rightAns": "",
    "wrongAns": [],
    };
    
    var triviaGame  = {
        "startGame": false,
        "pushDone": false,
        "questionFlag": false,
        "answerEvalFlag": false,
        "pastQuestions": [],
        "intervalId": 0,
        "goodAns": 0,
        "badAns": 0,
        "score": 0,
        "questArr": [],
        
        "finishFn": function() {
    
        },
    
        "questions": [
            {"question": "Who invented the Stratocaster?", "rightAns1": "Fender", "wrongAns1":["Gibson", "Ibanez", "God"]},
            {"question": "Who invented the Les Paul?", "rightAns1": "Gibson", "wrongAns1":["Fender", "Ibanez", "God!"]},
            {"question": "Who uses a Telecaster?", "rightAns1": "Bruce Springteen", "wrongAns1":["Slash", "God", "Kurt Cobain"]},
            {"question": "Who uses an SG?", "rightAns1": "Angus Young", "wrongAns1":["Slash", "Tom Morello", "The Edge"]},
            {"question": "Where's Ibanez From?", "rightAns1": "Japan", "wrongAns1":["Usa", "China", "Uk"]},
            {"question": "Who uses a Stratocaster?", "rightAns1": "David Gilmour", "wrongAns1":["Tom Morello", "God", "Kurt Cobain"]},        ],
    
        "pushFn": function() {
            if (!this.pushDone) {
                $(triviaGame.questions).each(function(index, element) {
                    var quest = jQuery.extend(true, {}, dummyGame);
                    quest.questionText = element.question;
                    quest.rightAns = element.rightAns1;
                    quest.wrongAns = element.wrongAns1;
    
                    triviaGame.questArr.push(quest);
                                 
                });
                triviaGame.pushDone = true;
            }
        },
    
        "rndmSelectfn": function(){
            if (this.pushDone && !this.questionFlag) {
            
                do {
                    flag = false;
                    var random = Math.floor(Math.random() * triviaGame.questArr.length);
                    var quest = triviaGame.questArr[random];
                    
                    if (triviaGame.pastQuestions.indexOf(quest) == -1) {
                        triviaGame.pastQuestions.push(quest);
                        flag = true;
                    } 
                } while (!flag);
                triviaGame.questionFlag = true;
                triviaGame.answerEvalFlag = false;
            }
            this.timer(15);
            console.log("question timer");
        },
    
        "answerEval": function(answer){ 
            if (triviaGame.pushDone && triviaGame.questionFlag && !triviaGame.answerEvalFlag) {
                    if(triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAns==answer){
                    
                    console.log("chido");
                    triviaGame.goodAns ++;
                    
                    $("#score").html(triviaGame.score);
                    var target1 = $(".holder");
                    target1.empty();
                    var rightAnsBox = $("<div>");
                    rightAnsBox.text("You are correct!");
                    target1.append(rightAnsBox);

                }
                else{
                    console.log("alv!");
                    triviaGame.badAns ++;
                    
                    $("#score").html(triviaGame.score);
                    var target1 = $(".holder");
                    target1.empty();
                    var wrongAnsBox = $("<div>");
                    wrongAnsBox.text("The correct answer is: "+triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAns);
                    target1.append(wrongAnsBox);
                    
                }
                
                    this.stopTimer();
                    this.finishFn();
                    triviaGame.questionFlag = false;
                    triviaGame.answerEvalFlag = true;
            
                }
        },
    
        "timer": function(val){
            var number = val;
    
            
            function run() {
            triviaGame.intervalId = setInterval(decrement, 1000);
            }
                function decrement() {
                number--;
                    if (number === 0 && triviaGame.questionFlag) {
                        triviaGame.stopTimer();                   
                        triviaGame.finishFn();
                        triviaGame.questionFlag = false;
                        triviaGame.answerEvalFlag = true;
                        triviaGame.badAns ++;         
                    }
                    else if (number === 0 && triviaGame.answerEval){
                        triviaGame.stopTimer();
                        triviaGame.continue();
                    }
                    console.log(number);
                    $("#timer").html("Time: "+number);
                } 
                run();
        },
    
        "stopTimer": function(){
            clearInterval(triviaGame.intervalId);
        },
    
    
    
        "finishFn": function (){
            if (this.questArr.length == this.pastQuestions.length) {
                triviaGame.score = Math.floor((triviaGame.goodAns/(triviaGame.badAns+triviaGame.goodAns))*100); 
                //alert("Wel Done" + " " + this.goodAns + " " + this.badAns);
                var target1 = $(".holder");
                target1.empty();
                var triviaScore = $("<h3>");
                triviaScore.text("Score: "+triviaGame.score + "%");
                target1.append(triviaScore);
                var triviaScore2 = $("<h3>");
                triviaScore2.text("Good answers: "+triviaGame.goodAns);
                target1.append(triviaScore2);
                var triviaScore3 = $("<h3>");
                triviaScore3.text("Bad answers: "+triviaGame.badAns);
                target1.append(triviaScore3);

            }
            else{
                this.timer(5);
                console.log("continue timer");
                
                var target1 = $(".holder");
                
                var continueButton = $('<div>');
                continueButton.attr('class', "col-m-4 button align");
                continueButton.attr('id', "button1");
                continueButton.text("Continue?");
                target1.append(continueButton);
                $('#button1').on('click', function(event){
                    triviaGame.continue();
                });
              
            }
         },

         "questionDomGen": function() {
            var target1 = $(".holder");
            target1.empty();
            var randArr = [];
            var ansArr = triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].wrongAns;
            ansArr.push(triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAns);
            console.log(ansArr);
          
            var triviaQuestion = $("<h3>");
            triviaQuestion.text(triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].questionText);
            target1.append(triviaQuestion);
          
    
            for(var i = 0; i < 4; i++) {
                
                do {
                    var flag1 = false;
                    var rand = Math.floor(Math.random() * 4);
                    var select = ansArr[rand];
                    
                    if (randArr.indexOf(select) == -1) {
                        randArr.push(select);
                        flag1 = true;
                    } 
                } while (!flag1);
                var triviaAnswer = $('<div>');
                triviaAnswer.text(randArr[i]);
                triviaAnswer.attr('class', "col-m-4 button align");
                triviaAnswer.attr('id','bttn2')
                target1.append(triviaAnswer);

               
            }
            $(document).delegate('#bttn2', 'click', function(event){
                console.log(event);
                console.log(event.currentTarget.innerText);
                var userAns = event.currentTarget.innerText;
                triviaGame.answerEval(userAns);
            });
            console.log(randArr);

        },
    
    
       "continue": function () {
        this.stopTimer();
        this.rndmSelectfn();
        this.questionDomGen();
        },
    
        "startButton": function() {
            var target = $(".holder")
            var button = $("<div>")
            button.attr("class", "col-m-4 button align");
            button.attr("id", "btn");
            var span = $("<span>");
            span.text("Start");
            //span.attr("class", "button");
            button.append(span);
            target.append(button);
            $(document).delegate('#btn','click',function(event){
                //console.log(event);
                triviaGame.pushFn();
                triviaGame.rndmSelectfn();
                triviaGame.questionDomGen();
            });
        },

       
    }; 

    $(document).ready(function() {
        triviaGame.startButton();
        
        //$("#question").html($(triviaGame.pastQuestions).text());
     });
    