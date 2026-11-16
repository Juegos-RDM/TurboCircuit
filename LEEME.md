# Turbo Circuit

Juego de carreras arcade pseudo-3D. Funciona en el navegador y se puede convertir en app Android.

## Estructura
```
www/index.html        página (carga css/ y js/)
www/css/style.css     estilos
www/js/01-datos.js    constantes, circuitos, autos, modelo 3D, objetos y fondos
www/js/02-audio.js    canciones por circuito, motor, efectos, lluvia
www/js/03-menu.js     menús, garaje, estadísticas, ajustes
www/js/04-carrera.js  guardado, logros, XP, clima, IA, daños, neumáticos, física, fin de carrera
www/js/05-dibujo.js   render del camino, autos, HUD, repetición
www/js/06-controles.js teclado, botones táctiles, inclinación
www/js/07-bucle.js    bucle principal
build.py              une todo en dist/turbo-circuit.html (un solo archivo)
```
Los .js son scripts clásicos que comparten el mismo ámbito: deben cargarse en ese orden.

## Probar en el navegador
`python3 -m http.server -d www` y abrir http://localhost:8000
(o abrir `dist/turbo-circuit.html` directamente).

## Convertir a APK de Android (Capacitor)
```
npm init -y
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Turbo Circuit" com.rdgames.turbocircuit --web-dir=www
npx cap add android
npx cap sync
npx cap open android   # Android Studio: Build > Build APK
```
Recomendado: orientación horizontal (`android:screenOrientation="sensorLandscape"` en AndroidManifest.xml).
Las fuentes se cargan de Google Fonts; para uso sin internet, descárgalas y cámbialas por archivos locales.
