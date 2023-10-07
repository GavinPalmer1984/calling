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
        let html = `
        <h1>Question ${paQuestion}</h1>
        <button class="btn btn-primary" onclick="showPeronalityAssessmentQuestion()">Next</button>
        `;
        document.getElementById('personality-assessment-question').innerHTML = html;
        document.getElementById('personality-assessment-question').style.display = 'block';
    } else if (sgaQuestion !== null) {
        console.log('add support for sga questions');
    }
}

function hideAllSections() {
    const sections = document.querySelectorAll('.container > div');
    sections.forEach(section => section.style.display = 'none');
}
