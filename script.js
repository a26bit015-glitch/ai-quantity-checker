function checkPrompt() {

    let prompt = document.getElementById("promptInput").value.trim();

    if (prompt.length === 0) {
        alert("Please enter a prompt first!");
        return;
    }

    // Check five important prompt elements
    let checks = [
        {
            name: "Role",
            found: /\b(act as|you are|role|expert|teacher|developer)\b/i.test(prompt),
            suggestion: "Add a role. Example: Act as a Python teacher."
        },
        {
            name: "Task",
            found: /\b(explain|create|write|generate|design|summarize|compare|analyze|list|develop|describe|teach|solve|prepare|make)\b/i.test(prompt),
            suggestion: "Clearly mention the task. Example: Explain Python loops."
        },
        {
            name: "Context",
            found: /\b(student|college|beginner|class|project|subject|background|audience|learning|experience)\b/i.test(prompt),
            suggestion: "Add context. Example: I am a first-year college student."
        },
        {
            name: "Constraints",
            found: /\b(simple|under|within|maximum|minimum|limit|words|avoid|must|should|don't|do not|include|exclude|beginner-friendly)\b/i.test(prompt),
            suggestion: "Add constraints. Example: Use simple English and stay under 200 words."
        },
        {
            name: "Output Format",
            found: /\b(table|bullet points|paragraph|numbered list|steps|json|format|headings|markdown|code)\b/i.test(prompt),
            suggestion: "Specify the output format. Example: Present the answer in a table."
        }
    ];

    // Calculate score
    let score = 0;

    checks.forEach(check => {
        if (check.found) {
            score += 20;
        }
    });

    // Display score
    document.getElementById("score").textContent = score;

    let quality = "";
    let summary = "";

    if (score >= 80) {
        quality = "Excellent Prompt! 🌟";
        summary = "Your prompt is well structured. Great job!";
    }
    else if (score >= 60) {
        quality = "Good Prompt! 👍";
        summary = "Your prompt is good. A few improvements can make it better.";
    }
    else if (score >= 40) {
        quality = "Average Prompt 🙂";
        summary = "Your prompt needs some additional details.";
    }
    else {
        quality = "Needs Improvement 💡";
        summary = "Add more information to make your prompt effective.";
    }

    document.getElementById("quality").textContent = quality;
    document.getElementById("summary").textContent = summary;

    // Display analysis
    let analysisHTML = "";

    checks.forEach(check => {

        analysisHTML += `
            <div class="analysis-item">
                <span>${check.name}</span>
                <span class="${check.found ? 'good' : 'bad'}">
                    ${check.found ? '✓ Found' : '✗ Missing'}
                </span>
            </div>
        `;

    });

    document.getElementById("analysisList").innerHTML = analysisHTML;

    // Display suggestions
    let suggestionsHTML = "";

    checks.forEach(check => {

        if (!check.found) {
            suggestionsHTML += `<li>${check.suggestion}</li>`;
        }

    });

    if (suggestionsHTML === "") {
        suggestionsHTML = "<li>Excellent! Your prompt includes all five elements.</li>";
    }

    document.getElementById("suggestions").innerHTML = suggestionsHTML;

    // Generate improved prompt
    let improved = prompt;

    let additions = [];

    if (!checks[0].found) {
        additions.push("ROLE:\nAct as an expert teacher.");
    }

    if (!checks[1].found) {
        additions.push("TASK:\nClearly explain what you want the AI to do.");
    }

    if (!checks[2].found) {
        additions.push("CONTEXT:\nI am a college student learning this topic.");
    }

    if (!checks[3].found) {
        additions.push("CONSTRAINTS:\nUse simple English and provide clear explanations.");
    }

    if (!checks[4].found) {
        additions.push("OUTPUT FORMAT:\nPresent the answer using bullet points.");
    }

    if (additions.length > 0) {
        improved += "\n\n" + additions.join("\n\n");
    }

    document.getElementById("improvedPrompt").textContent = improved;

    // Show results
    document.getElementById("results").style.display = "block";

    // Update score circle
    let circle = document.getElementById("scoreCircle");

    if (score >= 80) {
        circle.style.borderColor = "#15a583";
    } else if (score >= 60) {
        circle.style.borderColor = "#e5a52e";
    } else {
        circle.style.borderColor = "#e15a5a";
    }

    // Scroll to results
    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}


// Load sample prompt
function loadSample() {

    document.getElementById("promptInput").value =
        "Act as a Python teacher. Explain loops in Python to a first-year college student. Use simple English and provide examples. Present the answer in bullet points.";

    checkPrompt();
}


// Clear everything
function clearAll() {

    document.getElementById("promptInput").value = "";

    document.getElementById("results").style.display = "none";

    document.getElementById("score").textContent = "0";

    document.getElementById("improvedPrompt").textContent =
        "Your improved prompt will appear here.";

}


// Copy improved prompt
function copyImproved() {

    let text = document.getElementById("improvedPrompt").textContent;

    if (!text || text === "Your improved prompt will appear here.") {
        alert("Please check a prompt first!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Improved prompt copied successfully!");
        })
        .catch(() => {
            alert("Unable to copy. Please copy the text manually.");
        });
}
