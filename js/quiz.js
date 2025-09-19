let questions = {};

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();

        data.themes.forEach(theme => {
            questions[theme.theme] = theme.questions;
        });

        // console.log("Questions loaded:", questions);

    } catch (error) {
        console.error('Error loading questions JSON:', error);
    }
}

let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('currentUser');
let selectedTheme = localStorage.getItem('selectedTheme');

let questionIndex = 0;
let themeQuestions;
const nextButton = document.getElementById('next-question');
const seeResultsButton = document.getElementById('see-results');
const quizContainer = document.querySelector('.quiz');

let score = 0;
let timerElement = document.getElementById('timer');
let totalTime = 0; // total time in seconds
let timer;
let time;

// timer
function startTimer() {
    time = 20;
    timerElement.textContent = `00:${String(time).padStart(2, '0')}`;
    timer = setInterval(() => {
        time--;

        if (time < 0) {
            questionIndex < themeQuestions.length - 1 ? goToNext() : seeResults;
        } else {
            timerElement.textContent = `00:${String(time).padStart(2, '0')}`;
        }
    }, 1000);
}

function stopTimer() {
    let spent = Math.max(0, 10 - time);
    totalTime += spent;

    users[currentUser].themes[selectedTheme].totalTime = totalTime;
    localStorage.setItem("users", JSON.stringify(users));
    clearInterval(timer);
}

// initialize the quiz
document.addEventListener('DOMContentLoaded', async () => {
    await loadQuestions();

    // start the quiz
    themeQuestions = questions[selectedTheme];
    if (window.location.href === "http://127.0.0.1:5500/quiz.html") {        
        setHtmlQuestion(questionIndex);
        startTimer();
    }

});

// add the question as html
function setHtmlQuestion(questionIndex) {
    let questionsContainer = document.getElementById('question-details');
    let questionHtml;

    questionHtml = ` <div class="question-number">Question <span id="question-number">${questionIndex + 1}/10</span></div>
                                        <div class="question">${themeQuestions[questionIndex].question}</div>
                                        <div id="options-container">`
    themeQuestions[questionIndex].options.forEach((option) => {
        const isCorrect = themeQuestions[questionIndex].answers.includes(option) ? 'correct' : '';

        questionHtml += `<label class="option ${isCorrect}" onclick="enableNextButton()">
                        <input type="checkbox" value="${option}">
                        ${option}
                    </label>`;
    })

    questionHtml += `</div>
                     </div>`

    questionsContainer.innerHTML = questionHtml;
}

// listen to Next Button click
function goToNext() {
    stopTimer();
    const checkedInputs = document.querySelectorAll('#options-container input[type="checkbox"]:checked');
    const selectedAnswers = Array.from(checkedInputs).map(input => input.value);

    let correct = checkAnswers(themeQuestions[questionIndex].answers, selectedAnswers);
    score += correct ? 1 : 0
    showAnswerFeedback(themeQuestions[questionIndex].answers, checkedInputs, correct)
    nextButton.disabled = true;
    saveUserAnswer(themeQuestions[questionIndex].id, selectedAnswers)

    setTimeout(() => {
        questionIndex++

        if (questionIndex < themeQuestions.length) {
            setHtmlQuestion(questionIndex)
            startTimer();
        }
        if ((questionIndex == themeQuestions.length - 1)) {
            nextButton.style.display = 'none';
            seeResultsButton.style.display = 'block'
        }
        quizContainer.style.border = '2px solid white';
        quizContainer.style.backgroundColor = 'white';
    }, 1000)
}


// listen to see Results Button
function seeResults() {

    stopTimer();
    const checkedInputs = document.querySelectorAll('#options-container input[type="checkbox"]:checked');
    const selectedAnswers = Array.from(checkedInputs).map(input => input.value);
    let correct = checkAnswers(themeQuestions[questionIndex].answers, selectedAnswers);
    score += correct ? 1 : 0
    showAnswerFeedback(themeQuestions[questionIndex].answers, checkedInputs, correct)

    saveUserAnswer(themeQuestions[questionIndex].id, selectedAnswers)


    users[currentUser].themes[selectedTheme].score = score;
    localStorage.setItem("users", JSON.stringify(users));

    score = 0;
    setTimeout(() => {
        window.location.href = 'results.html'
    }, 1000)
}

// enable next button
function enableNextButton() {
    nextButton.disabled = false
}

function checkAnswers(correctAnswers, userAnswers) {
    const sortedCorrect = [...correctAnswers].sort();
    const sortedUser = [...userAnswers].sort();
    return sortedCorrect.length === sortedUser.length &&
        sortedCorrect.every((val, i) => val === sortedUser[i]);
}

function saveUserAnswer(questionId, userAnswers) {
    if (!users[currentUser]) return;

    if (!users[currentUser].themes[selectedTheme]) {
        users[currentUser].themes[selectedTheme] = { answers: [], score: 0, totalTime: 0 };
    }

    let answers = users[currentUser].themes[selectedTheme].answers;

    let existing = answers.find(answer => answer.questionId === questionId);

    if (existing) {
        existing.userAnswers = userAnswers;
    } else {
        answers.push({ questionId, userAnswers });
    }

    localStorage.setItem("users", JSON.stringify(users));
}

function showAnswerFeedback(correctAnswers, checkedInputs, correct) {
    const AllInputs = document.querySelectorAll('#options-container input[type="checkbox"]');

    AllInputs.forEach(input => {
        if (correctAnswers.includes(input.value)) {
            input.parentElement.style.backgroundColor = '#28a745';
            input.parentElement.style.color = 'white';
            input.parentElement.style.borderColor = '#155724';
        }
    });

    if (correct) {
        quizContainer.style.border = '2px solid #28a745';
        quizContainer.style.backgroundColor = '#d4edda';
    }

    else {
        quizContainer.style.border = '2px solid #df3131ff';
        quizContainer.style.backgroundColor = '#f8d7da';
    }

    checkedInputs.forEach(checkedInput => {
        if (!correctAnswers.includes(checkedInput.value)) {
            checkedInput.parentElement.style.backgroundColor = '#df3131ff';
            checkedInput.parentElement.style.color = 'white';
            checkedInput.parentElement.style.borderColor = '#950606';
        }
    });
}