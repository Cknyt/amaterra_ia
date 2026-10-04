/**
 * AMATERRA CONSULTORÍA AGROSOCIAL - DECISION WIZARD
 * Árbol de decisión interactivo paso a paso para el técnico de campo
 */

class DecisionWizard {
  constructor() {
    this.currentStep = "q_red_data";
    this.history = [];
    this.init();
  }

  init() {
    this.container = document.getElementById("decision-wizard-content");
    this.render();
  }

  goTo(stepId) {
    this.history.push(this.currentStep);
    this.currentStep = stepId;
    this.render();
  }

  restart() {
    this.history = [];
    this.currentStep = "q_red_data";
    this.render();
  }

  render() {
    if (!this.container) return;

    switch(this.currentStep) {
      case "q_red_data":
        this.container.innerHTML = `
          <div class="wizard-step-progress">
            <div class="wizard-dot active"></div>
            <div class="wizard-dot"></div>
            <div class="wizard-dot"></div>
          </div>
          <span class="badge badge-red" style="margin-bottom: 1rem;">Paso 1: Seguridad y RGPD</span>
          <h2 class="wizard-question-title">¿Los datos con los que vas a trabajar son de categoría ROJA?</h2>
          <p class="wizard-question-sub">Datos personales de terceros protegidos por RGPD (DNI, quejas nominativas), cuentas bancarias, contratos no públicos o claves.</p>
          
          <div class="wizard-options-grid">
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('q_anonymization')">
              <span style="font-size: 2rem;">🔴</span>
              <strong style="color: var(--text-main);">SÍ, contiene datos restringidos</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Información personal o confidencial protegida</span>
            </button>
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('q_manual_time')">
              <span style="font-size: 2rem;">🟢</span>
              <strong style="color: var(--text-main);">NO, son datos Verdes o Ámbar</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Observaciones agronómicas, normativas, borradores técnicos</span>
            </button>
          </div>
        `;
        break;

      case "q_anonymization":
        this.container.innerHTML = `
          <div class="wizard-step-progress">
            <div class="wizard-dot active"></div>
            <div class="wizard-dot active"></div>
            <div class="wizard-dot"></div>
          </div>
          <span class="badge badge-amber" style="margin-bottom: 1rem;">Paso 1.1: Protocolo de Seguridad</span>
          <h2 class="wizard-question-title">¿Existe un protocolo IT validado de anonimización previo?</h2>
          <p class="wizard-question-sub">Verifica si cuentas con el script o plantilla de ofuscación de nombres, coordenadas sensibles o referencias bancarias.</p>
          
          <div class="wizard-options-grid">
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('res_authorized_anonymized')">
              <span style="font-size: 2rem;">🛡️</span>
              <strong style="color: var(--text-main);">SÍ, anonimizado según protocolo IT</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Datos completamente disociados antes del envío</span>
            </button>
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('res_no_ai_red')">
              <span style="font-size: 2rem;">⛔</span>
              <strong style="color: #f87171;">NO, o no estoy seguro</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Sin protocolo ni autorización previa</span>
            </button>
          </div>
          <button class="btn btn-outline" onclick="AmaterraApp.wizard.restart()" style="margin-top: 1rem;">↩️ Volver al inicio</button>
        `;
        break;

      case "q_manual_time":
        this.container.innerHTML = `
          <div class="wizard-step-progress">
            <div class="wizard-dot active"></div>
            <div class="wizard-dot active"></div>
            <div class="wizard-dot"></div>
          </div>
          <span class="badge badge-green" style="margin-bottom: 1rem;">Paso 2: Eficiencia Real</span>
          <h2 class="wizard-question-title">¿Tardas menos haciéndolo manualmente a mano?</h2>
          <p class="wizard-question-sub">Evalúa si preparar el prompt y verificar la salida tomará más tiempo que redactar directamente.</p>
          
          <div class="wizard-options-grid">
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('res_no_ai_manual')">
              <span style="font-size: 2rem;">⏱️</span>
              <strong style="color: var(--text-main);">SÍ, tardo menos a mano</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Es una nota breve, correo urgente de 2 líneas o dato directo</span>
            </button>
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('q_common_methodology')">
              <span style="font-size: 2rem;">⚡</span>
              <strong style="color: var(--text-main);">NO, la IA me ahorrará tiempo</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Es un texto largo, estructuración o tarea mecánica repetitiva</span>
            </button>
          </div>
          <button class="btn btn-outline" onclick="AmaterraApp.wizard.restart()" style="margin-top: 1rem;">↩️ Volver al inicio</button>
        `;
        break;

      case "q_common_methodology":
        this.container.innerHTML = `
          <div class="wizard-step-progress">
            <div class="wizard-dot active"></div>
            <div class="wizard-dot active"></div>
            <div class="wizard-dot active"></div>
          </div>
          <span class="badge badge-terracotta" style="margin-bottom: 1rem;">Paso 3: Nivel Metodológico</span>
          <h2 class="wizard-question-title">¿Es una tarea repetitiva con metodología común de Amaterra?</h2>
          <p class="wizard-question-sub">¿Afecta a entregables clave como informes, diagnósticos, pliegos o actas estructuradas?</p>
          
          <div class="wizard-options-grid">
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('res_level_2_3')">
              <span style="font-size: 2rem;">📐</span>
              <strong style="color: #fbbf24;">SÍ, responde al ADN Amaterra</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Informes, diagnósticos, pliegos o actas desde audio</span>
            </button>
            <button class="wizard-option-btn" onclick="AmaterraApp.wizard.goTo('res_level_1')">
              <span style="font-size: 2rem;">💬</span>
              <strong style="color: #34d399;">NO, es una necesidad puntual individual</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Redactar un email, traducir, resumir o desbloquear ideas</span>
            </button>
          </div>
          <button class="btn btn-outline" onclick="AmaterraApp.wizard.restart()" style="margin-top: 1rem;">↩️ Volver al inicio</button>
        `;
        break;

      /* Results */
      case "res_no_ai_red":
        this.container.innerHTML = `
          <div class="wizard-result-card" style="border-left: 6px solid var(--color-crimson); background: rgba(220, 38, 38, 0.08);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⛔</div>
            <h3 style="color: #f87171; font-size: 1.35rem; margin-bottom: 0.75rem;">DECISIÓN: NO USAR IA</h3>
            <p style="color: var(--text-main); margin-bottom: 1rem;">
              <strong>Riesgo Crítico de Privacidad (Categoría ROJA):</strong> Está terminantemente prohibido introducir datos personales o protegidos sin protocolo de anonimización aprobado por IT.
            </p>
            <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-md); font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem;">
              <strong>Acción recomendada:</strong> Contacta con IT para anonimizar el conjunto de datos o realiza la tarea sin herramientas de IA.
            </div>
            <button class="btn btn-terracotta" onclick="AmaterraApp.wizard.restart()">🔄 Evaluar otra tarea</button>
          </div>
        `;
        break;

      case "res_no_ai_manual":
        this.container.innerHTML = `
          <div class="wizard-result-card" style="border-left: 6px solid var(--color-amber); background: rgba(245, 158, 11, 0.08);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">✍️</div>
            <h3 style="color: #fbbf24; font-size: 1.35rem; margin-bottom: 0.75rem;">DECISIÓN: NO USAR IA (Eficiencia Manual)</h3>
            <p style="color: var(--text-main); margin-bottom: 1rem;">
              Si tardas menos haciéndolo directamente con tu conocimiento y agilidad profesional, el uso de la IA genera un coste de oportunidad innecesario.
            </p>
            <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-md); font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem;">
              <strong>Principio Amaterra:</strong> La IA solo se utiliza cuando aporta un ahorro real de tiempo o un salto cualitativo evidente.
            </div>
            <button class="btn btn-outline" onclick="AmaterraApp.wizard.restart()">🔄 Evaluar otra tarea</button>
          </div>
        `;
        break;

      case "res_level_1":
        this.container.innerHTML = `
          <div class="wizard-result-card" style="border-left: 6px solid var(--color-emerald); background: rgba(16, 185, 129, 0.08);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🟢</div>
            <h3 style="color: #34d399; font-size: 1.35rem; margin-bottom: 0.75rem;">DECISIÓN: NIVEL 1 - ASISTENTE (Autonomía)</h3>
            <p style="color: var(--text-main); margin-bottom: 1rem;">
              Uso individual libre bajo tu propia responsabilidad técnica en la cuenta corporativa oficial.
            </p>
            <ul style="padding-left: 1.25rem; color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
              <li>Utiliza ChatGPT Team / Claude Team con cuenta corporativa.</li>
              <li>Apto para: Emails, traducciones, resúmenes y superación de folio en blanco.</li>
              <li>No requiere validación previa de IT.</li>
            </ul>
            <button class="btn btn-primary" onclick="AmaterraApp.wizard.restart()">🔄 Evaluar otra tarea</button>
          </div>
        `;
        break;

      case "res_level_2_3":
        this.container.innerHTML = `
          <div class="wizard-result-card" style="border-left: 6px solid var(--color-terracotta); background: rgba(194, 94, 46, 0.08);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🟠 / 🔴</div>
            <h3 style="color: #fb923c; font-size: 1.35rem; margin-bottom: 0.75rem;">DECISIÓN: NIVEL 2 (COPILOTO) / NIVEL 3 (SISTEMA)</h3>
            <p style="color: var(--text-main); margin-bottom: 1rem;">
              Esta tarea debe canalizarse mediante las plantillas validadas, el Estilo Amaterriense o pipelines automatizados de IT.
            </p>
            <div style="background: var(--bg-surface); padding: 1rem; border-radius: var(--radius-md); font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <div><strong>Si es un informe o diagnóstico:</strong> Utiliza el espacio de trabajo con el Estilo Amaterriense.</div>
              <div><strong>Si es un audio de visita de campo:</strong> Carga el archivo en el Pipeline de Actas de IT.</div>
            </div>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <button class="btn btn-terracotta" onclick="AmaterraApp.switchTab('editorial')">📐 Ir al Sistema Editorial</button>
              <button class="btn btn-primary" onclick="AmaterraApp.switchTab('pipeline')">🎙️ Ir al Pipeline de Audio</button>
            </div>
          </div>
        `;
        break;

      case "res_authorized_anonymized":
        this.container.innerHTML = `
          <div class="wizard-result-card" style="border-left: 6px solid #3b82f6; background: rgba(59, 130, 246, 0.08);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛡️</div>
            <h3 style="color: #60a5fa; font-size: 1.35rem; margin-bottom: 0.75rem;">PROCEDER CON AUTORIZACIÓN Y ANONIMIZACIÓN</h3>
            <p style="color: var(--text-main); margin-bottom: 1rem;">
              Puedes continuar siempre que los datos hayan sido procesados mediante el protocolo oficial de ofuscación de IT.
            </p>
            <button class="btn btn-outline" onclick="AmaterraApp.wizard.goTo('q_manual_time')">➡️ Continuar al Paso de Eficiencia</button>
          </div>
        `;
        break;
    }
  }
}

window.DecisionWizard = DecisionWizard;
