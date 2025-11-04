let global = {
    questions : [
        {
            question: "Wie is de hoofdpersoon in Final Fantasy VII Remake?",
            answers: ["Cloud Strife", "Sephiroth", "Tifa Lockhart"],
            correct: "Cloud Strife",
            selected: ""
        },
        {
            question: "Welke wereld wordt verkend in Final Fantasy XV?",
            answers: ["Gaia", "Eos", "Spira", "Cocoon"],
            correct: "Eos",
            selected: ""
        },
        {
            question: "Wie is de antagonist in Final Fantasy VIII?",
            answers: ["Ultimecia", "Kefka", "Seymour", "Kuja", "Edea"],
            correct: "Ultimecia",
            selected: ""
        },
        {
            question: "Heeft hoofdrolspeler in Final Fantasy IX een staart?",
            answers: ["Ja", "Nee"],
            correct: "Ja",
            selected: ""
        },
        {
            question: "Hoe heet de stad waarin het verhaal van Final Fantasy VII Remake begint?",
            answers: ["Midgar", "Junon", "Nibelheim", "Wutai"],
            correct: "Midgar",
            selected: ""
        },
        {
            question: "Welke summon is prominent aanwezig in Final Fantasy XV?",
            answers: ["Ifrit", "Shiva", "Ramuh", "Titan"],
            correct: "Ifrit",
            selected: ""
        },
        {
            question: "Wat is de naam van het luchtschip in Final Fantasy VIII?",
            answers: ["Ragnarok", "Highwind", "Invincible", "Falcon"],
            correct: "Ragnarok",
            selected: ""
        },
        {
            question: "Welke rol vervult Cid Highwind in Final Fantasy VII?",
            answers: ["Luchtschipkapitein", "Wapensmid", "Koning"],
            correct: "Luchtschipkapitein",
            selected: ""
        },
        {
            question: "Wat is het kenmerkende aan Cactuar-wezens in de Final Fantasy-serie?",
            answers: ["Ze zijn altijd groen", "Ze gebruiken de aanval 1000 Needles", "Ze zijn planten"],
            correct: "Ze gebruiken de aanval 1000 Needles",
            selected: ""
        },
        {
            question: "Welk Final Fantasy-wezen zorgt, met zijn aanval genaamd Bad Breath, voor verschillende statuseffecten?",
            answers: ["Malboro", "Chocobo", "Behemoth", "Tonberry"],
            correct: "Malboro",
            selected: ""
        }
    ],
    nrQuestions : 0,
    months : ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    selectedQuestion: -1,
    score: 0,
    highscores: []
}

const setup = () => {
    global.nrQuestions = global.questions.length;
    readHighscores();

    document.getElementById("start").addEventListener("click", startQuiz);
    document.getElementById("restart").addEventListener("click", () => {
        resetQuiz();
        startQuiz();
    });
    document.querySelector("#quiz .btn-success").addEventListener("click", saveAnswer);
    document.querySelector("#submit").addEventListener("click", submit);
    document.getElementById("reset").addEventListener("click", resetHighscores);
}
window.addEventListener("load", setup);

const startQuiz = () => {
    // show & hide main elements
    document.getElementById("start").parentElement.classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");

    // time started
    let startTime = new Date();
    let startText = document.getElementById("started");
    startText.textContent = startTime.getDate() + " " + global.months[startTime.getMonth()] + " om " + startTime.getHours() + ":" + startTime.getMinutes();

    // question list
    let questionNr = localStorage.getItem("quizzy.selectedQuestion");
    if(questionNr !== null) {
        // new quiz -> shuffle questions first
        global.questions = global.questions.sort(() => { return Math.random() - 0.5; } );
    }

    let questionsList = document.getElementById("questions");
    for (let i = 0; i < global.nrQuestions; i++) {
        // create element
        let newQuestion = document.createElement("li");
        newQuestion.className = "list-group-item";
        newQuestion.textContent = "Vraag " + (i+1);
        newQuestion.setAttribute("data-nr", i.toString());
        newQuestion.addEventListener("click", switchQuestion);
        questionsList.appendChild(newQuestion);

        // shuffle answers
        global.questions[i].answers = global.questions[i].answers.sort(() => { return Math.random() - 0.5; } );
    }

    // check storage

    if(questionNr === null) {
        // new quiz -> select 1st question
        selectQuestion(0);
    }
    else {
        // continue quiz
        let nr = parseInt(questionNr, 10);
        selectQuestion(nr);
    }
}

const selectQuestion = (nr) => {
    // check if allowed
    if(nr === global.selectedQuestion) { return; } // ignore
    if(global.questions[nr].selected !== "") { return; } // already ansered -> ignore

    // show in questionslist
    global.selectedQuestion = nr;
    document.getElementById("questions").children[nr].classList.add("active");

    // show details
    let question = global.questions[nr];
    let detailsCard = document.querySelector("#quiz > div.col-10 > div");
    detailsCard.getElementsByClassName("card-header")[0].textContent = "Vraag #" + (nr+1);
    detailsCard.getElementsByClassName("card-title")[0].textContent = question.question;

    // show answers
    let answerlist = detailsCard.querySelector("ul");
    answerlist.innerHTML = ""; // remove all children

    for (let i = 0; i < question.answers.length; i++) {
        let newAnswer = document.createElement("li");
        newAnswer.className = "list-group-item";
        newAnswer.textContent = question.answers[i];
        newAnswer.setAttribute("data-answer", question.answers[i]);
        newAnswer.addEventListener("click", selectAnswer);
        answerlist.appendChild(newAnswer);
    }

    // make sure details are not hidden
    document.querySelector("#quiz > div.col-10 > div").classList.remove("d-none");

    // store selected question
    localStorage.setItem("quizzy.selectedQuestion", global.selectedQuestion);
}

const switchQuestion = (e) => {
    // deactivate last one
    // BUG! ONLY IF THE OTHER QUESTION IS VALID
    if(global.selectedQuestion !== -1)
    {
        let questionlist = document.getElementById("questions");
        questionlist.children[global.selectedQuestion].classList.remove("active");
        checkAnswer(global.selectedQuestion);
    }

    // select new
    selectQuestion(parseInt(e.target.getAttribute("data-nr"), 10));
}

const selectAnswer = (e) => {
    let question = global.questions[global.selectedQuestion];
    let answerlist = document.querySelector("#quiz > div.col-10 > div ul");

    // uncolor button
    if(question.selected !== "")
    {
        let nr = question.answers.findIndex((x) => x === question.selected);
        answerlist.children[nr].classList.remove("bg-info");
    }

    // change selected
    global.questions[global.selectedQuestion].selected = e.target.getAttribute("data-answer");

    // color button
    let answerNr = question.answers.findIndex((x) => x === global.questions[global.selectedQuestion].selected);
    answerlist.children[answerNr].classList.add("bg-info");
}

const checkAnswer = (questionNr) => {
    let question = global.questions[questionNr];
    if(question.selected === "") { return; } // no answer given

    let questionlist = document.getElementById("questions");
    if(question.selected === question.correct) {
        questionlist.children[questionNr].classList.add("bg-success");
        global.score++;
    }
    else {
        questionlist.children[questionNr].classList.add("bg-danger");
    }
}

const saveAnswer = () => {
    if(global.questions[global.selectedQuestion].selected === "") { return; } // no answer given

    checkAnswer(global.selectedQuestion);

    if(global.selectedQuestion === global.nrQuestions - 1)
    {
        document.querySelector("#quiz > div.col-10 > div").classList.add("d-none");
        global.selectedQuestion = -1;
    }
    else
    {
        selectQuestion(global.selectedQuestion + 1);
    }
}

const submit = () => {
    // remove selected question
    localStorage.removeItem("quizzy.selectedQuestion");

    // show & hide main elements
    document.getElementById("restart").parentElement.parentElement.classList.remove("d-none");
    document.getElementById("quiz").classList.add("d-none");

    // display score
    document.getElementById("score").textContent = "Your score is " + global.score;

    // update highscores
    global.highscores.push(global.score);
    global.highscores = global.highscores.sort((a, b) => b - a);
    localStorage.setItem("quizzy.highscores", JSON.stringify(global.highscores));

    displayHighscores();
}

const resetQuiz = () => {
    global.score = 0;
    global.selectedQuestion = -1;

    let questionsList = document.getElementById("questions");
    questionsList.innerHTML = "";

    for (let i = 0; i < global.nrQuestions; i++) {
        global.questions[i].selected = "";
    }

    document.getElementById("restart").parentElement.parentElement.classList.add("d-none");
}

const readHighscores = () => {
    let data = localStorage.getItem("quizzy.highscores");

    if(data !== null) {
        // build html
        let highscores = document.getElementById("highscores");
        let highscoreList = document.createElement("ol");
        highscores.appendChild(highscoreList);

        displayHighscores();

        if(data !== "") {
            // read
            global.highscores = JSON.parse(data);
        }
    }
    else {
        // create first entry
        localStorage.setItem("quizzy.highscores", "");
    }
}

const displayHighscores = () => {
    let highscoreList = document.querySelector("#highscores ol");
    highscoreList.innerHTML = "";

    // add entries
    for(let i = 0; i < global.highscores.length; i++) {
        let entry = document.createElement("li");
        entry.textContent = global.highscores[i] + " punt(en)";
        highscoreList.appendChild(entry);
    }
}

const resetHighscores = () => {
    localStorage.setItem("quizzy.highscores", "");
    global.highscores = [];
    document.querySelector("#highscores ol").innerHTML = "";
}
