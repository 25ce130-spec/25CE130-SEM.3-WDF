# 🎓 Practical 6: Rendering External JSON Data using Fetch API, Search and Filter

## Student Information
- **Student Name:** Vishv Vaghasiya
- **Student ID:** 25CE130
- **Subject Code:** ITUE203
- **Subject:** Web Development Frameworks
- **Department:** Computer Engineering (CSPIT-CE)
- **University:** CHARUSAT

---

## 🎯 Practical Aim
To fetch external structured data from JSON files (`notices.json`, `events.json`, `students.json`) using the JavaScript Fetch API and render it dynamically into reusable frontend DOM views with real-time search, category filtering, multi-field sorting, and client-side pagination.

---

## 🛠️ Tools & Technologies Used
- **HTML5:** Semantic card layout, search input, accessible filter and sort controls, responsive tables, and ARIA live regions.
- **CSS3:** Modern card grid, category status badges (`.exam`, `.event`, `.academic`, `.general`), pagination bar, and loading spinner animation.
- **JavaScript (ES6+):** Fetch API (`fetch()`, `.then()`, `.catch()`), JSON parsing (`response.json()`), Array operations (`filter`, `sort`, `slice`), DOM manipulation (`createElement`, `innerHTML`, `replaceChildren`), and `localStorage` caching.
- **JSON Datasets:** `data/notices.json` (16 records), `data/events.json` (16 records), and `data/students.json` (16 records).
- **Browser Tools:** Google Chrome Network tab, Console, and Application Storage tab.

---

## 🌟 Key Features & Implementation
1. **Asynchronous Fetch API:** Communicates with local JSON files using Promises (`then`/`catch`) without page reloading.
2. **Real-Time Keyword Search:** Instant search matching against title, description, and author/venue fields.
3. **Multi-Category Filtering:** Dynamic category filter dropdowns (Exam, Event, Academic, General, Workshop, Sports, etc.).
4. **Multi-Criteria Sorting:** Date (Newest/Oldest), Alphabetical Title (A-Z/Z-A), and GPA ordering.
5. **Client-Side Pagination:** Configurable page size (4 to 5 items/page), dynamic computation of total pages, and disabled boundary button management.
6. **Robust Error Handling & Loading States:** Animated loading indicator and friendly empty state message when search criteria return zero matches.
7. **Offline LocalStorage Caching (Advanced Extension):** Automatically caches the fetched JSON response into `localStorage` so content remains instantly available.

---

## 📂 Project Structure
```
PRACTICAL-6/
├── css/
│   └── styles.css
├── data/
│   ├── notices.json    (16 detailed records)
│   ├── events.json     (16 detailed records)
│   └── students.json   (16 detailed records)
├── js/
│   ├── notices.js
│   ├── events.js
│   └── students.js
├── index.html          (Campus Notices explorer)
├── events.html         (Campus Events & Workshops explorer)
├── students.html       (Student Directory & GPA table)
├── README.md
└── PRACTICAL_6_SUBMISSION.md
```

---

## 🚀 How to Run
1. Open the `PRACTICAL-6` directory.
2. If using VS Code, right-click `index.html` and select **Open with Live Server** (or serve via any local web server).
3. The page also includes an embedded resilient fallback to allow direct browser opening (`file://` protocol) without cross-origin fetch restrictions.
4. Try typing in the search bar, changing categories, sorting dates, and navigating pages with the Previous/Next pagination buttons.
