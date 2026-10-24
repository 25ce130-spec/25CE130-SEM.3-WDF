# 🎓 Practical 5: Registration Form with Frontend Validation and User-Friendly Error Handling

## Student Information
- **Name:** Vishv Vaghasiya
- **Student ID:** 25CE130
- **Subject Code:** ITUE203
- **Subject:** Web Development Frameworks (WDF)
- **Department:** Computer Engineering (CSPIT-CE)
- **University:** CHARUSAT

---

## 🎯 Aim
To implement client-side form validation in the StudentHub web application using JavaScript so that user input is verified in the browser before the form is submitted.

---

## 🛠️ Tools & Technologies Used
- **HTML5:** Semantic form inputs (`text`, `email`, `tel`, `password`, `select`, `radio`, `checkbox`), `<canvas>` for CAPTCHA, error placeholder tags.
- **CSS3:** Custom validation pseudo-classes, dynamic status alert banners, password strength bar animations, responsive grid layouts.
- **JavaScript (ES6+):** Regular Expressions (`RegExp`), `addEventListener`, `event.preventDefault()`, DOM element manipulation (`classList`, `textContent`), Canvas 2D context drawing API.
- **Browser:** Google Chrome Developer Tools (Console, Elements inspector).

---

## 🌟 Key Features
1. **Regular Expression Validation:**
   - Full Name: Alphabetical letters and spaces only (`/^[A-Za-z][A-Za-z .'-]{1,49}$/`).
   - Student ID: CHARUSAT enrollment format (`/^[0-9]{2}[A-Za-z]{2}[0-9]{3}$/`).
   - Email: Standard RFC-compliant email pattern.
   - Mobile: 10-digit Indian phone numbers starting with 6-9 (`/^[6-9]\d{9}$/`).
   - Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character.
2. **Password Strength Meter:** Real-time entropy evaluation dynamically updates a colored progress bar (Red = Weak, Yellow = Moderate, Green = Strong).
3. **HTML5 Canvas CAPTCHA:** Procedural distorted alphanumeric text generation with random angle rotation and interference lines.
4. **Instant User Feedback:** Immediate green borders on valid input and red borders with inline error text on invalid input.
5. **Form Submission Handling:** Uses `event.preventDefault()` to stop page reloads, validates all fields, and displays an accessible status banner.

---

## 📂 Project Structure
```
PRACTICAL-5/
├── css/
│   └── styles.css
├── js/
│   └── register.js
├── index.html               (Main portal hub with Practical-3 table navigation)
├── register.html            (Interactive registration form with full validation)
├── login.html
├── profile.html
├── student-dashboard.html
├── faculty-dashboard.html
├── attendance.html
├── assignments.html
├── courses.html
├── results.html
├── timetable.html
├── announcements.html
├── README.md
└── PRACTICAL_5_SUBMISSION.md
```

---

## 🚀 How to Run
1. Navigate to the `PRACTICAL-5/` directory.
2. Open `index.html` in any modern web browser to view the Student Hub portal.
3. Click **"Open Register"** or the featured showcase button to test the registration form validation.
