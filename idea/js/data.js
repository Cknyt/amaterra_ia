/**
 * AMATERRA CONSULTORÍA AGROSOCIAL - DATASET & FRAMEWORK SPECIFICATION
 * Version: 1.0.0
 */

const AMATERRA_DATA = {
  metadata: {
    organization: "Amaterra Consultoría Agrosocial",
    project: "Plan de Adopción y Gobernanza de Inteligencia Artificial",
    version: "1.0.0-FullSpec",
    leadMethodology: "Neus (Metodología)",
    leadGovernanceIT: "IT & Digital Strategy",
    targetAudience: ["Equipo Técnico", "Dirección", "Clientes Institucionales"]
  },

  goldenRule: {
    statement: "La IA realiza trabajo auxiliar; la autoría, el criterio técnico y la responsabilidad profesional son 100% humanas.",
    mandate: "Ningún informe, diagnóstico, acta o propuesta se envía a un cliente o administración sin haber sido validado y contrastado por la/el técnico responsable."
  },

  maturityLevels: [
    {
      level: 1,
      name: "Asistente",
      color: "green",
      badge: "Autonomía",
      focus: "Autonomía personal y tareas cotidianas",
      autonomy: "Total: Decisión individual bajo responsabilidad propia.",
      useCases: "Redacción de emails, traducciones, resúmenes rápidos, superación del bloqueo del folio en blanco.",
      interaction: "Chat directo libre en cuenta corporativa aprobada.",
      icon: "message-square",
      rule: "Uso libre individual sin necesidad de validación previa de plantilla por IT."
    },
    {
      level: 2,
      name: "Copiloto",
      color: "amber",
      badge: "Metodología",
      focus: "Metodología compartida (ADN Amaterra)",
      autonomy: "Guiada: Basada en plantillas, rúbricas de calidad y asistentes validados.",
      useCases: "Informes técnicos, diagnósticos agrosociales, propuestas de consultoría, análisis de pliegos y normativas.",
      interaction: "Espacios de trabajo dedicados con prompts maestros y guías editoriales comunes.",
      icon: "cpu",
      rule: "Obligatorio aplicar las pautas del Estilo Amaterriense antes del envío a revisión interna."
    },
    {
      level: 3,
      name: "Sistema",
      color: "red",
      badge: "Automatizaciones",
      focus: "Procesos técnicos automatizados",
      autonomy: "Supervisada: IT gestiona la infraestructura técnica; el técnico valida y ajusta el entregable.",
      useCases: "Pipeline de visitas de campo (audio .mp3 en finca ➔ borrador de acta maquetada estructurada).",
      interaction: "El técnico solo interactúa con la entrada de datos (audio/notas) y la salida final para firmar.",
      icon: "workflow",
      rule: "Infraestructura corporativa centralizada con auditoría de seguridad y retención cero de datos."
    }
  ],

  documentLayers: [
    {
      layer: 1,
      title: "Capa 1: Contenido",
      author: "100% Humano",
      type: "human",
      color: "terracotta",
      description: "Datos de clientes, entrevistas de campo, aforos de agua, conteos de plagas y fuentes empíricas reales.",
      keyPrinciple: "La IA jamás inventa un dato de campo ni puede pisar la tierra."
    },
    {
      layer: 2,
      title: "Capa 2: Razonamiento",
      author: "Colaborativo (Revisión Crítica IA)",
      type: "collaborative",
      color: "amber",
      description: "Control de calidad argumental: detectar contradicciones, huecos en las conclusiones y verificar que las propuestas se basan en datos reales.",
      keyPrinciple: "La IA actúa como un segundo par de ojos que pone a prueba la lógica técnica antes de entregar el documento."
    },
    {
      layer: 3,
      title: "Capa 3: Comunicación",
      author: "Facilitador IA",
      type: "ai-assisted",
      color: "emerald",
      description: "Estructura narrativa, síntesis ejecutiva, claridad expositiva y adaptación de registro al destinatario (ayuntamiento, cooperativa, CCAA).",
      keyPrinciple: "Alinea el tono con la identidad institucional sin caer en palabrería vacía."
    }
  ],

  rubricCriteria: [
    {
      id: 1,
      title: "Propósito visible",
      question: "¿Se comprende en los primeros 2 párrafos para qué existe el documento y qué decisión facilita?",
      target: "Claridad ejecutiva",
      failSignal: "Introducciones históricas interminables o diagnósticos sin objeto de decisión claro."
    },
    {
      id: 2,
      title: "Separación Hecho / Interpretación / Recomendación",
      question: "¿Están claramente delimitados los datos objetivos observados, el análisis técnico y las propuestas de actuación?",
      target: "Rigor epistémico",
      failSignal: "Confundir una observación de campo con una conclusión no contrastada o juicio de valor."
    },
    {
      id: 3,
      title: "Adaptación contextual al destinatario",
      question: "¿El registro y enfoque responde exactamente a las necesidades de la entidad destinataria?",
      target: "Perfil receptor",
      failSignal: "Lenguaje excesivamente críptico para un consistorio rural o falta de rigor legal para una CCAA."
    },
    {
      id: 4,
      title: "Fundamentación de conclusiones",
      question: "¿Cada conclusión técnica está respaldada por datos medibles expuestos en el texto?",
      target: "Solidez lógica",
      failSignal: "Uso de muletillas vacías como 'es evidente que', 'como es bien sabido' o 'obviamente'."
    },
    {
      id: 5,
      title: "Recomendaciones accionables (5W+1H)",
      question: "¿Las propuestas definen con precisión Qué, Quién, Cuándo y con Qué Recursos actuar?",
      target: "Operatividad real",
      failSignal: "Recomendaciones genéricas como 'se aconseja fomentar la sostenibilidad y el diálogo'."
    },
    {
      id: 6,
      title: "Tono pegado a la realidad territorial",
      question: "¿El informe suena profesional pero a la vez cercano a la realidad social y agronómica del campo?",
      target: "Identidad y cercanía territorial",
      failSignal: "Textos fríos, genéricos o descontextualizados que parecen redactados por una consultora lejana sin pisar el terreno."
    }
  ],

  sampleDocuments: [
    {
      id: "perfect",
      title: "Caso de Éxito: Diagnóstico de Modernización de Riego - Valle del Jalón",
      targetAudience: "Comunidad de Regantes y Concejalía de Agricultura",
      content: `1. OBJETO Y PROPÓSITO DEL DIAGNÓSTICO
El presente informe evalúa la viabilidad técnica y agronómica de la sectorización de riego por goteo en 140 ha de olivar tradicional en el Valle del Jalón, con el propósito de facilitar la decisión de solicitud de subvención FEADER antes del 30 de noviembre.

2. HECHOS Y DATOS OBSERVADOS EN CAMPO
- Parcela piloto A (Polígono 12, Parcelas 45-48): Suelo franco-arcilloso con pendiente media del 8%. Caudal actual disponible en cabecera: 18 l/s con conductividad eléctrica de 1.4 dS/m.
- Parcela piloto B: Presencia de obturación en el 22% de los goteros instalados en 2018 por acumulación de carbonatos.

3. INTERPRETACIÓN TÉCNICA
La variabilidad de presión actual (de 1.2 a 3.4 bar entre cotas) genera un coeficiente de uniformidad de riego del 68%, inferior al estándar óptimo del 88%. Ello explica el decaimiento vegetativo heterogéneo observado en las terrazas superiores.

4. RECOMENDACIONES ACCIONABLES
- QUÉ: Instalación de válvulas reguladoras de presión aguas arriba y sustitución por goteros autocompensantes de 2.2 l/h.
- QUIÉN: Empresa instaladora homologada bajo dirección de Amaterra Consultoría.
- CUÁNDO: Ejecución en ventana de parada vegetativa (15 enero - 28 febrero).
- RECURSOS: Presupuesto estimado de 32.400 € amortizable en 3 campañas por ahorro energético.

5. GESTIÓN DE LA INCERTIDUMBRE
Los datos de salinidad corresponden a 3 tomas estivales puntuales. Queda pendiente para la visita de noviembre el análisis de cloruros en hoja para descartar fitotoxicidad acumulada.`
    },
    {
      id: "flawed",
      title: "Borrador con Deficiencias Comunes: Estudio Agroecológico comarcal",
      targetAudience: "Ayuntamiento Rural",
      content: `INTRODUCCIÓN GENERAL
La agricultura tradicional de nuestra comarca ha sido desde tiempos inmemoriales el motor vital del territorio, aunque la despoblación y el cambio climático han generado innumerables problemas que todo el mundo conoce de sobra. Es evidente que los agricultores necesitan un cambio de paradigma hacia la agroecología.

ANÁLISIS DE LA SITUACIÓN
Estuvimos visitando la zona el martes pasado y vimos que los suelos están bastante degradados y compactados. Obviamente el uso intensivo de herbicidas ha destrozado la microbiota y las cubiertas vegetales brillan por su ausencia. Algunos agricultores con los que hablamos nos dijeron que el agua viene con cal y que las cosechas ya no son lo que eran antes. La situación es crítica y no hay tiempo que perder.

CONCLUSIONES Y PROPUESTAS
Hay que apostar firmemente por la biodiversidad y la sostenibilidad ecológica. Se recomienda impartir talleres de concienciación a la población, fomentar la creación de canales cortos de comercialización y pedir a la administración que ayude más al campo. Todos los implicados deben colaborar de forma coordinada para asegurar el futuro del valle.`
    }
  ],

  dataSemaphore: {
    green: {
      color: "green",
      title: "Verde: Libre",
      risk: "Bajo / Nulo",
      types: [
        "Textos públicos y memorias oficiales ya difundidas",
        "Lluvias de ideas y superación de folio en blanco",
        "Normativas públicas, pliegos del BOE / BOJA / DOGC / BOP",
        "Corrección ortotipográfica y traducción de textos generales"
      ],
      rule: "Uso libre en herramientas aprobadas corporativas bajo criterio técnico."
    },
    amber: {
      color: "amber",
      title: "Ámbar: Controlado",
      risk: "Medio (Confidencialidad interna)",
      types: [
        "Borradores técnicos de informes no publicados",
        "Diagnósticos agrosociales y análisis de parcelas de clientes",
        "Notas de campo, transcripciones de entrevistas y actas",
        "Metodologías propias y plantillas de trabajo de Amaterra"
      ],
      rule: "Exclusivamente en entorno corporativo oficial (ChatGPT Team / Claude Team con Zero Data Retention) + Revisión humana obligatoria."
    },
    red: {
      color: "red",
      title: "Rojo: Restringido",
      risk: "Crítico (RGPD / Legal)",
      types: [
        "Datos de carácter personal de terceros (DNI, nombres en quejas, teléfonos)",
        "Cuentas bancarias, estados contables privados y contratos no públicos",
        "Credenciales, contraseñas, claves API o accesos a servidores",
        "Información bajo estricto secreto de sumario o confidencialidad contractual"
      ],
      rule: "Prohibido en herramientas abiertas. Requiere protocolo estricto de anonimización previa supervisado por IT."
    }
  },

  audioPipelineScenarios: [
    {
      id: "finca-olivar",
      title: "Visita Técnica Finca Olivar de Montaña (Álava / Araba)",
      location: "Rioja Alavesa",
      duration: "01:14:20",
      audioFileSim: "audio_finca_olivar_20260815.mp3",
      languages: "Bilingüe (Euskera 35% / Castellano 65%)",
      noiseLevel: "Ruido de viento y tractor Ebro al ralentí",
      rawSnippet: "«...hemen, parcela honetan, ikusten dugu verticilosis sintomak... mira Neus, en esta hilera de cornicabra el repilo plomizo está pegando fuerte por la humedad de la vaguada. Parcela 14 polígono 3. El agricultor nos dice que aplicó oxicloruro de cobre a 300g/hl hace dos semanas pero se le lavó con la tormenta. Hay que meter trifloxistrobina o buscar alternativa ecológica con Bacillus subtilis antes de floración... Begiratu lurra, muy compactado por el pase de grada...»",
      detectedEntities: {
        parcelas: ["Polígono 3, Parcela 14 (Cornicabra)"],
        plagas_patogenos: ["Verticilosis", "Repilo plomizo (Pseudocercospora cladosporioides)"],
        materias_activas: ["Oxicloruro de cobre", "Bacillus subtilis", "Trifloxistrobina"],
        suelo_riego: ["Suelo compactado por laboreo excesivo", "Lavado por escorrentía tras tormenta"]
      },
      structuredMinute: {
        actaId: "ACTA-2026-088-OLV",
        fecha: "15 de Agosto de 2026",
        finca: "Finca Valdelasfuentes - Parcela 14",
        responsable: "Neus / Técnico de Campo Amaterra",
        hechos_observados: [
          "Presencia de defoliación apical y manchas cloróticas en haz foliar (incidencia estimada: 28% en Cornicabra).",
          "Tratamiento previo con cobre lavado por lluvia torrencial de 42 mm el 03/08.",
          "Compactación superficial notable en los primeros 15 cm de horizonte A por pase reiterado de grada de discos."
        ],
        interpretacion_tecnica: [
          "Microclima de vaguada con HR > 85% favorece esporulación de repilo plomizo.",
          "La pérdida de cubierta vegetal viva ha acelerado la costra y reducido la infiltración."
        ],
        plan_accion: [
          { accion: "Tratamiento de choque biofungicida", producto: "Bacillus subtilis cepa QST 713", dosis: "4 kg/ha", plazo: "Inmediato (antes de 72h)" },
          { accion: "Implantación de cubierta vegetal sembrada", especie: "Gramíneas + Leguminosas (Avena strigosa + Vicia sativa)", plazo: "Octubre 2026" },
          { accion: "Seguimiento en campo", responsable: "Equipo Técnico Amaterra", plazo: "Revisión 10 septiembre" }
        ]
      }
    },
    {
      id: "cooperativa-fruta",
      title: "Reunión de Mesa de Trabajo: Cooperativa de Fruta Dulce (Lleida)",
      location: "Baix Segre",
      duration: "00:52:10",
      audioFileSim: "audio_mesa_coop_20260818.mp3",
      languages: "Bilingüe (Catalán 50% / Castellano 50%)",
      noiseLevel: "Eco en sala de juntas y cruce de voces simultáneas",
      rawSnippet: "«...el tema dels aforaments d'aigua amb el canal d'Urgell està molt fotut aquest estiu... si ens retallen la dotació a 3.000 m3/ha, el presseguer tardà de la varietat Tardibelle no aguantarà el calibre comercial. Proposem fer reg deficitari controlat (RDC) a la fase II de creixement del fruit... El tècnic de la conselleria va dir que hi ha ajuts de la PAC per a sensors d'humitat de sòl tipus FDR a 30 i 60 cm...»",
      detectedEntities: {
        parcelas: ["Sector 4 Canal d'Urgell - Variedad Tardibelle"],
        plagas_patogenos: ["Estrés hídrico estival"],
        materias_activas: ["Sondas capacitivas FDR multinivel"],
        suelo_riego: ["Regadío Deficitario Controlado (RDC)", "Restricción a 3.000 m³/ha"]
      },
      structuredMinute: {
        actaId: "ACTA-2026-094-FRU",
        fecha: "18 de Agosto de 2026",
        finca: "SAT Fructícola del Segre - Sector 4",
        responsable: "Equipo de Consultoría Agrosocial Amaterra",
        hechos_observados: [
          "Restricción de dotación hídrica a 3.000 m³/ha impuesta por la junta de explotación.",
          "Variedad sensible en fase crítica de engorde de fruto (Tardibelle en pie GF-677)."
        ],
        interpretacion_tecnica: [
          "El manejo hídrico tradicional provocará pérdida del 35% del destrío por falta de calibre.",
          "La estrategia de Regadío Deficitario Controlado (RDC) permite preservar el calibre comercial concentrando los riegos en la Fase III."
        ],
        plan_accion: [
          { accion: "Instalación de 6 sondas FDR capacitivas continuas a 30/60 cm", producto: "Telemetría LoRaWAN", dosis: "1 por sector de riego", plazo: "25 Agosto" },
          { accion: "Tramitación de ayuda de modernización PAC ecorrégimen", responsable: "Amaterra IT & Ayudas", plazo: "Antes de 15 Septiembre" }
        ]
      }
    }
  ],

  roles: [
    {
      id: "neus",
      title: "Neus (Metodología)",
      tag: "Criterio y Calidad Editorial",
      avatarText: "N",
      responsibilities: [
        "Definición y custodia del Criterio de Calidad de Amaterra.",
        "Validación de modelos, rúbricas y prompts maestros.",
        "Supervisión editorial y contraste metodológico en casos complejos.",
        "Formación y acompañamiento al equipo técnico."
      ]
    },
    {
      id: "tecnicos",
      title: "Técnicos de Campo",
      tag: "Validación y Criterio Humano",
      avatarText: "T",
      responsibilities: [
        "Uso cotidiano de asistentes en Nivel 1 y copilotos en Nivel 2.",
        "Aportación de datos de campo 100% verídicos y contraste in situ.",
        "Detección de tareas repetitivas y aportación de casos reales.",
        "Autoría legal y firma responsable de los documentos entregables."
      ]
    },
    {
      id: "it",
      title: "IT & Estrategia Digital",
      tag: "Gobernanza y Automatización",
      avatarText: "IT",
      responsibilities: [
        "Gestión del entorno corporativo seguro y contratos de no-entrenamiento.",
        "Desarrollo e integración del pipeline de automatización Nivel 3.",
        "Monitorización de costes, accesos y protocolos de anonimización.",
        "Soporte técnico y mantenimiento de la infraestructura."
      ]
    }
  ],

  agileCycle: [
    {
      step: 1,
      name: "Detección",
      actor: "Técnico de Campo",
      desc: "El técnico detecta una tarea repetitiva y aporta 2 ejemplos reales anonimizados a IT."
    },
    {
      step: 2,
      name: "Co-diseño",
      actor: "IT + Neus",
      desc: "Configuración del prompt maestro, plantilla estructurada o asistente validado."
    },
    {
      step: 3,
      name: "Validación Real",
      actor: "Técnico de Campo",
      desc: "Prueba con casos reales evaluando utilidad, ahorro de tiempo y rigor técnico."
    },
    {
      step: 4,
      name: "Estandarización",
      actor: "Amaterra",
      desc: "Si ahorra tiempo y mantiene la excelencia editorial, se integra en el espacio corporativo común."
    }
  ],

  antiPatterns: [
    {
      bad: "La IA realiza diagnósticos agrosociales automáticos sustituyendo al técnico.",
      good: "La IA es una herramienta de auxilio; el diagnóstico exige pisar el campo y comprender la dinámica comunitaria.",
      icon: "alert-triangle"
    },
    {
      bad: "Se impone un tono robótico o se intenta clonar la forma de hablar de una persona específica.",
      good: "Se estandariza la calidad y el rigor lógico de Amaterra preservando la voz profesional del equipo.",
      icon: "user-x"
    },
    {
      bad: "Reutilización ciega de informes pasados como si fueran moldes infalibles.",
      good: "Los documentos históricos sirven como referencia metodológica, no como generadores automáticos sin filtro.",
      icon: "copy"
    },
    {
      bad: "Dar por válida cualquier salida de la IA sin contraste empírico ni lectura crítica.",
      good: "Todo texto emitido por la IA es considerado un borrador preliminar pendiente de validación 100% humana.",
      icon: "shield-alert"
    }
  ],

  roadmapPhases: [
    {
      num: 1,
      name: "1. Descubrir",
      duration: "Fase 1",
      desc: "Analizar 5-10 documentos técnicos excelentes del archivo histórico de Amaterra para identificar patrones de calidad.",
      status: "Completado"
    },
    {
      num: 2,
      name: "2. Formular",
      duration: "Fase 2",
      desc: "Extraer criterios editoriales, formular las 6 preguntas maestras y diseñar las plantillas Nivel 2.",
      status: "Completado"
    },
    {
      num: 3,
      name: "3. Contrastar",
      duration: "Fase 3",
      desc: "Validar las rúbricas en diferentes tipologías de clientes (ayuntamientos, cooperativas, CCAA y agricultores).",
      status: "En curso"
    },
    {
      num: 4,
      name: "4. Probar IA",
      duration: "Fase 4",
      desc: "Despliegue del entorno corporativo seguro y prueba de los Proyectos 1 y 2 con casos y datos reales.",
      status: "Preparado"
    },
    {
      num: 5,
      name: "5. Evaluar",
      duration: "Fase 5",
      desc: "Medición de tiempos de redacción ahorrados y evaluación cualitativa de satisfacción del equipo.",
      status: "Pendiente"
    },
    {
      num: 6,
      name: "6. Consolidar",
      duration: "Fase 6",
      desc: "Formalización del protocolo definitivo, manual de bienvenida e integración en el flujo operativo diario.",
      status: "Pendiente"
    }
  ],

  workshopQuestions: [
    {
      id: "q1",
      question: "¿En qué tareas mecánicas de redacción perdemos más tiempo?",
      context: "Identificación de cuellos de botella reales en memorias, correos, actas y búsqueda de datos.",
      placeholder: "Ej: Traspasar notas de libreta a formato formal, resumir normativas extensas..."
    },
    {
      id: "q2",
      question: "¿Qué aspectos o decisiones de nuestro trabajo no deberían delegarse jamás a un algoritmo?",
      context: "Límites éticos, criterio agrícola in situ, empatía social y relaciones con la comunidad.",
      placeholder: "Ej: Diagnóstico visual de plagas raras, valoración de conflictos en cooperativas..."
    },
    {
      id: "q3",
      question: "Al redactar un informe, ¿cuáles son los errores o bloqueos más difíciles de corregir?",
      context: "Dificultades en la estructura, mezcla involuntaria de hechos y opiniones, o exceso de tecnicismos.",
      placeholder: "Ej: Enfocar la recomendación práctica, no saber cómo empezar las conclusiones..."
    },
    {
      id: "q4",
      question: "¿Nos parece útil probar estas dos propuestas de proyecto con casos reales antes de tomar decisiones?",
      context: "Compromiso del equipo con la fase de pruebas y aportación de retroalimentación honesta.",
      placeholder: "Ej: Sí, dedicando un tiempo a evaluar las actas generadas..."
    }
  ]
};
