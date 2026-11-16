# Turbo Circuit — Informe de pruebas de calidad (Fase 4)

Las pruebas automáticas se ejecutaron sin navegador: el código del juego corre en Node con un lienzo
simulado (node-canvas). Sirven para detectar errores de lógica y de dibujo, **no** reemplazan probar
en un móvil real.

## 1. Resultados automáticos (56 comprobaciones, 0 fallos)

| Prueba (lista del análisis) | Resultado |
|---|---|
| Iniciar carrera: 3 modos × 3 duraciones (3/6/8 vueltas) | ✔ |
| Colisión por detrás: suma choque, baja velocidad, sacudida | ✔ |
| Salir de pista: barrera lateral rebota el auto | ✔ |
| Entrar a boxes, repostar y salir (carrera de 6+ vueltas) | ✔ |
| Quedarse sin gasolina: el auto sigue a velocidad reducida (32 %) | ✔ |
| Terminar carrera: una sola pantalla de resultados | ✔ |
| Terminar campeonato: desempate (puntos → victorias → 2º → 3º) | ✔ |
| Desbloqueos de país y auto al terminar | ✔ |
| País bloqueado no arranca | ✔ |
| Guardado dañado o con valores inválidos se sanea; usa copia de seguridad | ✔ |
| Recargar: se conservan logros, estadísticas y progreso | ✔ |
| Pausa: abre/cierra el panel y detiene la simulación | ✔ |
| Volver al menú: apaga grabación y clima | ✔ |
| Clima fijo (lluvia, niebla, noche) llega al nivel esperado | ✔ |
| Clima dinámico cambia durante la carrera | ✔ |
| Logros se desbloquean y entregan monedas | ✔ |
| Repetición: graba, reproduce, cambia de cámara, salta con la barra, restaura el estado | ✔ |
| Calidad alta (pantallas de alta densidad) dibuja sin errores | ✔ |
| 8 países × 5 autos × 120+ cuadros dibujados sin excepciones | ✔ |
| Daño: un choque lo suma; con 80 % el auto es ~17 % más lento | ✔ |
| Boxes repara la carrocería (el servicio dura más si hay daño) | ✔ |
| Neumáticos: blandos se gastan ~2.7× más rápido que duros; ◀ ▶ cambia el compuesto en boxes | ✔ |
| Experiencia: niveles, XP por carrera, mejoras bloqueadas por nivel de piloto | ✔ |
| Guardado valida XP, neumáticos y daño del campeonato | ✔ |
| Música (con audio simulado): las 10 canciones corren 112 s sin errores, 16–28 osciladores/s | ✔ |
| Música: las 10 melodías son distintas y están bien formadas | ✔ |
| Última vuelta: la canción salta al estribillo, sube de tono y tempo | ✔ |

Ritmo de los rivales (6 vueltas, Japón, Normal, jugador con el auto blanco y piloto automático):
el jugador termina en ~103 s y los rivales entre ~116 s y ~157 s, cada uno con su personalidad.

## 2. Pruebas manuales pendientes (necesitan dispositivo real)

- [ ] Chrome y Edge en escritorio, Firefox, Chrome en Android, Safari en iPhone.
- [ ] **Escuchar las 8 canciones de circuito, el menú y el garaje** (las pruebas verifican estructura y ausencia de errores, no cómo suenan; volumen relativo música/motor/efectos).
- [ ] Sonido: motor, efectos, lluvia y silencio.
- [ ] Botones táctiles con varios dedos a la vez (girar + nitro).
- [ ] Mantener pulsado el nitro en teclado (se ignoró la repetición de tecla por código; falta verlo en uso).
- [ ] Control por inclinación (en iPhone pide permiso al activarlo).
- [ ] Vibración, pantalla completa y bloqueo de apagado de pantalla.
- [ ] Fluidez en un móvil de gama baja: probar calidad Baja/Media/Alta y "Calidad auto".
- [ ] Menús, garaje, estadísticas y logros: distribución en pantallas pequeñas.
- [ ] Giro de pantalla: el aviso "Gira tu móvil" y la pausa automática.

## 3. Riesgos conocidos

- La noche y la lluvia se dibujan con capas semitransparentes; en móviles muy lentos puede convenir calidad Baja.
- La repetición graba 30 muestras por segundo (máx. ~6 minutos). Carreras más largas se recortan.
- Todavía no hay modo online ni logros por temporadas. Los daños son solo de rendimiento (no se ven en la carrocería).
