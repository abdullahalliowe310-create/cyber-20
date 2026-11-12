
// COMPUTER NETWORKING QUESTIONS

const questions = [
    {
        question: "What is computer networking?",
        options: [
            "Connecting two or more devices to communicate",
            "Repairing computer hardware",
            "Installing computer applications",
            "Creating websites"
        ],
        answer: 0
    },
    {
        question: "Which of the following is an example of networking?",
        options: [
            "Typing a document",
            "Connecting a phone to Bluetooth earbuds",
            "Playing an offline game",
            "Charging a laptop"
        ],
        answer: 1
    },
    {
        question: "What does LAN stand for?",
        options: [
            "Large Area Network",
            "Local Area Network",
            "Long Access Network",
            "Limited Area Network"
        ],
        answer: 1
    },
    {
        question: "Which network covers a very short personal distance?",
        options: [
            "WAN",
            "MAN",
            "PAN",
            "LAN"
        ],
        answer: 2
    },
    {
        question: "Which network connects devices across a large geographical area?",
        options: [
            "PAN",
            "LAN",
            "WAN",
            "WLAN"
        ],
        answer: 2
    },
    {
        question: "What does WLAN commonly use to connect devices?",
        options: [
            "Wi-Fi",
            "USB",
            "HDMI",
            "VGA"
        ],
        answer: 0
    },
    {
        question: "Which device connects different networks and directs data between them?",
        options: [
            "Switch",
            "Hub",
            "Router",
            "Repeater"
        ],
        answer: 2
    },
    {
        question: "Which device sends incoming data to all connected ports?",
        options: [
            "Switch",
            "Hub",
            "Router",
            "Modem"
        ],
        answer: 1
    },
    {
        question: "What is the main function of a server?",
        options: [
            "To request services",
            "To provide services and resources",
            "To destroy data",
            "To connect cables"
        ],
        answer: 1
    },
    {
        question: "What is network topology?",
        options: [
            "The arrangement of devices and connections",
            "The speed of a computer",
            "The size of a hard disk",
            "The type of operating system"
        ],
        answer: 0
    },
    {
        question: "Which topology connects all devices to one central device?",
        options: [
            "Bus",
            "Ring",
            "Star",
            "Mesh"
        ],
        answer: 2
    },
    {
        question: "Which topology connects devices in a circular pattern?",
        options: [
            "Star",
            "Ring",
            "Tree",
            "Bus"
        ],
        answer: 1
    },
    {
        question: "Which topology uses one main cable called a backbone?",
        options: [
            "Bus",
            "Mesh",
            "Star",
            "Ring"
        ],
        answer: 0
    },
    {
        question: "What is the biggest advantage of mesh topology?",
        options: [
            "Low installation cost",
            "High reliability",
            "Simple installation",
            "Uses one cable"
        ],
        answer: 1
    },
    {
        question: "Which transmission medium uses light to transfer information?",
        options: [
            "Coaxial cable",
            "Twisted-pair cable",
            "Fibre-optic cable",
            "USB cable"
        ],
        answer: 2
    },
    {
        question: "What does IP stand for?",
        options: [
            "Internet Protocol",
            "Internal Process",
            "Information Program",
            "Internet Provider"
        ],
        answer: 0
    },
    {
        question: "Which protocol automatically assigns IP addresses to devices?",
        options: [
            "DNS",
            "FTP",
            "DHCP",
            "HTTP"
        ],
        answer: 2
    },
    {
        question: "How many layers are in the OSI model?",
        options: [
            "Four",
            "Five",
            "Six",
            "Seven"
        ],
        answer: 3
    },
    {
        question: "What does DNS do?",
        options: [
            "Protects a computer",
            "Converts domain names into IP addresses",
            "Assigns MAC addresses",
            "Blocks viruses"
        ],
        answer: 1
    },
    {
        question: "What does the C in the CIA triad stand for?",
        options: [
            "Connection",
            "Communication",
            "Confidentiality",
            "Control"
        ],
        answer: 2
    }
];


// SELECTING HTML ELEMENTS

const startBtn = document.getElementById("startBtn");
const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const optionsContainer = document.getElementById("optionsContainer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const questionGrid = document.getElementById("questionGrid");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const answeredText = document.getElementById("answeredText");

const timerDisplay = document.getElementById("timer");

const reviewBtn = document.getElementById("reviewBtn");
const restartBtn = document.getElementById("restartBtn");


// QUIZ VARIABLES

let currentQuestion = 0;

let userAnswers = {};

let timeLeft = 20 * 60;

let timerInterval;


// START EXAMINATION

startBtn.addEventListener("click", function() {

    document.querySelector(".hero").classList.add("hidden");

    quizSection.classList.remove("hidden");

    currentQuestion = 0;

    userAnswers = {};

    timeLeft = 20 * 60;

    displayQuestion();

    startTimer();

});


// DISPLAY QUESTIONS

function displayQuestion() {

    const question = questions[currentQuestion];

    questionText.textContent = question.question;

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option, index) {

        const button = document.createElement("button");

        button.classList.add("option");

        button.innerHTML = `
            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span>${option}</span>
        `;

        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", function() {

            userAnswers[currentQuestion] = index;

            displayQuestion();

        });

        optionsContainer.appendChild(button);

    });

    updateNavigation();

    updateProgress();

    updateQuestionGrid();

}


// UPDATE NAVIGATION

function updateNavigation() {

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {

        nextBtn.textContent = "Last Question";

        nextBtn.disabled = true;

    } else {

        nextBtn.textContent = "Next Question →";

        nextBtn.disabled = false;

    }

}


// NEXT QUESTION

nextBtn.addEventListener("click", function() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        displayQuestion();

    }

});


// PREVIOUS QUESTION

prevBtn.addEventListener("click", function() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();

    }

});


// UPDATE PROGRESS

function updateProgress() {

    const answered = Object.keys(userAnswers).length;

    const percentage = (answered / questions.length) * 100;

    progressFill.style.width = percentage + "%";

    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    answeredText.textContent =
        `${answered}/${questions.length} Answered`;

}


// QUESTION NAVIGATOR

function updateQuestionGrid() {

    questionGrid.innerHTML = "";

    questions.forEach(function(question, index) {

        const button = document.createElement("button");

        button.textContent = index + 1;

        if (index === currentQuestion) {

            button.classList.add("current");

        } else if (userAnswers[index] !== undefined) {

            button.classList.add("answered");

        }

        button.addEventListener("click", function() {

            currentQuestion = index;

            displayQuestion();

        });

        questionGrid.appendChild(button);

    });

}


// TIMER

function startTimer() {

    clearInterval(timerInterval);

    timerDisplay.textContent = "20:00";

    timerInterval = setInterval(function() {

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);

        const seconds = timeLeft % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            finishExam();

        }

    }, 1000);

}


// SUBMIT EXAMINATION

submitBtn.addEventListener("click", function() {

    const unanswered = questions.length - Object.keys(userAnswers).length;

    if (unanswered > 0) {

        const confirmSubmit = confirm(
            `You still have ${unanswered} unanswered questions. Do you want to submit?`
        );

        if (!confirmSubmit) {

            return;

        }

    } else {

        const confirmSubmit = confirm(
            "Are you sure you want to submit your examination?"
        );

        if (!confirmSubmit) {

            return;

        }

    }

    finishExam();

});


// CALCULATE RESULTS

function finishExam() {

    clearInterval(timerInterval);

    let score = 0;

    questions.forEach(function(question, index) {

        if (userAnswers[index] === question.answer) {

            score++;

        }

    });

    const wrongAnswers = questions.length - score;

    const percentage = (score / questions.length) * 100;

    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");

    document.getElementById("score").textContent =
        `${score}/${questions.length}`;

    document.getElementById("correctAnswers").textContent = score;

    document.getElementById("wrongAnswers").textContent = wrongAnswers;

    document.getElementById("percentage").textContent =
        percentage + "%";

    let message = "";

    if (percentage >= 80) {

        message = "Excellent work! You have a great understanding.";

    } else if (percentage >= 60) {

        message = "Good effort! Keep improving.";

    } else if (percentage >= 50) {

        message = "Fair attempt! More practice will help.";

    } else {

        message = "Keep studying. You can do better next time!";

    }

    document.getElementById("resultMessage").textContent = message;

}


// REVIEW ANSWERS

reviewBtn.addEventListener("click", function() {

    const reviewContainer =
        document.getElementById("reviewContainer");

    const reviewList =
        document.getElementById("reviewList");

    reviewContainer.classList.toggle("hidden");

    if (!reviewContainer.classList.contains("hidden")) {

        reviewList.innerHTML = "";

        questions.forEach(function(question, index) {

            const userAnswer = userAnswers[index];

            const correctAnswer = question.answer;

            const item = document.createElement("div");

            item.classList.add("review-item");

            let answerHTML = "";

            if (userAnswer === undefined) {

                answerHTML = `
                    <p class="review-wrong">
                        Your answer: Not answered
                    </p>
                `;

            } else if (userAnswer === correctAnswer) {

                answerHTML = `
                    <p class="review-correct">
                        Your answer: ${question.options[userAnswer]} ✓
                    </p>
                `;

            } else {

                answerHTML = `
                    <p class="review-wrong">
                        Your answer: ${question.options[userAnswer]} ✗
                    </p>
                `;

            }

            item.innerHTML = `
                <h4>${index + 1}. ${question.question}</h4>

                ${answerHTML}

                <p class="review-correct">
                    Correct answer: ${question.options[correctAnswer]}
                </p>
            `;

            reviewList.appendChild(item);

        });

        reviewBtn.textContent = "Hide Answer Review";

    } else {

        reviewBtn.textContent = "Review My Answers";

    }

});


// RESTART EXAMINATION

restartBtn.addEventListener("click", function() {

    clearInterval(timerInterval);

    resultSection.classList.add("hidden");

    quizSection.classList.add("hidden");

    document.querySelector(".hero").classList.remove("hidden");

    document.getElementById("reviewContainer").classList.add("hidden");

    reviewBtn.textContent = "Review My Answers";

    currentQuestion = 0;

    userAnswers = {};

    timeLeft = 20 * 60;

});
