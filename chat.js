// Initialize EmailJS (replace with your EmailJS user ID)
(function() {
  emailjs.init('YOUR_USER_ID');
})();

const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');
const clientEmail = document.getElementById('client-email');

// Stores text lines for emailing
const messages = [];

function appendMessage(text, sender = 'client') {
  const msg = document.createElement('div');
  msg.className = 'chat-message ' + sender;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
  const prefix = sender === 'client' ? 'Client: ' : 'Bot: ';
  messages.push(prefix + text);
}

function getBasicInfoResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes('project')) {
    return 'Glamour Home Builders crafts luxury residences with modern amenities.';
  }
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email')) {
    return 'Reach us at 9014308289 or info@glamourhomebuilders.com.';
  }
  if (lower.includes('location') || lower.includes('where')) {
    return 'JGD Residency is located at Dathanagar, Kanchan Bagh, Hyderabad.';
  }
  if (lower.includes('brochure')) {
    return 'View our brochure at https://glamourhomebuilder.online/JGD-Residency-Brochure.pdf';
  }
  return null;
}

function getFallbackResponse(text) {
  const lower = text.toLowerCase();
  if (['hi', 'hello', 'hey'].some((g) => lower.startsWith(g))) {
    return 'Hello! How can I assist you with JGD Residency?';
  }
  if (lower.includes('thank')) {
    return "You're welcome! Let me know if you need details on floor plans or pricing.";
  }
  return 'Thanks for reaching out! Our team will get back to you with more information soon.';
}

document.getElementById('chat-send').addEventListener('click', function() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage(text, 'client');
  chatInput.value = '';

  const basic = getBasicInfoResponse(text);
  if (basic) {
    appendMessage(basic, 'bot');
    return;
  }

  appendMessage(getFallbackResponse(text), 'bot');
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

chatInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('chat-send').click();
  }
});

appendMessage('Welcome to Glamour Home Builders! We craft luxury residences for modern living.', 'bot');
appendMessage('Visit our JGD Residency at Dathanagar, Kanchan Bagh, Hyderabad or call (9014308289.', 'bot');
