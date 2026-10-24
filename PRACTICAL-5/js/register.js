/* ==========================================================================
   PRACTICAL-5: Client-Side Registration Form Validation & Interactivity
   Features:
     - Regular expression pattern matching for Name, Student ID, Email, Mobile, Password
     - Real-time input validation with inline error feedback & dynamic borders
     - Dynamic password entropy & strength meter (Weak / Medium / Strong)
     - Procedural HTML5 Canvas CAPTCHA generation with interference noise
     - Terms of service & radio button validation
     - Accessible status alert banners
   Student: Vishv Vaghasiya | ID: 25CE130 | Course: ITUE203 WDF
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const statusAlert = document.getElementById("statusAlert");

  // Input Elements
  const fullNameInput = document.getElementById("fullName");
  const studentIdInput = document.getElementById("studentId");
  const emailInput = document.getElementById("email");
  const mobileInput = document.getElementById("mobile");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const branchSelect = document.getElementById("branch");
  const yearSelect = document.getElementById("year");
  const captchaInput = document.getElementById("captchaInput");
  const termsCheck = document.getElementById("termsCheck");

  // Error Message Elements
  const nameError = document.getElementById("nameError");
  const studentIdError = document.getElementById("studentIdError");
  const emailError = document.getElementById("emailError");
  const mobileError = document.getElementById("mobileError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const branchError = document.getElementById("branchError");
  const yearError = document.getElementById("yearError");
  const genderError = document.getElementById("genderError");
  const captchaError = document.getElementById("captchaError");
  const termsError = document.getElementById("termsError");

  // Password Strength Meter Elements
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // Canvas CAPTCHA Elements
  const captchaCanvas = document.getElementById("captchaCanvas");
  const refreshCaptchaBtn = document.getElementById("refreshCaptcha");
  let currentCaptchaCode = "";

  /* ------------------------------------------------------------------------
     1. Regular Expression Patterns
     ------------------------------------------------------------------------ */
  const patterns = {
    fullName: /^[A-Za-z][A-Za-z .'-]{1,49}$/,
    studentId: /^[0-9]{2}[A-Za-z]{2}[0-9]{3}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    mobile: /^[6-9]\d{9}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/
  };

  /* ------------------------------------------------------------------------
     2. Procedural Canvas CAPTCHA Generator
     ------------------------------------------------------------------------ */
  function generateCaptcha() {
    if (!captchaCanvas) return;
    const ctx = captchaCanvas.getContext("2d");
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    currentCaptchaCode = "";

    // Clear canvas
    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, captchaCanvas.width, captchaCanvas.height);
    gradient.addColorStop(0, "#e2e8f0");
    gradient.addColorStop(1, "#cbd5e1");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);

    // Random interference lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, 0.4)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
      ctx.lineTo(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height);
      ctx.stroke();
    }

    // Generate 6 alphanumeric characters
    ctx.font = "bold 24px 'Courier New', monospace";
    for (let i = 0; i < 6; i++) {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      currentCaptchaCode += char;

      ctx.save();
      const x = 20 + i * 24;
      const y = 32 + (Math.random() * 6 - 3);
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `hsl(${Math.random() * 260 + 20}, 70%, 25%)`;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Random background dots
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = `rgba(0,0,0, ${Math.random() * 0.25})`;
      ctx.beginPath();
      ctx.arc(Math.random() * captchaCanvas.width, Math.random() * captchaCanvas.height, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (captchaInput) {
      captchaInput.value = "";
      clearError(captchaInput, captchaError);
    }
  }

  generateCaptcha();
  if (refreshCaptchaBtn) refreshCaptchaBtn.addEventListener("click", generateCaptcha);
  if (captchaCanvas) captchaCanvas.addEventListener("click", generateCaptcha);

  /* ------------------------------------------------------------------------
     3. Password Strength Meter
     ------------------------------------------------------------------------ */
  function evaluatePasswordStrength(password) {
    if (!password) {
      strengthBar.style.width = "0%";
      strengthBar.style.backgroundColor = "transparent";
      strengthText.textContent = "Strength: None";
      strengthText.style.color = "#64748b";
      return 0;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9\s]/.test(password)) score++;

    if (score <= 2) {
      strengthBar.style.width = "30%";
      strengthBar.style.backgroundColor = "#ef4444";
      strengthText.textContent = "Strength: Weak (Requires uppercase, digits, symbols)";
      strengthText.style.color = "#ef4444";
    } else if (score <= 4) {
      strengthBar.style.width = "65%";
      strengthBar.style.backgroundColor = "#f59e0b";
      strengthText.textContent = "Strength: Moderate";
      strengthText.style.color = "#f59e0b";
    } else {
      strengthBar.style.width = "100%";
      strengthBar.style.backgroundColor = "#10b981";
      strengthText.textContent = "Strength: Strong (Secure password)";
      strengthText.style.color = "#10b981";
    }

    return score;
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      evaluatePasswordStrength(passwordInput.value);
      validatePassword();
      if (confirmPasswordInput.value.length > 0) {
        validateConfirmPassword();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Field Validation Helpers
     ------------------------------------------------------------------------ */
  function showError(input, errorEl, message) {
    if (input) {
      input.classList.add("invalid");
      input.classList.remove("valid");
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function showSuccess(input, errorEl) {
    if (input) {
      input.classList.remove("invalid");
      input.classList.add("valid");
    }
    if (errorEl) {
      errorEl.textContent = "";
    }
  }

  function clearError(input, errorEl) {
    if (input) {
      input.classList.remove("invalid", "valid");
    }
    if (errorEl) {
      errorEl.textContent = "";
    }
  }

  /* ------------------------------------------------------------------------
     5. Individual Field Validation Rules
     ------------------------------------------------------------------------ */
  function validateFullName() {
    const val = fullNameInput.value.trim();
    if (!val) {
      showError(fullNameInput, nameError, "Full Name is required.");
      return false;
    }
    if (!patterns.fullName.test(val)) {
      showError(fullNameInput, nameError, "Name must contain letters and spaces only (min 2 characters).");
      return false;
    }
    showSuccess(fullNameInput, nameError);
    return true;
  }

  function validateStudentId() {
    const val = studentIdInput.value.trim().toUpperCase();
    studentIdInput.value = val;
    if (!val) {
      showError(studentIdInput, studentIdError, "Student ID is required.");
      return false;
    }
    if (!patterns.studentId.test(val)) {
      showError(studentIdInput, studentIdError, "Format must be like 25CE130 (2 digits, 2 letters, 3 digits).");
      return false;
    }
    showSuccess(studentIdInput, studentIdError);
    return true;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      showError(emailInput, emailError, "Email address is required.");
      return false;
    }
    if (!patterns.email.test(val)) {
      showError(emailInput, emailError, "Please enter a valid email address (e.g., student@charusat.edu.in).");
      return false;
    }
    showSuccess(emailInput, emailError);
    return true;
  }

  function validateMobile() {
    const val = mobileInput.value.trim();
    if (!val) {
      showError(mobileInput, mobileError, "Mobile number is required.");
      return false;
    }
    if (!patterns.mobile.test(val)) {
      showError(mobileInput, mobileError, "Must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.");
      return false;
    }
    showSuccess(mobileInput, mobileError);
    return true;
  }

  function validatePassword() {
    const val = passwordInput.value;
    if (!val) {
      showError(passwordInput, passwordError, "Password is required.");
      return false;
    }
    if (!patterns.password.test(val)) {
      showError(passwordInput, passwordError, "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
      return false;
    }
    showSuccess(passwordInput, passwordError);
    return true;
  }

  function validateConfirmPassword() {
    const pass = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    if (!confirm) {
      showError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
      return false;
    }
    if (confirm !== pass) {
      showError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
      return false;
    }
    showSuccess(confirmPasswordInput, confirmPasswordError);
    return true;
  }

  function validateBranch() {
    if (!branchSelect.value) {
      showError(branchSelect, branchError, "Please select your engineering department.");
      return false;
    }
    showSuccess(branchSelect, branchError);
    return true;
  }

  function validateYear() {
    if (!yearSelect.value) {
      showError(yearSelect, yearError, "Please select your current academic year.");
      return false;
    }
    showSuccess(yearSelect, yearError);
    return true;
  }

  function validateGender() {
    const checked = document.querySelector('input[name="gender"]:checked');
    if (!checked) {
      genderError.textContent = "Please select your gender.";
      return false;
    }
    genderError.textContent = "";
    return true;
  }

  function validateCaptcha() {
    const val = captchaInput.value.trim().toUpperCase();
    if (!val) {
      showError(captchaInput, captchaError, "Please enter the security CAPTCHA.");
      return false;
    }
    if (val !== currentCaptchaCode) {
      showError(captchaInput, captchaError, "Incorrect CAPTCHA code. Please try again.");
      return false;
    }
    showSuccess(captchaInput, captchaError);
    return true;
  }

  function validateTerms() {
    if (!termsCheck.checked) {
      termsError.textContent = "You must agree to the academic terms & conditions to register.";
      return false;
    }
    termsError.textContent = "";
    return true;
  }

  /* ------------------------------------------------------------------------
     6. Real-Time Event Listeners (Input & Blur)
     ------------------------------------------------------------------------ */
  fullNameInput.addEventListener("input", validateFullName);
  fullNameInput.addEventListener("blur", validateFullName);

  studentIdInput.addEventListener("input", validateStudentId);
  studentIdInput.addEventListener("blur", validateStudentId);

  emailInput.addEventListener("input", validateEmail);
  emailInput.addEventListener("blur", validateEmail);

  mobileInput.addEventListener("input", validateMobile);
  mobileInput.addEventListener("blur", validateMobile);

  confirmPasswordInput.addEventListener("input", validateConfirmPassword);
  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

  branchSelect.addEventListener("change", validateBranch);
  yearSelect.addEventListener("change", validateYear);

  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener("change", validateGender);
  });

  captchaInput.addEventListener("input", function () {
    if (captchaInput.value.length === 6) {
      validateCaptcha();
    }
  });

  termsCheck.addEventListener("change", validateTerms);

  /* ------------------------------------------------------------------------
     7. Form Submit Event Handler (preventDefault & complete verification)
     ------------------------------------------------------------------------ */
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop default browser refresh

    const isNameValid = validateFullName();
    const isIdValid = validateStudentId();
    const isEmailValid = validateEmail();
    const isMobileValid = validateMobile();
    const isPassValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();
    const isBranchValid = validateBranch();
    const isYearValid = validateYear();
    const isGenderValid = validateGender();
    const isCaptchaValid = validateCaptcha();
    const isTermsValid = validateTerms();

    const isFormValid = isNameValid && isIdValid && isEmailValid && isMobileValid &&
                        isPassValid && isConfirmValid && isBranchValid && isYearValid &&
                        isGenderValid && isCaptchaValid && isTermsValid;

    if (isFormValid) {
      // Success feedback
      statusAlert.className = "status-alert success";
      statusAlert.innerHTML = `
        <strong>🎉 Registration Successful!</strong><br>
        Welcome, <strong>${fullNameInput.value}</strong> (${studentIdInput.value}). Your student account has been created for ${branchSelect.options[branchSelect.selectedIndex].text}.
      `;
      statusAlert.scrollIntoView({ behavior: "smooth", block: "center" });

      // Save dummy student session in localStorage
      localStorage.setItem("studenthub_user", JSON.stringify({
        name: fullNameInput.value,
        id: studentIdInput.value,
        email: emailInput.value,
        branch: branchSelect.value
      }));

      // Reset form fields
      form.reset();
      evaluatePasswordStrength("");
      [fullNameInput, studentIdInput, emailInput, mobileInput, passwordInput, confirmPasswordInput, branchSelect, yearSelect, captchaInput].forEach(el => {
        el.classList.remove("valid", "invalid");
      });
      generateCaptcha();
    } else {
      // Error feedback
      statusAlert.className = "status-alert error";
      statusAlert.innerHTML = `
        <strong>⚠️ Please correct the errors highlighted below:</strong><br>
        Make sure all required fields are filled out in the expected format.
      `;
      statusAlert.scrollIntoView({ behavior: "smooth", block: "center" });

      // Focus first invalid input
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  // Reset form handler
  form.addEventListener("reset", function () {
    setTimeout(function () {
      [nameError, studentIdError, emailError, mobileError, passwordError, confirmPasswordError, branchError, yearError, genderError, captchaError, termsError].forEach(el => {
        if (el) el.textContent = "";
      });
      [fullNameInput, studentIdInput, emailInput, mobileInput, passwordInput, confirmPasswordInput, branchSelect, yearSelect, captchaInput].forEach(el => {
        if (el) el.classList.remove("valid", "invalid");
      });
      evaluatePasswordStrength("");
      statusAlert.style.display = "none";
      generateCaptcha();
    }, 10);
  });

});
