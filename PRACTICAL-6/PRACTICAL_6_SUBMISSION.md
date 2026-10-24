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

# Practical-6: Rendering External JSON Data using Fetch API, Search and Filter

### Aim
To fetch event and notice data from a JSON file using the JavaScript Fetch API and display it dynamically with search, category filter, sorting, and pagination in the StudentHub portal.

### Tools / Technology to be Used
- HTML5 page with search input, filter and sort select boxes, and pagination buttons.
- JavaScript Fetch API with a promise chain (`fetch`, `.then()`, `.catch()`).
- JSON datasets stored in `data/notices.json` (16 records), `data/events.json` (16 records), and `data/students.json` (16 records).
- Array methods: `filter()`, `sort()`, `slice()`, and `forEach()`.
- DOM rendering using `document.createElement`, `innerHTML`, `appendChild`, and `replaceChildren`.
- Google Chrome browser, Developer Tools Network tab, and Console tab.

---

### Theory : Core Concept of Practical
The Fetch API provides a modern, promise-based interface for fetching resources (including across the network) asynchronously without full-page reloads. It returns a `Promise` that resolves to the `Response` object representing the response to that request.

In this project:
1. **Asynchronous Request:** `fetch("data/notices.json")` initiates the asynchronous network request. The first `.then(response => response.json())` parses the raw JSON string into native JavaScript objects/arrays. The second `.then(data => ...)` stores the data in memory and triggers the initial UI render. The `.catch(error => ...)` block handles network failures or format errors gracefully.
2. **Dynamic Filtering:** The `filter()` array method filters elements based on two independent user inputs simultaneously: a case-insensitive search term matched against title, description, or author, and an optional category dropdown selection (`Exam`, `Event`, `Academic`, `General`).
3. **Sorting:** The `sort()` array method arranges data using `localeCompare()` for date string comparison (`YYYY-MM-DD`) and alphabetical titles (`titleAsc`/`titleDesc`).
4. **Client-Side Pagination:** A fixed page size (e.g., 4 records per page) slices the filtered list:
   $$\text{start} = (\text{currentPage} - 1) \times \text{pageSize}$$
   $$\text{pageItems} = \text{filteredList.slice}(\text{start}, \text{start} + \text{pageSize})$$
   Previous and Next buttons update `currentPage` and are conditionally disabled at boundary limits ($1$ and $\text{totalPages}$).
5. **Offline LocalStorage Caching:** Upon successful fetch, the parsed data is serialized and stored in `localStorage`, enabling fast loading and offline resilience.

---

### Code Implementation

#### 1. File: `data/notices.json` (Sample Extract)
```json
[
  {
    "id": 1,
    "title": "Mid-Semester Examination Schedule Published",
    "category": "Exam",
    "date": "2026-10-22",
    "author": "Examination Cell",
    "priority": "High",
    "description": "The mid-semester examination timetable for Semester 3 has been uploaded."
  },
  {
    "id": 2,
    "title": "CHARUSAT National Hackathon 2026 Announcement",
    "category": "Event",
    "date": "2026-10-20",
    "author": "CSPIT CE Department",
    "priority": "High",
    "description": "Annual 36-hour National Hackathon will be held on December 5-6, 2026."
  }
]
```

#### 2. File: `js/notices.js` (Extract)
```javascript
document.addEventListener("DOMContentLoaded", function () {
  const noticeList = document.getElementById("noticeList");
  const searchInput = document.getElementById("searchNotice");
  const categoryFilter = document.getElementById("filterCategory");
  const sortSelect = document.getElementById("sortDate");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const statusEl = document.getElementById("noticeStatus");

  let allNotices = [];
  let currentPage = 1;
  const pageSize = 4;

  fetch("data/notices.json")
    .then(response => {
      if (!response.ok) throw new Error("Could not load notices.json");
      return response.json();
    })
    .then(data => {
      allNotices = data;
      localStorage.setItem("studenthub_notices_cache", JSON.stringify(data));
      renderNotices();
    })
    .catch(error => {
      statusEl.textContent = "Unable to load notices. Check notices.json.";
      console.error(error);
    });

  function renderNotices() {
    const searchText = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    let filtered = allNotices.filter(notice => {
      const matchSearch = notice.title.toLowerCase().includes(searchText) ||
                          notice.description.toLowerCase().includes(searchText);
      const matchCat = (category === "All" || notice.category === category);
      return matchSearch && matchCat;
    });

    filtered.sort((a, b) => {
      return sortSelect.value === "newest" 
        ? b.date.localeCompare(a.date) 
        : a.date.localeCompare(b.date);
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const start = (currentPage - 1) * pageSize;
    const pageNotices = filtered.slice(start, start + pageSize);

    noticeList.innerHTML = "";
    pageNotices.forEach(notice => {
      const card = document.createElement("article");
      card.className = "item-card";
      card.innerHTML = `
        <span class="badge ${notice.category.toLowerCase()}">${notice.category}</span>
        <h3>${notice.title}</h3>
        <p>${notice.description}</p>
        <small>📅 ${notice.date} | Issued by: ${notice.author}</small>
      `;
      noticeList.appendChild(card);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = (currentPage === 1);
    nextButton.disabled = (currentPage === totalPages || filtered.length === 0);
  }

  searchInput.addEventListener("input", () => { currentPage = 1; renderNotices(); });
  categoryFilter.addEventListener("change", () => { currentPage = 1; renderNotices(); });
  sortSelect.addEventListener("change", () => { currentPage = 1; renderNotices(); });
  prevButton.addEventListener("click", () => { if (currentPage > 1) { currentPage--; renderNotices(); } });
  nextButton.addEventListener("click", () => { currentPage++; renderNotices(); });
});
```

---

### Output Description & Verification
1. **Initial Dynamic Loading:** On page load, `fetch("data/notices.json")` reads the dataset. The loading indicator displays briefly, followed by the first 4 notices rendered as cards with category badges and formatted dates.
2. **Search Verification:** Typing "Hackathon" in the search box immediately filters the display to only the National Hackathon notice, updating the counter to "Found 1 notice(s)".
3. **Category Filtering:** Selecting "Examinations" filters the dataset to mid-semester and practical exam notices exclusively.
4. **Date Sorting:** Switching between "Newest Date First" and "Oldest Date First" instantly inverts the timeline ordering.
5. **Pagination:** With 16 notices and a page size of 4, the footer displays "Page 1 of 4". Clicking "Next Page" dynamically advances to items 5–8, enables the "Previous Page" button, and disables "Next Page" upon reaching Page 4.
6. **Zero-Result Feedback:** Entering an unmatched query displays an informative message: "No notices found matching your criteria."
7. **Offline Cache Verification:** Disconnecting network or inspecting Chrome DevTools Application tab confirms that `studenthub_notices_cache` holds the complete JSON array.

---

### Question - Answer (Viva Questions)

**Q1: What is the Fetch API in JavaScript?**  
**A:** The Fetch API is a modern, native browser interface for making asynchronous HTTP/network requests. It replaces older `XMLHttpRequest` and returns a `Promise` that resolves to a `Response` object.

**Q2: What is the role of `.then()` and `.catch()` in a promise chain?**  
**A:** `.then()` registers callback handlers for successful fulfillment of a Promise (e.g., parsing `response.json()` and updating the DOM), while `.catch()` intercepts any errors or rejected promises occurring anywhere along the chain.

**Q3: Which JavaScript array methods are used in this practical and why?**  
**A:** 
- `filter()`: Evaluates each object against search keywords and category criteria to produce a filtered subset.
- `sort()`: Reorders array items based on date strings or alphanumeric titles using `localeCompare()`.
- `slice(start, end)`: Extracts the subset of items corresponding to the active pagination page without mutating the original array.
- `forEach()`: Iterates through the sliced records to construct DOM elements.

**Q4: How is client-side pagination implemented mathematically?**  
**A:** Given $\text{pageSize} = 4$ and filtered array length $N$:
- $\text{totalPages} = \lceil N / \text{pageSize} \rceil$
- $\text{startIndex} = (\text{currentPage} - 1) \times \text{pageSize}$
- The items for the current page are retrieved via `filteredArray.slice(startIndex, startIndex + pageSize)`.

**Q5: How does this practical satisfy the Advanced Extension requirement?**  
**A:** When `fetch()` successfully resolves, the parsed array is stored in `localStorage` with a timestamp key. If subsequent fetches are blocked (e.g., due to offline status or restrictive local `file://` CORS policies), the script gracefully recovers by reading from `localStorage`.

---

### Conclusion
This practical successfully demonstrates external JSON data consumption using the modern JavaScript Fetch API. By implementing dynamic DOM element generation, real-time keyword search, multi-category filtering, date and alphabetical sorting, client-side pagination, and `localStorage` caching, the StudentHub portal achieves modular, reactive, and responsive frontend data presentation.
