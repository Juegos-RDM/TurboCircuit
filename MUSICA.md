# Música de Turbo Circuit

Cada circuito tiene su propia canción (estructura: intro → estrofa → estribillo → estrofa → puente → estribillo → estribillo final).
La batería, el bajo, el arpegio, el colchón y la melodía se generan en el navegador con WebAudio. No hay archivos de audio.

| Circuito | Estilo | BPM | Tonalidad / escala | Armonía (estrofa → estribillo) | Sonido principal |
|---|---|---|---|---|---|
| 🇯🇵 Japón | Taiko + koto | 132 | La, pentatónica menor | Am–G–F–E → F–G–Am–E (cadencia andaluza) | koto pulsado / flauta |
| 🇧🇷 Brasil | Samba-funk | 126 | Sol, pentatónica mayor | I–IV–V–IV → I–vi–ii–V | metales a dos voces, cencerro |
| 🇩🇪 Alemania | Trance / techno | 140 | Mi menor | i–VI–III–VII → VI–III–VII–i | supersaw, bajo a 16avos |
| 🇺🇸 Estados Unidos | Rock-blues con swing | 118 | Sol, escala blues | I–I–IV–I → IV–V–I–I | guitarra saturada |
| 🇮🇹 Italia | Tarantela | 150 | Re menor armónico | i–V–i–V → i–VII–VI–V | mandolina con carreras |
| 🇬🇧 Reino Unido | Britpop épico | 138 | Re mayor | I–V–vi–IV → IV–I–V–vi | sintetizador cantable a dos voces |
| 🇲🇽 México | Mariachi | 134 | Mi frigio dominante | I–♭II–I–♭VII → iv–I–♭II–I | trompetas en terceras, oom-pah |
| 🇦🇺 Australia | Synthwave / surf | 128 | Fa♯ mixolidio | I–♭VII–IV–I → IV–I–♭VII–V | sintetizador + supersaw |
| Menú | Épico lento | 100 | La menor | — | flauta y metales |
| Garaje | Relajado | 88 | Do mayor | — | pulsado suave |

## Qué cambia durante la carrera
- **Última vuelta:** la canción salta al estribillo, sube un tono y acelera un 10 %.
- **Nitro:** suma arpegios en octava alta y duplica la melodía.
- **Boxes y pausa:** la música se apaga con un filtro (suena "dentro del garaje").

## Cómo cambiar una melodía
En `www/js/02-audio.js`, objeto `TR`: cada canción tiene `A` (estrofa, 2 compases) y `B` (estribillo, 4 compases).
Cada compás son 16 pasos separados por espacios: `.` silencio, `_` alarga la nota anterior, un número es el grado de la escala
(0 = tónica, y suma el largo de la escala por cada octava).
