let paAnswerStore = {};

function showInstructions() {
    window.location.hash = 'instructions';
}

function showPersonalityAssessmentInstructions() {
    window.location.hash = 'show-personality-assessment-instructions';
}

function showPreviousPeronalityAssessmentQuestion() {
    let paMatch = window.location.hash.match(/^#question-pa-(\d+)$/);
    let paQuestion = paMatch ? parseInt(paMatch[1], 10) : null;
    if (paQuestion === null) {
        paQuestion = 1;
    } else {
        paQuestion--;
    }
    window.location.hash = `question-pa-${paQuestion}`
}

function showPeronalityAssessmentQuestion() {
    const submitButton = document.getElementById('personality-assessment-submit-btn');
    if (submitButton && submitButton.classList.contains('disabled')) {
        return;
    }
    let paMatch = window.location.hash.match(/^#question-pa-(\d+)$/);
    let paQuestion = paMatch ? parseInt(paMatch[1], 10) : null;
    if (paQuestion === null) {
        paQuestion = 1;
    } else {
        paQuestion++;
    }
    window.location.hash = `question-pa-${paQuestion}`
}

function showPeronalityAssessmentResults() {
    let sum = {
        'D': 0,
        'I': 0,
        'S': 0,
        'C': 0
    };
    const questions = getPaQuestions();
    console.log('todo show pa results', paAnswerStore, questions);
    for (let i = 1; i <= 20; i++) {
        console.log(i, questions[i]);
        let group = questions[i].personality_group_id;
        sum[group] += parseInt(paAnswerStore[i], 10);
    }
    console.log('sum', sum);

    let max = 0;
    let keys = ['D', 'I', 'S', 'C'];
    for (let i = 0; i < 4; i++) {
        if (sum[keys[i]] > max) {
            max = sum[keys[i]];
        }
    }
    console.log('max', max);

    let primary = [];
    let secondaries = [];
    for (let i = 0; i < 4; i++) {
        if (sum[keys[i]] === max) {
            primary.push(keys[i]);
        } else {
            secondaries.push(keys[i]);
        }
    }
    console.log('primary', primary, secondaries);

}

function showSpiritualGiftAssessmentQuestion(question = null) {
    if (question === null) {
        question = 1;
    }
    window.location.hash = `question-sga-${question}`
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

function handlePaButtonClick(button) {
    // Get the value from the clicked button using the data-value attribute
    const question = button.getAttribute('question-value');
    const value = button.getAttribute('data-value');

    // Do something with the value
    const answerText = getPaSelectedAnswerText(value);

    // If you want to visually indicate which button is active
    button.classList.add('active');
    document.getElementById('personality-assessment-submit-btn').classList.remove('disabled');
    document.getElementById('personality-assessment-answer-text').innerHTML = answerText;
    console.log('selected answer to question', question, 'is', value);
    paAnswerStore[question] = value;
    pushStores();
}

function pushStores() {
    localStorage.setItem("paAnswerStore", JSON.stringify(paAnswerStore));
}

function fetchStores() {
    let tmpPaAnswerStore = localStorage.getItem("paAnswerStore");
    if (tmpPaAnswerStore !== null) {
        paAnswerStore = JSON.parse(tmpPaAnswerStore);
    }
    console.log('fetchStores', paAnswerStore);
}

fetchStores();

function route() {
    // Hide all sections
    hideAllSections();
    console.log('route', window.location.hash);

    let paMatch = window.location.hash.match(/^#question-pa-(\d+)$/);
    let sgaMatch = window.location.hash.match(/^#question-sga-(\d+)$/);
    let paQuestion = paMatch ? parseInt(paMatch[1], 10) : null;
    let sgaQuestion = sgaMatch ? parseInt(sgaMatch[1], 10) : null;
    if (paQuestion === null && sgaQuestion === null) {
        id = window.location.hash.replace('#', '');
        console.log('default', id);
        if (id === '') {
            id = 'landing';
        }
        document.getElementById(id).style.display = 'block';
        document.getElementById(id).classList = 'row d-flex flex-column min-vh-100';
    } else if (paQuestion !== null) {
        const selectedAnswer = paAnswerStore[paQuestion];
        console.log('selected Answer', selectedAnswer);
        let questions = getPaQuestions();
        let answers = getPaAnswers();
        let question = questions[paQuestion].question;

        let answerText = 'Select Answer Above';
        let buttons = {
            1: `<button type="button" class="btn btn-secondary" data-value="1" question-value="${paQuestion}">1</button>`,
            2: `<button type="button" class="btn btn-secondary" data-value="2" question-value="${paQuestion}">2</button>`,
            3: `<button type="button" class="btn btn-secondary" data-value="3" question-value="${paQuestion}">3</button>`,
            4: `<button type="button" class="btn btn-secondary" data-value="4" question-value="${paQuestion}">4</button>`,
            5: `<button type="button" class="btn btn-secondary" data-value="5" question-value="${paQuestion}">5</button>`
        };
        let disabled = 'disabled';
        if (selectedAnswer) {
            answerText = getPaSelectedAnswerText(selectedAnswer);
            console.log(answerText);
            buttons[selectedAnswer] = `<button type="button" class="btn btn-secondary active" data-value="${selectedAnswer}" question-value="${paQuestion}">5</button>`;
            disabled = '';
        }

        let prevButtonHtml = `<button class="btn btn-primary col-4" onclick="showPreviousPeronalityAssessmentQuestion()">Previous</button>`;
        let nextButtonHtml = `<button id="personality-assessment-submit-btn" class="btn btn-primary col-4 ${disabled}" onclick="showPeronalityAssessmentQuestion()">Next</button>`;
        if (paQuestion === 1) {
            prevButtonHtml = `<button class="btn btn-primary col-4" onclick="showPersonalityAssessmentInstructions()">Instructions</button>`;
        }
        if (paQuestion === 20) {
            nextButtonHtml = `<button id="personality-assessment-submit-btn" class="btn btn-primary col-4 ${disabled}" onclick="showPeronalityAssessmentResults()">Results</button>`;
        }
        let html = `
        <div class="col-12 mt-auto"></div>
        <div class="col-12 text-center align-bottom" style=""><h2>${question}</h2></div>
        <div class="col-12 mt-auto"></div>
        <div class="col-12 ml-4">
            <div>${answers[1]}</div>
            <div>${answers[2]}</div>
            <div>${answers[3]}</div>
            <div>${answers[4]}</div>
            <div>${answers[5]}</div>
        </div>
        <div class="col-12 font-italic font-weight-bolder" id="personality-assessment-answer-text">${answerText}</div>
        <div class="btn-group col-12" role="group" aria-label="Personality Assessment Answers">
            ${buttons[1]}
            ${buttons[2]}
            ${buttons[3]}
            ${buttons[4]}
            ${buttons[5]}
        </div>
        <div class="col-12 mb-4 mt-4">
            <div class="row">
            <div class="col-1"></div>
            ${prevButtonHtml}
            <div class="col-2"></div>
            ${nextButtonHtml}
            </div>
        </div>
        `;
        document.getElementById('personality-assessment-question').innerHTML = html;
        document.getElementById('personality-assessment-question').style.display = 'block';
        document.getElementById('personality-assessment-question').classList = 'row d-flex flex-column min-vh-100';
        let btnGroup = document.querySelector('.btn-group');
        console.log('btnGroup', btnGroup);
        if (btnGroup === null) {
            return;
        }
        btnGroup.addEventListener('click', function(event) {
            // Check if the clicked element is a button
            if (event.target.matches('button')) {
                // Call the desired function and pass the clicked button as a parameter
                handlePaButtonClick(event.target);
            }
        });
    } else if (sgaQuestion !== null) {
        console.log('add support for sga questions');
    }
}

function hideAllSections() {
    const sections = document.querySelectorAll('.container > div');
    sections.forEach((section) => {
        section.style.display = 'none';
        section.classList = '';
    });
}

function getPaSelectedAnswerText(answer) {
    return `Selected Answer: ${getPaAnswers()[answer]}`;
}

function getPaAnswers() {
    return {
        1: '1 - Never',
        2: '2 - Rarely',
        3: '3 - Sometimes',
        4: '4 - Often',
        5: '5 - Always'
    }
}
function getPaQuestions() {
    return {
        1: {
            question: 'I am assertive, demanding, and decisive.',
            personality_group_id: 'D'
        },
        2: {
            question: 'I enjoy doing multiple tasks at once.',
            personality_group_id: 'D'
        },
        3: {
            question: 'I thrive in a challenge-based environment.',
            personality_group_id: 'D'
        },
        4: {
            question: 'I think about tasks more than others or myself.',
            personality_group_id: 'D'
        },
        5: {
            question: 'I am motivated by accomplishment and authority.',
            personality_group_id: 'D'
        },
        6: {
            question: 'I enjoy influencing and inspiring other people.',
            personality_group_id: 'I'
        },
        7: {
            question: 'I am optimistic about others.',
            personality_group_id: 'I'
        },
        8: {
            question: 'I tend to be the life of the party.',
            personality_group_id: 'I'
        },
        9: {
            question: 'I think about motivating people.',
            personality_group_id: 'I'
        },
        10: {
            question: 'I am motivated by recognition and approval.',
            personality_group_id: 'I'
        },
        11: {
            question: 'I thrive in consistent environments.',
            personality_group_id: 'S'
        },
        12: {
            question: 'I prefer specifics over generalizations.',
            personality_group_id: 'S'
        },
        13: {
            question: 'I enjoy small groups of people.',
            personality_group_id: 'S'
        },
        14: {
            question: 'I prefer being a member of a team.',
            personality_group_id: 'S'
        },
        15: {
            question: 'I am motivated by stability and support.',
            personality_group_id: 'S'
        },
        16: {
            question: 'I typically avoid big risks.',
            personality_group_id: 'C'
        },
        17: {
            question: 'I love tasks, order, and details.',
            personality_group_id: 'C'
        },
        18: {
            question: 'I am right most of the time.',
            personality_group_id: 'C'
        },
        19: {
            question: 'I comply with clearly-defined rules.',
            personality_group_id: 'C'
        },
        20: {
            question: 'I am motivated by quality and correctness.',
            personality_group_id: 'C'
        }
    };
}
