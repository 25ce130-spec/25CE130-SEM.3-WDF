# CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY (CHARUSAT)
## FACULTY OF TECHNOLOGY AND ENGINEERING (FTE)
### DEPARTMENT OF COMPUTER ENGINEERING (CSPIT-CE)
### SUBJECT: WEB DEVELOPMENT FRAMEWORKS (ITUE203)
### SEMESTER: 3RD, 2026-27 (ODD)

---

## STUDENT INFORMATION
| Field | Details |
| :--- | :--- |
| **Name** | Vishv Vaghasiya |
| **Student ID** | 25CE130 |
| **Subject Code** | ITUE203 |
| **Subject** | Web Development Frameworks |
| **Department** | CSPIT-CE |
| **University** | CHARUSAT |

---

# Practical-4: JavaScript DOM Manipulation, Event Handling, and UI Interactivity

### Aim
To understand the Document Object Model (DOM) and handle user events in the StudentHub web application so that page content can be read, created, updated, and reacted to user actions without reloading the page.

### Tools / Technology to be Used
- HTML5 pages with elements that can be selected, created, and updated.
- JavaScript DOM APIs: `document.getElementById`, `document.querySelector`, `document.querySelectorAll`, `document.createElement`, and `element.appendChild` / `element.prepend`.
- DOM properties: `innerText`, `innerHTML`, `value`, `className`, and `classList` (`add`, `remove`, `toggle`, `contains`).
- Event handling with `addEventListener` for `DOMContentLoaded`, `click`, `keydown`, `mouseenter`, and `mouseleave`.
- Client-side storage: `localStorage` for persistent theme preference and `sessionStorage` for notification banner state.
- Google Chrome Developer Tools (Console, Elements, Application tab).

### Theory : Core Concept of Practical
The DOM represents the HTML page as a hierarchical tree of objects that JavaScript can read and modify dynamically. In this project, JavaScript selects elements with `getElementById` and `querySelector`, creates new elements with `createElement`, and updates content using `innerText` and `innerHTML`.

Events such as `click`, `input`, and `keydown` are attached with `addEventListener` so that the interface responds immediately to user interaction:
- **Light/Dark Theme Switcher:** Toggles the `light-theme` class on the `<body>` element and saves the choice in `localStorage`. On page reload, the script queries `localStorage` to restore the user's preferred theme automatically.
- **Notification Banner:** Displays college alerts and provides an interactive close button that smoothly fades and removes the banner from the DOM tree while recording dismissal in `sessionStorage`.
- **Collapsible FAQ Accordion:** Event listeners attached to question headers toggle the active state and smoothly animate the max-height of answer panels while maintaining ARIA accessibility.
- **Campus Announcement Modal Dialog:** Provides an accessible pop-up overlay with backdrop blur, closing via close button, backdrop click, or keyboard `Escape` key.
- **Campus Highlights Slider:** Automatically rotates announcement cards every 4.5 seconds with pause-on-hover, dot indicators, and Next/Previous buttons.
- **Responsive Mobile Navigation:** Hamburger menu button toggles the navigation drawer on mobile viewports.

### Code
File: `PRACTICAL-4/index.html` (Extract)
```html
<header class="site-header">
  <div class="header-container">
    <a href="index.html" class="brand">
      <div class="logo">🎓</div>
      <div class="brand-text">
        <h1>StudentHub Portal</h1>
        <p>CHARUSAT • CSPIT-CE</p>
      </div>
    </a>
    <nav class="site-nav" id="siteNav">
      <ul class="nav-links">
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="student-dashboard.html">Dashboard</a></li>
        <li><a href="courses.html">Courses</a></li>
        <li><a href="timetable.html">Timetable</a></li>
        <li><a href="results.html">Results</a></li>
        <li><a href="announcements.html">Announcements</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="profile.html">Profile</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <button id="themeToggleBtn" class="theme-btn">
        <span id="themeIcon">🌙</span> <span id="themeText">Dark</span>
      </button>
      <button id="hamburgerBtn" class="hamburger">☰</button>
    </div>
  </div>
</header>
```

File: `PRACTICAL-4/js/script.js` (Extract)
```javascript
document.addEventListener("DOMContentLoaded", function () {
  // Theme switcher with localStorage
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("studenthub-theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const isLight = document.body.classList.contains("light-theme");
      const newTheme = isLight ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("studenthub-theme", newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      document.getElementById("themeIcon").textContent = "☀️";
      document.getElementById("themeText").textContent = "Light";
    } else {
      document.body.classList.remove("light-theme");
      document.getElementById("themeIcon").textContent = "🌙";
      document.getElementById("themeText").textContent = "Dark";
    }
  }

  // Dismissible notification banner
  const closeBannerBtn = document.getElementById("closeBannerBtn");
  if (closeBannerBtn) {
    closeBannerBtn.addEventListener("click", function () {
      document.getElementById("notificationBanner").remove();
      sessionStorage.setItem("bannerDismissed", "true");
    });
  }
});
```

### Output Description
- The homepage opens with a sticky header, navigation links, theme toggle button, and auto-playing highlights slider.
- Clicking the theme toggle switches between dark and light themes smoothly; reloading the browser preserves the chosen theme.
- Clicking the notification close button smoothly fades and removes the banner from the DOM.
- On `faq.html`, clicking on question headers expands and collapses corresponding answer panels with rotating chevrons.
- Clicking the modal button launches the campus announcement modal with focus trap and keyboard `Escape` closing.

### Question - Answer (Viva Questions)
**Q1: What is the DOM?**  
**A:** The DOM (Document Object Model) is a tree-like object representation of an HTML document created by the browser. JavaScript uses it to access, add, modify, or delete elements, attributes, and styles at runtime.

**Q2: What is the difference between innerText and innerHTML?**  
**A:** `innerText` accesses or modifies only the rendered text content (ignoring/escaping tags), while `innerHTML` works with raw HTML markup, allowing dynamic creation of HTML tags and elements.

**Q3: What is an event listener?**  
**A:** An event listener is a function registered with `addEventListener()` that is executed when a specific event (such as `click`, `input`, `change`, `submit`, or `keydown`) occurs on an element.

**Q4: How does this project preserve user UI preferences?**  
**A:** User preferences (such as light or dark theme) are stored in `localStorage` under `studenthub-theme`. When any page loads, it checks `localStorage` and restores the selected theme without requiring the user to toggle it again.

### Conclusion
Practical 4 successfully demonstrates client-side DOM manipulation and event handling in JavaScript. Dynamic theme switching with persistent `localStorage`, dismissible notification banners, interactive modal dialogs, accessible FAQ accordions, and automated content sliders were built to deliver a reactive, user-friendly student portal without requiring full-page reloads.
