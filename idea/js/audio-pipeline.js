/**
 * AMATERRA CONSULTORÍA AGROSOCIAL - AUDIO PIPELINE SIMULATOR (NIVEL 3)
 * Simulador interactivo de conversión de audio de campo .mp3 a acta estructurada
 */

class AudioPipelineSimulator {
  constructor() {
    this.scenarios = AMATERRA_DATA.audioPipelineScenarios;
    this.currentScenario = this.scenarios[0];
    this.isPlaying = false;
    this.noiseFilterActive = true;
    this.currentStep = 4;
    this.playbackInterval = null;
    this.playbackProgress = 0;
    this.init();
  }

  init() {
    this.scenarioSelect = document.getElementById("audio-scenario-select");
    this.playBtn = document.getElementById("audio-play-btn");
    this.noiseToggleBtn = document.getElementById("audio-noise-filter-btn");
    this.waveformEl = document.getElementById("audio-waveform-canvas");
    this.processBtn = document.getElementById("audio-run-pipeline-btn");
    this.rawTranscriptEl = document.getElementById("audio-raw-snippet");
    this.minutePreviewEl = document.getElementById("audio-minute-rendered");
    this.entitiesEl = document.getElementById("audio-entities-chips");

    if (this.scenarioSelect) {
      this.populateScenarios();
      this.scenarioSelect.addEventListener("change", (e) => this.loadScenario(e.target.value));
    }

    if (this.playBtn) {
      this.playBtn.addEventListener("click", () => this.togglePlayback());
    }

    if (this.noiseToggleBtn) {
      this.noiseToggleBtn.addEventListener("click", () => this.toggleNoiseFilter());
    }

    if (this.processBtn) {
      this.processBtn.addEventListener("click", () => this.runFullPipelineAnimation());
    }

    this.renderWaveform();
    this.loadScenario(this.scenarios[0].id);
  }

  populateScenarios() {
    this.scenarioSelect.innerHTML = this.scenarios
      .map(s => `<option value="${s.id}">${s.title} (${s.duration})</option>`)
      .join("");
  }

  loadScenario(scenarioId) {
    this.currentScenario = this.scenarios.find(s => s.id === scenarioId) || this.scenarios[0];
    this.playbackProgress = 0;
    this.pausePlayback();
    this.renderScenarioDetails();
  }

  renderScenarioDetails() {
    const s = this.currentScenario;
    
    // Info badges
    const metaEl = document.getElementById("audio-scenario-meta");
    if (metaEl) {
      metaEl.innerHTML = `
        <span class="chip">📍 ${s.location}</span>
        <span class="chip">⏱️ ${s.duration}</span>
        <span class="chip">🗣️ ${s.languages}</span>
        <span class="chip">🌪️ ${s.noiseLevel}</span>
      `;
    }

    // Raw snippet
    if (this.rawTranscriptEl) {
      this.rawTranscriptEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.6; color: var(--text-muted);">
          ${s.rawSnippet}
        </div>
      `;
    }

    // Detected entities
    if (this.entitiesEl) {
      const e = s.detectedEntities;
      this.entitiesEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div><strong style="color: var(--color-emerald); font-size: 0.8rem; text-transform: uppercase;">Parcelas / Zonas:</strong> ${e.parcelas.map(p => `<span class="badge badge-green">${p}</span>`).join(" ")}</div>
          <div><strong style="color: var(--color-amber); font-size: 0.8rem; text-transform: uppercase;">Plagas / Patologías:</strong> ${e.plagas_patogenos.map(p => `<span class="badge badge-amber">${p}</span>`).join(" ")}</div>
          <div><strong style="color: #60a5fa; font-size: 0.8rem; text-transform: uppercase;">Materias Activas / Medios:</strong> ${e.materias_activas.map(m => `<span class="badge badge-blue">${m}</span>`).join(" ")}</div>
        </div>
      `;
    }

    // Render structured minute
    this.renderStructuredMinute();
  }

  renderStructuredMinute() {
    if (!this.minutePreviewEl) return;
    const m = this.currentScenario.structuredMinute;

    this.minutePreviewEl.innerHTML = `
      <div class="minute-header-badge">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span class="badge badge-green">${m.actaId}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${m.fecha}</span>
          </div>
          <h3 style="font-size: 1.15rem; color: var(--text-main);">${m.finca}</h3>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 0.75rem; color: var(--text-muted);">Responsable Técnico</div>
          <strong style="color: var(--color-terracotta-light); font-size: 0.88rem;">${m.responsable}</strong>
        </div>
      </div>

      <div class="minute-section-title">
        <span>📋 1. Hechos Observados en Campo (100% Empírico)</span>
      </div>
      <ul style="padding-left: 1.25rem; color: var(--text-main); font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.35rem;">
        ${m.hechos_observados.map(h => `<li>${h}</li>`).join("")}
      </ul>

      <div class="minute-section-title">
        <span>🔍 2. Interpretación Agronómica y Causal</span>
      </div>
      <ul style="padding-left: 1.25rem; color: var(--text-main); font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.35rem;">
        ${m.interpretacion_tecnica.map(it => `<li>${it}</li>`).join("")}
      </ul>

      <div class="minute-section-title">
        <span>⚡ 3. Plan de Acción Inmediato (5W+1H)</span>
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-top: 0.5rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-faint); text-align: left;">
              <th style="padding: 0.4rem 0.6rem;">Acción / Medida</th>
              <th style="padding: 0.4rem 0.6rem;">Producto / Método</th>
              <th style="padding: 0.4rem 0.6rem;">Plazo / Responsable</th>
            </tr>
          </thead>
          <tbody>
            ${m.plan_accion.map(p => `
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-main);">
                <td style="padding: 0.5rem 0.6rem; font-weight: 600;">${p.accion}</td>
                <td style="padding: 0.5rem 0.6rem; color: var(--color-emerald);">${p.producto || p.especie || "-"}</td>
                <td style="padding: 0.5rem 0.6rem;"><span class="badge badge-amber">${p.plazo}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: var(--text-muted);">
        <span>✅ Borrador verificado conforme al ADN Amaterra</span>
        <button class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" onclick="AmaterraApp.copyMinuteMarkdown()">
          📄 Copiar Formato Markdown
        </button>
      </div>
    `;
  }

  renderWaveform() {
    if (!this.waveformEl) return;
    const barsCount = 48;
    let html = "";
    for (let i = 0; i < barsCount; i++) {
      const height = Math.floor(Math.random() * 45) + 12;
      html += `<div class="wave-bar" id="wave-bar-${i}" style="height: ${height}px;"></div>`;
    }
    this.waveformEl.innerHTML = html;
  }

  animateWaveform() {
    const bars = this.waveformEl?.querySelectorAll(".wave-bar");
    if (!bars) return;
    bars.forEach(bar => {
      const multiplier = this.noiseFilterActive ? 0.6 : 1.2;
      const height = Math.floor((Math.random() * 50 + 10) * multiplier);
      bar.style.height = `${height}px`;
    });
  }

  togglePlayback() {
    if (this.isPlaying) {
      this.pausePlayback();
    } else {
      this.startPlayback();
    }
  }

  startPlayback() {
    this.isPlaying = true;
    if (this.playBtn) {
      this.playBtn.innerHTML = "⏸️ Pausar Audio";
      this.playBtn.classList.remove("btn-outline");
      this.playBtn.classList.add("btn-terracotta");
    }
    this.playbackInterval = setInterval(() => {
      this.animateWaveform();
      this.playbackProgress += 1;
      const timeDisplay = document.getElementById("audio-time-counter");
      if (timeDisplay) {
        const mins = String(Math.floor(this.playbackProgress / 60)).padStart(2, '0');
        const secs = String(this.playbackProgress % 60).padStart(2, '0');
        timeDisplay.textContent = `00:${mins}:${secs} / ${this.currentScenario.duration}`;
      }
    }, 200);
  }

  pausePlayback() {
    this.isPlaying = false;
    if (this.playbackInterval) clearInterval(this.playbackInterval);
    if (this.playBtn) {
      this.playBtn.innerHTML = "▶️ Reproducir Simulación";
      this.playBtn.classList.remove("btn-terracotta");
      this.playBtn.classList.add("btn-outline");
    }
  }

  toggleNoiseFilter() {
    this.noiseFilterActive = !this.noiseFilterActive;
    if (this.noiseToggleBtn) {
      if (this.noiseFilterActive) {
        this.noiseToggleBtn.innerHTML = "🛡️ Filtro de Ruido: ACTIVO";
        this.noiseToggleBtn.classList.add("btn-primary");
        this.noiseToggleBtn.classList.remove("btn-outline");
      } else {
        this.noiseToggleBtn.innerHTML = "⚠️ Filtro de Ruido: DESACTIVADO";
        this.noiseToggleBtn.classList.remove("btn-primary");
        this.noiseToggleBtn.classList.add("btn-outline");
      }
    }
  }

  runFullPipelineAnimation() {
    const steps = [1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        document.querySelectorAll(".pipeline-step-box").forEach(b => b.classList.remove("active"));
        const activeBox = document.getElementById(`pipeline-step-${step}`);
        if (activeBox) activeBox.classList.add("active");
        if (step === 4) {
          this.renderStructuredMinute();
        }
      }, (idx + 1) * 400);
    });
  }
}

window.AudioPipelineSimulator = AudioPipelineSimulator;
