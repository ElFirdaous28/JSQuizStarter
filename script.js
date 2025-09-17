// Function to load questions
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();

        const questions = {};
        data.themes.forEach(theme => {
            questions[theme.theme] = theme.questions;
        });

        return questions;
    } catch (error) {
        console.error('Error loading questions JSON:', error);
        return {};
    }
}

loadQuestions().then(questions => {
    console.log(questions);
    console.log(questions["JavaScript Basics"])
});

// Save theme choice
function saveChoosedTheme(choice) {
    localStorage.setItem("selectedTheme", choice);
}

// initialize user infos
function initializeUserInfos(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username-input");
    const errorElement = document.getElementById("username-error");
    const username = usernameInput.value.trim();

    if (!username) {
        errorElement.textContent = "Please enter a username";
        errorElement.style.display = "block";
        return false;
    } else {
        errorElement.style.display = "none";
    }

    const userInfos = {
        themes: {
            "JavaScript Basics": [],
            "DOM & Events": [],
            "Objects & Arrays": []
        }
    };

    const users = JSON.parse(localStorage.getItem("users")) || {};

    users[username] = userInfos;

    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "thems.html";
    return true;
}

