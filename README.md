# Praxis Social Iribarren ⭐
### Plataforma de Integración Tecnológica para la Transformación de la Gestión Social y la Emancipación de Familias Vulnerables

**Investigador / Maestrante:** Ing. Edery Javier Rodríguez Alvarado (C.I. V-17859495)  
**Tutor Académico:** Dr. Abel José Pérez Wilke (C.I. V-10844246)  
**Institución:** Universidad Bolivariana de Venezuela (UBV) — Eje Geopolítico Regional Precursor José Leonardo Chirinos (Sede Estado Lara)  
**Programa:** Maestría en Ciencias para el Desarrollo Estratégico (Cohorte VI)  
**Línea de Investigación:** Dominio Tecnológico para el Desarrollo Endógeno  
**Sub-línea:** Soberanía y Desarrollo Tecnológico  
**Paradigma Metodológico:** Marxista Heterodoxo / Dialéctico-Crítico  

---

## 📌 1. Descripción del Proyecto

Esta aplicación web SPA (Single Page Application) ha sido desarrollada para el levantamiento empírico, interpretación dialéctica y visualización analítica de los **5 Instrumentos de Diagnóstico Metodológico** contemplados en la investigación.

Su objetivo es develar y superar la contradicción fundamental entre:
1. El mandato constitucional de protección integral a la familia vulnerable (**Art. 75 y 110 CRBV**, Plan de la Patria 2025-2031).
2. La actual estructura tecnológica e institucional fragmentada en **feudos de información**, plataformas privativas y trámites redundantes en el Municipio Iribarren (Barquisimeto).

---

## 🚀 2. Stack Tecnológico

*   **Frontend SPA:** React 19, Tailwind CSS (arquitectura limpia, minimalista y responsiva).
*   **Visualización de Datos:** Recharts (Gráficos Donut/Pie, Gráficos de Barras, Métricas y Tablas interactivas).
*   **Iconografía y Gráficos:** Lucide-React y SVG minimalista de la **Estrella Roja** (`⭐`).
*   **Backend / API REST:** Google Apps Script (GAS) con métodos `doGet` y `doPost`.
*   **Base de Datos Soberana:** Google Spreadsheets.
    *   **ID de la Hoja Oficial:** `1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec`
    *   Hojas automáticas estructuradas: `Entrevistas`, `GruposFocales`, `MatrizEtnografica`, `AuditoriaSistemas`, `MapeoActores`.
*   **Persistencia Resiliente / Offline:** Memoria Soberana en `localStorage` que garantiza que el levantamiento en campo no se detenga aun sin conectividad a internet.
*   **Despliegue Recomendado:** Vercel conectado vía repositorio de GitHub.

---

## 🧭 3. Estructura y Módulos de la Aplicación

1.  **🏠 Inicio (Contexto de la Investigación):** Banner con los datos del maestrante, tutor y universidad; resumen de la contradicción problema, fundamentos teóricos (Marx, Varsavsky, Freire, Santos, Matus, Chávez) y accesos directos a los instrumentos.
2.  **📝 Módulo de Instrumentos (Formularios Dinámicos):**
    *   *Instrumento 1 (Entrevista en Profundidad):* Dirigido a tomadores de decisiones; evalúa Totalidad Concreta, Contradicción Capital-Trabajo/Burocracia, Mediaciones de Poder, Alienación vs Soberanía y Praxis/Síntesis.
    *   *Instrumento 2 (Grupo Focal):* Diálogo de saberes entre trabajadores sociales, técnicos de sistemas y vocerías comunales (Problematización, Nudos Críticos y Utopía Concreta).
    *   *Instrumento 3 (Matriz Etnográfica):* Observación participante de rituales burocráticos y la propiedad del dato como mecanismo de dominación.
    *   *Instrumento 4 (Auditoría de Sistemas):* Caracterización de plataformas según Software Libre vs Privativo, capacidad de interoperabilidad y contradicción con la Ley de Infogobierno.
    *   *Instrumento 5 (Mapeo de Actores PES):* Metodología de Carlos Matus para correlacionar recursos de poder y posiciones ante la integración.
    *   *Validación Crítica:* Contador de palabras mínimas en tiempo real (evita respuestas vacías "Sí" o "No") y checkbox obligatorio de Consentimiento Informado.
3.  **📊 Analítica Práxica (Dashboard Estadístico):**
    *   Gráfico circular: Porcentaje de sistemas Libres vs. Privativos vs. Mixtos (Instrumento 4).
    *   Gráfico de barras: Correlación de fuerzas de actores ante la integración (Instrumento 5).
    *   Gráfico de barras: Frecuencia de categorías críticas de observación etnográfica (Instrumento 3).
    *   Tarjetas de KPIs: Total de registros, instituciones auditadas, porcentaje de duplicidad crítica de datos.
    *   Explorador de registros con buscador en tiempo real y exportación en formato JSON.
4.  **🧠 Intérprete Dialéctico:** Motor cualitativo que analiza el lenguaje y los discursos recolectados, genera alertas críticas automáticas y estructura la síntesis dialéctica (Tesis, Antítesis y Síntesis / Negación de la Negación) lista para el Momento III del Trabajo de Grado.
5.  **⚖️ Marco Legal y Ético:** Texto completo de Términos de Uso, Bases Legales venezolanas (CRBV, Ley de Infogobierno, Plan de la Patria 7T, Ley del Poder Popular) y Políticas de Privacidad Soberana.
6.  **📘 Guía del Usuario:** Manual operativo paso a paso.
7.  **⚙️ Configuración / Integración Google Sheets:** Visor de credenciales, comprobador de conectividad (Ping) y visor del script de backend.

---

## 🛠️ 4. Guía de Instalación y Ejecución Local

### Prerrequisitos
*   Node.js (v18 o superior)
*   Git

### Pasos
```bash
# 1. Clonar o ingresar al directorio del proyecto
cd "Web Estrategia Tecnologica"

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo local
npm run dev

# 4. Compilar para producción
npm run build
```

---

## ☁️ 5. Despliegue en Vercel vía GitHub

1.  Crea un nuevo repositorio en tu cuenta de GitHub (ejemplo: `praxis-social-iribarren`).
2.  Sube los archivos del proyecto:
    ```bash
    git init
    git add .
    git commit -m "Inicialización de la Plataforma Praxis Social Iribarren"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/praxis-social-iribarren.git
    git push -u origin main
    ```
3.  Ingresa a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
4.  Haz clic en **«Add New...» > «Project»**, selecciona el repositorio y pulsa **«Deploy»**. Vercel detectará Vite automáticamente y desplegará la aplicación en segundos con certificado SSL gratuito.

---

## 📜 6. Configuración de Google Apps Script (Backend)

1.  Abre el documento de Google Sheets (ID: `1pTxVBSWoSmOH02h9ehrNTJJFAgNpcFlueYckdXxGXec`).
2.  En el menú superior de la hoja de cálculo, ve a: **Extensiones > Apps Script**.
3.  Borra el contenido predeterminado y copia todo el código contenido en el archivo:
    `google-apps-script/Codigo.gs`
4.  Haz clic en el ícono del disquete **Guardar**.
5.  Pulsa el botón azul **Implementar > Nueva implementación**.
6.  En el engranaje ⚙️, selecciona **Aplicación web**.
7.  Configuración obligatoria:
    *   **Descripción:** `API Praxis Social Iribarren v1`
    *   **Ejecutar como:** `Yo (tu correo electrónico)`
    *   **Quién tiene acceso:** `Cualquiera (Anyone)` *(Indispensable para permitir la recepción de datos desde la web)*
8.  Haz clic en **Implementar**, concede los permisos requeridos de Google Drive y copia la URL que termina en `/exec`.
9.  Abre tu aplicación web en el navegador, ve al menú **⚙️ Configuración**, pega la URL y haz clic en **«Probar Conexión (Ping)»** y **«Guardar URL»**.

---

## ⚖️ 7. Licencia y Soberanía

Este proyecto promueve los principios del **Software Libre** y la soberanía tecnológica nacional de la República Bolivariana de Venezuela, en cumplimiento estricto con el Decreto N° 8.950 (Ley de Infogobierno). Todos los datos recolectados resguardan el anonimato de las familias y persiguen fines estrictamente científicos y transformadores de la gestión pública local.
