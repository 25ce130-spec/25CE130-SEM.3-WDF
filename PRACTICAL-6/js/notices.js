/* ==========================================================================
   PRACTICAL-6: Fetch API Dynamic Notices Explorer
   Features:
     - Asynchronous Fetch API (`fetch()`, `.then()`, `.catch()`)
     - Real-time case-insensitive keyword search across title, description & author
     - Dynamic category filtering (All, Exam, Event, Academic, General)
     - Multi-criteria sorting (Newest Date, Oldest Date, Title A-Z)
     - Client-side pagination (Page size 4, boundaries handling)
     - LocalStorage offline caching & recovery
   Student: Vishv Vaghasiya | ID: 25CE130 | Course: ITUE203 WDF
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const noticeList = document.getElementById("noticeList");
  const searchInput = document.getElementById("searchNotice");
  const categoryFilter = document.getElementById("filterCategory");
  const sortSelect = document.getElementById("sortDate");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const statusEl = document.getElementById("noticeStatus");
  const matchCountEl = document.getElementById("matchCount");

  let allNotices = [];
  let currentPage = 1;
  const pageSize = 4;

  // 1. Fetch JSON Data
  fetch("data/notices.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status + ": Could not load notices.json");
      }
      return response.json();
    })
    .then(function (data) {
      allNotices = data;
      // Offline LocalStorage Caching
      try {
        localStorage.setItem("studenthub_notices_cache", JSON.stringify(data));
      } catch (e) {
        console.warn("LocalStorage cache quota exceeded", e);
      }
      if (statusEl) {
        statusEl.innerHTML = `Loaded <strong>${data.length}</strong> official circulars from <code>data/notices.json</code>`;
      }
      renderNotices();
    })
    .catch(function (error) {
      console.error("Fetch API error:", error);
      // Attempt recovery from cache
      const cached = localStorage.getItem("studenthub_notices_cache");
      if (cached) {
        allNotices = JSON.parse(cached);
        if (statusEl) {
          statusEl.innerHTML = `⚠️ Loaded <strong>${allNotices.length}</strong> notices from offline cache.`;
        }
        renderNotices();
      } else {
        if (statusEl) {
          statusEl.innerHTML = `❌ Failed to load notices. Ensure <code>data/notices.json</code> is accessible.`;
          statusEl.style.color = "#ef4444";
        }
        if (noticeList) {
          noticeList.innerHTML = `<div class="empty-state">Unable to load circulars. Please check network or file permissions.</div>`;
        }
      }
    });

  // 2. Render and Filter Function
  function renderNotices() {
    if (!noticeList) return;

    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "All";
    const selectedSort = sortSelect ? sortSelect.value : "newest";

    // Dynamic Filter
    let filtered = allNotices.filter(function (notice) {
      const titleMatch = (notice.title || "").toLowerCase().includes(searchText);
      const descMatch = (notice.description || "").toLowerCase().includes(searchText);
      const authorMatch = (notice.author || "").toLowerCase().includes(searchText);
      const matchesSearch = titleMatch || descMatch || authorMatch;

      const matchesCategory = (selectedCategory === "All" || notice.category === selectedCategory);
      return matchesSearch && matchesCategory;
    });

    // Dynamic Sort
    filtered.sort(function (a, b) {
      if (selectedSort === "newest") {
        return (b.date || "").localeCompare(a.date || "");
      } else if (selectedSort === "oldest") {
        return (a.date || "").localeCompare(b.date || "");
      } else if (selectedSort === "titleAsc") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });

    // Update match count badge
    if (matchCountEl) {
      matchCountEl.textContent = `Found ${filtered.length} notice(s)`;
    }

    // Pagination calculations
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const pageNotices = filtered.slice(startIndex, startIndex + pageSize);

    // DOM Generation
    noticeList.innerHTML = "";

    if (pageNotices.length === 0) {
      noticeList.innerHTML = `
        <div class="empty-state">
          🔍 No circulars or notices matched your search criteria ("${searchText}").
        </div>
      `;
    } else {
      pageNotices.forEach(function (notice) {
        const card = document.createElement("article");
        card.className = "item-card";

        const categoryClass = (notice.category || "general").toLowerCase();

        card.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge ${categoryClass}">${notice.category || "General"}</span>
              <span style="font-size: 0.82rem; color: #64748b; font-weight: 600;">Priority: ${notice.priority || "Normal"}</span>
            </div>
            <h3>${notice.title}</h3>
            <p>${notice.description}</p>
          </div>
          <small>
            📅 ${notice.date} &bull; Issued by: <strong>${notice.author}</strong>
          </small>
        `;
        noticeList.appendChild(card);
      });
    }

    // Update pagination controls
    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    if (prevButton) {
      prevButton.disabled = (currentPage <= 1);
    }
    if (nextButton) {
      nextButton.disabled = (currentPage >= totalPages || filtered.length === 0);
    }
  }

  // 3. Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentPage = 1;
      renderNotices();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      currentPage = 1;
      renderNotices();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      currentPage = 1;
      renderNotices();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderNotices();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      currentPage++;
      renderNotices();
    });
  }

});
