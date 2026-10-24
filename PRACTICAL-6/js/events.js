/* ==========================================================================
   PRACTICAL-6: Fetch API Events & Workshops Explorer
   Student: Vishv Vaghasiya | ID: 25CE130 | Course: ITUE203 WDF
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const eventList = document.getElementById("eventList");
  const searchInput = document.getElementById("searchEvent");
  const categoryFilter = document.getElementById("filterEventCategory");
  const sortSelect = document.getElementById("sortEventDate");
  const prevButton = document.getElementById("prevEventPage");
  const nextButton = document.getElementById("nextEventPage");
  const pageInfo = document.getElementById("eventPageInfo");
  const statusEl = document.getElementById("eventStatus");
  const matchCountEl = document.getElementById("eventMatchCount");

  let allEvents = [];
  let currentPage = 1;
  const pageSize = 4;

  // 1. Fetch data/events.json
  fetch("data/events.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load events.json");
      return response.json();
    })
    .then(function (data) {
      allEvents = data;
      try {
        localStorage.setItem("studenthub_events_cache", JSON.stringify(data));
      } catch (e) {}
      if (statusEl) {
        statusEl.innerHTML = `Loaded <strong>${data.length}</strong> events from <code>data/events.json</code>`;
      }
      renderEvents();
    })
    .catch(function (error) {
      console.error(error);
      const cached = localStorage.getItem("studenthub_events_cache");
      if (cached) {
        allEvents = JSON.parse(cached);
        if (statusEl) statusEl.innerHTML = `⚠️ Loaded <strong>${allEvents.length}</strong> events from offline cache.`;
        renderEvents();
      } else {
        if (statusEl) {
          statusEl.textContent = "Unable to load events data. Check data/events.json.";
          statusEl.style.color = "#ef4444";
        }
      }
    });

  // 2. Render Events
  function renderEvents() {
    if (!eventList) return;

    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "All";
    const selectedSort = sortSelect ? sortSelect.value : "earliest";

    let filtered = allEvents.filter(function (event) {
      const matchSearch = (event.title || "").toLowerCase().includes(searchText) ||
                          (event.description || "").toLowerCase().includes(searchText) ||
                          (event.organizer || "").toLowerCase().includes(searchText) ||
                          (event.venue || "").toLowerCase().includes(searchText);
      const matchCat = (selectedCategory === "All" || event.category === selectedCategory);
      return matchSearch && matchCat;
    });

    filtered.sort(function (a, b) {
      if (selectedSort === "earliest") {
        return (a.date || "").localeCompare(b.date || "");
      } else if (selectedSort === "latest") {
        return (b.date || "").localeCompare(a.date || "");
      } else if (selectedSort === "titleAsc") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });

    if (matchCountEl) {
      matchCountEl.textContent = `Found ${filtered.length} event(s)`;
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * pageSize;
    const pageEvents = filtered.slice(start, start + pageSize);

    eventList.innerHTML = "";

    if (pageEvents.length === 0) {
      eventList.innerHTML = `<div class="empty-state">No campus events match your search.</div>`;
    } else {
      pageEvents.forEach(function (event) {
        const card = document.createElement("article");
        card.className = "item-card";
        const catClass = (event.category || "general").toLowerCase();

        card.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span class="badge ${catClass}">${event.category}</span>
              <span style="font-size: 0.8rem; background: #e2e8f0; color: #1e293b; padding: 2px 8px; border-radius: 6px; font-weight: 600;">Seats: ${event.seats}</span>
            </div>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
          </div>
          <small>
            📅 <strong>${event.date}</strong> &bull; 📍 ${event.venue} &bull; Org: ${event.organizer}
          </small>
        `;
        eventList.appendChild(card);
      });
    }

    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    if (prevButton) prevButton.disabled = (currentPage <= 1);
    if (nextButton) nextButton.disabled = (currentPage >= totalPages || filtered.length === 0);
  }

  // 3. Listeners
  if (searchInput) searchInput.addEventListener("input", function () { currentPage = 1; renderEvents(); });
  if (categoryFilter) categoryFilter.addEventListener("change", function () { currentPage = 1; renderEvents(); });
  if (sortSelect) sortSelect.addEventListener("change", function () { currentPage = 1; renderEvents(); });
  if (prevButton) prevButton.addEventListener("click", function () { if (currentPage > 1) { currentPage--; renderEvents(); } });
  if (nextButton) nextButton.addEventListener("click", function () { currentPage++; renderEvents(); });

});
