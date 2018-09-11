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
        {"question": "my age?", "rightAns1": "28", "wrongAns1":["12", "13", "100"]},
        {"question": "your age?", "rightAns1": "12", "wrongAns1":["28", "13", "100"]},
        {"question": "our age?", "rightAns1": "100", "wrongAns1":["12", "13", "28"]},
    ],

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
        if (triviaGame.pushDone && triviaGame.questionFlag && !triviaGame.answerEvalFlag && triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAns==answer) {
            triviaGame.questionFlag = false;
            triviaGame.answerEvalFlag = true;
            this.goosAns++;
            this.showRightAnsw();
            console.log("chido");
        }
        else{
            console.log("alv!");
            this.badAns++;
                console.log("Wrong, the Right answer is: "+console.log(this.pastQuestions[this.pastQuestions.length-1].rightAnswers));
                //Show wrong answer function
                this.showWrongAns();
        }
    this.stopTimer();
    this.finishFn();
    this.questionFlag = false;
    this.answerEvalFlag = true;
    },

    "timer": function(val){
        var number = val;

        
        function run() {
        triviaGame.intervalId = setInterval(decrement, 1000);
        }
            function decrement() {
            number--;
                if (number === 0 && triviaGame.questionFlag) {
                    triviaGame.badAns++;
                    triviaGame.stopTimer();                   
                    triviaGame.finishFn();
                    triviaGame.showWrongAns();
                    triviaGame.finishEvalFunc();
                    triviaGame.questionFlag = false;
                    triviaGame.answerEvalFlag = true;         
                }
                else if (number === 0 && triviaGame.answerEval){
                    triviaGame.stopTimer();
                    triviaGame.continue();
                }
                console.log(number);
                //$("#timer").empty();
                $("#timer").html("Time: "+number);
            } 
            run();
    },

    "stopTimer": function(){
        clearInterval(triviaGame.intervalId);
    },



    // "finishFn": function (){
    //     if (this.questArr.length == this.pastQuestions.length) {
    //         alert("Wel Done" + " " + this.goodAns + " " + this.badAns);
    //         this.score = Math.round(((this.goodAns / (this.goodAns+this.badAns))*100));
    //         console.log("finish your score is: "+this.score+"%");
    //         var target = $(".holder");
    //         var button = $("<div>");
    //         button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 buttonC align");
    //         button.attr("id", "btn2");
    //         var span = $("<span>");
    //         span.text("Finish!");
    //         span.attr("class", "buttonC");
    //         button.append(span);
    //         target.append(button);
    //         $(document).delegate('#btn2','click',function(event){
    //             console.log("finish");
    //             triviaGame.finishFn();
    //         });
    //    }
    //     else{
    //         this.timer(15);
    //         console.log("continue timer");
            
    //         //Show Dom
    //         var target = $(".holder");
    //         var button = $("<div>");
    //         button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 buttonC align");
    //         button.attr("id", "btn1");
    //         var span = $("<span>");
    //         span.text("Continue!");
    //         span.attr("class", "buttonC");
    //         button.append(span);
    //         target.append(button);
    //         $("#btn1").on('click',function(event){
    //             //console.log(event);
    //             triviaGame.continue();
    //         });
    //     }
    //  },

    "finishEvalFunc": function() {
        if (this.pushDone && this.questionFlag && this.pastQuestions.length == this.questArr.length) {
            this.score = Math.round(((this.goodAns / (this.goodAns+this.badAns))*100));
            console.log("finish your score is: "+this.score+"%");
            var target = $(".holder");
            var button = $("<div>");
            button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 buttonC align");
            button.attr("id", "btn2");
            var span = $("<span>");
            span.text("Finish!");
            span.attr("class", "buttonC");
            button.append(span);
            target.append(button);
            $(document).delegate('#btn2','click',function(event){
                console.log("finish");
                triviaGame.finishFn();
            });
            //FinishFunc
        } else {
            console.log("Continue");
            triviaGame.timer(20);
            //Show Dom
            var target = $(".holder");
            var button = $("<div>");
            button.attr("class", "col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 buttonC align");
            button.attr("id", "btn1");
            var span = $("<span>");
            span.text("Continue!");
            span.attr("class", "buttonC");
            button.append(span);
            target.append(button);
            $("#btn1").on('click',function(event){
                //console.log(event);
                triviaGame.continue();
            });

        }
        
    }, 

    "finishFn": function() {
        var target = $(".holder");
        target.empty();
        var finishHol = $("<div>");
        finishHol.attr("class", "col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 align alert alert-dark");
        
        var scoreH = $("<h5>");
        scoreH.text("Score: "+triviaGame.score);
        var rightAnsH = $("<h5>");
        rightAnsH.text("Right Answers: "+triviaGame.goodAns);
        var wrongAnsH = $("<h5>");
        wrongAnsH.text("Wrong Answers: "+triviaGame.badAns);

        finishHol.append(scoreH);
        finishHol.append(rightAnsH);
        finishHol.append(wrongAnsH);
        target.append(finishHol);
    },
    "continueFunc": function() {
        triviaGame.stopTimer();
        this.rndmSelectfn();
        this.questionDomGen();

    },
    "showRightAnsw": function() {
        var target = $(".holder");
        target.empty();
        var wrongAnsHol = $("<div>");
        wrongAnsHol.attr("class", "col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 align alert alert-success");
        var wrongAnsText = $("<h3>");
        wrongAnsText.text(triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAnswers+" is the right answer!");
        wrongAnsHol.append(wrongAnsText);
        target.append(wrongAnsHol);    
    },
    "showWrongAns": function() {
        var target = $(".holder");
        target.empty();
        var wrongAnsHol = $("<div>");
        wrongAnsHol.attr("class", "col-sm-10 offset-sm-1 col-lg-8 offset-lg-2 align alert alert-danger");
        var wrongAnsText = $("<h3>");
        wrongAnsText.text("Wrong, the right answer is: "+ triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAnswers);
        wrongAnsHol.append(wrongAnsText);
        target.append(wrongAnsHol);
    },

   "continue": function () {
    this.stopTimer();
    this.rndmSelectfn();
    this.questionDomGen();
    },

    "questionDomGen": function() {
        var randArr = [];
        var ansArr = triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].goodAns;
        ansArr.push(triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].goodAns);
        console.log(ansArr);
        var target1 = $(".holder");
        target1.empty();
        var quesHolText = $("<div>");
        quesHolText.attr("class", "col-sm-10 offset-sm-1 col-lg-12 offset-lg-0 align");
        var quesText = $("<h5>");
        quesText.text(triviaGame.pastQuestions[triviaGame.pastQuestions.length - 1].questionText);
        var randArr = [];
        var ansArr = triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].wrongAnswers;
        ansArr.push(triviaGame.pastQuestions[triviaGame.pastQuestions.length-1].rightAnswers);
        console.log(ansArr);
        quesHolText.append(quesText);
        target1.append(quesHolText);

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
            var ansHolText = $("<div>");
        ansHolText.attr("class","col-sm-10 offset-sm-1 col-lg-4 offset-lg-4 button align");
        //var ansText = $("<span>");
        //ansText.attr("class","button");
        ansHolText.text(randArr[i]);
        //ansHolText.append(ansText);
        target1.append(ansHolText);
        }
        console.log(randArr);
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

