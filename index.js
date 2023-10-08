function showInstructions() {
    window.location.hash = 'instructions';
}

function showPersonalityAssessmentInstructions() {
    window.location.hash = 'show-personality-assessment-instructions';
}

function showPeronalityAssessmentQuestion() {
    console.log('show personality assessment question');
    let paMatch = window.location.hash.match(/^#question-pa-(\d+)$/);
    let paQuestion = paMatch ? parseInt(paMatch[1], 10) : null;
    if (paQuestion === null) {
        paQuestion = 1;
    } else {
        paQuestion++;
    }
    window.location.hash = `question-pa-${paQuestion}`
}

function showSpiritualGiftAssessmentQuestion(question = null) {
    if (question === null) {
        question = 1;
    }
    window.location.hash = `question-sga-${question}`
}

function saveAnswers() {
    let q1Value = document.getElementById("q1").value;
    //... store all answers
    localStorage.setItem("q1", q1Value);
    // ... and so on
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

function handlePaButtonClick(button) {
    // Get the value from the clicked button using the data-value attribute
    const value = button.getAttribute('data-value');
    const answers = getPaAnswers();
    // Do something with the value
    const answerText = `Selected Answer:${answers[value]}`;
    console.log('Selected Answer:', value);

    // If you want to visually indicate which button is active
    button.classList.add('active');
    document.getElementById('personality-assessment-submit-btn').classList.remove('disabled');
    document.getElementById('personality-assessment-answer-text').innerHTML = answerText;
}

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
    } else if (paQuestion !== null) {
        console.log('add support for pa questions');
        let questions = getPaQuestions();
        let answers = getPaAnswers();
        let question = questions[paQuestion].question;
        let buttonHtml = '<button id="personality-assessment-submit-btn" class="btn btn-primary disabled" onclick="showPeronalityAssessmentQuestion()">Next</button>';
        if (paQuestion === 20) {
            buttonHtml = '<button id="personality-assessment-submit-btn" class="btn btn-primary disabled" onclick="showPeronalityAssessmentResults()">Show Results</button>';
        }
        let answerText = 'Select Answer Above';
        let html = `
        <div class="row">
            <div class="col-12">
                <h1>${question}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">${answers[1]}</div>
            <div class="col-12">${answers[2]}</div>
            <div class="col-12">${answers[3]}</div>
            <div class="col-12">${answers[4]}</div>
            <div class="col-12">${answers[5]}</div>
        </div>
        <div class="container">
            <div class="row" id="personality-assessment-answer-text">${answerText}</div>
        </div>
        <div class="btn-group row" role="group" aria-label="Personality Assessment Answers">
            <button type="button" class="btn btn-secondary" data-value="1">1</button>
            <button type="button" class="btn btn-secondary" data-value="2">2</button>
            <button type="button" class="btn btn-secondary" data-value="3">3</button>
            <button type="button" class="btn btn-secondary" data-value="4">4</button>
            <button type="button" class="btn btn-secondary" data-value="5">5</button>
        </div>
        <div class="row">
            ${buttonHtml}
        </div>
        `;
        document.getElementById('personality-assessment-question').innerHTML = html;
        document.getElementById('personality-assessment-question').style.display = 'block';
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
    sections.forEach(section => section.style.display = 'none');
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
