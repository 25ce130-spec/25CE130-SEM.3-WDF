/* ==========================================================================
   PRACTICAL-6: Fetch API Student Directory Explorer
   Student: Vishv Vaghasiya | ID: 25CE130 | Course: ITUE203 WDF
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("studentsTableBody");
  const searchInput = document.getElementById("searchStudent");
  const branchFilter = document.getElementById("filterBranch");
  const sortGpa = document.getElementById("sortGpa");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const statusEl = document.getElementById("studentStatus");

  let allStudents = [];
  let currentPage = 1;
  const pageSize = 5;

  // 1. Fetch data/students.json
  fetch("data/students.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load students.json");
      return response.json();
    })
    .then(function (data) {
      allStudents = data;
      try {
        localStorage.setItem("studenthub_students_cache", JSON.stringify(data));
      } catch (e) {}
      if (statusEl) {
        statusEl.innerHTML = `Loaded <strong>${data.length}</strong> student records from <code>data/students.json</code>`;
      }
      renderStudents();
    })
    .catch(function (error) {
      console.error(error);
      const cached = localStorage.getItem("studenthub_students_cache");
      if (cached) {
        allStudents = JSON.parse(cached);
        if (statusEl) statusEl.innerHTML = `⚠️ Loaded <strong>${allStudents.length}</strong> records from offline cache.`;
        renderStudents();
      } else {
        if (statusEl) {
          statusEl.textContent = "Unable to load student directory. Check data/students.json.";
          statusEl.style.color = "#ef4444";
        }
      }
    });

  // 2. Render Students
  function renderStudents() {
    if (!tableBody) return;

    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedBranch = branchFilter ? branchFilter.value : "All";
    const selectedSort = sortGpa ? sortGpa.value : "gpaDesc";

    let filtered = allStudents.filter(function (student) {
      const matchSearch = (student.name || "").toLowerCase().includes(searchText) ||
                          (student.enrollment || "").toLowerCase().includes(searchText) ||
                          (student.email || "").toLowerCase().includes(searchText);
      const matchBranch = (selectedBranch === "All" || student.branch === selectedBranch);
      return matchSearch && matchBranch;
    });

    // Sort
    filtered.sort(function (a, b) {
      if (selectedSort === "gpaDesc") {
        return (b.cgpa || 0) - (a.cgpa || 0);
      } else if (selectedSort === "gpaAsc") {
        return (a.cgpa || 0) - (b.cgpa || 0);
      } else if (selectedSort === "nameAsc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageStudents = filtered.slice(start, start + pageSize);

    tableBody.innerHTML = "";

    if (pageStudents.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">
            🔍 No students match the search criteria.
          </td>
        </tr>
      `;
    } else {
      pageStudents.forEach(function (student) {
        const tr = document.createElement("tr");
        const isUser = (student.enrollment === "25CE130");
        if (isUser) {
          tr.style.background = "rgba(91, 140, 255, 0.15)";
        }

        tr.innerHTML = `
          <td><strong>${student.enrollment}</strong> ${isUser ? "⭐" : ""}</td>
          <td><strong>${student.name}</strong></td>
          <td>${student.branch}</td>
          <td>Sem ${student.semester}</td>
          <td>${student.email}</td>
          <td><strong style="color: #0284c7;">${student.cgpa.toFixed(2)}</strong></td>
          <td><span style="background: #dcfce7; color: #15803d; padding: 3px 8px; border-radius: 999px; font-size: 0.8rem; font-weight: 700;">${student.status}</span></td>
        `;
        tableBody.appendChild(tr);
      });
    }

    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages} (${filtered.length} total)`;
    if (prevButton) prevButton.disabled = (currentPage <= 1);
    if (nextButton) nextButton.disabled = (currentPage >= totalPages || filtered.length === 0);
  }

  // 3. Listeners
  if (searchInput) searchInput.addEventListener("input", function () { currentPage = 1; renderStudents(); });
  if (branchFilter) branchFilter.addEventListener("change", function () { currentPage = 1; renderStudents(); });
  if (sortGpa) sortGpa.addEventListener("change", function () { currentPage = 1; renderStudents(); });
  if (prevButton) prevButton.addEventListener("click", function () { if (currentPage > 1) { currentPage--; renderStudents(); } });
  if (nextButton) nextButton.addEventListener("click", function () { currentPage++; renderStudents(); });

});
