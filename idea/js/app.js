/**
 * AMATERRA CONSULTORÍA AGROSOCIAL - MAIN APP CONTROLLER
 */

class AppController {
  constructor() {
    this.currentTab = "overview";
    this.theme = localStorage.getItem("amaterra_theme") || "dark";
    this.evaluator = null;
    this.audioSim = null;
    this.wizard = null;
    this.exportTools = null;
  }

  init() {
    this.applyTheme(this.theme);
    this.setupNavigation();
    this.setupThemeToggle();
    this.renderMaturitySection();
    this.renderGovernanceSection();
    this.renderRolesSection();
    this.renderRoadmapSection();
    this.renderWorkshopSection();

    // Initialize sub-controllers
    this.evaluator = new RubricEvaluator();
    this.audioSim = new AudioPipelineSimulator();
    this.wizard = new DecisionWizard();
    this.exportTools = new ExportTools();

    // Open presentation directly on load
    this.exportTools.openPresentation();

    // Keyboard shortcuts for presentation mode
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        this.exportTools.nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        this.exportTools.prevSlide();
      } else if (e.key === "Home" || e.key.toLowerCase() === "r") {
        this.exportTools.restart();
      }
    });

    // Touch swipe gestures for mobile / tablet
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    window.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
      if (!this.exportTools) return;
      if (e.changedTouches && e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const elapsedTime = Date.now() - touchStartTime;

        // Check if swipe is predominantly horizontal, has enough distance, and is within normal swipe duration
        // This prevents triggering slide change while scrolling vertically through a tall slide on mobile
        if (elapsedTime < 600 && Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          if (diffX < 0) {
            this.exportTools.nextSlide(); // Swipe left -> next
          } else {
            this.exportTools.prevSlide(); // Swipe right -> prev
          }
        }
      }
    }, { passive: true });

    console.log("Amaterra IA Presentación inicializada con éxito.");
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-tab-btn");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");
        this.switchTab(tabId);
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    
    // Update nav buttons
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update section visibility
    document.querySelectorAll(".view-section").forEach(sec => {
      if (sec.id === `section-${tabId}`) {
        sec.classList.add("active");
      } else {
        sec.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setupThemeToggle() {
    // Modo noche fijado por defecto
  }

  applyTheme(theme) {
    document.body.classList.remove("theme-light");
  }

  renderMaturitySection() {
    const container = document.getElementById("maturity-levels-list");
    if (!container) return;

    container.innerHTML = AMATERRA_DATA.maturityLevels.map(lvl => `
      <div class="level-card level-${lvl.level}">
        <div class="level-indicator">
          <span class="level-num">${lvl.level}</span>
          <span class="level-tag">Nivel</span>
        </div>
        <div class="level-body">
          <div class="level-title-row">
            <h3 style="font-size: 1.25rem; color: var(--text-main);">Nivel ${lvl.level}: ${lvl.name}</h3>
            <div class="level-meta-chips">
              <span class="badge badge-${lvl.color}">${lvl.badge}</span>
              <span class="chip">🎯 ${lvl.focus}</span>
            </div>
          </div>
          <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">
            <strong>Grado de Autonomía:</strong> ${lvl.autonomy}
          </div>
          <div style="font-size: 0.88rem; color: var(--text-main); margin-top: 0.25rem;">
            <strong>Casos Habituales:</strong> ${lvl.useCases}
          </div>
          <div style="font-size: 0.82rem; color: var(--text-faint); margin-top: 0.25rem; background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <strong>Regla Operativa:</strong> ${lvl.rule}
          </div>
        </div>
      </div>
    `).join("");
  }

  renderGovernanceSection() {
    const semContainer = document.getElementById("governance-semaphore-grid");
    if (!semContainer) return;

    const s = AMATERRA_DATA.dataSemaphore;
    semContainer.innerHTML = `
      <div class="card semaphore-card green">
        <div class="semaphore-icon">🟢</div>
        <h3 style="color: #34d399; font-size: 1.25rem; margin-bottom: 0.5rem;">${s.green.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${s.green.rule}</p>
        <ul class="semaphore-list">
          ${s.green.types.map(t => `<li><span style="color: #34d399;">✔</span> ${t}</li>`).join("")}
        </ul>
        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.78rem; color: var(--text-faint);">
          Riesgo: ${s.green.risk}
        </div>
      </div>

      <div class="card semaphore-card amber">
        <div class="semaphore-icon">🟠</div>
        <h3 style="color: #fbbf24; font-size: 1.25rem; margin-bottom: 0.5rem;">${s.amber.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${s.amber.rule}</p>
        <ul class="semaphore-list">
          ${s.amber.types.map(t => `<li><span style="color: #fbbf24;">⚡</span> ${t}</li>`).join("")}
        </ul>
        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.78rem; color: var(--text-faint);">
          Riesgo: ${s.amber.risk} (Requiere cuenta Team corporativa)
        </div>
      </div>

      <div class="card semaphore-card red">
        <div class="semaphore-icon">🔴</div>
        <h3 style="color: #f87171; font-size: 1.25rem; margin-bottom: 0.5rem;">${s.red.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${s.red.rule}</p>
        <ul class="semaphore-list">
          ${s.red.types.map(t => `<li><span style="color: #f87171;">⛔</span> ${t}</li>`).join("")}
        </ul>
        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.78rem; color: #f87171;">
          Riesgo: ${s.red.risk} (RGPD estricto)
        </div>
      </div>
    `;
  }

  renderRolesSection() {
    const rolesContainer = document.getElementById("roles-grid-container");
    if (rolesContainer) {
      rolesContainer.innerHTML = AMATERRA_DATA.roles.map(r => `
        <div class="role-card role-${r.id}">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="role-avatar">${r.avatarText}</div>
            <div>
              <h3 style="font-size: 1.2rem; color: var(--text-main);">${r.title}</h3>
              <span class="badge badge-terracotta" style="font-size: 0.7rem;">${r.tag}</span>
            </div>
          </div>
          <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.45rem;">
            ${r.responsibilities.map(resp => `<li>${resp}</li>`).join("")}
          </ul>
        </div>
      `).join("");
    }

    const agileContainer = document.getElementById("agile-cycle-container");
    if (agileContainer) {
      agileContainer.innerHTML = AMATERRA_DATA.agileCycle.map(c => `
        <div class="agile-step-card">
          <div class="agile-step-badge">Fase ${c.step} · ${c.actor}</div>
          <h4 style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.4rem;">${c.name}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${c.desc}</p>
        </div>
      `).join("");
    }

    const antiContainer = document.getElementById("antipatterns-container");
    if (antiContainer) {
      antiContainer.innerHTML = AMATERRA_DATA.antiPatterns.map(ap => `
        <div class="antipattern-card">
          <div class="antipattern-icon">❌</div>
          <div style="flex: 1;">
            <div style="color: #f87171; font-weight: 700; font-size: 0.92rem; margin-bottom: 0.25rem;">
              Anti-patrón: ${ap.bad}
            </div>
            <div style="color: #34d399; font-size: 0.88rem;">
              <strong>Principio Amaterra:</strong> ${ap.good}
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  renderRoadmapSection() {
    const rmContainer = document.getElementById("roadmap-flow-container");
    if (!rmContainer) return;

    rmContainer.innerHTML = AMATERRA_DATA.roadmapPhases.map(phase => {
      const isDone = phase.status === "Completado";
      const isCur = phase.status === "En curso";
      const badgeClass = isDone ? "badge-green" : (isCur ? "badge-amber" : "badge-terracotta");
      return `
        <div class="roadmap-phase-card">
          <div class="roadmap-phase-num">${phase.duration}</div>
          <h4 style="font-size: 1rem; color: var(--text-main);">${phase.name}</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted);">${phase.desc}</p>
          <div style="margin-top: auto; padding-top: 0.5rem;">
            <span class="badge ${badgeClass}">${phase.status}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  renderWorkshopSection() {
    const wsContainer = document.getElementById("workshop-questions-container");
    if (!wsContainer) return;

    wsContainer.innerHTML = AMATERRA_DATA.workshopQuestions.map((q, idx) => {
      const savedAnswer = localStorage.getItem(`amaterra_ws_${q.id}`) || "";
      return `
        <div class="workshop-q-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <strong style="color: var(--color-terracotta-light); font-size: 0.8rem; text-transform: uppercase;">Pregunta Clave ${idx + 1}</strong>
            <span class="chip" style="font-size: 0.72rem;">Sesión de Equipo</span>
          </div>
          <h4 style="font-size: 1.05rem; color: var(--text-main); font-weight: 700;">${q.question}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${q.context}</p>
          <textarea 
            class="workshop-q-input" 
            placeholder="${q.placeholder}"
            onchange="AmaterraApp.saveWorkshopAnswer('${q.id}', this.value)"
          >${savedAnswer}</textarea>
        </div>
      `;
    }).join("");
  }

  saveWorkshopAnswer(qId, val) {
    localStorage.setItem(`amaterra_ws_${qId}`, val);
  }

  openPresentation() {
    this.exportTools.openPresentation();
  }

  closePresentation() {
    this.exportTools.closePresentation();
  }

  copyMinuteMarkdown() {
    const minute = this.audioSim.currentScenario.structuredMinute;
    const md = `# ${minute.actaId}: ${minute.finca}
**Fecha:** ${minute.fecha} | **Responsable:** ${minute.responsable}

## 1. Hechos Observados en Campo
${minute.hechos_observados.map(h => `- ${h}`).join("\n")}

## 2. Interpretación Agronómica
${minute.interpretacion_tecnica.map(it => `- ${it}`).join("\n")}

## 3. Plan de Acción Inmediato
| Acción / Medida | Producto / Método | Plazo |
| :--- | :--- | :--- |
${minute.plan_accion.map(p => `| ${p.accion} | ${p.producto || p.especie || "-"} | ${p.plazo} |`).join("\n")}
`;

    navigator.clipboard.writeText(md).then(() => {
      alert("✅ Acta copiada al portapapeles en formato Markdown con el ADN Amaterra.");
    });
  }

  exportToPrint() {
    window.print();
  }
}

// Global instance
window.AmaterraApp = new AppController();
document.addEventListener("DOMContentLoaded", () => {
  window.AmaterraApp.init();
});
