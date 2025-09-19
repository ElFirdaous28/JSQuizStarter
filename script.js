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
            "JavaScript Basics": {
                answers: [],
                score: 0,
                totalTime: 0
            },
            "DOM & Events": {
                answers: [],
                score: 0,
                totalTime: 0
            },
            "Objects & Arrays": {
                answers: [],
                score: 0,
                totalTime: 0
            }
        }
    };
    const users = JSON.parse(localStorage.getItem("users")) || {};

    users[username] = userInfos;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username);

    window.location.href = "thems.html";
    return true;
}

