# 🎨 Portfolio Customization Guide

Welcome to your modern **4-Slide Personal Portfolio Website**! This portfolio is designed to be clean, responsive, smooth, and easily customizable.

---

## 🚀 Quick Start

1. Double-click `index.html` to open the portfolio in any modern browser (Chrome, Edge, Firefox, Safari).
2. Use **Arrow keys** (`←` and `→`), the **Top Navigation Bar**, **Floating Dots**, or the **Bottom Controls** to navigate between the 4 slides:
   - **Slide 1**: About Me
   - **Slide 2**: Education & Skills
   - **Slide 3**: Projects, Certifications & Achievements
   - **Slide 4**: Contact Me

---

## ⚡ Method 1: Instant In-Browser Customization

Click the **`🎨 Customize`** button in the top right corner of the website to open the live customizer drawer:

- **Color Palettes**: Click between 5 curated presets:
  - *Indigo Modern* (Default tech purple & emerald)
  - *Cyber Emerald* (High-tech neon cyan & green)
  - *Oceanic Teal* (Deep azure & vibrant blue)
  - *Sunset Rose* (Coral crimson & warm amber)
  - *Minimalist Light Mode* (Clean corporate white & slate)
- **Custom Color Pickers**: Use the interactive color bubbles to select your exact brand colors.
- **Typography**: Switch between Google Fonts (*Plus Jakarta Sans*, *Outfit*, *Inter*, *Space Grotesk*).
- **Live Edit Mode**: Toggle the switch to **ON**. Once enabled, you can click directly on any text on the screen and edit it live!
- **Profile Photo Upload**: Select any image file from your computer or paste an image URL to preview your profile photo immediately.

---

## 📝 Method 2: Permanent Code Customization

All placeholder information in `index.html` is marked with clean bracketed placeholders such as `[Your Full Name]`. Open `index.html` in VS Code or any text editor and find the sections below:

### 1. Slide 1: About Me
- **Name & Headline**:
  ```html
  <h1 class="profile-name">[Your Full Name]</h1>
  <p class="profile-role-tag">[Your Professional Title / Domain Specialist]</p>
  ```
- **Profile Photo**:
  Place your photo inside the `my portfolio/` folder (for example `profile.jpg`) and update:
  ```html
  <img src="profile.jpg" alt="Your Name Profile Photo" id="profileImgPreview" class="profile-img-preview" style="display: block;">
  ```
  *(Hide the initials fallback `<div id="avatarInitials" style="display: none;">`)*.
- **Intro & Bio**: Replace the text inside `<p class="about-intro-hero">` and `<p class="about-bio-text">`.
- **Interests**: Add or modify the `<span class="interest-pill">` items.
- **Goals**: Update the `<div class="goal-item">` text entries.

---

### 2. Slide 2: Education & Skills
- **Education**: Edit the degree, university name, dates, GPA, and coursework in `<div class="edu-item-card">`.
- **Programming Languages**:
  Update language names and bar widths:
  ```html
  <div class="lang-item">
    <div class="lang-header">
      <span class="lang-name">Python</span>
      <span class="lang-percent">90%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width: 90%;"></div>
    </div>
  </div>
  ```
- **Technical & Soft Skills**: Add or edit `<span class="skill-chip">` items.
- **Tools**: Add or customize items inside `<div class="tools-grid">`.

---

### 3. Slide 3: Projects, Certifications & Achievements
Slide 3 organizes items into 3 columns with filter tabs (*Projects*, *Certifications*, *Achievements*):

- **Projects**:
  Update project title, description, tags, and clickable links:
  ```html
  <a href="https://your-demo-url.com" target="_blank" class="action-link">Live Demo</a>
  <a href="https://github.com/username/repo" target="_blank" class="action-link action-link-alt">Source Code</a>
  ```
- **Certifications**:
  Update credential title, issuing organization, issue date, and verification link:
  ```html
  <a href="https://verify.credential.net/..." target="_blank" class="action-link">Verify Credential</a>
  ```
- **Achievements & Awards**:
  Update competition or academic award name, host organization, date, and link.

---

### 4. Slide 4: Contact Me
- **Email & Phone**:
  Update both the `href` and visible text so `mailto:` and `tel:` links work:
  ```html
  <a href="mailto:you@example.com" class="contact-value-link">you@example.com</a>
  <button class="copy-btn-inline" data-copy-target="you@example.com">Copy Email</button>
  ```
- **Social Media Links**:
  Replace `yourusername` in each profile link:
  - LinkedIn: `https://linkedin.com/in/yourusername`
  - GitHub: `https://github.com/yourusername`
  - Instagram: `https://instagram.com/yourusername`
  - Twitter / X: `https://x.com/yourusername`
  - YouTube: `https://youtube.com/@yourusername`
  - Discord: `https://discord.com/users/yourusername`

---

## 🎨 Changing Default Styling in `css/style.css`

At the very top of `css/style.css`, you can adjust the CSS variables in the `:root` block:

```css
:root {
  --primary: #6366f1;       /* Main brand color */
  --accent: #10b981;        /* Accent color */
  --bg-dark: #0b0f19;       /* Canvas background */
  --font-family: 'Plus Jakarta Sans', sans-serif;
}
```

---

## 🌐 Free Deployment

### GitHub Pages
1. Push your repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.

### Vercel / Netlify
- Drag and drop your project folder onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com) for instant SSL hosting.
