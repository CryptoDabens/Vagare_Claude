/* =====================================================================
   VAGARE TRAVELS — Registro de leads en Google Sheets
   ---------------------------------------------------------------------
   Este código NO se ejecuta en el sitio web. Se pega en Apps Script
   desde la hoja "vagare_CRM" (Extensiones → Apps Script) y se publica
   como Aplicación web. Ver pasos en README.md → "Formulario y Google Sheets".

   - Escribe en la pestaña "Leads".
   - Acomoda cada dato según el NOMBRE de la columna (fila 1), así que
     puedes reordenar columnas o agregar nuevas sin tocar este código.
   - Si existe una columna "fecha", se llena con la fecha/hora del registro.
   ===================================================================== */

const SHEET_NAME = "Leads";

// Campos que acepta el formulario (deben coincidir con los encabezados de la hoja)
const FIELDS = [
  "nombre", "whatsapp", "correo", "tipo_viaje",
  "viajeros", "destino", "fechas_aprox", "cuentanos_mas",
];

const MAX_LENGTH = 2000; // recorta textos demasiado largos

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot anti-bots: un humano nunca llena este campo oculto
  if (p.website) return respond_({ ok: true });

  // Validación mínima: sin nombre o WhatsApp no se registra
  if (!p.nombre || !p.whatsapp) return respond_({ ok: false, error: "faltan datos" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // evita que dos envíos simultáneos se pisen
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]
      .map(h => String(h).trim().toLowerCase());

    const row = headers.map(h => {
      if (h === "fecha") return new Date();
      if (FIELDS.indexOf(h) === -1) return "";
      return clean_(p[h]);
    });

    sheet.appendRow(row);
    return respond_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/* Limpia el valor:
   - recorta espacios y longitud
   - si empieza con = + - @ le antepone ' para que Sheets lo trate como
     texto (evita que "+52 669..." se interprete como fórmula y que alguien
     inyecte fórmulas desde el formulario) */
function clean_(value) {
  let v = String(value == null ? "" : value).trim().slice(0, MAX_LENGTH);
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
}

function respond_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
