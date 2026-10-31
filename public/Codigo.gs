/**
 * =========================================================================================
 * PROYECTO: ESTRATEGIA DE INTEGRACIÓN TECNOLÓGICA PARA LA TRANSFORMACIÓN DE LA GESTIÓN SOCIAL
 * MUNICIPIO IRIBARREN, ESTADO LARA - UNIVERSIDAD BOLIVARIANA DE VENEZUELA (UBV)
 * MAESTRÍA EN CIENCIAS PARA EL DESARROLLO ESTRATÉGICO
 * INVESTIGADOR: ING. EDERY JAVIER RODRÍGUEZ ALVARADO
 * TUTOR: DR. ABEL JOSÉ PÉREZ WILKE
 * =========================================================================================
 * BACKEND API REST: GOOGLE APPS SCRIPT (GAS) CON GOOGLE SPREADSHEETS
 * ID DE LA HOJA DE CÁLCULO: 1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec
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
 * Helper para responder en JSON con CORS habilitado
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Endpoint GET: Consultar registros y estadísticas
 * Parámetros soportados:
 * - action=ping (Prueba de conectividad)
 * - action=getAll (Retorna todos los instrumentos en un solo JSON)
 * - action=getByInstrument&instrument=entrevista|grupo_focal|etnografia|auditoria|mapeo_actores
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var action = params.action || "getAll";

    if (action === "ping") {
      return createJsonResponse({
        status: "success",
        message: "API Praxis Social Iribarren operativa y conectada al Spreadsheet.",
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
 * Lee los datos de una hoja y los formatea como array de objetos
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
      var headerKey = headers[j]
        .toString()
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "_")
        .replace(/^_+|_+$/g, "");
      rowObj[headerKey] = values[i][j];
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
    var prefix = instrument.substring(0, 3).toUpperCase();
    var nextRowId = prefix + "-" + Utilities.formatString("%04d", sheet.getLastRow());

    var rowToAppend = [];

    switch (instrument) {
      case "entrevista":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.fecha || Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd"),
          payload.institucion || "",
          payload.cargo || "",
          payload.p1_totalidad || "",
          payload.p2_contradiccion || "",
          payload.p3_mediaciones || "",
          payload.p4_alienacion || "",
          payload.p5_praxis || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "grupo_focal":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.fecha || Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd"),
          payload.lugar || "",
          payload.actores || "",
          payload.fase1_problematizacion || "",
          payload.fase2_nudos_criticos || "",
          payload.fase3_utopia_concreta || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "etnografia":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.fecha || Utilities.formatDate(now, "America/Caracas", "yyyy-MM-dd"),
          payload.lugar || "",
          payload.categoria || "",
          payload.descripcion_fenomenologica || "",
          payload.interpretacion_critica || "",
          payload.notas_discurso || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "auditoria":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.sistema || "",
          payload.institucion || "",
          payload.arquitectura || "",
          payload.interoperabilidad || "",
          payload.duplicidad || "",
          payload.contradiccion_infogobierno || "",
          payload.observaciones || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;

      case "mapeo_actores":
        rowToAppend = [
          nextRowId,
          timestampStr,
          payload.actor || "",
          payload.recursos_poder || "",
          payload.interes || "",
          payload.posicion || "",
          payload.discurso || "",
          payload.estrategia_praxis || "",
          payload.consentimiento ? "Sí (Aceptado)" : "No"
        ];
        break;
    }

    sheet.appendRow(rowToAppend);

    return createJsonResponse({
      status: "success",
      message: "Registro almacenado exitosamente en el Spreadsheet institucional.",
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
