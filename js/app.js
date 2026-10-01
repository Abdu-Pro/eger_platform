// EGER - The Future
// Main Application Logic & Interactivity

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initNavScrollEffect();
  initPillarTabs();
  initResourceVault();
  initDsatCalculator();
  initSpikeBuilder();
  initAccordion();
  initCopyTips();
  initQuizzes();
  initUniversityPredictor();
  initCommunityForm();
});

/* --- 1. Theme Management (Light / Dark) --- */
function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggleBtn");
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem("eger-theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(themeBtn, currentTheme);

  themeBtn.addEventListener("click", () => {
    const active = document.documentElement.getAttribute("data-theme");
    const nextTheme = active === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("eger-theme", nextTheme);
    updateThemeIcon(themeBtn, nextTheme);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
  btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`);
}

/* --- 2. Mobile Menu Toggle with Outside/Esc Dismiss --- */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
  });

  // Close menu when clicking any nav link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });

  // Close when clicking outside of nav
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#topNav") && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    }
  });

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    }
  });
}

/* --- Nav Dynamic Scroll Elevation --- */
function initNavScrollEffect() {
  const nav = document.getElementById("topNav");
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 25) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* --- 3. Pillar Navigation Tabs --- */
function initPillarTabs() {
  const tabBtns = document.querySelectorAll(".pillar-tab-btn");
  const pillars = document.querySelectorAll(".guide-pillar");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      pillars.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-target");
      const targetPillar = document.getElementById(targetId);
      if (targetPillar) {
        targetPillar.classList.add("active");
      }
    });
  });
}

/* --- 4. Searchable Resource Vault Directory --- */
function initResourceVault() {
  const container = document.getElementById("resourcesGrid");
  const searchInput = document.getElementById("resourceSearchInput");
  const filterPills = document.querySelectorAll(".filter-pill");

  if (!container || typeof EGER_RESOURCES === "undefined") return;

  let currentCategory = "all";
  let searchQuery = "";

  function render() {
    const filtered = EGER_RESOURCES.filter(item => {
      const matchCat = currentCategory === "all" || item.category === currentCategory;
      const text = (item.title + " " + item.description + " " + item.author + " " + item.tags.join(" ")).toLowerCase();
      const matchQuery = !searchQuery || text.includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">🔍 No resources found matching your search</p>
          <p style="font-size: 0.9rem;">Try switching category filters or searching for terms like "Math", "Desmos", "Essay", or "YYGS".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const typeIcons = {
        youtube: "📺",
        book: "📚",
        website: "🌐",
        program: "🏆"
      };

      const icon = typeIcons[item.type] || "📄";

      return `
        <div class="resource-card" data-category="${item.category}">
          <div>
            <div class="resource-top">
              <span class="res-type-pill">${icon} ${item.type}</span>
              ${item.badge ? `<span class="res-badge">${item.badge}</span>` : ""}
            </div>
            <h3 class="resource-title">${item.title}</h3>
            <div class="resource-author">By ${item.author}</div>
            <p class="resource-desc">${item.description}</p>
          </div>
          <div>
            <div class="resource-tags">
              ${item.tags.map(t => `<span class="resource-tag">#${t}</span>`).join("")}
            </div>
            <a href="${item.link}" target="${item.link.startsWith('http') ? '_blank' : '_self'}" rel="noopener" class="resource-btn" style="width: 100%;">
              Access Resource <span>↗</span>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  // Filter click handlers
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-filter");
      render();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  // Initial render
  render();
}

/* --- 5. DSAT Target & Study Plan Generator --- */
function initDsatCalculator() {
  const currentScoreInput = document.getElementById("calcCurrentScore");
  const targetScoreInput = document.getElementById("calcTargetScore");
  const weeksInput = document.getElementById("calcWeeks");
  const hoursInput = document.getElementById("calcHoursPerWeek");
  const calcBtn = document.getElementById("calculatePlanBtn");

  const resultScore = document.getElementById("planTargetDisplay");
  const resultHours = document.getElementById("planTotalHours");
  const resultWeekly = document.getElementById("planWeeklyTarget");
  const roadmapContainer = document.getElementById("planRoadmapList");

  if (!calcBtn) return;

  function updatePlan() {
    const current = parseInt(currentScoreInput.value) || 1100;
    const target = parseInt(targetScoreInput.value) || 1500;
    const weeks = parseInt(weeksInput.value) || 8;
    const hours = parseInt(hoursInput.value) || 10;

    const gap = target - current;

    // Edge case: target already attained or surpassed
    if (gap <= 0) {
      if (resultScore) resultScore.textContent = `${current} (Elite Bracket)`;
      if (resultHours) resultHours.textContent = `~25 Hours Maintenance`;
      if (resultWeekly) resultWeekly.textContent = `3-5h / week maintenance`;

      if (roadmapContainer) {
        roadmapContainer.innerHTML = `
          <div class="roadmap-step">
            <span class="step-num">1</span>
            <div><strong>Score Retention:</strong> Complete 1 full timed adaptive Bluebook section per week to preserve timing intuition.</div>
          </div>
          <div class="roadmap-step">
            <span class="step-num">2</span>
            <div><strong>Perfect 800 Isolation:</strong> Drill hard-tier College Board Question Bank items in Module 2 (Nonlinear systems, Rhetorical Synthesis).</div>
          </div>
          <div class="roadmap-step">
            <span class="step-num">3</span>
            <div><strong>Super-Score Maximizer:</strong> Direct 80% of prep toward your lowest section to combine two test dates into a 1550+ superscore.</div>
          </div>
          <div class="roadmap-step">
            <span class="step-num">4</span>
            <div><strong>Peak Endurance:</strong> Practice test-day pacing (under 1 minute per standard item) to leave 10 minutes for Desmos regression checks.</div>
          </div>
        `;
      }
      return;
    }

    const totalHoursNeeded = Math.max(40, Math.round(gap * 0.85));
    const hoursPerWeekRec = Math.round(totalHoursNeeded / Math.max(1, weeks));

    if (resultScore) resultScore.textContent = `${target}+ Target`;
    if (resultHours) resultHours.textContent = `~${totalHoursNeeded} Hours Total`;
    if (resultWeekly) resultWeekly.textContent = `${hoursPerWeekRec}h / week recommended`;

    if (roadmapContainer) {
      let phase1 = "Weeks 1-2: Diagnostic & Desmos Calculator Mastery + RW Punctuation rules";
      let phase2 = "Weeks 3-4: College Board Question Bank Hard Tier + Transition logic";
      let phase3 = "Weeks 5-6: Full Timed Adaptive Bluebook Practice Tests (Tests 1-4)";
      let phase4 = "Weeks 7+: Error Log deep dive, Module 2 high-difficulty stamina drills";

      if (gap > 300) {
        phase1 = "Weeks 1-3: Rebuild Math Algebra Foundations + Complete Erica Meltzer Grammar";
        phase2 = "Weeks 4-6: Khan Academy Advanced Level + Desmos regression hacks";
        phase3 = "Weeks 7-10: 4 Full Bluebook Practice Tests & detailed wrong answer analysis";
        phase4 = "Weeks 11+: Pacing optimization (1-min per question) and test condition mastery";
      }

      roadmapContainer.innerHTML = `
        <div class="roadmap-step">
          <span class="step-num">1</span>
          <div><strong>Phase 1 (Foundations):</strong> ${phase1}</div>
        </div>
        <div class="roadmap-step">
          <span class="step-num">2</span>
          <div><strong>Phase 2 (Deep Problem Bank):</strong> ${phase2}</div>
        </div>
        <div class="roadmap-step">
          <span class="step-num">3</span>
          <div><strong>Phase 3 (Simulation):</strong> ${phase3}</div>
        </div>
        <div class="roadmap-step">
          <span class="step-num">4</span>
          <div><strong>Phase 4 (Super-Score Peak):</strong> ${phase4}</div>
        </div>
      `;
    }
  }

  calcBtn.addEventListener("click", updatePlan);
  updatePlan();
}

/* --- 6. EC Spike Evaluator Tool --- */
function initSpikeBuilder() {
  const tierCards = document.querySelectorAll(".spike-tier-card");
  const adviceBox = document.getElementById("spikeFeedbackBox");

  const tierAdvice = {
    "1": {
      title: "Tier 1: World-Class / National Rare Impact",
      badge: "Top 0.5% of Global Applicants",
      advice: "Exceptional! Examples include winning International Olympiad medals, founding a registered NGO serving 10,000+ people, or published research with a university professor. On your Common App, focus on quantifiable metrics, letters of support, and how this links to your major."
    },
    "2": {
      title: "Tier 2: Regional / State Leadership & High Distinction",
      badge: "Top 5% Competitive Edge",
      advice: "Strong! Examples: Student Council President, State-level debate champion, founder of an active school club with 100+ members, or regional sports captain. To turn this into a Tier 1 spike: publish an open-source tool, organize a city-wide conference, or scale your club to 5 other schools."
    },
    "3": {
      title: "Tier 3: School-Level Leadership & Active Contribution",
      badge: "Solid Foundation",
      advice: "Good school involvement: Varsity team member, club treasurer, choir lead, or regular tutor. To upgrade to Tier 2: Don't just participate—build something novel. Create an annual school-wide STEM exhibition, start a community literacy project, or publish a student journal."
    },
    "4": {
      title: "Tier 4: General Participation & Club Membership",
      badge: "Baseline Involvement",
      advice: "General club member or occasional volunteer. Colleges view this as passive interest. Action step: Pick ONE cause or academic field you love (e.g. AI, biology, climate, or cultural writing) and take ownership. Propose a specific workshop, lead a fundraiser, or enter a national essay competition."
    }
  };

  tierCards.forEach(card => {
    card.addEventListener("click", () => {
      tierCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      const tier = card.getAttribute("data-tier");
      const data = tierAdvice[tier];
      if (adviceBox && data) {
        adviceBox.innerHTML = `
          <div style="background: var(--bg-card); border-left: 4px solid var(--gold-vibrant); padding: 1.25rem 1.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
              <h4 style="font-size: 1.1rem; font-weight: 800;">${data.title}</h4>
              <span class="tier-badge">${data.badge}</span>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${data.advice}</p>
          </div>
        `;
      }
    });
  });
}

/* --- 7. FAQ Accordion --- */
function initAccordion() {
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const content = item.querySelector(".accordion-content");
      const isOpen = item.classList.contains("active");

      // Close all others
      document.querySelectorAll(".accordion-item").forEach(other => {
        other.classList.remove("active");
        const otherContent = other.querySelector(".accordion-content");
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isOpen && content) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/* --- 8. Copy-to-Clipboard with Robust Fallback --- */
function fallbackCopyText(text, successCb) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "-9999px";
  textArea.setAttribute("readonly", "");
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    if (successful && successCb) successCb();
  } catch (err) {
    console.error("Fallback copy error:", err);
  }
  document.body.removeChild(textArea);
}

function initCopyTips() {
  const copyBtns = document.querySelectorAll(".btn-copy-tip");

  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-tip-content");
      if (!textToCopy) return;

      const notifySuccess = () => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `✓ Copied for TikTok/IG!`;
        btn.style.background = "var(--emerald-light)";
        btn.style.color = "#FFFFFF";

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.background = "";
          btn.style.color = "";
        }, 2200);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(notifySuccess)
          .catch(() => fallbackCopyText(textToCopy, notifySuccess));
      } else {
        fallbackCopyText(textToCopy, notifySuccess);
      }
    });
  });
}

/* --- 9. Interactive Practice Quizzes with Retry Support --- */
function initQuizzes() {
  const quizBoxes = document.querySelectorAll(".quiz-box");

  quizBoxes.forEach(box => {
    const optionBtns = box.querySelectorAll(".quiz-opt-btn");
    const explanation = box.querySelector(".quiz-explanation");

    // Add Retry button dynamically if explanation exists
    if (explanation && !box.querySelector(".quiz-retry-btn")) {
      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.className = "quiz-retry-btn";
      retryBtn.innerHTML = "↺ Try Again / Re-test";
      retryBtn.style.cssText = "display: inline-block; margin-top: 1rem; padding: 0.45rem 1rem; font-size: 0.85rem; font-weight: 700; color: var(--brand-red); background: transparent; border: 1px solid var(--brand-red); border-radius: 9999px; cursor: pointer; transition: all 0.2s ease;";

      retryBtn.addEventListener("mouseenter", () => {
        retryBtn.style.background = "var(--brand-red)";
        retryBtn.style.color = "#FFFFFF";
      });
      retryBtn.addEventListener("mouseleave", () => {
        retryBtn.style.background = "transparent";
        retryBtn.style.color = "var(--brand-red)";
      });
      retryBtn.addEventListener("click", () => {
        optionBtns.forEach(b => {
          b.classList.remove("correct", "wrong");
          b.disabled = false;
        });
        explanation.classList.remove("show");
      });

      explanation.appendChild(retryBtn);
    }

    optionBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.getAttribute("data-correct") === "true";

        // Lock options & mark correct answer
        optionBtns.forEach(b => {
          b.classList.remove("correct", "wrong");
          b.disabled = true;
          if (b.getAttribute("data-correct") === "true") {
            b.classList.add("correct");
          }
        });

        if (!isCorrect) {
          btn.classList.add("wrong");
        }

        if (explanation) {
          explanation.classList.add("show");
        }
      });
    });
  });
}

/* --- 10. Ethiopian University Placement Predictor --- */
function initUniversityPredictor() {
  const calcBtn = document.getElementById("predictPlacementBtn");
  if (!calcBtn) return;

  const scoreInput = document.getElementById("predictorScore");
  const streamSelect = document.getElementById("predictorStream");
  const resultContainer = document.getElementById("predictorResults");

  calcBtn.addEventListener("click", () => {
    const score = parseInt(scoreInput.value) || 0;
    const stream = streamSelect.value;

    let tier = "";
    let recommendations = [];

    if (stream === "natural") {
      if (score >= 580) {
        tier = "Tier 1: Elite STEM & High-Demand Placement (Top 1%)";
        recommendations = [
          "AAU (Addis Ababa University) - Medicine, Software Engineering, Electrical Engineering",
          "AASTU (Addis Ababa Science & Technology University) - Chemical, AI & Mechanical Eng",
          "ASTU (Adama Science & Technology University) - Computer Science & Applied Robotics",
          "Eligibility for international scholarship nominations (MasterCard Foundation, DAAD, Turkiye Burslari)"
        ];
      } else if (score >= 500) {
        tier = "Tier 2: Major Regional Comprehensive Universities";
        recommendations = [
          "Jimma University - Health Sciences, Technology, Public Health",
          "Hawassa University - Agriculture, Bio-Sciences, Civil Engineering",
          "Bahir Dar University - Maritime Academy, Information Technology",
          "University of Gondar - Medicine, Biomedical Engineering"
        ];
      } else if (score >= 420) {
        tier = "Tier 3: Standard University STEM Placements";
        recommendations = [
          "Arba Minch University - Water Resources & Hydraulic Engineering",
          "Haramaya University - Agro-Technology, Computer Sciences",
          "Wollega & Ambo Universities - Applied Sciences & Engineering"
        ];
      } else {
        tier = "Baseline Threshold (Preparation Focus Required)";
        recommendations = [
          "Focus on revision: Target 450+ to ensure public university STEM placement",
          "Alternative pathways: TVET specialized technical diplomas & private college scholarships"
        ];
      }
    } else {
      // Social Science
      if (score >= 500) {
        tier = "Tier 1: Elite Social Science & Law (Top 1%)";
        recommendations = [
          "AAU (Addis Ababa University) - School of Law, Economics, Business & Economics (FBE)",
          "Jimma University - International Relations & Governance",
          "Hawassa University - Finance, Management & Economics"
        ];
      } else if (score >= 420) {
        tier = "Tier 2: Regional University Social & Humanities";
        recommendations = [
          "Bahir Dar University - Law & Social Work",
          "Gondar University - Sociology & Business Management",
          "Ambo University - Accounting & Finance"
        ];
      } else {
        tier = "Baseline Threshold (Preparation Focus Required)";
        recommendations = [
          "Focus on Grade 11 & 12 History and Economics review to raise your score above 450"
        ];
      }
    }

    resultContainer.innerHTML = `
      <div style="background: var(--bg-card); border-left: 4px solid var(--emerald-light); padding: 1.25rem 1.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-top: 1.25rem;">
        <div style="font-weight: 800; font-size: 1.1rem; color: var(--emerald-light); margin-bottom: 0.5rem;">
          ${tier}
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
          Based on historical Ministry of Education placement thresholds for ${stream.toUpperCase()} science:
        </p>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${recommendations.map(r => `
            <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              <span style="color: var(--emerald-light); font-weight: 800;">✓</span>
              <span>${r}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  });
}

/* --- 11. Community Mentorship Waitlist Form --- */
function initCommunityForm() {
  const form = document.getElementById("communityWaitlistForm");
  const alertBox = document.getElementById("waitlistSuccessAlert");
  if (!form || !alertBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("studentName")?.value || "Scholar";
    const contact = document.getElementById("studentEmail")?.value || "";
    const goalSelect = document.getElementById("primaryGoal");
    const goalText = goalSelect ? goalSelect.options[goalSelect.selectedIndex].text : "Scholars Program";

    alertBox.innerHTML = `
      <div style="background: rgba(34, 197, 94, 0.12); border: 1px solid var(--emerald-light); padding: 1.5rem; border-radius: var(--radius-md); text-align: center; animation: fadeIn 0.3s ease;">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🎉</div>
        <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--emerald-light); margin-bottom: 0.5rem;">Welcome to EGER Scholars, ${name}!</h4>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; max-width: 540px; margin: 0 auto;">
          You are officially on the early-access list for <strong>${goalText}</strong>. We'll send workshop dates, essay feedback slots, and cohort alerts to <strong>${contact}</strong>.
        </p>
      </div>
    `;
    alertBox.style.display = "block";
    form.reset();

    // Smooth scroll to confirmation
    alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
