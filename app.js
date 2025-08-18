// Simple fade-in animations and lead capture form handling

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Lead capture form using EmailJS
const leadForm = document.getElementById('lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      from_name: leadForm.name.value,
      from_email: leadForm.email.value,
      phone: leadForm.phone.value,
      message: leadForm.message.value
    };
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_LEAD_TEMPLATE_ID', data)
      .then(() => {
        alert('Thank you for contacting us!');
        leadForm.reset();
      })
      .catch((err) => {
        console.error('Lead capture failed', err);
        alert('Failed to send. Please try again later.');
      });
  });
}
