# Jai Guru Datta Residency Website

This repository contains a lightweight, static website for Glamour Home Builders showcasing their ongoing project,
**Jai Guru Datta Residency**.

Live site: https://glamourhomebuilder.online/

## Getting started

To preview the site locally, open `index.html` in a web browser. All assets, including the project brochure PDF, reside
within the repository root.

## Development & maintenance

The site uses plain HTML and CSS for maximum portability. To add new sections or projects, edit the HTML and CSS files as
needed. You can duplicate the existing section structure to create pages for completed projects. As the site grows,
consider migrating to a component-based framework such as Next.js or Astro for better maintainability.

### Email chat setup

The contact section includes a lightweight chat box that can email a transcript of client messages. The implementation uses [EmailJS](https://www.emailjs.com/) for client-side email delivery. Visitors may optionally provide their email address to help you follow up on inquiries. To enable email sending:

1. Create an EmailJS account and configure a service and template.
2. Replace `YOUR_USER_ID`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` in `chat.js` with the values from your EmailJS
   dashboard.

Without these values the chat will work locally, but the "Email Conversation" button will not send any messages.

### Chatbot AI

The chat interface uses the free [Affiliate+ chatbot API](https://api.affiliateplus.xyz/). No API key is required, though responses may be generic. To use another model, update the endpoint in `chat.js`.

## Deployment

For a simple deployment, push this repository to GitHub and enable GitHub Pages on the default branch. Alternatively,
upload the contents of the repository to any static hosting service, such as Netlify, Vercel or your preferred web
server.

## Features

- Clean, responsive layout built with plain HTML and CSS
- Specification section uses Font Awesome icons for quick visual reference
