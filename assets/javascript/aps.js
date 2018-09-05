var dummyGame = {
"questionText": "",
"rightAns": "",
"wrongAns": [],
};

var triviaGame  = {
    "startGame": false,
    "pushDone": false,
    "questionFlag": false,
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
        if(triviaGame.pushDone && !triviaGame.questionFlag{
        var random = (Math.floor(Math.random*triviaGame.questArr.length));
            
        }
    },

};