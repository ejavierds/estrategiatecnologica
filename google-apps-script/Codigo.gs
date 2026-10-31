/**
 * =========================================================================================
 * PROYECTO: ESTRATEGIA DE INTEGRACIÓN TECNOLÓGICA PARA LA TRANSFORMACIÓN DE LA GESTIÓN SOCIAL
 * MUNICIPIO IRIBARREN, ESTADO LARA - UNIVERSIDAD BOLIVARIANA DE VENEZUELA (UBV)
 * MAESTRÍA EN CIENCIAS PARA EL DESARROLLO ESTRATÉGICO
 * INVESTIGADOR: ING. EDERY JAVIER RODRÍGUEZ ALVARADO
 * TUTOR: DR. ABEL JOSÉ PÉREZ WILKE
 * =========================================================================================
 * BACKEND API REST: INTEGRACION Y PERSISTENCIA SOBERANA
 * ID DE LA BASE DE DATOS SOBERANA: 1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec
 * =========================================================================================
 */

var SPREADSHEET_ID = "1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec";

// Mapeo de nombres de hojas por instrumento
var SHEET_NAMES = {
  entrevista: "Entrevistas",
  grupo_focal: "GruposFocales",
  etnografia: "MatrizEtnografica",
  auditoria: "AuditoriaSistemas",
  mapeo_actores: "MapeoActores"
};

// Prefijos oficiales estandarizados
var PREFIX_MAP = {
  entrevista: "ENT",
  grupo_focal: "GF",
  etnografia: "ETN",
  auditoria: "AUD",
  mapeo_actores: "ACT"
};

// Encabezados estandarizados para cada instrumento
var SHEET_HEADERS = {
  entrevista: [
    "ID Registro", "Marca Temporal", "Fecha", "Institución", "Cargo del Informante",
    "Pregunta 1: Totalidad Concreta",
    "Pregunta 2: Contradicción Capital-Trabajo/Burocracia",
    "Pregunta 3: Mediaciones y Poder",
    "Pregunta 4: Alienación vs Soberanía",
    "Pregunta 5: Praxis / Síntesis",
    "Consentimiento Informado"
  ],
  grupo_focal: [
    "ID Registro", "Marca Temporal", "Fecha", "Lugar", "Actores Participantes",
    "Fase 1: Problematización Inicial (Dignidad y Trabajo Diario)",
    "Fase 2: Identificación de Nudos Críticos (Saber Técnico vs Social)",
    "Fase 3: Construcción de la Utopía Concreta (Ecosistema Integrado)",
    "Consentimiento Informado"
  ],
  etnografia: [
    "ID Registro", "Marca Temporal", "Fecha", "Lugar / Espacio Observado",
    "Categoría Vinculada", "Descripción Fenomenológica (Lo que ocurre)",
    "Interpretación Crítica (Lo que oculta)", "Análisis del Discurso / Notas",
    "Consentimiento Informado"
  ],
  auditoria: [
    "ID Registro", "Marca Temporal", "Sistema / Plataforma", "Institución Responsable",
    "Arquitectura (Libre / Privativo / Mixto)",
    "Capacidad de Interoperabilidad (API/BD/Manual)",
    "Duplicidad de Datos Identificada",
    "Contradicción con Ley de Infogobierno",
    "Observaciones Técnicas",
    "Consentimiento Informado"
  ],
  mapeo_actores: [
    "ID Registro", "Marca Temporal", "Actor Social / Político",
    "Recursos de Poder (Técnico / Político / Económico / Comunal)",
    "Interés Principal", "Posición ante la Integración (A favor / Neutro / En contra)",
    "Discurso Manifiesto", "Estrategia de Abordaje (Praxis)",
    "Consentimiento Informado"
  ]
};

/**
 * Obtener o inicializar la hoja correspondiente con sus encabezados
 */
function getOrCreateSheet(ss, sheetKey) {
  var sheetName = SHEET_NAMES[sheetKey] || sheetKey;
  var sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = SHEET_HEADERS[sheetKey];
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#DC2626");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
  } else if (sheet.getLastRow() === 0) {
    var headers = SHEET_HEADERS[sheetKey];
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#DC2626");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
  }
  return sheet;
}

/**
 * Helper para responder en JSON con ContentService
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Endpoint GET: Consultar registros y estadísticas
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var action = params.action || "getAll";

    if (action === "ping") {
      return createJsonResponse({
        status: "success",
        message: "API Praxis Social Iribarren operativa y conectada a la Base de Datos Soberana.",
        spreadsheetId: SPREADSHEET_ID,
        timestamp: new Date().toISOString()
      });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (action === "getByInstrument") {
      var instrument = params.instrument || "entrevista";
      var records = readSheetData(ss, instrument);
      return createJsonResponse({
        status: "success",
        instrument: instrument,
        total: records.length,
        data: records
      });
    }

    // Por defecto retorna getAll
    var allData = {};
    for (var key in SHEET_NAMES) {
      allData[key] = readSheetData(ss, key);
    }

    return createJsonResponse({
      status: "success",
      totalInstruments: Object.keys(SHEET_NAMES).length,
      data: allData,
      generatedAt: new Date().toISOString()
    });

  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: err.toString()
    });
  }
}

/**
 * Lee los datos de una hoja y los formatea como array de objetos con claves canónicas y alias
 */
function readSheetData(ss, sheetKey) {
  var sheet = getOrCreateSheet(ss, sheetKey);
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow <= 1 || lastCol === 0) {
    return [];
  }

  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0];
  var rows = [];

  for (var i = 1; i < values.length; i++) {
    var rowObj = {};
    for (var j = 0; j < headers.length; j++) {
      var rawHeader = headers[j].toString();
      var headerKey = rawHeader
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      
      var val = values[i][j];
      rowObj[headerKey] = val;

      // Generar alias directos para asegurar compatibilidad total con la UI
      if (headerKey.indexOf("pregunta_1") === 0) rowObj["p1_totalidad"] = val;
      if (headerKey.indexOf("pregunta_2") === 0) rowObj["p2_contradiccion"] = val;
      if (headerKey.indexOf("pregunta_3") === 0) rowObj["p3_mediaciones"] = val;
      if (headerKey.indexOf("pregunta_4") === 0) rowObj["p4_alienacion"] = val;
      if (headerKey.indexOf("pregunta_5") === 0) rowObj["p5_praxis"] = val;
      if (headerKey.indexOf("cargo") === 0) rowObj["cargo"] = val;
      if (headerKey.indexOf("arquitectura") === 0) rowObj["arquitectura"] = val;
      if (headerKey.indexOf("capacidad_de_interoperabilidad") === 0) rowObj["interoperabilidad"] = val;
      if (headerKey.indexOf("duplicidad") === 0) rowObj["duplicidad"] = val;
      if (headerKey.indexOf("actor") === 0) rowObj["actor"] = val;
      if (headerKey.indexOf("posicion") === 0) rowObj["posicion"] = val;
      if (headerKey.indexOf("recursos_de_poder") === 0) rowObj["recursos_poder"] = val;
      if (headerKey.indexOf("categoria") === 0) rowObj["categoria"] = val;
      if (headerKey.indexOf("descripcion") === 0) rowObj["descripcion"] = val;
      if (headerKey.indexOf("interpretacion") === 0) rowObj["interpretacion"] = val;
      if (headerKey.indexOf("analisis") === 0) rowObj["notas_discurso"] = val;
      if (headerKey.indexOf("actores") === 0) rowObj["actores"] = val;
      if (headerKey.indexOf("sistema") === 0) rowObj["sistema"] = val;
      if (headerKey.indexOf("institucion") === 0) rowObj["institucion"] = val;
    }
    rows.push(rowObj);
  }
  return rows;
}

/**
 * Endpoint POST: Inserción de nuevos diagnósticos de instrumentos
 */
function doPost(e) {
  try {
    var rawContents = e.postData ? e.postData.contents : null;
    if (!rawContents) {
      return createJsonResponse({
        status: "error",
        message: "No se recibieron datos en el cuerpo de la petición."
      });
    }

    var payload = JSON.parse(rawContents);
    var instrument = payload.instrument;

    if (!instrument || !SHEET_NAMES[instrument]) {
      return createJsonResponse({
        status: "error",
        message: "Instrumento no válido o no especificado: " + instrument
      });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = getOrCreateSheet(ss, instrument);

    var now = new Date();
    var timestampStr = Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd HH:mm:ss");
    var prefix = PREFIX_MAP[instrument] || instrument.substring(0, 3).toUpperCase();
    var nextRowId = prefix + "-" + Utilities.formatString("%04d", sheet.getLastRow());

    var rowToAppend = [];

    switch (instrument) {
      case "entrevista":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.fecha || Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd"),
          payload.institucion || "",
          payload.cargo || payload.cargo_del_informante || "",
          payload.p1_totalidad || payload.pregunta_1_totalidad_concreta || "",
          payload.p2_contradiccion || payload.pregunta_2_contradiccion_capital_trabajo_burocracia || "",
          payload.p3_mediaciones || payload.pregunta_3_mediaciones_y_poder || "",
          payload.p4_alienacion || payload.pregunta_4_alienacion_vs_soberania || "",
          payload.p5_praxis || payload.pregunta_5_praxis_sintesis || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "grupo_focal":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.fecha || Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd"),
          payload.lugar || "",
          payload.actores || payload.actores_participantes || "",
          payload.fase1_problematizacion || payload.fase_1_problematizacion_inicial || "",
          payload.fase2_nudos_criticos || payload.fase_2_identificacion_de_nudos_criticos || "",
          payload.fase3_utopia_concreta || payload.fase_3_construccion_de_la_utopia_concreta || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "etnografia":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.fecha || Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd"),
          payload.lugar || "",
          payload.categoria || payload.categoria_vinculada || "",
          payload.descripcion_fenomenologica || payload.descripcion || "",
          payload.interpretacion_critica || payload.interpretacion || "",
          payload.notas_discurso || payload.analisis_del_discurso || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "auditoria":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.sistema || payload.sistema_plataforma || "",
          payload.institucion || payload.institucion_responsable || "",
          payload.arquitectura || "",
          payload.interoperabilidad || payload.capacidad_de_interoperabilidad || "",
          payload.duplicidad || payload.duplicidad_de_datos_identificada || "",
          payload.contradiccion_infogobierno || payload.contradiccion_con_ley_de_infogobierno || "",
          payload.observaciones || payload.observaciones_tecnicas || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "mapeo_actores":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.actor || payload.actor_social_politico || "",
          payload.recursos_poder || payload.recursos_de_poder || "",
          payload.interes || payload.interes_principal || "",
          payload.posicion || payload.posicion_ante_la_integracion || "",
          payload.discurso || payload.discurso_manifiesto || "",
          payload.estrategia_praxis || payload.estrategia_de_abordaje || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;
    }

    sheet.appendRow(rowToAppend);

    return createJsonResponse({
      status: "success",
      message: "Registro almacenado exitosamente en la Base de Datos Soberana institucional.",
      id: nextRowId,
      instrument: instrument,
      timestamp: timestampStr
    });

  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: "Error al procesar registro: " + err.toString()
    });
  }
}
