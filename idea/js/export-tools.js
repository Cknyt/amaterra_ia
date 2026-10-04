/**
 * AMATERRA CONSULTORÍA AGROSOCIAL - EXPORT TOOLS & PRESENTATION CONTROLLER
 */

class ExportTools {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 9;
    this.init();
  }

  init() {
    this.overlay = document.getElementById("presentation-overlay");
    this.slideContent = document.getElementById("presentation-slide-content");
    this.slideCounter = document.getElementById("presentation-slide-num");
  }

  openPresentation() {
    if (!this.overlay) return;
    this.overlay.classList.add("active");
    this.currentSlide = 0;
    this.renderSlide();
    document.body.style.overflow = "hidden";
    if (this.overlay) this.overlay.scrollTop = 0;
  }

  closePresentation() {
    if (!this.overlay) return;
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  restart() {
    this.currentSlide = 0;
    this.renderSlide();
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.renderSlide();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.renderSlide();
    }
  }

  renderSlide() {
    if (!this.slideContent) return;

    // Reset overlay scroll position immediately to prevent stuck-in-the-middle bug on mobile
    if (this.overlay) {
      this.overlay.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // Trigger smooth fade-in motion
    this.slideContent.classList.remove("slide-enter");
    void this.slideContent.offsetWidth; // Force reflow
    this.slideContent.classList.add("slide-enter");

    // Update Counter
    if (this.slideCounter) {
      this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }

    // Update Progress Bar
    const progressBar = document.getElementById("presentation-progress-bar");
    if (progressBar) {
      const progressPercent = ((this.currentSlide + 1) / this.totalSlides) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    switch(this.currentSlide) {
      case 0:
        this.slideContent.innerHTML = `
          <div style="text-align: center; max-width: 950px; margin: 0 auto;">
            <div style="margin-bottom: 1.25rem;">
              <span class="golden-rule-badge" style="font-size: 0.95rem; padding: 0.4rem 1.2rem; box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);">🌱 Marco Estratégico de IA · Amaterra</span>
            </div>
            <h1 style="font-size: 3.2rem; font-weight: 800; line-height: 1.15; margin: 1.25rem 0; color: #ffffff; letter-spacing: -0.02em;">
              Inteligencia Artificial con <span style="background: linear-gradient(135deg, #34d399, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Criterio Humano</span>
            </h1>
            <div style="background: linear-gradient(145deg, rgba(30,63,32,0.65), rgba(18,30,20,0.85)); padding: 2.75rem; border-radius: var(--radius-xl); border: 1px solid rgba(74, 138, 80, 0.45); margin: 2rem 0; box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 30px rgba(16,185,129,0.15);">
              <p style="font-family: var(--font-serif); font-size: 1.85rem; font-style: italic; color: #a7f3d0; line-height: 1.5; margin-bottom: 1.25rem;">
                "${AMATERRA_DATA.goldenRule.statement}"
              </p>
              <div style="height: 1px; width: 60px; background: rgba(74, 138, 80, 0.5); margin: 1.25rem auto;"></div>
              <p style="color: #cbd5e1; font-size: 1.15rem; line-height: 1.6; max-width: 800px; margin: 0 auto;">
                ${AMATERRA_DATA.goldenRule.mandate}
              </p>
            </div>
            <div style="display: flex; justify-content: center; gap: 2.5rem; color: var(--text-muted); font-size: 0.95rem; flex-wrap: wrap;">
              <span style="display: flex; align-items: center; gap: 0.4rem;">🌱 <strong>Metodología:</strong> Neus</span>
              <span style="display: flex; align-items: center; gap: 0.4rem;">🔒 <strong>Gobernanza & Privacidad:</strong> IT</span>
              <span style="display: flex; align-items: center; gap: 0.4rem;">🚜 <strong>Validación:</strong> Equipo Técnico</span>
            </div>
          </div>
        `;
        break;

      case 1:
        this.slideContent.innerHTML = `
          <div style="max-width: 1100px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Modelo de Madurez</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 2rem; color: #ffffff;">Los 3 Niveles de Relación con la IA</h2>
            <div class="grid-3" style="gap: 1.5rem;">
              <div class="card" style="border-top: 5px solid var(--color-emerald); padding: 2rem;">
                <span class="badge badge-green" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">Nivel 1: Asistente</span>
                <h3 style="font-size: 1.4rem; margin: 1rem 0 0.5rem; color: #ffffff;">Autonomía Personal</h3>
                <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.5rem;">Uso cotidiano libre para superar el folio en blanco, redactar emails, traducir y resumir textos rápidos.</p>
                <div style="font-size: 0.82rem; color: #34d399; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; border-top: 1px solid rgba(74, 138, 80, 0.25); padding-top: 0.75rem;">
                  <span>✓</span> Responsabilidad Individual
                </div>
              </div>
              <div class="card" style="border-top: 5px solid var(--color-amber); padding: 2rem;">
                <span class="badge badge-amber" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">Nivel 2: Copiloto</span>
                <h3 style="font-size: 1.4rem; margin: 1rem 0 0.5rem; color: #ffffff;">Metodología (ADN Amaterra)</h3>
                <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.5rem;">Informes técnicos, diagnósticos agrosociales y pliegos basados en el Estilo Amaterriense.</p>
                <div style="font-size: 0.82rem; color: #fbbf24; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; border-top: 1px solid rgba(245, 158, 11, 0.25); padding-top: 0.75rem;">
                  <span>✓</span> Guías Editoriales Comunes
                </div>
              </div>
              <div class="card" style="border-top: 5px solid var(--color-crimson); padding: 2rem;">
                <span class="badge badge-red" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">Nivel 3: Sistema</span>
                <h3 style="font-size: 1.4rem; margin: 1rem 0 0.5rem; color: #ffffff;">Automatizaciones IT</h3>
                <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.5rem;">Soporte técnico y desarrollo de automatizaciones para absorber tareas digitales repetitivas, liberando tiempo al equipo de campo.</p>
                <div style="font-size: 0.82rem; color: #f87171; font-weight: 700; display: flex; align-items: center; gap: 0.4rem; border-top: 1px solid rgba(220, 38, 38, 0.25); padding-top: 0.75rem;">
                  <span>✓</span> Validación Técnica Final
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 2:
        this.slideContent.innerHTML = `
          <div style="max-width: 1050px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Sistema Editorial (Nivel 2)</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 1.75rem; color: #ffffff;">Las 3 Capas del Documento Técnico</h2>
            <div class="layers-visualizer" style="gap: 1.25rem;">
              <div class="doc-layer-box layer-1-human" style="padding: 1.5rem 1.75rem;">
                <div class="doc-layer-header">
                  <span class="doc-layer-title" style="font-size: 1.15rem;">🌱 CAPA 1: CONTENIDO</span>
                  <span class="badge badge-terracotta" style="font-size: 0.85rem;">100% Humano</span>
                </div>
                <p style="font-size: 1rem; color: #f1f5f2; line-height: 1.5;">Datos de clientes, entrevistas de campo y fuentes reales observadas in situ.</p>
              </div>
              <div class="doc-layer-box layer-2-reasoning" style="padding: 1.5rem 1.75rem;">
                <div class="doc-layer-header">
                  <span class="doc-layer-title" style="font-size: 1.15rem;">🔍 CAPA 2: RAZONAMIENTO</span>
                  <span class="badge badge-amber" style="font-size: 0.85rem;">Revisión Crítica (IA)</span>
                </div>
                <p style="font-size: 1rem; color: #f1f5f2; line-height: 1.5;">Control de calidad argumental: detectar contradicciones, huecos en las conclusiones y validar la solidez del informe.</p>
              </div>
              <div class="doc-layer-box layer-3-communication" style="padding: 1.5rem 1.75rem;">
                <div class="doc-layer-header">
                  <span class="doc-layer-title" style="font-size: 1.15rem;">✍️ CAPA 3: COMUNICACIÓN</span>
                  <span class="badge badge-green" style="font-size: 0.85rem;">Facilitador IA</span>
                </div>
                <p style="font-size: 1rem; color: #f1f5f2; line-height: 1.5;">Estructura, adaptación del registro según destinatario (ayuntamiento, cooperativa, CCAA) y claridad expositiva.</p>
              </div>
            </div>
          </div>
        `;
        break;

      case 3:
        this.slideContent.innerHTML = `
          <div style="max-width: 1050px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Criterio de Excelencia · Propuesta Viva</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 1.75rem; color: #ffffff;">Estilo Amaterriense (6 Criterios de Ejemplo)</h2>
            <div class="grid-2" style="gap: 1.25rem;">
              <div class="card" style="padding: 1.25rem 1.5rem;">
                <strong style="color: #a7f3d0; font-size: 1.05rem;">1. Propósito Visible</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.45;">¿Se comprende en los 2 primeros párrafos qué decisión facilita?</p>
              </div>
              <div class="card" style="padding: 1.25rem 1.5rem;">
                <strong style="color: #a7f3d0; font-size: 1.05rem;">2. Separación de Niveles</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.45;">Hechos objetivos observados ➔ Interpretación ➔ Recomendaciones.</p>
              </div>
              <div class="card" style="padding: 1.25rem 1.5rem;">
                <strong style="color: #a7f3d0; font-size: 1.05rem;">3. Adaptación Contextual</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.45;">Ajuste de registro si es para municipio rural, cooperativa o administración.</p>
              </div>
              <div class="card" style="padding: 1.25rem 1.5rem;">
                <strong style="color: #a7f3d0; font-size: 1.05rem;">4. Fundamentación</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.45;">Conclusiones con datos medibles, sin muletillas como "es evidente que".</p>
              </div>
              <div class="card" style="padding: 1.25rem 1.5rem;">
                <strong style="color: #a7f3d0; font-size: 1.05rem;">5. Recomendaciones Accionables</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.45;">Definición precisa: Qué, Quién, Cuándo y con Qué Recursos actuar.</p>
              </div>
              <div class="card" style="padding: 1.25rem 1.5rem;">
                <strong style="color: #a7f3d0; font-size: 1.05rem;">6. Realidad Territorial</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.45;">Tono riguroso pero cercano al territorio y a su realidad agroalimentaria.</p>
              </div>
            </div>
          </div>
        `;
        break;

      case 4:
        this.slideContent.innerHTML = `
          <div style="max-width: 1100px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Flujo de Trabajo (Nivel 2)</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 1.75rem; color: #ffffff;">
              El Ciclo del Estilo Amaterriense en la Práctica
            </h2>
            <div class="grid-4" style="gap: 1.25rem;">
              <div class="card" style="border-top: 4px solid var(--color-amber); padding: 1.5rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚙️</div>
                <strong style="color: #fbbf24; font-size: 1.05rem; display: block; margin-bottom: 0.35rem;">1. Configurar la IA</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                  Se carga el <strong>Estilo Amaterriense</strong>, plantillas oficiales y tono en un asistente corporativo seguro.
                </p>
              </div>
              <div class="card" style="border-top: 4px solid var(--color-terracotta); padding: 1.5rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📝</div>
                <strong style="color: #fb923c; font-size: 1.05rem; display: block; margin-bottom: 0.35rem;">2. Borrador Técnico</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                  El técnico redacta con sus notas de campo, datos observados y primeras conclusiones preliminares.
                </p>
              </div>
              <div class="card" style="border-top: 4px solid var(--color-emerald); padding: 1.5rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">✨</div>
                <strong style="color: #34d399; font-size: 1.05rem; display: block; margin-bottom: 0.35rem;">3. Asistencia & Pulido IA</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                  La IA adapta el registro (ayuntamiento/cooperativa), mejora la claridad y audita la coherencia lógica.
                </p>
              </div>
              <div class="card" style="border-top: 4px solid #38bdf8; padding: 1.5rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🧑‍🌾</div>
                <strong style="color: #38bdf8; font-size: 1.05rem; display: block; margin-bottom: 0.35rem;">4. Validación y Firma</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                  El técnico revisa los cambios, aplica su criterio profesional, valida el entregable y lo firma.
                </p>
              </div>
            </div>
            <div style="margin-top: 1.75rem; text-align: center; background: rgba(30, 63, 32, 0.4); border: 1px solid rgba(74, 138, 80, 0.4); padding: 1rem 1.5rem; border-radius: var(--radius-lg);">
              <p style="color: #a7f3d0; font-size: 1rem; margin: 0; font-weight: 500;">
                💡 <strong>En resumen:</strong> La IA asume el esfuerzo mecánico de redacción y formato; el equipo mantiene el 100% del control y criterio técnico.
              </p>
            </div>
          </div>
        `;
        break;

      case 5:
        this.slideContent.innerHTML = `
          <div style="max-width: 1100px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Gobernanza y Privacidad</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 2rem; color: #ffffff;">El Semáforo de Datos</h2>
            <div class="grid-3" style="gap: 1.5rem;">
              <div class="card semaphore-card green" style="padding: 2rem; border-top: 5px solid #10b981;">
                <div class="semaphore-icon" style="font-size: 2.5rem; margin-bottom: 0.75rem;">🟢</div>
                <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: #ffffff;">Verde: Libre</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.5rem;">Textos públicos, ideas, normativas oficiales, traducción y corrección de estilo.</p>
                <div style="font-weight: 700; color: #34d399; font-size: 0.85rem; border-top: 1px solid rgba(16, 185, 129, 0.25); padding-top: 0.75rem;">Uso libre corporativo</div>
              </div>
              <div class="card semaphore-card amber" style="padding: 2rem; border-top: 5px solid #f59e0b;">
                <div class="semaphore-icon" style="font-size: 2.5rem; margin-bottom: 0.75rem;">🟠</div>
                <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: #ffffff;">Ámbar: Controlado</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.5rem;">Borradores internos, diagnósticos, notas de campo y metodologías.</p>
                <div style="font-weight: 700; color: #fbbf24; font-size: 0.85rem; border-top: 1px solid rgba(245, 158, 11, 0.25); padding-top: 0.75rem;">Entorno Team + No-Entrenamiento</div>
              </div>
              <div class="card semaphore-card red" style="padding: 2rem; border-top: 5px solid #dc2626;">
                <div class="semaphore-icon" style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔴</div>
                <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: #ffffff;">Rojo: Restringido</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.5rem;">Datos protegidos RGPD, cuentas bancarias, contratos y credenciales.</p>
                <div style="font-weight: 700; color: #f87171; font-size: 0.85rem; border-top: 1px solid rgba(220, 38, 38, 0.25); padding-top: 0.75rem;">Prohibido sin Anonimización IT</div>
              </div>
            </div>
          </div>
        `;
        break;

      case 6:
        this.slideContent.innerHTML = `
          <div style="max-width: 1050px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Posibles Proyectos</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 2rem; color: #ffffff;">Propuesta de Dos Proyectos Iniciales</h2>
            <div class="grid-2" style="gap: 1.75rem;">
              <div class="card" style="border-left: 6px solid var(--color-amber); padding: 2rem;">
                <span class="badge badge-amber" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">Proyecto 1</span>
                <h3 style="font-size: 1.4rem; margin: 1rem 0 0.75rem; color: #ffffff;">Sistema Editorial y Metodológico</h3>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">Estandarizar informes con el Estilo Amaterriense, reduciendo tiempos en revisiones y correcciones rutinarias.</p>
              </div>
              <div class="card" style="border-left: 6px solid var(--color-crimson); padding: 2rem;">
                <span class="badge badge-red" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">Proyecto 2</span>
                <h3 style="font-size: 1.4rem; margin: 1rem 0 0.75rem; color: #ffffff;">Generador de Actas desde Audio (.mp3)</h3>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">Convertir audios de visitas de campo en borradores de acta estructurados, resolviendo bilingüismo y facilitando el volcado de datos.</p>
              </div>
            </div>
          </div>
        `;
        break;

      case 7:
        this.slideContent.innerHTML = `
          <div style="max-width: 1050px; margin: 0 auto; width: 100%;">
            <span class="section-tag" style="margin-bottom: 0.75rem; display: inline-block;">Límites Claros</span>
            <h2 style="font-size: 2.75rem; font-weight: 800; margin-bottom: 2rem; color: #ffffff;">Lo que NO es este Plan</h2>
            <div class="grid-2" style="gap: 1.25rem;">
              <div class="antipattern-card" style="padding: 1.25rem 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div class="antipattern-icon" style="font-size: 1.4rem;">❌</div>
                <div>
                  <strong style="color: #fca5a5; font-size: 1.05rem;">No sustituye el diagnóstico</strong>
                  <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.45;">La IA no pisa el campo ni comprende las dinámicas comunitarias reales.</p>
                </div>
              </div>
              <div class="antipattern-card" style="padding: 1.25rem 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div class="antipattern-icon" style="font-size: 1.4rem;">❌</div>
                <div>
                  <strong style="color: #fca5a5; font-size: 1.05rem;">No clona el estilo personal</strong>
                  <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.45;">No impone una forma de escribir individual, sino estándares de calidad y rigor.</p>
                </div>
              </div>
              <div class="antipattern-card" style="padding: 1.25rem 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div class="antipattern-icon" style="font-size: 1.4rem;">❌</div>
                <div>
                  <strong style="color: #fca5a5; font-size: 1.05rem;">No reutiliza textos a ciegas</strong>
                  <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.45;">Los informes anteriores son referencia metodológica, no moldes automáticos.</p>
                </div>
              </div>
              <div class="antipattern-card" style="padding: 1.25rem 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div class="antipattern-icon" style="font-size: 1.4rem;">❌</div>
                <div>
                  <strong style="color: #fca5a5; font-size: 1.05rem;">No da nada por válido por defecto</strong>
                  <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.45;">Toda salida generada por IA es un borrador preliminar que exige validación 100% humana.</p>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 8:
        this.slideContent.innerHTML = `
          <div style="text-align: center; max-width: 950px; margin: 0 auto;">
            <div style="margin-bottom: 1.25rem;">
              <span class="golden-rule-badge" style="font-size: 0.95rem; padding: 0.4rem 1.2rem; box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);">Siguientes Pasos</span>
            </div>
            <h1 style="font-size: 3.2rem; font-weight: 800; line-height: 1.15; margin: 1.25rem 0 1.5rem; color: #ffffff;">
              ¿Dudas, preguntas o <span style="background: linear-gradient(135deg, #34d399, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">impresiones</span>?
            </h1>
            <p style="color: #cbd5e1; font-size: 1.3rem; margin-top: 1rem; line-height: 1.6; max-width: 800px; margin-left: auto; margin-right: auto;">
              Espacio abierto para comentar estas propuestas, resolver inquietudes y definir juntos las prioridades del equipo.
            </p>
            <div style="margin-top: 3rem; display: flex; justify-content: center; gap: 2rem; color: var(--text-muted); font-size: 1rem; flex-wrap: wrap;">
              <span style="background: rgba(18, 30, 20, 0.8); border: 1px solid rgba(74, 138, 80, 0.35); padding: 0.5rem 1.2rem; border-radius: var(--radius-full);">🌱 Criterio 100% Humano</span>
              <span style="background: rgba(18, 30, 20, 0.8); border: 1px solid rgba(74, 138, 80, 0.35); padding: 0.5rem 1.2rem; border-radius: var(--radius-full);">📐 Estilo Amaterriense</span>
              <span style="background: rgba(18, 30, 20, 0.8); border: 1px solid rgba(74, 138, 80, 0.35); padding: 0.5rem 1.2rem; border-radius: var(--radius-full);">🔒 Privacidad</span>
            </div>
          </div>
        `;
        break;
    }
  }
}

window.ExportTools = ExportTools;
