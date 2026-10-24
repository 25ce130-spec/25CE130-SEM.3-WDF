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

# Practical-5: Registration Form with Frontend Validation and User-Friendly Error Handling

### Aim
To implement client-side form validation in the StudentHub web application using JavaScript so that user input is checked in the browser before the form is submitted.

### Tools / Technology to be Used
- HTML5 forms with input types (`text`, `email`, `tel`, `password`, `select`, `radio`, `checkbox`), `<canvas>`, and error placeholders.
- JavaScript regular expressions (`RegExp`) for pattern matching.
- DOM event handling with form `submit` event and `event.preventDefault()`.
- DOM properties: `value`, `innerText`, `textContent`, `querySelector`, and `getElementById`.
- HTML5 Canvas API for procedural CAPTCHA generation.
- Google Chrome browser for testing validation messages and accessibility.

### Theory : Core Concept of Practical
Form validation checks the data entered by a user before it is sent to the server. In this project, each form listens for the `submit` event and calls `event.preventDefault()` to stop default submission.

The script reads input values and validates them against regular expressions:
- **Full Name:** `/^[A-Za-z][A-Za-z .'-]{1,49}$/` ensures alphabetical characters with a minimum of 2 characters.
- **Student ID:** `/^[0-9]{2}[A-Za-z]{2}[0-9]{3}$/` ensures standard CHARUSAT enrollment format (e.g., 25CE130).
- **Email:** Matches standard RFC-compliant email formats.
- **Mobile:** `/^[6-9]\d{9}$/` validates 10-digit Indian numbers starting with 6, 7, 8, or 9.
- **Password:** Requires at least 8 characters with lowercase, uppercase, a digit, and a special character.
- **Confirm Password:** Confirms exact match with the entered password.
- **Course & Academic Year:** Ensures non-empty option selections.
- **Gender:** Checks that a radio option is checked.
- **Terms Acceptance:** Validates checkbox selection.
- **Password Strength Meter:** Dynamically calculates entropy on `input` events and shifts color bars from Red to Green.
- **Canvas CAPTCHA:** Renders distorted alphanumeric characters with anti-bot interference lines.

### Validation Test Cases Table
| Test Case | Field | Input Value | Expected Result | Actual Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Full Name | `Vishv123` | Error: Name must contain letters only | PASS (Rejected digits) |
| **TC-02** | Full Name | `Vishv Vaghasiya` | Accepted with green outline | PASS |
| **TC-03** | Student ID | `CE130` | Error: Format must be like 25CE130 | PASS (Required prefix digits) |
| **TC-04** | Student ID | `25CE130` | Accepted with green outline | PASS |
| **TC-05** | Email | `vishv.com` | Error: Enter valid email address | PASS |
| **TC-06** | Mobile | `12345` | Error: Must be 10 digits starting with 6-9 | PASS |
| **TC-07** | Password | `pass` | Weak strength, rejected | PASS |
| **TC-08** | Password | `Charusat@2026` | Strong strength, accepted | PASS |
| **TC-09** | Confirm Pass | Mismatched string | Error: Passwords do not match | PASS |
| **TC-10** | Full Form | All valid data | Success alert displayed, form reset | PASS |

### Question - Answer (Viva Questions)

**Q1: What is client-side form validation?**  
**A:** Client-side form validation is the checking of user input directly inside the browser using JavaScript before sending data to the server. It gives immediate feedback and avoids unnecessary server requests.

**Q2: Why is `event.preventDefault()` used?**  
**A:** `event.preventDefault()` prevents the default form submission and page refresh, allowing custom JavaScript validation logic to run and verify all inputs first.

**Q3: What is a regular expression?**  
**A:** A regular expression is a pattern used to test or match text strings. For example, `/^[A-Za-z ]+$/` accepts only letters and spaces, which is used to validate the name field.

**Q4: How is the Student ID validated in this project?**  
**A:** The Student ID is validated with `/^[0-9]{2}[A-Za-z]{2}[0-9]{3}$/`, which accepts two digits (admission year), two letters (branch code), and three digits (roll number), such as `25CE130`.

### Conclusion
Practical 5 implements complete client-side validation for the student registration form. Regular expressions, real-time input event handling, an interactive password strength meter, and a custom Canvas CAPTCHA ensure that all user inputs are verified before submission, displaying clear and accessible error messages.
