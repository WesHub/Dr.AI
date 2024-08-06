document.getElementById('symptomInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    const symptomInput = document.getElementById('symptomInput');
    const symptom = symptomInput.value.trim();

    if (symptom !== '') {
        fetch('http://localhost:3000/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptom: symptom })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error from server:', data.details);
                // Handle error gracefully in the UI
            } else {
                const chatBody = document.getElementById('chatBody');
                
                const userDiv = document.createElement('div');
                userDiv.classList.add('message', 'user-message');
                
                const userIcon = document.createElement('div');
                userIcon.classList.add('message-icon');
                const userIconI = document.createElement('i');
                userIconI.classList.add('fas', 'fa-user');
                userIcon.appendChild(userIconI);
                userDiv.appendChild(userIcon);
                
                const userText = document.createElement('span');
                userText.textContent = symptom;
                userDiv.appendChild(userText);
                
                chatBody.appendChild(userDiv);

                const botDiv = document.createElement('div');
                botDiv.classList.add('message', 'assistant-message');
                
                const botIcon = document.createElement('div');
                botIcon.classList.add('message-icon');
                
                const botIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                botIconSvg.classList.add('logo-icon');
                botIconSvg.setAttribute('viewBox', '0 0 200 80');
                
                const botIconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                botIconText.setAttribute('x', '50%');
                botIconText.setAttribute('y', '50%');
                botIconText.setAttribute('class', 'logo-text');
                botIconText.setAttribute('text-anchor', 'middle');
                botIconText.setAttribute('dominant-baseline', 'middle');
                
                const drSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                drSpan.classList.add('logo-dr');
                drSpan.textContent = 'Dr';
                
                const dotSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                dotSpan.classList.add('logo-dot');
                dotSpan.textContent = '.';
                
                const aiSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                aiSpan.classList.add('logo-ai');
                aiSpan.textContent = 'AI';
                
                botIconText.appendChild(drSpan);
                botIconText.appendChild(dotSpan);
                botIconText.appendChild(aiSpan);
                
                botIconSvg.appendChild(botIconText);
                botIcon.appendChild(botIconSvg);
                botDiv.appendChild(botIcon);
                
                const botText = document.createElement('span');
                botText.textContent = data.message;
                botDiv.appendChild(botText);
                
                chatBody.appendChild(botDiv);
                
                chatBody.scrollTop = chatBody.scrollHeight;
            }
            
            // Clear the input field after sending the message
            symptomInput.value = '';
        })
        .catch(err => {
            console.error('Error:', err);
            // Handle fetch error in the UI
        });
    }
}