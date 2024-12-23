document.addEventListener('DOMContentLoaded', (event) => {
    const toggleSwitch = document.getElementById('colorModeSelect');
    const currentMode = localStorage.getItem('colorMode') || 'light';

    // Apply the current mode
    document.body.classList.add(currentMode + '-mode');

    // Set the toggle switch based on the current mode
    toggleSwitch.checked = currentMode === 'dark';

    toggleSwitch.addEventListener('change', () => {
        let mode = toggleSwitch.checked ? 'dark' : 'light';

        // Remove the previous mode class
        document.body.classList.remove('light-mode', 'dark-mode');

        // Add the new mode class
        document.body.classList.add(mode + '-mode');

        // Store the current mode in local storage
        localStorage.setItem('colorMode', mode);
    });
});




const generatePreviewButton = document.getElementById("generate-preview");
const downloadButton = document.getElementById("download-readme");
const codeView = document.getElementById("code-view");
const preview = document.getElementById("preview");
const exportJsonButton = document.getElementById("export-json");
const importJsonButton = document.getElementById("import-json");
const fileInput = document.getElementById("file-input");
const lintErrorsDiv = document.getElementById("lint-errors");

const includeYourNameCheckbox = document.getElementById("includeYourName");
const yourNameInput = document.getElementById("yourName");

const includeGithubCheckbox = document.getElementById("includeGithubUsername");
const githubUsernameInput = document.getElementById("githubUsername");

const includeGithubrepositorynameCheckbox = document.getElementById("includeGithubrepositoryname");
const githubrepositorynameInput = document.getElementById("githubrepositoryname");

const includeWebsiteUrlCheckbox = document.getElementById("includeWebsiteUrl");
const websiteUrlInput = document.getElementById("websiteUrl");

const includeFeaturesCheckbox = document.getElementById("includeFeatures");
const featuresTextarea = document.getElementById("features");

const includeAboutMeCheckbox = document.getElementById("includeAboutMe");
const aboutMeTextarea = document.getElementById("aboutMe");

const includeWorkCheckbox = document.getElementById("includeWork");
const workTextarea = document.getElementById("work");

const includeFeedbackUrlCheckbox = document.getElementById("includeFeedbackUrl");
const feedbackUrlInput = document.getElementById("feedbackUrl");

const includeContactEmailCheckbox = document.getElementById("includeContactEmail");
const contactEmailInput = document.getElementById("contactEmail");

const includeLogoUrlCheckbox = document.getElementById("includeLogoUrl");
const logoUrlInput = document.getElementById("logoUrl");

const includePageDemoUrlCheckbox = document.getElementById("inlcudePageDemoUrl");
const pageDemoUrlInput = document.getElementById("pageDemoUrl");

const includeSkillsCheckbox = document.getElementById("includeSkills");
const skillsTextarea = document.getElementById("skills");

const includeSocialLinksCheckbox = document.getElementById("includeSocialLinks");
const socialLinksTextarea = document.getElementById("socialLinks");

const includeVisitorCountCheckbox = document.getElementById("includeVisitorCount");
const visitorCountInput = document.getElementById("visitorCount");

const githubTrophyCheckbox = document.getElementById("githubTrophy");

const githubProfileStatsCardCheckbox = document.getElementById("githubProfileStatsCard");

const githubTopSkillsCheckbox = document.getElementById("githubTopSkills");

const githubStreakStatsCheckbox = document.getElementById("githubStreakStats");

const githubTwitterBadgeCheckbox = document.getElementById("githubTwitterBadge");





// Function to update the live preview
function updateLivePreview() {
    const markdownContent = codeView.value;
    preview.innerHTML = marked.parse(markdownContent);
}





// Function to lint the Markdown content
function lintMarkdown(markdownContent) {
    const options = { strings: { content: markdownContent } };
    markdownlint.sync(options, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        const errors = result.content || [];
        lintErrorsDiv.innerHTML = errors.length
            ? `<strong>Lint Errors:</strong><ul>${errors.map(err => `<li>${err.ruleDescription} (Line: ${err.lineNumber})</li>`).join('')}</ul>`
            : '<strong>No Lint Errors!</strong>';
    });
}





// Function to validate GitHub username
function validateGitHubUsername() {
    const githubUsername = githubUsernameInput.value.trim();
    if (!githubUsername) {
        alert("GitHub username is required for this.");
        return false;
    }
    return true;
}
// Add onchange event listeners to checkboxes
const githubCheckboxes = [
    githubTrophyCheckbox,
    githubProfileStatsCardCheckbox,
    githubTopSkillsCheckbox,
    githubStreakStatsCheckbox,
    githubTwitterBadgeCheckbox
];
githubCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        if (this.checked && !validateGitHubUsername()) {
            this.checked = false; // Uncheck the checkbox if validation fails
        }
    });
});




// Generate Markdown and update code and preview
generatePreviewButton.addEventListener("click", function () {
    let markdownContent = "";

    // Include name section if checkbox is checked
    if (includeYourNameCheckbox.checked) {
        const yourName = yourNameInput.value;
        markdownContent += `<h1 align="center">Hi 👋, I'm ${yourName}</h1>\n\n`;
    }

    // Include GitHub profile section if checkbox is checked
    // if (includeGithubCheckbox.checked) {
    //     const githubUsername = githubUsernameInput.value;
    //     markdownContent += `## GitHub Profile\n👉 [${githubUsername}](https://github.com/${githubUsername})\n\n`;
    // }

    // Include GitHub repository name section if checkbox is checked
    if (includeGithubrepositorynameCheckbox.checked) {
        const githubRepositoryName = githubrepositorynameInput.value;
        markdownContent += `<h3 align="center">${githubRepositoryName}</h3>\n\n`;
    }

    // Include website URL section if checkbox is checked
    if (includeWebsiteUrlCheckbox.checked) {
        const websiteUrl = websiteUrlInput.value;
        markdownContent += `## Website\n<h1>👉<a href="${websiteUrl}">${websiteUrl}</a></h1>\n\n`;
    }

    // Include features section if checkbox is checked
    // if (includeFeaturesCheckbox.checked) {
    //     const features = featuresTextarea.value.split(",");
    //     // markdownContent += `## Features\n${features}\n\n`;
    //     if (features.length > 0) {
    //         markdownContent += `## Features\n`;
    //         features.forEach(feature => {
    //             markdownContent += `- ${feature.trim()}\n`;
    //         });
    //         markdownContent += "\n";
    //     }
    // }

    // Include features section if checkbox is checked
    if (includeFeaturesCheckbox.checked) {
        const rawFeatures = featuresTextarea.value;
        // Split only by newline, treating each line as a distinct feature
        const features = rawFeatures.split("\n")
            .map(line => line.trim()) // Remove extra whitespace from each line
            .filter(line => line); // Remove empty lines

        if (features.length > 0) {
            markdownContent += `## Features\n`;
            features.forEach(feature => {
                markdownContent += `- ${feature}\n`;
            });
            markdownContent += "\n";
        }
    }

    // Include about me section if checkbox is checked
    if (includeAboutMeCheckbox.checked) {
        const aboutMe = aboutMeTextarea.value;
        markdownContent += `## About Me\n<h3 align="left">${aboutMe}</h3>\n\n`;
    }

    // Include work section if checkbox is checked
    // if (includeWorkCheckbox.checked) {
    //     const work = workTextarea.value;
    //     markdownContent += `## 🛠 Work | Updates\n${work}\n\n`;
    // }
    if (includeWorkCheckbox.checked) {
        const rawWork = workTextarea.value;
        // Split only by newline, treating each line as a distinct work
        const work = rawWork.split("\n")
            .map(line => line.trim()) // Remove extra whitespace from each line
            .filter(line => line); // Remove empty lines

        if (work.length > 0) {
            markdownContent += `## 🛠 Work\n`;
            work.forEach(work => {
                markdownContent += `- ${work}\n`;
            });
            markdownContent += "\n";
        }
    }

    // Include feedback URL section if checkbox is checked
    if (includeFeedbackUrlCheckbox.checked) {
        const feedbackUrl = feedbackUrlInput.value;
        markdownContent += `## Feedback\n If you have any feedback, please reach out to us at [Feedback](${feedbackUrl})\n\n`;
    }

    // Include contact email section if checkbox is checked
    if (includeContactEmailCheckbox.checked) {
        const contactEmail = contactEmailInput.value;
        markdownContent += `## Contact\n📧 reach me [${contactEmail}](mailto:${contactEmail})\n\n`;
    }

    // Include logo URL section if checkbox is checked
    if (includeLogoUrlCheckbox.checked) {
        const logoUrl = logoUrlInput.value;
        markdownContent += `## Logo\n![Logo](${logoUrl})\n\n`;
    }

    // Include page demo URL section if checkbox is checked
    if (includePageDemoUrlCheckbox.checked) {
        const pageDemoUrl = pageDemoUrlInput.value;
        markdownContent += `## Page Demo\n![Demo](${pageDemoUrl})\n\n`;
    }

    // Include skills section if checkbox is checked
    // if (includeSkillsCheckbox.checked) {
    //     const skills = skillsTextarea.value;
    //     markdownContent += `## ⚙️ Skills\n${skills}\n\n`;
    // }
    if (includeSkillsCheckbox.checked) {
        const rawSkills = skillsTextarea.value;
        // Split only by newline, treating each line as a distinct work
        const skills = rawSkills.split("\n")
            .map(line => line.trim()) // Remove extra whitespace from each line
            .filter(line => line); // Remove empty lines

        if (skills.length > 0) {
            markdownContent += `## ⚙️ Skills\n`;
            skills.forEach(skills => {
                markdownContent += `- ${skills}\n`;
            });
            markdownContent += "\n";
        }
    }

    // Include social links section if checkbox is checked
    // if (includeSocialLinksCheckbox.checked) {
    //     const socialLinks = socialLinksTextarea.value;
    //     markdownContent += `<h3 align="left">Connect with me:</h3>\n${socialLinks}\n\n`;
    // }

    if (includeSocialLinksCheckbox.checked) {
        const connect = JSON.parse(socialLinksTextarea.value || '{}');
        const socialLinks = Object.keys(connect).map(platform =>
            `<a href="${connect[platform]}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/${platform}.svg" alt="${platform}" height="30" width="40" /></a>`
        ).join('\n');
        markdownContent += `<h3 align="left">Connect with me:</h3>\n${socialLinks}\n\n`;
    }

    // Include visitor count section if checkbox is checked
    if (includeVisitorCountCheckbox.checked) {
        const visitorCount = visitorCountInput.value;
        markdownContent += `<!--Display Visitor Count-->\n<p align="right"> <img src="https://komarev.com/ghpvc/?username=${visitorCount}&label=Profile%20views&color=0e75b6&style=flat" alt="${visitorCount}" /> </p>\n\n`;
    }

    // Include  github trophy section if checkbox is checked
    if (githubTrophyCheckbox.checked) {
        const githubUsername = githubUsernameInput.value;
        markdownContent += `<p align="left"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${githubUsername}" alt="${githubUsername}" /></a></p>\n\n`;
    }

    // Include  github profile statics card section if checkbox is checked
    if (githubProfileStatsCardCheckbox.checked) {
        const githubUsername = githubUsernameInput.value;
        markdownContent += `<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&locale=en" alt="${githubUsername}"/></p>\n\n`;
    }

    // Include  github top skills section if checkbox is checked
    if (githubTopSkillsCheckbox.checked) {
        const githubUsername = githubUsernameInput.value;
        markdownContent += `<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&show_icons=true&locale=en&layout=compact" alt="${githubUsername}" /></p>\n\n`;
    }

    // Include  github streak stats section if checkbox is checked
    if (githubStreakStatsCheckbox.checked) {
        const githubUsername = githubUsernameInput.value;
        markdownContent += `<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&" alt="${githubUsername}" /></p>\n\n`;
    }

    // Include  github twitter badge section if checkbox is checked
    if (githubTwitterBadgeCheckbox.checked) {
        const githubUsername = githubUsernameInput.value;
        markdownContent += `<p align="left"> <a href="https://twitter.com/${githubUsername}" target="blank"><img src="https://img.shields.io/twitter/follow/${githubUsername}?logo=twitter&style=for-the-badge" alt="${githubUsername}" /></a> </p>\n\n`;
    }


    // Update Markdown Code View
    codeView.value = markdownContent.trim();

    // Update Live Preview
    updateLivePreview();
});

// Update preview whenever Markdown code is manually modified
codeView.addEventListener("input", updateLivePreview);





// Select all elements with the class 'copycode' and 'copyFeedback'
const copyButtons = document.querySelectorAll('.copycode');
const copyFeedback = document.querySelectorAll('.copyFeedback');

// Add click event listener to each copy button
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Select the Markdown content (Assuming markdownContent is your Markdown string)
        const markdownContent = document.getElementById('code-view').value || ''; // Replace 'markdownPreview' with your actual ID or logic

        if (markdownContent) {
            // Copy Markdown content to the clipboard
            navigator.clipboard.writeText(markdownContent)
                .then(() => {
                    // alert(markdownContent);
                    copyFeedback.forEach(copyFeedback => {
                        copyFeedback.innerHTML = 'Copied!';
                    });
                    // Clear "Copied!" message after 3 seconds
                    setTimeout(() => {
                        copyFeedback.forEach(feedback => {
                            feedback.innerHTML = '';
                        });
                    }, 3000);
                })
                .catch(err => {
                    alert('Failed to copy markdown code. Please try again.');
                    console.error('Copy failed:', err);
                });
        } else {
            alert('No Markdown content to copy!');
        }
    });
});






// auto-resize textarea
// Array of IDs for the textareas
// const textareaIds = ["aboutMe", "features", "work", "skills", "socialLinks"];
// // Apply the auto-resize function to each textarea
// textareaIds.forEach(id => {
//     const textarea = document.getElementById(id);
//     if (textarea) {
//         textarea.addEventListener("input", function () {
//             this.style.height = "auto"; // Reset height to recalculate
//             this.style.height = this.scrollHeight + "px"; // Set height to content's height
//         });
//     }
// });



// Auto-resize textarea
// Array of IDs for the textareas
const textareaIds = ["aboutMe", "features", "work", "skills", "socialLinks"];

// Apply the auto-resize function to each textarea
textareaIds.forEach(id => {
    const textarea = document.getElementById(id);
    if (textarea) {
        textarea.style.overflowY = "hidden"; // Prevent scrollbars from appearing
        textarea.addEventListener("input", function () {
            // Save the current scroll position of the page
            const scrollPosition = window.scrollY;

            this.style.height = "auto"; // Reset height to recalculate
            this.style.height = this.scrollHeight + "px"; // Set height to content's height

            // Restore the scroll position of the page
            window.scrollTo(0, scrollPosition);
        });
    }
});





// Get reference to the auto-check switch
const autoCheckSwitch = document.getElementById("autocheckbox");
// Map of input-checkbox pairs
const inputCheckboxPairs = [
    { input: "yourName", checkbox: "includeYourName" },
    { input: "githubUsername", checkbox: "includeGithubUsername" },
    { input: "githubrepositoryname", checkbox: "includeGithubrepositoryname" },
    { input: "websiteUrl", checkbox: "includeWebsiteUrl" },
    { input: "features", checkbox: "includeFeatures" },
    { input: "aboutMe", checkbox: "includeAboutMe" },
    { input: "work", checkbox: "includeWork" },
    { input: "feedbackUrl", checkbox: "includeFeedbackUrl" },
    { input: "contactEmail", checkbox: "includeContactEmail" },
    { input: "logoUrl", checkbox: "includeLogoUrl" },
    { input: "pageDemoUrl", checkbox: "inlcudePageDemoUrl" },
    { input: "skills", checkbox: "includeSkills" },
    { input: "socialLinks", checkbox: "includeSocialLinks" },
    { input: "visitorCount", checkbox: "includeVisitorCount" },
];
// Function to handle input changes and auto-check corresponding checkbox
function handleInputChange(inputElement, checkboxElement) {
    if (inputElement.value.trim() !== "") {
        checkboxElement.checked = true;
    } else {
        checkboxElement.checked = false;
    }
}
// Add or remove input event listeners based on the state of the auto-check switch
autoCheckSwitch.addEventListener("change", function () {
    inputCheckboxPairs.forEach(({ input, checkbox }) => {
        const inputElement = document.getElementById(input);
        const checkboxElement = document.getElementById(checkbox);

        if (this.checked) {
            // Add event listener to the input
            inputElement.addEventListener("input", () => handleInputChange(inputElement, checkboxElement));
        } else {
            // Remove event listener from the input
            inputElement.removeEventListener("input", () => handleInputChange(inputElement, checkboxElement));
        }
    });
});





// Export data as JSON
exportJsonButton.addEventListener("click", function () {
    const formData = {
        includeYourNameCheckbox: includeYourNameCheckbox.checked,
        yourNameInput: yourNameInput.value,

        includeGithubCheckbox: includeGithubCheckbox.checked,
        githubUsernameInput: githubUsernameInput.value,

        includeGithubrepositorynameCheckbox: includeGithubrepositorynameCheckbox.checked,
        githubrepositorynameInput: githubrepositorynameInput.value,

        includeWebsiteUrlCheckbox: includeWebsiteUrlCheckbox.checked,
        websiteUrlInput: websiteUrlInput.value,

        includeFeaturesCheckbox: includeFeaturesCheckbox.checked,
        featuresTextarea: featuresTextarea.value,

        includeAboutMeCheckbox: includeAboutMeCheckbox.checked,
        aboutMeTextarea: aboutMeTextarea.value,

        includeWorkCheckbox: includeWorkCheckbox.checked,
        workTextarea: workTextarea.value,

        includeFeedbackUrlCheckbox: includeFeedbackUrlCheckbox.checked,
        feedbackUrlInput: feedbackUrlInput.value,

        includeContactEmailCheckbox: includeContactEmailCheckbox.checked,
        contactEmailInput: contactEmailInput.value,

        includeLogoUrlCheckbox: includeLogoUrlCheckbox.checked,
        logoUrlInput: logoUrlInput.value,

        includePageDemoUrlCheckbox: includePageDemoUrlCheckbox.checked,
        pageDemoUrlInput: pageDemoUrlInput.value,

        includeSkillsCheckbox: includeSkillsCheckbox.checked,
        skillsTextarea: skillsTextarea.value,

        includeSocialLinksCheckbox: includeSocialLinksCheckbox.checked,
        socialLinksTextarea: socialLinksTextarea.value,

        includeVisitorCountCheckbox: includeVisitorCountCheckbox.checked,
        visitorCountInput: visitorCountInput.value,

        githubTrophyCheckbox: githubTrophyCheckbox.checked,

        githubProfileStatsCardCheckbox: githubProfileStatsCardCheckbox.checked,

        githubTopSkillsCheckbox: githubTopSkillsCheckbox.checked,

        githubStreakStatsCheckbox: githubStreakStatsCheckbox.checked,

        githubTwitterBadgeCheckbox: githubTwitterBadgeCheckbox.checked,

        autoCheckSwitchEnabled: autoCheckSwitch.checked,
    };

    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "readme-data.json";
    link.click();
});





// Import data from JSON
importJsonButton.addEventListener("click", function () {
    fileInput.click();
});
fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = JSON.parse(e.target.result);

            yourNameInput.value = data.yourNameInput || "";
            includeYourNameCheckbox.checked = data.includeYourNameCheckbox || false;

            githubUsernameInput.value = data.githubUsernameInput || "";
            includeGithubCheckbox.checked = data.includeGithubCheckbox || false;

            githubrepositorynameInput.value = data.githubrepositorynameInput || "";
            includeGithubrepositorynameCheckbox.checked = data.includeGithubrepositorynameCheckbox || false;

            websiteUrlInput.value = data.websiteUrlInput || "";
            includeWebsiteUrlCheckbox.checked = data.includeWebsiteUrlCheckbox || false;

            featuresTextarea.value = data.featuresTextarea || "";
            includeFeaturesCheckbox.checked = data.includeFeaturesCheckbox || false;

            aboutMeTextarea.value = data.aboutMeTextarea || "";
            includeAboutMeCheckbox.checked = data.includeAboutMeCheckbox || false;

            workTextarea.value = data.workTextarea || "";
            includeWorkCheckbox.checked = data.includeWorkCheckbox || false;

            feedbackUrlInput.value = data.feedbackUrlInput || "";
            includeFeedbackUrlCheckbox.checked = data.includeFeedbackUrlCheckbox || false;

            contactEmailInput.value = data.contactEmailInput || "";
            includeContactEmailCheckbox.checked = data.includeContactEmailCheckbox || false;

            logoUrlInput.value = data.logoUrlInput || "";
            includeLogoUrlCheckbox.checked = data.includeLogoUrlCheckbox || false;

            pageDemoUrlInput.value = data.pageDemoUrlInput || "";
            includePageDemoUrlCheckbox.checked = data.includePageDemoUrlCheckbox || false;

            skillsTextarea.value = data.skillsTextarea || "";
            includeSkillsCheckbox.checked = data.includeSkillsCheckbox || false;

            socialLinksTextarea.value = data.socialLinksTextarea || "";
            includeSocialLinksCheckbox.checked = data.includeSocialLinksCheckbox || false;

            visitorCountInput.value = data.visitorCountInput || "";
            includeVisitorCountCheckbox.checked = data.includeVisitorCountCheckbox || false;

            githubTrophyCheckbox.checked = data.githubTrophyCheckbox || false;

            githubProfileStatsCardCheckbox.checked = data.githubProfileStatsCardCheckbox || false;

            githubTopSkillsCheckbox.checked = data.githubTopSkillsCheckbox || false;

            githubStreakStatsCheckbox.checked = data.githubStreakStatsCheckbox || false;

            githubTwitterBadgeCheckbox.checked = data.githubTwitterBadgeCheckbox || false;

            autoCheckSwitch.checked = data.autoCheckSwitchEnabled || false;

            // Generate the Markdown automatically after importing
            generatePreviewButton.click();
        };
        reader.readAsText(file);
    }
});





// Download the Markdown file
downloadButton.addEventListener("click", function () {
    const markdownContent = codeView.value;
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
});





