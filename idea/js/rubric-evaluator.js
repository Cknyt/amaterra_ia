/**
 * AMATERRA CONSULTORÍA AGROSOCIAL - RUBRIC EVALUATOR (NIVEL 2)
 * Motor interactivo de auditoría editorial basado en los 6 criterios maestros de Neus
 */

class RubricEvaluator {
  constructor() {
    this.criteria = AMATERRA_DATA.rubricCriteria;
    this.samples = AMATERRA_DATA.sampleDocuments;
    this.currentText = "";
    this.init();
  }

  init() {
    this.textarea = document.getElementById("rubric-input-text");
    this.sampleSelect = document.getElementById("rubric-sample-select");
    this.checklistContainer = document.getElementById("rubric-checklist-container");
    this.scoreDisplay = document.getElementById("rubric-score-val");
    this.scoreStatus = document.getElementById("rubric-score-status");

    if (this.sampleSelect) {
      this.populateSampleSelector();
      this.sampleSelect.addEventListener("change", (e) => this.handleSampleChange(e.target.value));
    }

    if (this.textarea) {
      this.textarea.addEventListener("input", () => this.evaluate());
    }

    // Initial evaluation with first sample
    if (this.samples && this.samples.length > 0) {
      this.loadSample(this.samples[0].id);
    }
  }

  populateSampleSelector() {
    this.sampleSelect.innerHTML = this.samples
      .map(s => `<option value="${s.id}">${s.title}</option>`)
      .join("");
    this.sampleSelect.innerHTML += `<option value="custom">✏️ Redactar o pegar texto propio...</option>`;
  }

  handleSampleChange(sampleId) {
    if (sampleId === "custom") {
      this.textarea.value = "";
      this.textarea.placeholder = "Pega aquí el borrador de informe técnico para auditarlo con el Estilo Amaterriense...";
      this.evaluate();
    } else {
      this.loadSample(sampleId);
    }
  }

  loadSample(sampleId) {
    const sample = this.samples.find(s => s.id === sampleId);
    if (sample && this.textarea) {
      this.textarea.value = sample.content;
      this.sampleSelect.value = sampleId;
      this.evaluate();
    }
  }

  evaluate() {
    const text = this.textarea ? this.textarea.value : "";
    this.currentText = text;

    if (!text.trim()) {
      this.renderEmptyState();
      return;
    }

    const results = this.criteria.map(criterion => {
      return this.analyzeCriterion(criterion, text);
    });

    const passedCount = results.filter(r => r.status === "passed").length;
    const totalScore = Math.round((passedCount / this.criteria.length) * 100);

    this.renderScore(totalScore, passedCount, this.criteria.length);
    this.renderChecklist(results);
  }

  analyzeCriterion(criterion, text) {
    const lower = text.toLowerCase();
    let status = "warning";
    let message = "";
    let recommendation = "";

    switch(criterion.id) {
      case 1: // Propósito visible
        const firstTwoLines = text.split("\n").slice(0, 4).join(" ").toLowerCase();
        const hasPurpose = firstTwoLines.includes("propósito") || 
                           firstTwoLines.includes("objeto") || 
                           firstTwoLines.includes("evalúa") || 
                           firstTwoLines.includes("facilitar la decisión");
        if (hasPurpose) {
          status = "passed";
          message = "El propósito y la decisión facilitada están claros en los primeros párrafos.";
          recommendation = "Cumple el estándar de inicio ejecutivo de Amaterra.";
        } else {
          status = "failed";
          message = "No se identifica claramente el objetivo de decisión en el arranque del documento.";
          recommendation = "Añade un párrafo inicial que responda: ¿Para qué existe este informe y qué decisión desbloquea?";
        }
        break;

      case 2: // Separación Hecho / Interpretación / Recomendación
        const hasFacts = lower.includes("hecho") || lower.includes("observad") || lower.includes("campo") || lower.includes("parcela");
        const hasInterpretation = lower.includes("interpretaci") || lower.includes("análisis") || lower.includes("explica");
        const hasRecommendations = lower.includes("recomendaci") || lower.includes("propuesta") || lower.includes("actuaci");
        
        if (hasFacts && hasInterpretation && hasRecommendations) {
          status = "passed";
          message = "Estructura nítida con separación entre datos objetivos, análisis y propuestas.";
          recommendation = "Evita la mezcla de opiniones con observaciones cuantitativas.";
        } else {
          status = "warning";
          message = "Los hechos observados y las valoraciones técnicas aparecen mezclados sin secciones diferenciadas.";
          recommendation = "Separa en 3 bloques: 1. Hechos objetivos ➔ 2. Interpretación agronómica ➔ 3. Recomendaciones.";
        }
        break;

      case 3: // Adaptación contextual al destinatario
        const isTechnicalOrFormal = text.length > 250 && (lower.includes("ha") || lower.includes("€") || lower.includes("gotero") || lower.includes("cultivo") || lower.includes("municipio") || lower.includes("comunidad"));
        if (isTechnicalOrFormal) {
          status = "passed";
          message = "Lenguaje contextualizado a las necesidades del receptor (operativo y técnico).";
          recommendation = "Mantiene el registro adecuado sin caer en vaguedades.";
        } else {
          status = "warning";
          message = "El registro parece excesivamente genérico para la tipología del cliente.";
          recommendation = "Ajusta términos a la realidad local (pequeño municipio, cooperativa o administración autonómica).";
        }
        break;

      case 4: // Fundamentación de conclusiones
        const vaguePhrases = ["es evidente", "obviamente", "como todo el mundo sabe", "sobra decir", "sin lugar a dudas"];
        const hasVagueness = vaguePhrases.some(phrase => lower.includes(phrase));
        const hasMetrics = (text.match(/\d+([.,]\d+)?\s*(%|ha|l\/s|bar|m3|kg|€)/gi) || []).length > 2;

        if (!hasVagueness && hasMetrics) {
          status = "passed";
          message = "Conclusiones sólidas fundamentadas en métricas empíricas sin afirmaciones gratuitas.";
          recommendation = "Rigor óptimo verificado.";
        } else if (hasVagueness) {
          status = "failed";
          message = "Detectadas expresiones como 'es evidente' u 'obviamente' que enmascaran falta de datos.";
          recommendation = "Elimina juicios no respaldados y sustitúyelos por mediciones cuantitativas o referencias de campo.";
        } else {
          status = "warning";
          message = "Pocas métricas o datos contrastables para sostener las conclusiones.";
          recommendation = "Incorpora datos concretos de parcelas, aforos o conteos.";
        }
        break;

      case 5: // Recomendaciones accionables (5W+1H)
        const hasWhat = lower.includes("qué:") || lower.includes("accion:") || lower.includes("instalación") || lower.includes("sustitución") || lower.includes("tratamiento");
        const hasWhoWhen = (lower.includes("quién:") || lower.includes("responsable")) && (lower.includes("cuándo:") || lower.includes("plazo"));
        
        if (hasWhat && hasWhoWhen) {
          status = "passed";
          message = "Recomendaciones perfectamente accionables con responsables, plazos y recursos definidos.";
          recommendation = "Cumple la regla de operatividad de Amaterra.";
        } else {
          status = "failed";
          message = "Las recomendaciones son genéricas o carecen de plazos, presupuesto o responsables claros.";
          recommendation = "Estructura cada recomendación con: QUÉ hacer, QUIÉN lo ejecuta, CUÁNDO y con QUÉ RECURSOS.";
        }
        break;

      case 6: // Tono pegado a la realidad territorial
        const hasTerritory = lower.includes("valle") || lower.includes("territorio") || lower.includes("comarca") || lower.includes("comunidad") || lower.includes("local") || lower.includes("finca") || lower.includes("parcela") || lower.includes("campo");
        if (hasTerritory) {
          status = "passed";
          message = "El documento demuestra arraigo territorial y conocimiento directo del contexto real.";
          recommendation = "Mantiene el equilibrio óptimo entre rigor técnico y cercanía a la realidad de la zona.";
        } else {
          status = "warning";
          message = "Tono abstracto o descontextualizado de la realidad sobre el terreno.";
          recommendation = "Aterriza el informe mencionando especificidades territoriales, de cultivo o del contexto de los actores locales.";
        }
        break;
    }

    return {
      criterion,
      status,
      message,
      recommendation
    };
  }

  renderScore(score, passed, total) {
    if (!this.scoreDisplay) return;
    this.scoreDisplay.textContent = `${score}%`;
    
    if (score >= 80) {
      this.scoreDisplay.style.borderColor = "var(--color-emerald)";
      this.scoreDisplay.style.color = "var(--color-emerald)";
      this.scoreStatus.innerHTML = `<span class="badge badge-green">Excelente ADN Amaterra</span> (${passed}/${total} criterios superados)`;
    } else if (score >= 50) {
      this.scoreDisplay.style.borderColor = "var(--color-amber)";
      this.scoreDisplay.style.color = "var(--color-amber)";
      this.scoreStatus.innerHTML = `<span class="badge badge-amber">Requiere Ajustes Editoriales</span> (${passed}/${total} criterios superados)`;
    } else {
      this.scoreDisplay.style.borderColor = "var(--color-crimson)";
      this.scoreDisplay.style.color = "var(--color-crimson)";
      this.scoreStatus.innerHTML = `<span class="badge badge-red">Borrador Insuficiente</span> (${passed}/${total} criterios superados)`;
    }
  }

  renderChecklist(results) {
    if (!this.checklistContainer) return;
    this.checklistContainer.innerHTML = results.map(r => {
      const statusIcon = r.status === "passed" ? "✅" : (r.status === "warning" ? "⚠️" : "❌");
      const statusClass = r.status;
      return `
        <div class="rubric-item-card ${statusClass}">
          <div class="rubric-item-header">
            <span>${statusIcon} ${r.criterion.id}. ${r.criterion.title}</span>
            <span class="badge badge-${r.status === 'passed' ? 'green' : (r.status === 'warning' ? 'amber' : 'red')}">
              ${r.status === 'passed' ? 'Aprobado' : (r.status === 'warning' ? 'Ajustable' : 'Revisar')}
            </span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-main); margin-bottom: 0.25rem;">
            <em>${r.criterion.question}</em>
          </div>
          <div class="rubric-feedback">
            <strong>Diagnóstico:</strong> ${r.message}<br>
            <strong>Pauta Editorial:</strong> ${r.recommendation}
          </div>
        </div>
      `;
    }).join("");
  }

  renderEmptyState() {
    if (this.scoreDisplay) this.scoreDisplay.textContent = "0%";
    if (this.scoreStatus) this.scoreStatus.innerHTML = `<span class="badge">Sin documento cargado</span>`;
    if (this.checklistContainer) {
      this.checklistContainer.innerHTML = `<p style="color: var(--text-faint); padding: 1.5rem; text-align: center;">Escribe o selecciona un caso de ejemplo para ver la auditoría editorial en vivo.</p>`;
    }
  }
}

window.RubricEvaluator = RubricEvaluator;
