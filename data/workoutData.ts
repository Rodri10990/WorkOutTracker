import { url } from "inspector";

export const workoutPlanData = {
  generalConsiderations: {
    warmUp: "Calentamiento (5-7 minutos): 3-5 minutos de cardio ligero (Bici, Remo o SkiErg a baja intensidad) seguido de movilidad articular y algunos estiramientos dinámicos (círculos de brazos, rotaciones de torso, sentadillas sin peso).",
    enfoquePectoral: "Los ejercicios de pecho están al principio o priorizados para que los hagas con más energía.",
    progresion: "Progresión (Método de Doble Progresión): Para cada ejercicio, trabaja en un rango de repeticiones (ej: 8-12). Cuando puedas completar todas las series en el extremo SUPERIOR del rango con buena forma, incrementa el peso. Con el nuevo peso, es normal caer al extremo INFERIOR del rango. Vuelve a trabajar para alcanzar el extremo superior antes de incrementar el peso de nuevo.",
    descansoEntreSeries: "Para ejercicios compuestos principales (press, sentadillas, remos), descansa 60-90 segundos. Para accesorios o ejercicios en polea, 45-60 segundos. Ajusta según tu recuperación.",
    rir: "RIR (Repeticiones en Reserva): Intenta terminar la mayoría de las series sintiendo que podrías haber hecho 1-2 repeticiones más con buena forma (RIR 1-2). Ocasionalmente, la última serie puede ir más cerca del fallo.",
    cardioAdicional: "Tus carreras ya suman. El SkiErg y RowErg son excelentes. Puedes usarlos en días de no entrenamiento de fuerza o como un 'finisher' corto (5-10 min HIIT) si te queda tiempo y energía.",
    registro: "Prepara una libreta o usa una app para anotar: Ejercicio | Peso Usado | Reps Conseguidas (por serie) | Notas."
  },
  days: [
    {
      id: 'diaA',
      name: 'Día A',
      exercises: [
        { id: 'a1', name: 'Press de Banca con Mancuernas (Banco Plano)',imageUrl: 'https://picsum.photos/400/200', series: '3-4', repetitions: '6-10', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'a2', name: 'Cruces de Polea (FTS Glide - poleas a altura media/alta)', series: '3', repetitions: '10-15', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'a3', name: 'Remo con Mancuerna (apoyado en banco)', series: '3-4', repetitions: '8-12 (c/lado)', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'a4', name: 'Sentadilla Goblet con Mancuerna', series: '3-4', repetitions: '8-12', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'a5', name: 'Press de Hombros con Mancuernas (sentado o de pie)', series: '3', repetitions: '8-12', rest: '60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'a6', name: 'Elevaciones Laterales en Polea (FTS Glide)', series: '3', repetitions: '12-15 (c/lado)', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'a7', name: 'Woodchopper en Polea (FTS Glide - oblicuos)', series: '3', repetitions: '10-15 (c/lado)', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
      ]
    },
    {
      id: 'diaB',
      name: 'Día B',
      exercises: [
        { id: 'b1', name: 'Press inclinado con mancuernas (si banco ajustable, sino repetir plano o usar FTS Glide)', series: '3-4', repetitions: '8-12', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'b2', name: 'Aperturas en Polea Declinadas (FTS Glide - poleas altas, inclínate)', series: '3', repetitions: '12-15', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'b3', name: 'Jalón/Remo en Polea Alta (FTS Glide - agarre neutro o prono)', series: '3-4', repetitions: '8-12', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'b4', name: 'Peso Muerto Rumano con Mancuernas (RDL)', series: '3-4', repetitions: '10-15', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'b5', name: 'Face Pulls en Polea (FTS Glide - con cuerda si hay)', series: '3', repetitions: '15-20', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'b6', name: 'Curl de Bíceps en Polea (FTS Glide)', series: '3', repetitions: '10-15', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'b7', name: 'Extensión de Tríceps en Polea (FTS Glide - con cuerda o barra)', series: '3', repetitions: '10-15', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
      ]
    },
    {
      id: 'diaC',
      name: 'Día C',
      exercises: [
        { id: 'c1', name: 'Press de Pecho en Polea (FTS Glide - de pie o arrodillado)', series: '3-4', repetitions: '10-15', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'c2', name: 'Cruces de Polea Inclinados (FTS Glide - poleas bajas, ascendente)', series: '3', repetitions: '12-15', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'c3', name: 'Remo Sentado en Polea (FTS Glide - agarre estrecho)', series: '3-4', repetitions: '10-15', rest: '60-90s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'c4', name: 'Zancadas con Mancuernas (Lunges)', series: '3', repetitions: '8-12 (c/pierna)', rest: '60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'c5', name: 'Press Militar de Pie con Mancuernas (o Push Press)', series: '3', repetitions: '6-10', rest: '60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'c6', name: 'Pájaros con Mancuernas (Bent-over Dumbbell Reverse Flyes) o en FTS Glide', series: '3', repetitions: '12-15', rest: '45-60s', pesoUsado: '', repsConseguidas: '', notas: '' },
        { id: 'c7', name: 'Plancha (Plank) / Plancha Lateral', series: '3', repetitions: '30-60s (c/u)', rest: '30-45s', pesoUsado: '', repsConseguidas: '', notas: '' },
      ]
    }
  ],
  additionalNotesText: { // Renamed to avoid conflict with 'notes' in exercises
    bancoAjustable: "Si tu 'banco de fuerza' es ajustable, para el Día B podrías hacer 'Press inclinado con mancuernas'. Si es solo plano, puedes repetir press plano o sustituir por 'Press de pecho en FTS Glide'.",
    ftsGlide: "Experimenta con alturas de poleas y agarres. Para jalones/remos, si no tienes asiento, hazlo de pie, arrodillado o usa el banco.",
    nutricion: "Nutrición es clave: ligero déficit calórico con suficiente proteína (1.6-2.2g por kg de peso corporal).",
    escuchaCuerpo: "Si estás fatigado, reduce volumen/intensidad. Consistencia > perfección aislada.",
    dosDias: "Si solo 2 días: Elige dos entrenamientos, ej. Lunes: Día A, Jueves: Día B. Siguiente semana rota, ej. Lunes: Día C, Jueves: Día A."
  }
};
