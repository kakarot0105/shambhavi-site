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
  const lower = text.toLowerCase().trim();

  // Normalize synonyms for better matching
  const has = (...keys) => keys.some(k => lower.includes(k));

  // 1) Core project info
  if (has("project", "about jgd", "about project", "what is jgd")) {
    return "Glamour Home Builders crafts luxury residences with modern amenities, blending thoughtful design with quality construction.";
  }

  // 2) Contact (phone/email)
  if (has("contact", "phone", "email", "reach", "call", "whatsapp")) {
    return "You can reach us at 📞 9014308289 or email glamourhomebuilders@gmail.com.";
  }

  // 3) Location
  if (has("location", "where", "address", "map", "directions")) {
    return "📍 JGD Residency is located at Dathunagar, Kanchan Bagh, Hyderabad, near RCI Road and International Airport Road.";
  }

  // 4) Brochure link
  if (has("brochure", "pdf", "download brochure", "catalog")) {
    return "📑 View our brochure: https://glamourhomebuilder.online/JGD-Residency-Brochure.pdf";
  }

  // 5) Specifications
  if (has("specs", "specifications", "construction", "materials")) {
    return "🏗️ RCC framed structure, red brick walls, vitrified tile flooring, teak main door, uPVC windows, granite kitchen platform with SS sink, concealed copper wiring with modular switches, premium CP fittings, emulsion interior & weatherproof exterior painting.";
  }

  // 6) Amenities / features
  if (has("amenities", "features", "facilities")) {
    return "✨ Lift, parking, 24×7 water supply, premium fittings, and GHMC-approved planning standards.";
  }

  // 7) Approval / GHMC
  if (has("approval", "approved", "ghmc")) {
    return "✅ The project is GHMC-approved, ensuring compliance with Hyderabad municipal standards.";
  }

  // 8) Pricing — keep generic (no prices shown on site)
  if (has("pricing", "price", "cost", "rate")) {
    return "💬 Please contact us directly for the latest pricing and availability details.";
  }

  // 9) Possession / handover
  if (has("possession", "handover", "move in", "ready to move", "rtm")) {
    return "🏠 Possession varies by unit. Some are ready-to-move, others are nearing completion. Please enquire for current status.";
  }

  // 10) Builder / developer
  if (has("builder", "developer", "who built", "who is builder")) {
    return "👷 Developed by Glamour Home Builders, known for high-quality residential projects in Hyderabad.";
  }

  // 11) Enquiry / interest
  if (has("enquire", "enquiry", "interest", "interested", "contact sales", "sales")) {
    return "📩 Please fill out the Enquire form below with your details and our team will get back to you quickly.";
  }

  // 12) Floor plans
  if (has("floor plan", "floorplan", "layout", "plan")) {
    return "🗺️ We offer 2–3 BHK layouts with efficient space planning. Please check the Gallery or enquire for detailed floor plans.";
  }

  // 13) Parking / lift
  if (has("parking", "car park", "lift", "elevator")) {
    return "🚗 Parking and lift are available in the building. For slot availability, please share your unit preference via Enquire.";
  }

  // 14) Utilities / water / power
  if (has("utilities", "water", "power", "electricity", "backup")) {
    return "🔌 Standard power connections with generator-backed backup and 24×7 water supply.";
  }

  // 15) Legal / documents
  if (has("legal", "documentation", "documents", "papers", "agreement", "sale deed")) {
    return "📄 GHMC approvals in place. For sale deed, agreement draft, and other documents, please raise an enquiry and we will share them.";
  }

  // 16) Neighborhood / connectivity
  if (has("nearby", "neighborhood", "schools", "hospital", "connectivity", "distance", "airport")) {
    return "🧭 Located in Kanchan Bagh, with good access to key city areas. For a location highlights sheet, please enquire.";
  }

  // 17) Availability / flats
  if (has("availability", "available", "flats", "units")) {
    return "🏢 Units available: 2 BHK (1170 sft) and 3 BHK (1590 sft), with only two flats per floor.";
  }

  // Default fallback
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
appendMessage('Visit our JGD Residency at Dathunagar, Kanchan Bagh, Hyderabad near RCI Road and International Airport Road or call (9014308289)', 'bot');
