function sendMessage() {
    let input = document.getElementById('userInput').value.toLowerCase();
    let chatBox = document.getElementById('chatBox');
    let response = '';

    if(input.includes('skill') || input.includes('skills')) {
        response = 'I have skills in protective security, IT, cybersecurity, teamwork, and incident response. 💪';
    } else if(input.includes('project')) {
        response = 'Check out my projects in the Projects section. 🔗';
    } else if(input.includes('resume')) {
        response = 'You can download my resume from the Resume section. 📝';
    } else if(input.includes('contact')) {
        response = 'Use the Contact form to send me a message. 📬';
    } else {
        response = 'Sorry, I do not understand that yet! 🤔';
    }

    chatBox.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
    document.getElementById('userInput').value = '';
    chatBox.scrollTop = chatBox.scrollHeight; // auto scroll to latest message
}
