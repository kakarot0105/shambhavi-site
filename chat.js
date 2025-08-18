// chat.js

// === Basic Info Responses (expanded) ===
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
    return "📍 JGD Residency is located at Dathanagar, Kanchan Bagh, Hyderabad.";
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
    return "🔌 Standard power connections as per GHMC norms. 24×7 water supply. For backup details, please enquire.";
  }

  // 15) Legal / documents
  if (has("legal", "documentation", "documents", "papers", "agreement", "sale deed")) {
    return "📄 GHMC approvals in place. For sale deed, agreement draft, and other documents, please raise an enquiry and we will share them.";
  }

  // 16) Neighborhood / connectivity
  if (has("nearby", "neighborhood", "schools", "hospital", "connectivity", "distance", "airport")) {
    return "🧭 Located in Kanchan Bagh, with good access to key city areas. For a location highlights sheet, please enquire.";
  }

  // Default fallback
  return null;
}

// === Chat UI Logic ===
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatEmail = document.getElementById("chat-email");
const clientEmail = document.getElementById("client-email");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "chat-msg user" : "chat-msg bot";
  msg.innerText = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleUserInput() {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  chatInput.value = "";

  const response = getBasicInfoResponse(text);
  if (response) {
    appendMessage("bot", response);
  } else {
    appendMessage("bot", "🤖 I can help with project info, brochure, specs, approvals, amenities, possession, builder, location, and how to enquire.");
  }
}

if (chatSend) chatSend.addEventListener("click", handleUserInput);
if (chatInput) chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleUserInput();
});

// === Email Conversation via EmailJS (optional) ===
// Replace with your EmailJS IDs if you plan to use it. Otherwise, this button can be hidden in HTML.
if (chatEmail) {
  chatEmail.addEventListener("click", () => {
    const email = (clientEmail && clientEmail.value || "").trim();
    if (!email) {
      alert("Please enter your email to receive the conversation.");
      return;
    }
    const messages = Array.from(chatLog.children).map((div) => div.innerText).join("\n");

    try {
      emailjs.init("YOUR_EMAILJS_USER_ID"); // <-- set or remove if unused
      emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
          to_email: email,
          chat_log: messages,
        })
        .then(
          () => alert("Conversation emailed successfully!"),
          (err) => alert("Failed to send email: " + JSON.stringify(err))
        );
    } catch (_) {
      alert("EmailJS is not configured. Please set YOUR_EMAILJS_USER_ID / SERVICE_ID / TEMPLATE_ID.");
    }
  });
}
