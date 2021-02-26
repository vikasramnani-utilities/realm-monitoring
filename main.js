//const progressBarFull = document.querySelector('#progressBarFull');
var app

function processForm() {
    console.log({ name: this.name, email: this.email });
    alert('Processing');
}


function persistLocalStorage() {
    localStorage.currentQuestion = app.currentQuestion
    localStorage.score = app.score
    localStorage.acceptingAnswers = app.acceptingAnswers
    localStorage.questionCounter = app.questionCounter
    localStorage.availableQuestions = app.availableQuestions
    localStorage.progressBarValue = app.progressBarValue
}

function incrementScore(num) {
    app.score += num
}


function choiceClicked(event) {

    if (!app.acceptingAnswers) return

    app.acceptingAnswers = false
    const selectedChoice = event.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == app.currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
        incrementScore(app.SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()

    }, 1000)

}


function loadData() {
    this.responseAvailable = false;
    fetch("https://webhooks.mongodb-realm.com/api/client/v2.0/app/kwiz-ctydr/service/http-service/incoming_webhook/getQuestionsForQuiz?quizId=1", {
        "method": "GET"
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            alert("Server returned " + response.status + " : " + response.statusText);
        }
    }).then(response => {
        this.result = response.body;
        this.responseAvailable = true;
    }).catch(err => {
        console.log(err);
    });
}



function onLoad() {
    app = new Vue({
        el: '#signup-form',
        comments: true,
        data: {
            name: '',
            email: ''
            },
        methods: {
            processForm: processForm,
        }
    })
}
