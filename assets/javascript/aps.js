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
            console.log("chido");
        }
        else{
            console.log("alv!");
        }
    this.stopTimer();
    this.finishFn();
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
                }
                else if (number === 0 && triviaGame.answerEval){
                    triviaGame.stopTimer();
                    triviaGame.continue();
                }
                console.log(number);
            } 
            run();
    },

    "stopTimer": function(){
        clearInterval(triviaGame.intervalId);
    },



    "finishFn": function (){
        if (this.questArr.length == this.pastQuestions.length) {
            alert("Wel Done" + " " + this.goodAns + " " + this.badAns);
        }
        else{
            this.timer(5);
            console.log("continue timer");
        }
     },


   "continue": function () {
    this.stopTimer();
    this.rndmSelectfn();
    },

};

