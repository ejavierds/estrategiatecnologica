/**
 * DATOS INICIALES Y CONSTANTES DE CONFIGURACIÓN
 * Proyecto: Estrategia de Integración Tecnológica (Municipio Iribarren)
 * Investigador: Ing. Edery Javier Rodríguez Alvarado
 */

export const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID || "1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec";

/**
 * Catálogo Oficial de Instituciones del Municipio Iribarren (Ordenado Alfabéticamente)
 */
export const INSTITUCIONES_IRIBARREN = [
  "Alcaldía Bolivariana de Iribarren - Dirección de Desarrollo Social",
  "Alcaldía Bolivariana de Iribarren - Dirección de Informática y TICs",
  "Fundación Misión Barrio Adentro (Red Comunal de Salud / ASIC)",
  "Fundación Nacional El Niño Simón (Lara)",
  "Gobernación del Estado Lara - Secretaría de Desarrollo Social",
  "Gran Misión Hogares de la Patria (Barquisimeto)",
  "Instituto Municipal de Desarrollo Social del municipio Iribarren (IMDES)",
  "Instituto Municipal de la Mujer e Igualdad de Género (IMMI)",
  "Instituto Nacional de Servicios Sociales (INASS Lara)",
  "Ministerio del Poder Popular para las Comunas - Circuitos Comunales",
  "Movimiento Somos Venezuela (Brigadistas del Municipio Iribarren)",
  "Otra Institución Pública / Comunal"
];

/**
 * Categorías Etnográficas del Paradigma Marxista (Ordenadas Alfabéticamente)
 */
export const CATEGORIAS_ETNOGRAFICAS = [
  "Alienación sistémica",
  "Dependencia tecnocrática de plataformas privativas",
  "Ecología de saberes negada (Desprecio al saber social/comunal)",
  "Fetichismo burocrático (Divinización del trámite)",
  "Hegemonía institucional y burocrática",
  "Propiedad y celo del dato (Feudos de información)",
  "Soberanía popular y resistencia emancipadora"
];

/**
 * Recursos de Poder PES - Carlos Matus (Ordenados Alfabéticamente)
 */
export const RECURSOS_PODER = [
  "Económico (Control presupuestario y asignación de recursos)",
  "Mixto (Articulación técnico-política)",
  "Político (Autoridad formal, capacidad de decisión estatal)",
  "Social / Comunal (Movilización de bases y legitimidad popular)",
  "Técnico (Conocimiento en software, redes, bases de datos)"
];

/**
 * Posiciones ante la Integración (Ordenadas Alfabéticamente)
 */
export const POSICIONES_INTEGRACION = [
  "A favor (Proactivo / Constructor del Bloque Histórico)",
  "En contra (Resistente / Defensor del Feudo Institucional)",
  "Neutro (Expectante / Indeciso / Sin oposición activa)"
];

/**
 * Arquitecturas de Software (Ordenadas Alfabéticamente)
 */
export const ARQUITECTURAS_SOFTWARE = [
  "Software Libre / Código Abierto (Conforme Ley de Infogobierno)",
  "Software Privativo / Comercial (Licencia propietaria / Caja negra)",
  "Solución Mixta / Híbrida (Base privativa con parches libres)"
];

/**
 * Capacidades de Interoperabilidad (Ordenadas Alfabéticamente)
 */
export const CAPACIDADES_INTEROPERABILIDAD = [
  "API REST abierta y documentada",
  "Conexión a Base de Datos directa (ODBC / SQL)",
  "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
  "Ninguna (Silo cerrado / Isla informática impenetrable)"
];

/**
 * Niveles de Duplicidad de Datos (Ordenados Alfabéticamente)
 */
export const NIVELES_DUPLICIDAD = [
  "Baja (Sólo solicita requerimientos técnicos específicos del programa)",
  "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
  "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
  "Nula (Interopera de manera federada y soberana)"
];

export const INITIAL_DATA = {
  entrevistas: [
    {
      id_registro: "ENT-0001",
      marca_temporal: "2026-02-15 10:30:00",
      fecha: "2026-02-15",
      institucion: "Alcaldía Bolivariana de Iribarren - Dirección de Desarrollo Social",
      cargo: "Directora de Gestión Social Municipal",
      cargo_del_informante: "Directora de Gestión Social Municipal",
      p1_totalidad: "Existe una desconexión flagrante. El mandato del artículo 75 de la Constitución nos exige garantizar la máxima felicidad de las familias vulnerables de forma holística, pero cada dirección atiende una tajada aislada: salud en un lado, alimentación en otro y ayudas técnicas por separado. La tecnología actual refleja esa compartimentación burguesa en lugar de la totalidad social.",
      pregunta_1_totalidad_concreta: "Existe una desconexión flagrante. El mandato del artículo 75 de la Constitución nos exige garantizar la máxima felicidad de las familias vulnerables de forma holística, pero cada dirección atiende una tajada aislada: salud en un lado, alimentación en otro y ayudas técnicas por separado. La tecnología actual refleja esa compartimentación burguesa en lugar de la totalidad social.",
      p2_contradiccion: "El desgaste del servidor público es descomunal. Nuestros trabajadores sociales pasan hasta un 65% del tiempo llenando fichas en Excel y transcripciones en sistemas paralelos, en vez de estar acompañando en territorio a los consejos comunales. La burocracia técnica se traga el trabajo vivo.",
      pregunta_2_contradiccion_capital_trabajo_burocracia: "El desgaste del servidor público es descomunal. Nuestros trabajadores sociales pasan hasta un 65% del tiempo llenando fichas en Excel y transcripciones en sistemas paralelos, en vez de estar acompañando en territorio a los consejos comunales. La burocracia técnica se traga el trabajo vivo.",
      p3_mediaciones: "Se percibe un arraigado celo institucional. Cada coordinación asume su base de datos como un coto cerrado o feudo de poder para justificar su cuota de visibilidad política ante instancias superiores, impidiendo el cumplimiento del mandato de interoperabilidad de la Ley de Infogobierno.",
      pregunta_3_mediaciones_y_poder: "Se percibe un arraigado celo institucional. Cada coordinación asume su base de datos como un coto cerrado o feudo de poder para justificar su cuota de visibilidad política ante instancias superiores, impidiendo el cumplimiento del mandato de interoperabilidad de la Ley de Infogobierno.",
      p4_alienacion: "Absolutamente. Las plataformas cerradas reducen a la mujer barquisimetana en vulnerabilidad a una estadística vacía o un código de carnet. Se pierde el rostro humano y la soberanía del dato queda secuestrada por servidores en la nube foránea.",
      pregunta_4_alienacion_vs_soberania: "Absolutamente. Las plataformas cerradas reducen a la mujer barquisimetana en vulnerabilidad a una estadística vacía o un código de carnet. Se pierde el rostro humano y la soberanía del dato queda secuestrada por servidores en la nube foránea.",
      p5_praxis: "Emitir un decreto municipal y protocolo vinculante de interoperabilidad única bajo software libre, conformando una mesa de integración dialéctica entre técnicos informáticos, promotores de campo y voceros comunales.",
      pregunta_5_praxis_sintesis: "Emitir un decreto municipal y protocolo vinculante de interoperabilidad única bajo software libre, conformando una mesa de integración dialéctica entre técnicos informáticos, promotores de campo y voceros comunales.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ENT-0002",
      marca_temporal: "2026-02-22 14:15:00",
      fecha: "2026-02-22",
      institucion: "Alcaldía Bolivariana de Iribarren - Dirección de Informática y TICs",
      cargo: "Coordinador de Infraestructura y Desarrollo de Software",
      cargo_del_informante: "Coordinador de Infraestructura y Desarrollo de Software",
      p1_totalidad: "Técnicamente cada ministerio y ente descentralizado desarrolló su propio sistema web o base de datos en momentos históricos diferentes, sin ningún estándar común de datos ni esquemas de intercambio federado, quebrando la totalidad técnica del Estado.",
      pregunta_1_totalidad_concreta: "Técnicamente cada ministerio y ente descentralizado desarrolló su propio sistema web o base de datos en momentos históricos diferentes, sin ningún estándar común de datos ni esquemas de intercambio federado, quebrando la totalidad técnica del Estado.",
      p2_contradiccion: "La duplicidad de consultas satura nuestros enlaces de conectividad y servidores. Si una familia asiste a tres dependencias, se crean tres expedientes digitales discordantes con distintas ortografías y estados socioeconómicos desactualizados.",
      pregunta_2_contradiccion_capital_trabajo_burocracia: "La duplicidad de consultas satura nuestros enlaces de conectividad y servidores. Si una familia asiste a tres dependencias, se crean tres expedientes digitales discordantes con distintas ortografías y estados socioeconómicos desactualizados.",
      p3_mediaciones: "Existen reticencias al cambio y justificaciones técnicas ambiguas sobre 'seguridad y confidencialidad' para evitar abrir APIs locales. Se utiliza el argumento de seguridad como cortina de humo para no compartir el control de los datos.",
      pregunta_3_mediaciones_y_poder: "Existen reticencias al cambio y justificaciones técnicas ambiguas sobre 'seguridad y confidencialidad' para evitar abrir APIs locales. Se utiliza el argumento de seguridad como cortina de humo para no compartir el control de los datos.",
      p4_alienacion: "Hemos dependido de soluciones propietarias que nos cobran licenciamiento y niegan el acceso al código. Para alcanzar soberanía real requerimos migrar hacia microservicios y APIs libres auditables por nuestros propios ingenieros venezolanos.",
      pregunta_4_alienacion_vs_soberania: "Hemos dependido de soluciones propietarias que nos cobran licenciamiento y niegan el acceso al código. Para alcanzar soberanía real requerimos migrar hacia microservicios y APIs libres auditables por nuestros propios ingenieros venezolanos.",
      p5_praxis: "Implementar un Bus de Integración de Servicios (ESB) comunal de código abierto sustentado en la Ley de Infogobierno, con autenticación federada y expediente social unificado.",
      pregunta_5_praxis_sintesis: "Implementar un Bus de Integración de Servicios (ESB) comunal de código abierto sustentado en la Ley de Infogobierno, con autenticación federada y expediente social unificado.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ENT-0003",
      marca_temporal: "2026-02-27 11:00:00",
      fecha: "2026-02-27",
      institucion: "Instituto Municipal de Desarrollo Social del municipio Iribarren (IMDES)",
      cargo: "Coordinador de Atención Social y Donaciones Médicas",
      cargo_del_informante: "Coordinador de Atención Social y Donaciones Médicas",
      p1_totalidad: "El IMDES atiende diariamente a decenas de familias que requieren medicamentos, canastillas o prótesis. Al no existir un expediente unificado con las ASIC ni con la Gobernación, se pierde la visión de conjunto del Estado y se generan asimetrías en la entrega de la protección social.",
      pregunta_1_totalidad_concreta: "El IMDES atiende diariamente a decenas de familias que requieren medicamentos, canastillas o prótesis. Al no existir un expediente unificado con las ASIC ni con la Gobernación, se pierde la visión de conjunto del Estado y se generan asimetrías en la entrega de la protección social.",
      p2_contradiccion: "El trabajo vivo de nuestras trabajadoras sociales se consume revisando carpetas físicas y comprobando facturas repetidas en vez de hacer seguimiento directo en los barrios populares.",
      pregunta_2_contradiccion_capital_trabajo_burocracia: "El trabajo vivo de nuestras trabajadoras sociales se consume revisando carpetas físicas y comprobando facturas repetidas en vez de hacer seguimiento directo en los barrios populares.",
      p3_mediaciones: "El celo burocrático impide que compartamos en tiempo real los inventarios de farmacia comunitaria con las demás instituciones asistenciales.",
      pregunta_3_mediaciones_y_poder: "El celo burocrático impide que compartamos en tiempo real los inventarios de farmacia comunitaria con las demás instituciones asistenciales.",
      p4_alienacion: "El solicitante se ve obligado a peregrinar con fotocopias en mano de oficina en oficina, convirtiéndose en víctima de la fragmentación tecnológica del aparato estatal.",
      pregunta_4_alienacion_vs_soberania: "El solicitante se ve obligado a peregrinar con fotocopias en mano de oficina en oficina, convirtiéndose en víctima de la fragmentación tecnológica del aparato estatal.",
      p5_praxis: "Consolidar una red digital interoperable sustentada en software libre que enlace directamente las salas técnicas del IMDES con los circuitos comunales.",
      pregunta_5_praxis_sintesis: "Consolidar una red digital interoperable sustentada en software libre que enlace directamente las salas técnicas del IMDES con los circuitos comunales.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  grupos_focales: [
    {
      id_registro: "GF-0001",
      marca_temporal: "2026-03-05 09:00:00",
      fecha: "2026-03-05",
      lugar: "Salón de Usos Múltiples, Parroquia Guerrera Ana Soto, Barquisimeto",
      actores: "Trabajadores Sociales (Alcaldía), Técnicos Informáticos (Gobernación), Voceras de Comunas y Comités de Salud",
      actores_participantes: "Trabajadores Sociales (Alcaldía), Técnicos Informáticos (Gobernación), Voceras de Comunas y Comités de Salud",
      fase1_problematizacion: "Consenso unánime: someter a una jefa de hogar vulnerable a peregrinar por 5 oficinas distintas para narrar 5 veces su drama de precariedad constituye una forma de violencia institucional y revictimización que menoscaba la dignidad del pueblo trabajador.",
      fase_1_problematizacion_inicial: "Consenso unánime: someter a una jefa de hogar vulnerable a peregrinar por 5 oficinas distintas para narrar 5 veces su drama de precariedad constituye una forma de violencia institucional y revictimización que menoscaba la dignidad del pueblo trabajador.",
      fase2_nudos_criticos: "Confrontación dialéctica fecunda: mientras el sector informático argumentaba carencia de servidores y conectividad, las trabajadoras sociales y comuneras evidenciaron que el principal escollo es la desconfianza burocrática y el celo de los directores en resguardar 'sus' beneficiarios.",
      fase_2_identificacion_de_nudos_criticos: "Confrontación dialéctica fecunda: mientras el sector informático argumentaba carencia de servidores y conectividad, las trabajadoras sociales y comuneras evidenciaron que el principal escollo es la desconfianza burocrática y el celo de los directores en resguardar 'sus' beneficiarios.",
      fase3_utopia_concreta: "Se proyectó un Sistema Único de Expediente Social Comunal donde el primer punto de registro en el territorio (sea ASIC Barrio Adentro o Consejo Comunal) alimente automáticamente a las demás misiones sin re-pedir recaudos físicos ni planillas.",
      fase_3_construccion_de_la_utopia_concreta: "Se proyectó un Sistema Único de Expediente Social Comunal donde el primer punto de registro en el territorio (sea ASIC Barrio Adentro o Consejo Comunal) alimente automáticamente a las demás misiones sin re-pedir recaudos físicos ni planillas.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  etnografia: [
    {
      id_registro: "ETN-0001",
      marca_temporal: "2026-03-12 11:20:00",
      fecha: "2026-03-12",
      lugar: "Oficina de Atención al Ciudadano, Barquisimeto Centro",
      categoria: "Propiedad y celo del dato (Feudos de información)",
      categoria_vinculada: "Propiedad y celo del dato (Feudos de información)",
      descripcion: "Una madre con dos niños en situación de desnutrición presenta constancia médica expedida por el ASIC de Barrio Adentro. El funcionario municipal le indica que dicho informe 'no es válido en nuestro sistema' y que debe acudir a otra sede para abrir una ficha interna nueva.",
      descripcion_fenomenologica: "Una madre con dos niños en situación de desnutrición presenta constancia médica expedida por el ASIC de Barrio Adentro. El funcionario municipal le indica que dicho informe 'no es válido en nuestro sistema' y que debe acudir a otra sede para abrir una ficha interna nueva.",
      interpretacion: "Se evidencia la fragmentación institucional operando como barrera de exclusión. El sistema computarizado no sirve a la urgencia vital del ser humano, sino que impone la supremacía de la planilla institucional sobre la vida.",
      interpretacion_critica: "Se evidencia la fragmentación institucional operando como barrera de exclusión. El sistema computarizado no sirve a la urgencia vital del ser humano, sino que impone la supremacía de la planilla institucional sobre la vida.",
      notas_discurso: "Expresión textual del funcionario: 'Es que el sistema de salud no cruza con el de la Alcaldía, ellos manejan su cuota y nosotros la nuestra'.",
      analisis_del_discurso: "Expresión textual del funcionario: 'Es que el sistema de salud no cruza con el de la Alcaldía, ellos manejan su cuota y nosotros la nuestra'.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ETN-0002",
      marca_temporal: "2026-03-18 15:40:00",
      fecha: "2026-03-18",
      lugar: "Reunión Técnica Interinstitucional de Planificación Social",
      categoria: "Hegemonía institucional y burocrática",
      categoria_vinculada: "Hegemonía institucional y burocrática",
      descripcion: "Al proponerse la unificación de tablas de beneficiarios mediante una base de datos libre comunal, directivos de dos organismos manifestaron reticencia aduciendo que 'podrían perder visibilidad de sus metas operativas anuales'.",
      descripcion_fenomenologica: "Al proponerse la unificación de tablas de beneficiarios mediante una base de datos libre comunal, directivos de dos organismos manifestaron reticencia aduciendo que 'podrían perder visibilidad de sus metas operativas anuales'.",
      interpretacion: "El afán de justificación cuantitativa y la competencia interburocrática dentro del aparato estatal niega el carácter de bien común que tiene la información de la Revolución.",
      interpretacion_critica: "El afán de justificación cuantitativa y la competencia interburocrática dentro del aparato estatal niega el carácter de bien común que tiene la información de la Revolución.",
      notas_discurso: "Expresión recurrente: 'Si todos los datos están juntos, ¿cómo demuestro yo en Caracas que este caso lo resolvió mi dirección y no la otra?'.",
      analisis_del_discurso: "Expresión recurrente: 'Si todos los datos están juntos, ¿cómo demuestro yo en Caracas que este caso lo resolvió mi dirección y no la otra?'.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  auditoria: [
    {
      id_registro: "AUD-0001",
      marca_temporal: "2026-02-10 09:15:00",
      sistema: "Sistema SIGES Municipal (Gestión de Ayudas)",
      sistema_plataforma: "Sistema SIGES Municipal (Gestión de Ayudas)",
      institucion: "Alcaldía Bolivariana de Iribarren",
      institucion_responsable: "Alcaldía Bolivariana de Iribarren",
      arquitectura: "Software Privativo / Comercial (Licencia propietaria / Caja negra)",
      interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      capacidad_de_interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      duplicidad: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      duplicidad_de_datos_identificada: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      contradiccion_infogobierno: "Vulnera abiertamente los artículos 4 y 34 de la Ley de Infogobierno al depender de motor de base de datos privativo sin API pública, impidiendo la interoperabilidad con las Grandes Misiones.",
      contradiccion_con_ley_de_infogobierno: "Vulnera abiertamente los artículos 4 y 34 de la Ley de Infogobierno al depender de motor de base de datos privativo sin API pública, impidiendo la interoperabilidad con las Grandes Misiones.",
      observaciones: "Código cerrado contratado en 2018 con proveedor privado. Sin documentación técnica de esquema de datos disponible.",
      observaciones_tecnicas: "Código cerrado contratado en 2018 con proveedor privado. Sin documentación técnica de esquema de datos disponible.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0002",
      marca_temporal: "2026-02-12 11:30:00",
      sistema: "Plataforma Patria - Módulo Hogares de la Patria",
      sistema_plataforma: "Plataforma Patria - Módulo Hogares de la Patria",
      institucion: "Gran Misión Hogares de la Patria (Barquisimeto)",
      institucion_responsable: "Gran Misión Hogares de la Patria (Barquisimeto)",
      arquitectura: "Solución Mixta / Híbrida (Base privativa con parches libres)",
      interoperabilidad: "API REST abierta y documentada",
      capacidad_de_interoperabilidad: "API REST abierta y documentada",
      duplicidad: "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
      duplicidad_de_datos_identificada: "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
      contradiccion_infogobierno: "Cumple con protocolos de soberanía nacional pero no ha descentralizado módulos de consumo bidireccional hacia la instancia municipal.",
      contradiccion_con_ley_de_infogobierno: "Cumple con protocolos de soberanía nacional pero no ha descentralizado módulos de consumo bidireccional hacia la instancia municipal.",
      observaciones: "Excelente nivel de consolidación nacional, pero requiere acuerdos de nivel de servicio (SLA) para consultas locales en tiempo real.",
      observaciones_tecnicas: "Excelente nivel de consolidación nacional, pero requiere acuerdos de nivel de servicio (SLA) para consultas locales en tiempo real.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0003",
      marca_temporal: "2026-02-16 16:00:00",
      sistema: "Registro Comunal en Hojas de Cálculo Descentralizadas",
      sistema_plataforma: "Registro Comunal en Hojas de Cálculo Descentralizadas",
      institucion: "Ministerio del Poder Popular para las Comunas - Circuitos Comunales",
      institucion_responsable: "Ministerio del Poder Popular para las Comunas - Circuitos Comunales",
      arquitectura: "Software Libre / Código Abierto (Conforme Ley de Infogobierno)",
      interoperabilidad: "Ninguna (Silo cerrado / Isla informática impenetrable)",
      capacidad_de_interoperabilidad: "Ninguna (Silo cerrado / Isla informática impenetrable)",
      duplicidad: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      duplicidad_de_datos_identificada: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      contradiccion_infogobierno: "Usa LibreOffice pero carece de repositorio centralizado, generando dispersión física en pendrives comunitarios.",
      contradiccion_con_ley_de_infogobierno: "Usa LibreOffice pero carece de repositorio centralizado, generando dispersión física en pendrives comunitarios.",
      observaciones: "Alta vocación soberana y comunal pero nula infraestructura de red local.",
      observaciones_tecnicas: "Alta vocación soberana y comunal pero nula infraestructura de red local.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0004",
      marca_temporal: "2026-02-20 14:10:00",
      sistema: "Sistema Integrado de Salud Comunal (Barrio Adentro)",
      sistema_plataforma: "Sistema Integrado de Salud Comunal (Barrio Adentro)",
      institucion: "Fundación Misión Barrio Adentro (Red Comunal de Salud / ASIC)",
      institucion_responsable: "Fundación Misión Barrio Adentro (Red Comunal de Salud / ASIC)",
      arquitectura: "Software Privativo / Comercial (Licencia propietaria / Caja negra)",
      interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      capacidad_de_interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      duplicidad: "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
      duplicidad_de_datos_identificada: "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
      contradiccion_infogobierno: "Incumplimiento del Art. 23 por uso de formatos cerrados en estadísticas sanitarias comunitarias.",
      contradiccion_con_ley_de_infogobierno: "Incumplimiento del Art. 23 por uso de formatos cerrados en estadísticas sanitarias comunitarias.",
      observaciones: "Requiere migración de bases de datos hacia PostgreSQL y estandarización de FHIR/HL7 bajo software libre.",
      observaciones_tecnicas: "Requiere migración de bases de datos hacia PostgreSQL y estandarización de FHIR/HL7 bajo software libre.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0005",
      marca_temporal: "2026-02-28 10:45:00",
      sistema: "Sistema de Atención Integral y Casos Médicos (IMDES)",
      sistema_plataforma: "Sistema de Atención Integral y Casos Médicos (IMDES)",
      institucion: "Instituto Municipal de Desarrollo Social del municipio Iribarren (IMDES)",
      institucion_responsable: "Instituto Municipal de Desarrollo Social del municipio Iribarren (IMDES)",
      arquitectura: "Solución Mixta / Híbrida (Base privativa con parches libres)",
      interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      capacidad_de_interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      duplicidad: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      duplicidad_de_datos_identificada: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      contradiccion_infogobierno: "Mantiene registro manual de solicitudes de ayudas técnicas y farmacia sin vinculación en tiempo real con el ASIC ni la Dirección de Desarrollo Social.",
      contradiccion_con_ley_de_infogobierno: "Mantiene registro manual de solicitudes de ayudas técnicas y farmacia sin vinculación en tiempo real con el ASIC ni la Dirección de Desarrollo Social.",
      observaciones: "Requiere módulo API de interoperabilidad para cruce automático de beneficiarios vulnerables y erradicar duplicidades.",
      observaciones_tecnicas: "Requiere módulo API de interoperabilidad para cruce automático de beneficiarios vulnerables y erradicar duplicidades.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  mapeo_actores: [
    {
      id_registro: "ACT-0001",
      marca_temporal: "2026-02-25 10:00:00",
      actor: "Directiva de Gestión Social Municipal (Alcaldía Iribarren)",
      actor_social_politico: "Directiva de Gestión Social Municipal (Alcaldía Iribarren)",
      recursos_poder: "Político (Autoridad formal, capacidad de decisión estatal)",
      recursos_de_poder: "Político (Autoridad formal, capacidad de decisión estatal)",
      interes: "Mejorar la eficacia de atención social y optimizar el presupuesto municipal para ayudas técnicas directas.",
      interes_principal: "Mejorar la eficacia de atención social y optimizar el presupuesto municipal para ayudas técnicas directas.",
      posicion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      posicion_ante_la_integracion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      discurso: "'Debemos unificar la data para que ninguna familia quede desatendida y eliminar la tramitología desgastante.'",
      discurso_manifiesto: "'Debemos unificar la data para que ninguna familia quede desatendida y eliminar la tramitología desgastante.'",
      estrategia_praxis: "Involucrarla como patrocinadora política del Decreto Municipal de Interoperabilidad Soberana.",
      estrategia_de_abordaje: "Involucrarla como patrocinadora política del Decreto Municipal de Interoperabilidad Soberana.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0002",
      marca_temporal: "2026-02-26 11:30:00",
      actor: "Equipo Técnico de Informática de la Alcaldía",
      actor_social_politico: "Equipo Técnico de Informática de la Alcaldía",
      recursos_poder: "Técnico (Conocimiento en software, redes, bases de datos)",
      recursos_de_poder: "Técnico (Conocimiento en software, redes, bases de datos)",
      interes: "Evitar sobrecarga laboral, mantener estabilidad de los servidores y evitar responsabilidades sobre fallos ajenos.",
      interes_principal: "Evitar sobrecarga laboral, mantener estabilidad de los servidores y evitar responsabilidades sobre fallos ajenos.",
      posicion: "Neutro (Expectante / Indeciso / Sin oposición activa)",
      posicion_ante_la_integracion: "Neutro (Expectante / Indeciso / Sin oposición activa)",
      discurso: "'Estamos de acuerdo en teoría, pero no contamos con suficiente infraestructura ni personal para soportar tantas conexiones.'",
      discurso_manifiesto: "'Estamos de acuerdo en teoría, pero no contamos con suficiente infraestructura ni personal para soportar tantas conexiones.'",
      estrategia_praxis: "Capacitación en arquitecturas libres de microservicios e incentivos técnicos bajo el espíritu de la Ley de Infogobierno.",
      estrategia_de_abordaje: "Capacitación en arquitecturas libres de microservicios e incentivos técnicos bajo el espíritu de la Ley de Infogobierno.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0003",
      marca_temporal: "2026-02-28 15:00:00",
      actor: "Colectivo de Voceros y Voceras de los Circuitos Comunales de Iribarren",
      actor_social_politico: "Colectivo de Voceros y Voceras de los Circuitos Comunales de Iribarren",
      recursos_poder: "Social / Comunal (Movilización de bases y legitimidad popular)",
      recursos_de_poder: "Social / Comunal (Movilización de bases y legitimidad popular)",
      interes: "Democratizar la información, ejercer contraloría social y garantizar justicia en la distribución de la protección social.",
      interes_principal: "Democratizar la información, ejercer contraloría social y garantizar justicia en la distribución de la protección social.",
      posicion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      posicion_ante_la_integracion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      discurso: "'El pueblo en la comuna es quien conoce la verdadera necesidad; no podemos ser mendigos de planillas en cada institución.'",
      discurso_manifiesto: "'El pueblo en la comuna es quien conoce la verdadera necesidad; no podemos ser mendigos de planillas en cada institución.'",
      estrategia_praxis: "Integrarlos como contralores y validadores del expediente social en cada sala de autogobierno comunal.",
      estrategia_de_abordaje: "Integrarlos como contralores y validadores del expediente social en cada sala de autogobierno comunal.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0004",
      marca_temporal: "2026-03-02 16:30:00",
      actor: "Proveedores Externos de Software Privativo Heredado",
      actor_social_politico: "Proveedores Externos de Software Privativo Heredado",
      recursos_poder: "Económico (Control presupuestario y asignación de recursos)",
      recursos_de_poder: "Económico (Control presupuestario y asignación de recursos)",
      interes: "Mantener contratos de mantenimiento y soporte exclusivo de sus licencias cerradas.",
      interes_principal: "Mantener contratos de mantenimiento y soporte exclusivo de sus licencias cerradas.",
      posicion: "En contra (Resistente / Defensor del Feudo Institucional)",
      posicion_ante_la_integracion: "En contra (Resistente / Defensor del Feudo Institucional)",
      discurso: "'La base de datos tiene esquemas patentados y abrirla genera riesgos críticos de seguridad y pérdida de soporte.'",
      discurso_manifiesto: "'La base de datos tiene esquemas patentados y abrirla genera riesgos críticos de seguridad y pérdida de soporte.'",
      estrategia_praxis: "Aplicación estricta de la Ley de Infogobierno (Art. 34) y plan progresivo de sustitución soberana hacia código abierto.",
      estrategia_de_abordaje: "Aplicación estricta de la Ley de Infogobierno (Art. 34) y plan progresivo de sustitución soberana hacia código abierto.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0005",
      marca_temporal: "2026-03-04 09:30:00",
      actor: "Directiva del Instituto Municipal de Desarrollo Social (IMDES)",
      actor_social_politico: "Directiva del Instituto Municipal de Desarrollo Social (IMDES)",
      recursos_poder: "Político (Autoridad formal, capacidad de decisión estatal)",
      recursos_de_poder: "Político (Autoridad formal, capacidad de decisión estatal)",
      interes: "Atender con celeridad casos de salud, canastillas y ayudas técnicas de familias de escasos recursos en las 10 parroquias de Iribarren.",
      interes_principal: "Atender con celeridad casos de salud, canastillas y ayudas técnicas de familias de escasos recursos en las 10 parroquias de Iribarren.",
      posicion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      posicion_ante_la_integracion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      discurso: "'La integración de datos nos evitará duplicar ayudas a un mismo solicitante mientras otras familias quedan desprovistas.'",
      discurso_manifiesto: "'La integración de datos nos evitará duplicar ayudas a un mismo solicitante mientras otras familias quedan desprovistas.'",
      estrategia_praxis: "Vincular el módulo de farmacia y ayudas de IMDES al Sistema Único de Registro Social Comunal.",
      estrategia_de_abordaje: "Vincular el módulo de farmacia y ayudas de IMDES al Sistema Único de Registro Social Comunal.",
      consentimiento: true,
      consentimiento_informado: "Sí (Aceptado)"
    }
  ]
};
