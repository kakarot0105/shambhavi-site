(function() {
  emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID
})();

const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const clientEmail = document.getElementById('client-email');
const messages = [];

function appendMessage(text, sender = 'client') {
  const msg = document.createElement('div');
  msg.className = 'chat-message ' + sender;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  messages.push(text);
}

document.getElementById('chat-send').addEventListener('click', function() {
  const text = chatInput.value.trim();
  if (text) {
    appendMessage(text);
    chatInput.value = '';
  }
});

document.getElementById('chat-email').addEventListener('click', function() {
  if (!messages.length) {
    alert('Please enter a message before sending.');
    return;
  }
  const conversation = messages.join('\n');
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    conversation: conversation,
    client_email: clientEmail.value
  }).then(function() {
    alert('Conversation sent!');
  }, function(err) {
    console.error('Failed to send conversation', err);
    alert('Failed to send conversation.');
  });
});
