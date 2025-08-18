// Initialize EmailJS (replace with your EmailJS user ID)
(function() {
  emailjs.init('YOUR_USER_ID');
})();

// This example uses the free Affiliate+ Chatbot API
// no API key required

const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const clientEmail = document.getElementById('client-email');

// Stores text lines for emailing
const messages = [];

// Session identifier for the free chatbot API
const sessionId = Math.random().toString(36).substring(2);

function appendMessage(text, sender = 'client') {
  const msg = document.createElement('div');
  msg.className = 'chat-message ' + sender;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  const prefix = sender === 'client' ? 'Client: ' : 'Bot: ';
  messages.push(prefix + text);
}

async function fetchAIResponse(text) {
  const params = new URLSearchParams({
    message: text,
    botname: 'GlamourAI',
    ownername: 'Glamour Home Builders',
    sessionid: sessionId
  });
  const response = await fetch('https://api.affiliateplus.xyz/api/chatbot?' + params.toString());
  const data = await response.json();
  return data.message.trim();
}

document.getElementById('chat-send').addEventListener('click', async function() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage(text, 'client');
  chatInput.value = '';

  try {
    const reply = await fetchAIResponse(text);
    appendMessage(reply, 'bot');
  } catch (err) {
    console.error('AI response failed', err);
    appendMessage('Sorry, I am having trouble responding right now.', 'bot');
  }
});

document.getElementById('chat-email').addEventListener('click', function() {
  if (!messages.length) {
    alert('Please enter a message before sending.');
    return;
  }

  const conversationText = messages.join('\n');
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    conversation: conversationText,
    client_email: clientEmail.value
  }).then(function() {
    alert('Conversation sent!');
  }, function(err) {
    console.error('Failed to send conversation', err);
    alert('Failed to send conversation.');
  });
});
