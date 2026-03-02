(() => {
  const PROBLEMS = {
    "parking-lot": {
      title: "Design Parking Lot",
      difficulty: "Easy",
      file: "../problems/parking-lot.md",
      summary:
        "Design a multi-level parking lot system that supports different vehicle types and real-time availability.",
    },
    "stack-overflow": {
      title: "Design Stack Overflow",
      difficulty: "Easy",
      file: "../problems/stack-overflow.md",
      summary:
        "Model a Q&A platform like Stack Overflow with questions, answers, votes, tags, and users.",
    },
    "vending-machine": {
      title: "Design a Vending Machine",
      difficulty: "Easy",
      file: "../problems/vending-machine.md",
      summary:
        "Design a vending machine that handles inventory, payment, and product dispensing.",
    },
    "logging-framework": {
      title: "Design Logging Framework",
      difficulty: "Easy",
      file: "../problems/logging-framework.md",
      summary:
        "Create a flexible logging framework that supports multiple appenders and log levels.",
    },
    "traffic-signal": {
      title: "Design Traffic Signal Control System",
      difficulty: "Easy",
      file: "../problems/traffic-signal.md",
      summary:
        "Model a traffic signal control system with multiple intersections and timing rules.",
    },
    "coffee-vending-machine": {
      title: "Design Coffee Vending Machine",
      difficulty: "Easy",
      file: "../problems/coffee-vending-machine.md",
      summary:
        "Build a coffee vending machine that supports multiple drink types and customizations.",
    },
    "task-management-system": {
      title: "Design a Task Management System",
      difficulty: "Easy",
      file: "../problems/task-management-system.md",
      summary:
        "Design a task management application with projects, tasks, users, and notifications.",
    },
    atm: {
      title: "Design ATM",
      difficulty: "Medium",
      file: "../problems/atm.md",
      summary:
        "Model an ATM system that supports withdrawals, deposits, and balance inquiries securely.",
    },
    linkedin: {
      title: "Design LinkedIn",
      difficulty: "Medium",
      file: "../problems/linkedin.md",
      summary:
        "Design a professional networking platform like LinkedIn with profiles, connections, and feeds.",
    },
    "lru-cache": {
      title: "Design LRU Cache",
      difficulty: "Medium",
      file: "../problems/lru-cache.md",
      summary:
        "Design a least-recently-used cache data structure with efficient get and put operations.",
    },
    "tic-tac-toe": {
      title: "Design Tic Tac Toe Game",
      difficulty: "Medium",
      file: "../problems/tic-tac-toe.md",
      summary:
        "Design a Tic Tac Toe game supporting gameplay, winner detection, and possibly AI.",
    },
    "pub-sub-system": {
      title: "Design Pub Sub System",
      difficulty: "Medium",
      file: "../problems/pub-sub-system.md",
      summary:
        "Model a publish-subscribe messaging system with topics, publishers, and subscribers.",
    },
    "elevator-system": {
      title: "Design an Elevator System",
      difficulty: "Medium",
      file: "../problems/elevator-system.md",
      summary:
        "Design a multi-elevator control system that handles requests efficiently across floors.",
    },
    "car-rental-system": {
      title: "Design Car Rental System",
      difficulty: "Medium",
      file: "../problems/car-rental-system.md",
      summary:
        "Model a car rental system with reservations, fleets, payments, and branches.",
    },
    "online-auction-system": {
      title: "Design an Online Auction System",
      difficulty: "Medium",
      file: "../problems/online-auction-system.md",
      summary:
        "Design an online auction platform supporting bids, auctions, and winner determination.",
    },
    "hotel-management-system": {
      title: "Design Hotel Management System",
      difficulty: "Medium",
      file: "../problems/hotel-management-system.md",
      summary:
        "Model a hotel management system with rooms, bookings, and billing.",
    },
    "digital-wallet-service": {
      title: "Design a Digital Wallet Service",
      difficulty: "Medium",
      file: "../problems/digital-wallet-service.md",
      summary:
        "Design a digital wallet service that handles balances, transfers, and transactions.",
    },
    "airline-management-system": {
      title: "Design Airline Management System",
      difficulty: "Medium",
      file: "../problems/airline-management-system.md",
      summary:
        "Model an airline management system covering flights, schedules, and reservations.",
    },
    "library-management-system": {
      title: "Design a Library Management System",
      difficulty: "Medium",
      file: "../problems/library-management-system.md",
      summary:
        "Design a library system to manage books, members, loans, and returns.",
    },
    "social-networking-service": {
      title: "Design a Social Network like Facebook",
      difficulty: "Medium",
      file: "../problems/social-networking-service.md",
      summary:
        "Model a social networking service with users, posts, feeds, and friendships.",
    },
    "restaurant-management-system": {
      title: "Design Restaurant Management System",
      difficulty: "Medium",
      file: "../problems/restaurant-management-system.md",
      summary:
        "Design a restaurant management system including tables, orders, and billing.",
    },
    "concert-ticket-booking-system": {
      title: "Design a Concert Ticket Booking System",
      difficulty: "Medium",
      file: "../problems/concert-ticket-booking-system.md",
      summary:
        "Design a concert ticket booking platform with seats, events, and payments.",
    },
    cricinfo: {
      title: "Design CricInfo",
      difficulty: "Hard",
      file: "../problems/cricinfo.md",
      summary:
        "Model a cricket information system like CricInfo with matches, scores, and statistics.",
    },
    splitwise: {
      title: "Design Splitwise",
      difficulty: "Hard",
      file: "../problems/splitwise.md",
      summary:
        "Design an expense sharing application like Splitwise with groups, balances, and settlements.",
    },
    "chess-game": {
      title: "Design Chess Game",
      difficulty: "Hard",
      file: "../problems/chess-game.md",
      summary:
        "Design a chess game engine supporting rules, moves, and piece interactions.",
    },
    "snake-and-ladder": {
      title: "Design a Snake and Ladder Game",
      difficulty: "Hard",
      file: "../problems/snake-and-ladder.md",
      summary:
        "Design a Snake and Ladder board game with players, dice, and movement rules.",
    },
    "ride-sharing-service": {
      title: "Design Ride-Sharing Service like Uber",
      difficulty: "Hard",
      file: "../problems/ride-sharing-service.md",
      summary:
        "Model a ride-sharing platform like Uber with riders, drivers, and trip matching.",
    },
    "course-registration-system": {
      title: "Design Course Registration System",
      difficulty: "Hard",
      file: "../problems/course-registration-system.md",
      summary:
        "Design a course registration system with students, courses, and enrollment rules.",
    },
    "movie-ticket-booking-system": {
      title: "Design Movie Ticket Booking System",
      difficulty: "Hard",
      file: "../problems/movie-ticket-booking-system.md",
      summary:
        "Design an online movie ticket booking platform with shows, seats, and payments.",
    },
    "online-shopping-service": {
      title: "Design Online Shopping System like Amazon",
      difficulty: "Hard",
      file: "../problems/online-shopping-service.md",
      summary:
        "Model an e-commerce platform like Amazon with products, carts, and orders.",
    },
    "online-stock-brokerage-system": {
      title: "Design Online Stock Brokerage System",
      difficulty: "Hard",
      file: "../problems/online-stock-brokerage-system.md",
      summary:
        "Design an online stock brokerage system supporting trades, portfolios, and quotes.",
    },
    "music-streaming-service": {
      title: "Design Music Streaming Service like Spotify",
      difficulty: "Hard",
      file: "../problems/music-streaming-service.md",
      summary:
        "Design a music streaming service like Spotify with playlists, tracks, and streaming.",
    },
    "food-delivery-service": {
      title: "Design Online Food Delivery Service like Swiggy",
      difficulty: "Hard",
      file: "../problems/food-delivery-service.md",
      summary:
        "Model an online food delivery platform like Swiggy with restaurants, orders, and delivery.",
    },
  };

  const PROBLEM_PROGRESS_KEY = "lld-webview-problem-progress";

  function getSlugFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug") || "";
  }

  function applyProblemMeta(problem, slug) {
    const titleEl = document.getElementById("problemTitle");
    const diffEl = document.getElementById("problemDifficulty");
    const metaDiffEl = document.getElementById("metaDifficulty");
    const metaSourceEl = document.getElementById("metaSourceFile");
    const summaryEl = document.getElementById("problemSummary");
    const mdLink = document.getElementById("openMarkdownLink");

    if (titleEl) titleEl.textContent = problem.title;
    if (diffEl) diffEl.textContent = problem.difficulty;
    if (metaDiffEl) metaDiffEl.textContent = problem.difficulty;
    if (metaSourceEl) metaSourceEl.textContent = problem.file.replace("../", "");
    if (summaryEl) summaryEl.textContent = problem.summary || "";
    if (mdLink) {
      mdLink.href = problem.file;
    }

    document.title = `${problem.title} • Awesome Low Level Design`;
  }

  function loadProblemProgress() {
    try {
      const raw = window.localStorage.getItem(PROBLEM_PROGRESS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveProblemProgress(map) {
    try {
      window.localStorage.setItem(PROBLEM_PROGRESS_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function applyInlineFormatting(text) {
    let result = escapeHtml(text);
    result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
    result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    result = result.replace(/(\*|_)([^*_]+)\1/g, "<em>$2</em>");
    return result;
  }

  function markdownToHtml(markdown) {
    const lines = markdown.replace(/\r\n/g, "\n").split("\n");
    let html = "";
    let inList = false;

    const closeList = () => {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();

      if (!line.trim()) {
        closeList();
        html += "<p></p>";
        continue;
      }

      if (line.startsWith("#### ")) {
        closeList();
        const content = applyInlineFormatting(line.slice(5).trim());
        html += `<h4>${content}</h4>`;
        continue;
      }

      if (line.startsWith("### ")) {
        closeList();
        const content = applyInlineFormatting(line.slice(4).trim());
        html += `<h3>${content}</h3>`;
        continue;
      }

      if (line.startsWith("## ")) {
        closeList();
        const content = applyInlineFormatting(line.slice(3).trim());
        html += `<h2>${content}</h2>`;
        continue;
      }

      if (line.startsWith("# ")) {
        closeList();
        const content = applyInlineFormatting(line.slice(2).trim());
        html += `<h1>${content}</h1>`;
        continue;
      }

      const listMatch = line.match(/^[-*]\s+(.+)/);
      if (listMatch) {
        const content = applyInlineFormatting(listMatch[1].trim());
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${content}</li>`;
        continue;
      }

      const orderedMatch = line.match(/^\d+\.\s+(.+)/);
      if (orderedMatch) {
        closeList();
        const content = applyInlineFormatting(orderedMatch[1].trim());
        html += `<p>${orderedMatch[0].replace(
          /^(\d+\.)\s+.+/,
          "$1"
        )} ${content}</p>`;
        continue;
      }

      const imgMatch = line.match(/!\[.*?\]\((.+?)\)/);
      if (imgMatch) {
        closeList();
        const src = imgMatch[1];
        const resolved = src.startsWith("http")
          ? src
          : src.replace("../", "../");
        html += `<p><img src="${resolved}" alt="" /></p>`;
        continue;
      }

      const linkReplaced = line.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_m, text, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`
      );
      html += `<p>${applyInlineFormatting(linkReplaced)}</p>`;
    }

    closeList();
    return html;
  }

  async function loadProblem() {
    const slug = getSlugFromQuery();
    const config = PROBLEMS[slug];
    const bodyEl = document.getElementById("problemBody");

    if (!bodyEl) return;

    if (!config) {
      bodyEl.innerHTML =
        "<p>Problem not found. Please go back and choose a valid problem.</p>";
      return;
    }

    applyProblemMeta(config, slug);

    try {
      const res = await fetch(config.file);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const text = await res.text();
      bodyEl.innerHTML = markdownToHtml(text);
    } catch (err) {
      bodyEl.innerHTML =
        "<p>Unable to load the markdown content in this environment. You can still open the original markdown file from the sidebar.</p>";
    }
  }

  function initDetailProgress(slug) {
    const btn = document.getElementById("detailProgressToggle");
    if (!btn) return;

    let map = loadProblemProgress();
    const applyState = () => {
      const done = map[slug] === "done";
      if (done) {
        btn.classList.add("is-completed");
        btn.textContent = "Mark as not completed";
      } else {
        btn.classList.remove("is-completed");
        btn.textContent = "Mark as completed";
      }
    };

    applyState();

    btn.addEventListener("click", () => {
      const current = map[slug] === "done";
      map[slug] = current ? "todo" : "done";
      saveProblemProgress(map);
      applyState();
    });
  }

  function init() {
    const isProblemPage = document.body.dataset.page === "problem";
    if (!isProblemPage) return;
    const slug = getSlugFromQuery();
    loadProblem().then(() => {
      if (slug) {
        initDetailProgress(slug);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

