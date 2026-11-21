# PV Lab · Suite fotovoltaica

Aplicación web independiente de GEOSOLAR. Integra el dashboard de módulo/string y el laboratorio de strings, stringboxes y cableado DC. No necesita MATLAB ni OCR.

## Uso local

Desde esta carpeta: `python -m http.server 5181 --directory dist`. Abrir `http://localhost:5181` en un navegador moderno. No abrir index.html directamente: los módulos JavaScript y el worker requieren HTTP.

## Funciones

- Curvas I–V, P–V y V–G; temperatura −15 a 85 °C, irradiancia 0 a 1200 W/m², 1–40 módulos y dispersión reproducible. Referencias nominales STC y a 25 °C.
- Hasta 24 strings y 4 stringboxes, cables de cobre, sombras geométricas por célula, bypass, módulos completos o half-cell, terreno y tejado. Punto de operación y balance de pérdidas.
- Seis módulos JA Solar de ejemplo, catálogo editable con marca/modelo e importación/exportación JSON compatible con pv-string-catalog v1 de MATLAB. La importación une registros y elimina duplicados eléctricos completos.
- Escenarios completos en JSON propio pv-lab-scenario v1, guardado local del navegador y exportación de gráficos SVG. Los escenarios web no son archivos de escenario MATLAB.

## Modelo y verificación

El motor de un diodo reproduce el ajuste MATLAB de a y Rs fijando Rsh=1000 Ω en STC. Los coeficientes JSON están en 1/°C; la interfaz los presenta en %/°C. Pmp y gamma del catálogo no son restricciones adicionales del ajuste. Las simplificaciones están descritas en «Modelo y ayuda».

`node --test tests/*.test.mjs` comprueba referencias MATLAB, sombras, balances, oscuridad, bloqueo ideal, geometría, catálogo y validación. Referencias MATLAB R2026a: módulo a 60 °C/700 W/m² = 278.700526636 W; campo inicial = 13106.330704233 W; sombra de franja 12 % en el primero de dos módulos sin cable = 534.036764368 W. La discretización web produce diferencias pequeñas en potencia y ubicación del MPP. El generador aleatorio web conserva una población al cambiar T/G, pero no reproduce la secuencia RNG de MATLAB.

La aplicación calcula en el navegador mediante Web Worker. El almacenamiento local no sustituye la descarga de archivos de respaldo. El modelo inverso y de bypass es simplificado; no incluye avalancha detallada, dinámica térmica ni electrónica de inversor.
