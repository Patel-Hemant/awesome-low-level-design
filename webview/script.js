(() => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const searchInput = document.getElementById("globalSearch");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  const THEME_STORAGE_KEY = "lld-webview-theme";
  const PROBLEM_PROGRESS_KEY = "lld-webview-problem-progress";
  const PATTERN_PROGRESS_KEY = "lld-webview-pattern-progress";

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("light");
    } else {
      body.classList.remove("light");
    }
  }

  function initTheme() {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      return;
    }
    // First-time visitors default to dark mode, regardless of OS preference.
    applyTheme("dark");
  }

  function toggleTheme() {
    const isLight = body.classList.contains("light");
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }

  function initThemeToggle() {
    if (!themeToggle) return;
    themeToggle.addEventListener("click", toggleTheme);
  }

  function normaliseText(text) {
    return text.toLowerCase();
  }

  function initSearch() {
    if (!searchInput) return;
    const cards = Array.from(
      document.querySelectorAll(".resource-card, .card, .roadmap-step")
    );

    function handleSearch(event) {
      const term = normaliseText(event.target.value || "");
      if (!term) {
        cards.forEach((el) => el.classList.remove("faded"));
        return;
      }

      cards.forEach((el) => {
        const text =
          el.dataset.search ||
          el.textContent ||
          "";
        const match = normaliseText(text).includes(term);
        if (match) {
          el.classList.remove("faded");
        } else {
          el.classList.add("faded");
        }
      });
    }

    searchInput.addEventListener("input", handleSearch);
  }

  function initScrollTop() {
    if (!scrollTopBtn) return;

    function onScroll() {
      const threshold = window.innerHeight * 0.25;
      if (window.scrollY > threshold) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    scrollTopBtn.addEventListener("click", scrollToTop);
  }

  function loadProblemProgress() {
    try {
      const raw = window.localStorage.getItem(PROBLEM_PROGRESS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};

      // Normalize legacy string-based format to object-based { done, starred } format
      const normalized = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === "string") {
          normalized[key] = {
            done: value === "done",
            starred: false,
          };
        } else if (value && typeof value === "object") {
          normalized[key] = {
            done: !!value.done,
            starred: !!value.starred,
          };
        }
      }
      return normalized;
    } catch {
      return {};
    }
  }

  function saveProblemProgress(map) {
    try {
      window.localStorage.setItem(PROBLEM_PROGRESS_KEY, JSON.stringify(map));
    } catch {
      // ignore storage errors
    }
  }

  function loadPatternProgress() {
    try {
      const raw = window.localStorage.getItem(PATTERN_PROGRESS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function savePatternProgress(map) {
    try {
      window.localStorage.setItem(PATTERN_PROGRESS_KEY, JSON.stringify(map));
    } catch {
      // ignore storage errors
    }
  }

  function updateProblemsProgressSummary(cards, progressMap) {
    const total = cards.length;
    const completed = cards.filter((card) => {
      const id = card.dataset.problemId;
      const meta = id && progressMap[id];
      return !!(meta && meta.done);
    }).length;

    const textEl = document.getElementById("problemsProgressText");
    const barEl = document.getElementById("problemsProgressBar");
    if (textEl) {
      textEl.textContent = `Completed ${completed} / ${total}`;
    }
    if (barEl) {
      const ratio = total > 0 ? (completed / total) * 100 : 0;
      barEl.style.width = `${Math.round(ratio)}%`;
    }
  }

  function initProblemProgress() {
    if (body.dataset.page !== "overview") return;
    const cards = Array.from(
      document.querySelectorAll(".problem-card[data-problem-id]")
    );
    if (!cards.length) return;

    let progressMap = loadProblemProgress();

    const applyStateToCard = (card) => {
      const id = card.dataset.problemId;
      const toggle = card.querySelector(".problem-progress-toggle");
      const starToggle = card.querySelector(".problem-star-toggle");
      const meta = id && progressMap[id];
      const isDone = !!(meta && meta.done);
      const isStarred = !!(meta && meta.starred);

      if (isDone) {
        card.classList.add("is-completed");
        if (toggle) toggle.classList.add("is-completed");
      } else {
        card.classList.remove("is-completed");
        if (toggle) toggle.classList.remove("is-completed");
      }

      if (isStarred) {
        card.classList.add("is-starred");
      } else {
        card.classList.remove("is-starred");
      }
    };

    cards.forEach((card) => applyStateToCard(card));
    updateProblemsProgressSummary(cards, progressMap);

    cards.forEach((card) => {
      const toggle = card.querySelector(".problem-progress-toggle");
      const starToggle = card.querySelector(".problem-star-toggle");

      if (toggle) {
        toggle.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const id = card.dataset.problemId;
          if (!id) return;
          const currentMeta = progressMap[id] || { done: false, starred: false };
          const next = {
            done: !currentMeta.done,
            starred: !!currentMeta.starred,
          };
          progressMap[id] = next;
          applyStateToCard(card);
          updateProblemsProgressSummary(cards, progressMap);
          saveProblemProgress(progressMap);
        });
      }

      if (starToggle) {
        starToggle.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const id = card.dataset.problemId;
          if (!id) return;
          const currentMeta = progressMap[id] || { done: false, starred: false };
          const next = {
            done: !!currentMeta.done,
            starred: !currentMeta.starred,
          };
          progressMap[id] = next;
          applyStateToCard(card);
          updateProblemsProgressSummary(cards, progressMap);
          saveProblemProgress(progressMap);
        });
      }
    });
  }

  function updatePatternsProgressSummary(cards, progressMap) {
    const total = cards.length;
    const completed = cards.filter((card) => {
      const id = card.dataset.patternId;
      return id && progressMap[id] === "done";
    }).length;

    const textEl = document.getElementById("patternsProgressText");
    const barEl = document.getElementById("patternsProgressBar");
    if (textEl) {
      textEl.textContent = `Completed ${completed} / ${total}`;
    }
    if (barEl) {
      const ratio = total > 0 ? (completed / total) * 100 : 0;
      barEl.style.width = `${Math.round(ratio)}%`;
    }
  }

  function initPatternProgress() {
    if (body.dataset.page !== "overview") return;
    const cards = Array.from(
      document.querySelectorAll(".pattern-card[data-pattern-id]")
    );
    if (!cards.length) return;

    let progressMap = loadPatternProgress();

    const applyStateToCard = (card) => {
      const id = card.dataset.patternId;
      const toggle = card.querySelector(".pattern-progress-toggle");
      const isDone = id && progressMap[id] === "done";
      if (isDone) {
        card.classList.add("is-completed");
        if (toggle) toggle.classList.add("is-completed");
      } else {
        card.classList.remove("is-completed");
        if (toggle) toggle.classList.remove("is-completed");
      }
    };

    cards.forEach((card) => applyStateToCard(card));
    updatePatternsProgressSummary(cards, progressMap);

    cards.forEach((card) => {
      const toggle = card.querySelector(".pattern-progress-toggle");
      if (!toggle) return;
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const id = card.dataset.patternId;
        if (!id) return;
        const current = progressMap[id] === "done";
        progressMap[id] = current ? "todo" : "done";
        applyStateToCard(card);
        updatePatternsProgressSummary(cards, progressMap);
        savePatternProgress(progressMap);
      });
    });
  }

  function initProblemFilters() {
    if (body.dataset.page !== "overview") return;
    const filterContainer = document.querySelector(".problems-filters");
    const cards = Array.from(
      document.querySelectorAll(".problem-card[data-problem-id]")
    );
    if (!filterContainer || !cards.length) return;

    const buttons = Array.from(
      filterContainer.querySelectorAll(".pill-filter")
    );

    function getProgressMap() {
      return loadProblemProgress();
    }

    function applyFilter(value) {
      const progressMap = getProgressMap();
      cards.forEach((card) => {
        const difficulty = (card.dataset.difficulty || "").toLowerCase();
        const id = card.dataset.problemId;
        const meta = id && progressMap[id];
        const isDone = !!(meta && meta.done);
        const isStarred = !!(meta && meta.starred);
        let visible = true;

        switch (value) {
          case "starred":
            visible = isStarred;
            break;
          case "completed":
            visible = isDone;
            break;
          case "pending":
            visible = !isDone;
            break;
          default:
            visible = true;
        }

        const target = card.closest("li") || card;
        if (visible) {
          target.classList.remove("hidden");
        } else {
          target.classList.add("hidden");
        }
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.dataset.filter || "all";
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        applyFilter(value);
      });
    });
  }

  function enableSmoothScroll() {
    try {
      document.documentElement.style.scrollBehavior = "smooth";
    } catch {
      // ignore
    }
  }

  function exportProgress() {
    const problems = loadProblemProgress();
    const patterns = loadPatternProgress();
    const payload = {
      problems,
      patterns,
    };
    const json = JSON.stringify(payload, null, 2);
    try {
      // Try clipboard first for convenience
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(json);
        // eslint-disable-next-line no-alert
        alert("Progress copied to clipboard. Save it somewhere safe.");
      } else {
        // Fallback to prompt
        // eslint-disable-next-line no-alert
        window.prompt("Copy your progress JSON:", json);
      }
    } catch {
      // eslint-disable-next-line no-alert
      window.prompt("Copy your progress JSON:", json);
    }
  }

  function importProgress() {
    // eslint-disable-next-line no-alert
    const input = window.prompt(
      "Paste previously exported progress JSON to restore it:"
    );
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      if (parsed && typeof parsed === "object") {
        if (parsed.problems && typeof parsed.problems === "object") {
          saveProblemProgress(parsed.problems);
        }
        if (parsed.patterns && typeof parsed.patterns === "object") {
          savePatternProgress(parsed.patterns);
        }
        window.location.reload();
      }
    } catch {
      // eslint-disable-next-line no-alert
      alert("Invalid progress JSON. Please check and try again.");
    }
  }

  function initProgressImportExport() {
    if (body.dataset.page !== "overview") return;
    const exportBtn = document.getElementById("exportProgressBtn");
    const importBtn = document.getElementById("importProgressBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", (e) => {
        e.preventDefault();
        exportProgress();
      });
    }
    if (importBtn) {
      importBtn.addEventListener("click", (e) => {
        e.preventDefault();
        importProgress();
      });
    }
  }

  function init() {
    initTheme();
    initThemeToggle();
    initSearch();
    initScrollTop();
    enableSmoothScroll();
    initProblemProgress();
    initProblemFilters();
    initPatternProgress();
    initProgressImportExport();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

