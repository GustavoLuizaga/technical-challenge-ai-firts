# Pronóstico del Clima - Bolivia 🇧🇴

Aplicación web interactiva que permite consultar el pronóstico del tiempo en tiempo real y para los próximos 7 días de las **9 capitales departamentales de Bolivia** (Sucre, La Paz, Cochabamba, Oruro, Potosí, Tarija, Santa Cruz de la Sierra, Trinidad y Cobija), complementada con un mapa geográfico interactivo y gráficos de evolución horaria de temperatura y precipitación.

---

## 🚀 Cómo ejecutar el proyecto localmente

### Prerrequisitos
- **Node.js**: versión 18 o superior.
- **Gestor de paquetes**: `pnpm` (recomendado), `npm` o `yarn`.

### Instalación y puesta en marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/GustavoLuizaga/technical-challenge-ai-firts.git
   cd technical-challenge-ai-firts-web
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o bien: npm install
   ```

3. **Variables de entorno:**
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   *Contenido por defecto:*
   ```env
   VITE_API_OPEN_METEO=https://api.open-meteo.com/v1/forecast
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   # o bien: npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

5. **Compilar para producción (opcional):**
   ```bash
   pnpm build
   ```

---

## 🛠️ Tecnologías utilizadas

- **React 19**: Biblioteca base para componentes de interfaz reactivos.
- **Vite 8**: Empaquetador y entorno de desarrollo de alta velocidad.
- **Tailwind CSS v4**: Estilizado basado en clases de utilidad con diseño oscuro y limpio.
- **Recharts**: Renderizado de gráficos interactivos de área para temperatura y precipitación horaria.
- **D3-geo (`d3-geo`)**: Proyecciones geográficas (Mercator) y cálculo de centroides para posicionar y renderizar el mapa vectorial SVG de Bolivia.
- **React Icons (`react-icons/lu`)**: Iconografía consistente basada en Lucide Icons.
- **Google Fonts (Share Tech Mono)**: Tipografía monoespaciada para darle una estética tecnológica clara.

---

## 🌐 API Utilizada y Justificación

Para este proyecto se utilizó **[Open-Meteo API](https://open-meteo.com/)** (`https://api.open-meteo.com/v1/forecast`).

### ¿Por qué elegí Open-Meteo sobre OpenWeather u otras alternativas?

Aunque OpenWeather fue la API sugerida y fué mi primera opcion, decidí utilizar Open-Meteo porque se adapta mejor a los requerimientos del proyecto, durante la integración con OpenWeather, el endpoint de clima actual (`api.openweathermap.org/data/2.5/weather?q=London,uk&APPID={APIKEY}`) no proporcionaba directamente el pronóstico de 7 días requeridO, para obtener este tipo de pronóstico era necesario utilizar otros endpoints de OpenWeather, como One Call 4.0, que actualmente requiere una suscripción específica.

En cambio Open-Meteo permite solicitar directamente el pronóstico diario de 7 días y también datos horarios, sin necesidad de una API Key para el uso previsto en este proyecto. Por ello, consideré que era una alternativa más sencilla y adecuada para cumplir los requerimientos del challenge.

---

## 📐 Principales Decisiones Técnicas

1. **Arquitectura y separación de responsabilidades:**
   - `services/`: Función pura `getWeatherForecastByLatAndLon` encargada exclusivamente del armado de la URL y la petición HTTP (`fetch`).
   - `hooks/`: La lógica de manejo de estado, caché en memoria (`useRef`), control de errores (`try/catch`) y promesas paralelas (`Promise.allSettled`) vive en hooks personalizados (`useWeather` y `useAllCitiesWeather`).
   - `utils/`: Mapeo de códigos WMO a iconos/colores y helpers puros de formateo de fechas locales (`dateHelpers.js`).
   - `components/`: Componentes modulares y reutilizables (`BoliviaMap`, `CityDetail`, `DayCard`, `HourlyChart`, `CardInformation`).

2. **Manejo de errores y resiliencia:**
   - La carga inicial de las 9 ciudades usa `Promise.allSettled`. Si la petición de una ciudad en particular falla, no bloquea ni rompe la visualización de las otras 8; se notifica al usuario con un mensaje amigable en pantalla.
   - En la vista detallada de una ciudad, si la consulta falla se presenta una alerta visual y un botón para volver a la lista general.

3. **Mapa SVG interactivo con cálculo de centroides:**
   - En lugar de usar una imagen estática o incrustar mapas pesados (como Leaflet/Google Maps), se utilizó un GeoJSON vectorial de Bolivia con `d3-geo`.
   - Se calculan los centroides geométricos de cada departamento para situar los marcadores y etiquetas en el centro exacto de cada territorio, asegurando sincronización al hacer clic o pasar el cursor.

4. **Experiencia de usuario (UX) sin scroll forzado:**
   - La pantalla se diseñó para aprovechar la cuadrícula en pantallas de escritorio sin barras de desplazamiento innecesarias, manteniendo la vista de detalle y el mapa accesibles al instante.
   - Vinculación reactiva: al hacer clic en cualquiera de los 7 días de la semana, la tarjeta principal y el gráfico horario actualizan inmediatamente su información.

---

## 🤖 AI Usage

### 1. ¿Qué herramientas de IA utilizaste?
* **Google Antigravity IDE**: Entorno agéntico principal para la iteración, arquitectura, refactorización y resolución de errores, alternando entre modelos como **Claude Sonnet 4.6** y **Gemini 3.7**.
* **Visual Studio Code**: Editor de código complementario integrado con extensiones de IA (**ChatGPT / Luna 5.6**).
* **Figma AI Maker**: Para la exploración conceptual y generación de ideas preliminares de diseño de interfaz de usuario (UI).

### 2. ¿Para qué las utilizaste?
* **Diseño de UI**: Utilicé Figma AI para explorar referencias visuales y maquetar una interfaz temática oscura y moderna.
* **Mapeo de datos meteorológicos**: Para generar el diccionario de traducción de los códigos numéricos WMO de Open-Meteo(revisando antes la documentacion respectiva del API) a condiciones en español con sus respectivos iconos de `react-icons`.
* **Procesamiento geoespacial y gráficos**: Para implementar la proyección Mercator y el cálculo de centroides con `d3-geo` en el mapa vectorial de Bolivia, así como la configuración de áreas y gradientes en los gráficos horarios de `Recharts`.
* **Refactorización modular**: Para desacoplar componentes grandes en submódulos independientes (`DayCard`, `HourlyChart`, `SkeletonCard`) y utilidades puras de fecha (`dateHelpers.js`).
* **Resolución y depuración de errores**: Para diagnosticar rápidamente problemas de compatibilidad de nombres de iconos en `react-icons/lu` y orden de directivas `@import` en Tailwind v4.

### 3. ¿Cómo utilizaste IA durante el desarrollo?
* **Investigación inicial y prototipado**: Tras revisar la documentación de Open-Meteo y OpenWeatherMap, utilicé ChatGPT (Luna 5.6) para explorar ejemplos de consumo del endpoint y consultar enfoques para renderizar un mapa SVG de Bolivia utilizando `d3-geo`.
* **Estructuración y pair-programming agéntico**: Organicé la arquitectura base del proyecto (`services`, `hooks`, `components`, `utils`) y los componentes contenedores principales. Luego, utilicé Google Antigravity en modo pair-programming para definir el sistema de estilos con Tailwind CSS, conectar el flujo de datos reactivo y refactorizar componentes modulares a medida que iteraba en las funcionalidades.
* **Revisión de código y buenas prácticas**: Consulté activamente a la IA para recibir retroalimentación y consejos sobre cómo optimizar el código que iba implementando (por ejemplo, definir la separación de responsabilidades entre `services` y `hooks`, el manejo limpio de `try/catch`, la implementación de caché en memoria con `useRef` y el desacoplamiento de utilidades puras).


### 4. Ejemplo de algo generado o sugerido por IA que tuviste que revisar, corregir o mejorar
* **Enlaces ficticios (alucinación de recursos GeoJSON)**: Al solicitarle fuentes para descargar el mapa GeoJSON de Bolivia, la IA proporcionó enlaces rotos o inexistentes. Tuve que buscar, validar e incorporar manualmente un archivo GeoJSON vectorial limpio y preciso (`bo.json`) en los assets del proyecto.
* **Desfase de zona horaria (UTC vs GMT-4)**: Inicialmente la detección del día actual usaba `toISOString()`, lo que provocaba un desfase de un día (marcando el día 17 en vez del 16 debido a la diferencia horaria con UTC). Tuve que corregir la función `isToday` para que comparara usando la fecha local del navegador.
* **Sincronización reactiva del día seleccionado**: La tarjeta de resumen superior se había generado mostrando datos estáticos del día de hoy (índice 0). Tuve que indicar que se vinculara dinámicamente al día seleccionado para actualizar la temperatura, condición climática y máximas/mínimas al hacer clic en los 7 días.
* **Compatibilidad de iconos de librerías**: La IA sugirió nombres de iconos que no existían o habían cambiado en la versión instalada de `react-icons/lu` (como `LuAlertTriangle` en lugar de `LuTriangleAlert`), lo que requirió verificar y ajustar las importaciones reales de la librería.

### 5. ¿Qué parte del proyecto consideras que requirió más razonamiento o decisiones de tu parte?
* **Diseño del mapa interactivo como eje visual**: Decidir que el mapa no fuera una simple ilustración pasiva, sino un componente interactivo vectorial (`SVG` + `d3-geo`) sincronizado bidireccionalmente con la lista de departamentos y con pines ubicados exactamente en los centroides geométricos.
* **Separación de responsabilidades y Clean Code**: Definir una arquitectura modular clara: mantener el servicio de API como función pura (`forecast.service.js`), aislar el estado y manejo de errores en hooks (`useWeather`, `useAllCitiesWeather`), y desacoplar componentes grandes en submódulos reutilizables.
* **Diseño UI, paleta de colores y estética**: Elegir la temática oscura, definir un color distintivo para cada departamento que aporte jerarquía visual, e integrar la tipografía *Share Tech Mono* para lograr una estética moderna y tecnológica.
* **Usabilidad y experiencia de usuario (UX)**: Priorizar una vista de escritorio compacta y sin barras de desplazamiento forzadas, permitiendo que la información clave esté visible inmediatamente al interactuar.
* **Curaduría y selección de datos de la API**: Analizar qué métricas de Open-Meteo aportarían mayor valor sin saturar al usuario, seleccionando la temperatura actual por hora, las máximas y mínimas proyectadas, la precipitación en milímetros y la condición climática WMO.

### 6. Sugerencias de la IA que decidiste no utilizar o descartar
* **Estilos visuales genéricos o sobrecargados ("estilo IA")**: Descarté degradados de texto excesivos y efectos brillantes automáticos sugeridos por la IA en el header y los paneles, optando por una paleta de colores sólida, sobria y profesional que da una sensación de producto terminado real y no de plantilla generada por IA.
* **Uso de emojis para el clima**: La IA propuso inicialmente usar caracteres emoji directos para las condiciones meteorológicas; decidí descartarlo y sustituirlo por un set de iconos vectoriales consistentes y tematizados con `react-icons/lu`.
* **Enlaces falsos y recursos alucinados**: Descarté las fuentes y URLs inventadas que la IA sugirió para obtener el GeoJSON de Bolivia, buscando e importando manualmente un archivo geográfico verificado.
---

