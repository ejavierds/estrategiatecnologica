/**
 * DATOS INICIALES Y CONSTANTES DE CONFIGURACIÓN
 * Proyecto: Estrategia de Integración Tecnológica (Municipio Iribarren)
 * Investigador: Ing. Edery Javier Rodríguez Alvarado
 */

export const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID || "1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec";

export const INSTITUCIONES_IRIBARREN = [
  "Alcaldía Bolivariana de Iribarren - Dirección de Desarrollo Social",
  "Alcaldía Bolivariana de Iribarren - Dirección de Informática y TICs",
  "Instituto Municipal de la Mujer e Igualdad de Género (IMMI)",
  "Gran Misión Hogares de la Patria (Barquisimeto)",
  "Fundación Misión Barrio Adentro (Red Comunal de Salud / ASIC)",
  "Ministerio del Poder Popular para las Comunas - Circuitos Comunales",
  "Gobernación del Estado Lara - Secretaría de Desarrollo Social",
  "Instituto Nacional de Servicios Sociales (INASS Lara)",
  "Movimiento Somos Venezuela (Brigadistas del Municipio Iribarren)",
  "Fundación del Niño Dejando Huellas (Lara)",
  "Otra Institución Pública / Comunal"
];

export const CATEGORIAS_ETNOGRAFICAS = [
  "Alienación sistémica",
  "Hegemonía institucional y burocrática",
  "Propiedad y celo del dato (Feudos de información)",
  "Fetichismo burocrático (Divinización del trámite)",
  "Ecología de saberes negada (Desprecio al saber social/comunal)",
  "Soberanía popular y resistencia emancipadora",
  "Dependencia tecnocrática de plataformas privativas"
];

export const RECURSOS_PODER = [
  "Técnico (Conocimiento en software, redes, bases de datos)",
  "Político (Autoridad formal, capacidad de decisión estatal)",
  "Económico (Control presupuestario y asignación de recursos)",
  "Social / Comunal (Movilización de bases y legitimidad popular)",
  "Mixto (Articulación técnico-política)"
];

export const POSICIONES_INTEGRACION = [
  "A favor (Proactivo / Constructor del Bloque Histórico)",
  "Neutro (Expectante / Indeciso / Sin oposición activa)",
  "En contra (Resistente / Defensor del Feudo Institucional)"
];

export const ARQUITECTURAS_SOFTWARE = [
  "Software Libre / Código Abierto (Conforme Ley de Infogobierno)",
  "Software Privativo / Comercial (Licencia propietaria / Caja negra)",
  "Solución Mixta / Híbrida (Base privativa con parches libres)"
];

export const CAPACIDADES_INTEROPERABILIDAD = [
  "API REST abierta y documentada",
  "Conexión a Base de Datos directa (ODBC / SQL)",
  "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
  "Ninguna (Silo cerrado / Isla informática impenetrable)"
];

export const NIVELES_DUPLICIDAD = [
  "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
  "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
  "Baja (Sólo solicita requerimientos técnicos específicos del programa)",
  "Nula (Interopera de manera federada y soberana)"
];

export const INITIAL_DATA = {
  entrevistas: [
    {
      id_registro: "ENT-0001",
      marca_temporal: "2026-02-15 10:30:00",
      fecha: "2026-02-15",
      institucion: "Alcaldía Bolivariana de Iribarren - Dirección de Desarrollo Social",
      cargo_del_informante: "Directora de Gestión Social Municipal",
      pregunta_1_totalidad_concreta: "Existe una desconexión flagrante. El mandato del artículo 75 de la Constitución nos exige garantizar la máxima felicidad de las familias vulnerables de forma holística, pero cada dirección atiende una tajada aislada: salud en un lado, alimentación en otro y ayudas técnicas por separado. La tecnología actual refleja esa compartimentación burguesa en lugar de la totalidad social.",
      pregunta_2_contradiccion_capital_trabajo_burocracia: "El desgaste del servidor público es descomunal. Nuestros trabajadores sociales pasan hasta un 65% del tiempo llenando fichas en Excel y transcripciones en sistemas paralelos, en vez de estar acompañando en territorio a los consejos comunales. La burocracia técnica se traga el trabajo vivo.",
      pregunta_3_mediaciones_y_poder: "Se percibe un arraigado celo institucional. Cada coordinación asume su base de datos como un coto cerrado o feudo de poder para justificar su cuota de visibilidad política ante instancias superiores, impidiendo el cumplimiento del mandato de interoperabilidad de la Ley de Infogobierno.",
      pregunta_4_alienacion_vs_soberania: "Absolutamente. Las plataformas cerradas reducen a la mujer barquisimetana en vulnerabilidad a una estadística vacía o un código de carnet. Se pierde el rostro humano y la soberanía del dato queda secuestrada por servidores en la nube foránea.",
      pregunta_5_praxis_sintesis: "Emitir un decreto municipal y protocolo vinculante de interoperabilidad única bajo software libre, conformando una mesa de integración dialéctica entre técnicos informáticos, promotores de campo y voceros comunales.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ENT-0002",
      marca_temporal: "2026-02-22 14:15:00",
      fecha: "2026-02-22",
      institucion: "Alcaldía Bolivariana de Iribarren - Dirección de Informática y TICs",
      cargo_del_informante: "Coordinador de Infraestructura y Desarrollo de Software",
      pregunta_1_totalidad_concreta: "Técnicamente cada ministerio y ente descentralizado desarrolló su propio sistema web o base de datos en momentos históricos diferentes, sin ningún estándar común de datos ni esquemas de intercambio federado, quebrando la totalidad técnica del Estado.",
      pregunta_2_contradiccion_capital_trabajo_burocracia: "La duplicidad de consultas satura nuestros enlaces de conectividad y servidores. Si una familia asiste a tres dependencias, se crean tres expedientes digitales discordantes con distintas ortografías y estados socioeconómicos desactualizados.",
      pregunta_3_mediaciones_y_poder: "Existen reticencias al cambio y justificaciones técnicas ambiguas sobre 'seguridad y confidencialidad' para evitar abrir APIs locales. Se utiliza el argumento de seguridad como cortina de humo para no compartir el control de los datos.",
      pregunta_4_alienacion_vs_soberania: "Hemos dependido de soluciones propietarias que nos cobran licenciamiento y niegan el acceso al código. Para alcanzar soberanía real requerimos migrar hacia microservicios y APIs libres auditables por nuestros propios ingenieros venezolanos.",
      pregunta_5_praxis_sintesis: "Implementar un Bus de Integración de Servicios (ESB) comunal de código abierto sustentado en la Ley de Infogobierno, con autenticación federada y expediente social unificado.",
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  grupos_focales: [
    {
      id_registro: "GF-0001",
      marca_temporal: "2026-03-05 09:00:00",
      fecha: "2026-03-05",
      lugar: "Salón de Usos Múltiples, Parroquia Guerrera Ana Soto, Barquisimeto",
      actores_participantes: "Trabajadores Sociales (Alcaldía), Técnicos Informáticos (Gobernación), Voceras de Comunas y Comités de Salud",
      fase_1_problematizacion_inicial: "Consenso unánime: someter a una jefa de hogar vulnerable a peregrinar por 5 oficinas distintas para narrar 5 veces su drama de precariedad constituye una forma de violencia institucional y revictimización que menoscaba la dignidad del pueblo trabajador.",
      fase_2_identificacion_de_nudos_criticos: "Confrontación dialéctica fecunda: mientras el sector informático argumentaba carencia de servidores y conectividad, las trabajadoras sociales y comuneras evidenciaron que el principal escollo es la desconfianza burocrática y el celo de los directores en resguardar 'sus' beneficiarios.",
      fase_3_construccion_de_la_utopia_concreta: "Se proyectó un Sistema Único de Expediente Social Comunal donde el primer punto de registro en el territorio (sea ASIC Barrio Adentro o Consejo Comunal) alimente automáticamente a las demás misiones sin re-pedir recaudos físicos ni planillas.",
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  etnografia: [
    {
      id_registro: "ETN-0001",
      marca_temporal: "2026-03-12 11:20:00",
      fecha: "2026-03-12",
      lugar: "Oficina de Atención al Ciudadano, Barquisimeto Centro",
      categoria_vinculada: "Propiedad y celo del dato (Feudos de información)",
      descripcion_fenomenologica: "Una madre con dos niños en situación de desnutrición presenta constancia médica expedida por el ASIC de Barrio Adentro. El funcionario municipal le indica que dicho informe 'no es válido en nuestro sistema' y que debe acudir a otra sede para abrir una ficha interna nueva.",
      interpretacion_critica: "Se evidencia la fragmentación institucional operando como barrera de exclusión. El sistema computarizado no sirve a la urgencia vital del ser humano, sino que impone la supremacía de la planilla institucional sobre la vida.",
      analisis_del_discurso: "Expresión textual del funcionario: 'Es que el sistema de salud no cruza con el de la Alcaldía, ellos manejan su cuota y nosotros la nuestra'.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ETN-0002",
      marca_temporal: "2026-03-18 15:40:00",
      fecha: "2026-03-18",
      lugar: "Reunión Técnica Interinstitucional de Planificación Social",
      categoria_vinculada: "Hegemonía institucional y burocrática",
      descripcion_fenomenologica: "Al proponerse la unificación de tablas de beneficiarios mediante una base de datos libre comunal, directivos de dos organismos manifestaron reticencia aduciendo que 'podrían perder visibilidad de sus metas operativas anuales'.",
      interpretacion_critica: "El afán de justificación cuantitativa y la competencia interburocrática dentro del aparato estatal niega el carácter de bien común que tiene la información de la Revolución.",
      analisis_del_discurso: "Expresión recurrente: 'Si todos los datos están juntos, ¿cómo demuestro yo en Caracas que este caso lo resolvió mi dirección y no la otra?'.",
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  auditoria: [
    {
      id_registro: "AUD-0001",
      marca_temporal: "2026-02-10 09:15:00",
      sistema_plataforma: "Sistema SIGES Municipal (Gestión de Ayudas)",
      institucion_responsable: "Alcaldía Bolivariana de Iribarren",
      arquitectura: "Software Privativo / Comercial (Licencia propietaria / Caja negra)",
      capacidad_de_interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      duplicidad_de_datos_identificada: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      contradiccion_con_ley_de_infogobierno: "Vulnera abiertamente los artículos 4 y 34 de la Ley de Infogobierno al depender de motor de base de datos privativo sin API pública, impidiendo la interoperabilidad con las Grandes Misiones.",
      observaciones_tecnicas: "Código cerrado contratado en 2018 con proveedor privado. Sin documentación técnica de esquema de datos disponible.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0002",
      marca_temporal: "2026-02-12 11:30:00",
      sistema_plataforma: "Plataforma Patria - Módulo Hogares de la Patria",
      institucion_responsable: "Gran Misión Hogares de la Patria (Barquisimeto)",
      arquitectura: "Solución Mixta / Híbrida (Base privativa con parches libres)",
      capacidad_de_interoperabilidad: "API REST abierta y documentada",
      duplicidad_de_datos_identificada: "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
      contradiccion_con_ley_de_infogobierno: "Cumple con protocolos de soberanía nacional pero no ha descentralizado módulos de consumo bidireccional hacia la instancia municipal.",
      observaciones_tecnicas: "Excelente nivel de consolidación nacional, pero requiere acuerdos de nivel de servicio (SLA) para consultas locales en tiempo real.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0003",
      marca_temporal: "2026-02-16 16:00:00",
      sistema_plataforma: "Registro Comunal en Hojas de Cálculo Descentralizadas",
      institucion_responsable: "Ministerio del Poder Popular para las Comunas - Circuitos Comunales",
      arquitectura: "Software Libre / Código Abierto (Conforme Ley de Infogobierno)",
      capacidad_de_interoperabilidad: "Ninguna (Silo cerrado / Isla informática impenetrable)",
      duplicidad_de_datos_identificada: "Crítica / Muy Alta (Solicita rutinariamente cédula, carga familiar y patologías ya registradas en otros entes)",
      contradiccion_con_ley_de_infogobierno: "Usa LibreOffice pero carece de repositorio centralizado, generando dispersión física en pendrives comunitarios.",
      observaciones_tecnicas: "Alta vocación soberana y comunal pero nula infraestructura de red local.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "AUD-0004",
      marca_temporal: "2026-02-20 14:10:00",
      sistema_plataforma: "Sistema Integrado de Salud Comunal (Barrio Adentro)",
      institucion_responsable: "Fundación Misión Barrio Adentro (Red Comunal de Salud / ASIC)",
      arquitectura: "Software Privativo / Comercial (Licencia propietaria / Caja negra)",
      capacidad_de_interoperabilidad: "Intercambio manual (Hojas de cálculo CSV / Excel dispersas)",
      duplicidad_de_datos_identificada: "Media (Solicita datos socioeconómicos redundantes con ligeras diferencias)",
      contradiccion_con_ley_de_infogobierno: "Incumplimiento del Art. 23 por uso de formatos cerrados en estadísticas sanitarias comunitarias.",
      observaciones_tecnicas: "Requiere migración de bases de datos hacia PostgreSQL y estandarización de FHIR/HL7 bajo software libre.",
      consentimiento_informado: "Sí (Aceptado)"
    }
  ],
  mapeo_actores: [
    {
      id_registro: "ACT-0001",
      marca_temporal: "2026-02-25 10:00:00",
      actor_social_politico: "Directiva de Gestión Social Municipal (Alcaldía Iribarren)",
      recursos_de_poder: "Político (Autoridad formal, capacidad de decisión estatal)",
      interes_principal: "Mejorar la eficacia de atención social y optimizar el presupuesto municipal para ayudas técnicas directas.",
      posicion_ante_la_integracion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      discurso_manifiesto: "'Debemos unificar la data para que ninguna familia quede desatendida y eliminar la tramitología desgastante.'",
      estrategia_de_abordaje: "Involucrarla como patrocinadora política del Decreto Municipal de Interoperabilidad Soberana.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0002",
      marca_temporal: "2026-02-26 11:30:00",
      actor_social_politico: "Equipo Técnico de Informática de la Alcaldía",
      recursos_de_poder: "Técnico (Conocimiento en software, redes, bases de datos)",
      interes_principal: "Evitar sobrecarga laboral, mantener estabilidad de los servidores y evitar responsabilidades sobre fallos ajenos.",
      posicion_ante_la_integracion: "Neutro (Expectante / Indeciso / Sin oposición activa)",
      discurso_manifiesto: "'Estamos de acuerdo en teoría, pero no contamos con suficiente infraestructura ni personal para soportar tantas conexiones.'",
      estrategia_de_abordaje: "Capacitación en arquitecturas libres de microservicios e incentivos técnicos bajo el espíritu de la Ley de Infogobierno.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0003",
      marca_temporal: "2026-02-28 15:00:00",
      actor_social_politico: "Colectivo de Voceros y Voceras de los Circuitos Comunales de Iribarren",
      recursos_de_poder: "Social / Comunal (Movilización de bases y legitimidad popular)",
      interes_principal: "Democratizar la información, ejercer contraloría social y garantizar justicia en la distribución de la protección social.",
      posicion_ante_la_integracion: "A favor (Proactivo / Constructor del Bloque Histórico)",
      discurso_manifiesto: "'El pueblo en la comuna es quien conoce la verdadera necesidad; no podemos ser mendigos de planillas en cada institución.'",
      estrategia_de_abordaje: "Integrarlos como contralores y validadores del expediente social en cada sala de autogobierno comunal.",
      consentimiento_informado: "Sí (Aceptado)"
    },
    {
      id_registro: "ACT-0004",
      marca_temporal: "2026-03-02 16:30:00",
      actor_social_politico: "Proveedores Externos de Software Privativo Heredado",
      recursos_de_poder: "Económico (Control presupuestario y asignación de recursos)",
      interes_principal: "Mantener contratos de mantenimiento y soporte exclusivo de sus licencias cerradas.",
      posicion_ante_la_integracion: "En contra (Resistente / Defensor del Feudo Institucional)",
      discurso_manifiesto: "'La base de datos tiene esquemas patentados y abrirla genera riesgos críticos de seguridad y pérdida de soporte.'",
      estrategia_de_abordaje: "Aplicación estricta de la Ley de Infogobierno (Art. 34) y plan progresivo de sustitución soberana hacia código abierto.",
      consentimiento_informado: "Sí (Aceptado)"
    }
  ]
};
