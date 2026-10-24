# Practical 4: JavaScript DOM Manipulation, Event Handling, and UI Interactivity

**Course:** ITUE203 - Web Development Frameworks  
**Student:** Vishv Vaghasiya (ID: 25CE130)  
**Department:** Computer Engineering (CSPIT-CE), CHARUSAT  

---

## Overview
Practical 4 introduces DOM manipulation and user event handling in JavaScript to build an interactive, responsive frontend for the StudentHub Portal without page reloads.

## Key Features Implemented
1. **Light/Dark Mode Theme Switcher:** Saves preference into `localStorage` and restores it on page reload.
2. **Notification Banner:** Dismissible college announcements banner with `sessionStorage` persistence.
3. **Campus Highlights Slider:** Content carousel with auto-rotation (4.5s), pause on hover, next/previous buttons, and interactive dot indicators.
4. **Campus Announcement Modal Dialog:** Accessible pop-up dialog with background blur, close button, backdrop click closing, and keyboard `Escape` closing.
5. **Collapsible FAQ Accordion:** Interactive questions accordion (`faq.html`) with smooth animations and dynamic icon rotations.
6. **Responsive Mobile Navigation:** Hamburger menu button toggling mobile drawer navigation.

## File Structure
- `index.html`: Portal home page with slider, cards, modal, and theme controls.
- `faq.html`: Collapsible FAQ page with accordion elements.
- `student-dashboard.html`: Student dashboard overview.
- `courses.html`: Course catalog table.
- `timetable.html`: Weekly lecture and lab timetable.
- `results.html`: Academic semester grade sheets.
- `announcements.html`: Departmental announcements.
- `profile.html`: Student profile view.
- `css/styles.css`: CSS styling with theme variables, transitions, and glassmorphism.
- `js/script.js`: Core DOM event handling script.
