// Usar rutas como /retrato.jpg y /cancion.mp3 para archivos guardados en public/.
// Una fecha sin hora cuenta hasta el comienzo del día en Tarija. Para fijar la hora, usar AAAA-MM-DDTHH:mm:00-04:00.
export const evento = {
  nombre: 'Nair Alejandro Arequipa Cruz',
  iniciales: '',
  retrato: '/nair1.jpg',
  cancion: '/cancion.mp3',
  fecha: '2026-12-11',
  // Lugares y puntos del mapa de ejemplo, para reemplazar cuando se confirmen.
  programa: [
    {
      titulo: 'Acto de promoción',
      icono: 'cap',
      horario: 'Por la mañana',
      lugar: 'Auditorio Los Lapachos',
      direccion: 'Paseo de los Lapachos, Tarija',
      mapa: 'https://www.google.com/maps/search/?api=1&query=-21.5350,-64.7310'
    },
    {
      titulo: 'Almuerzo de celebración',
      icono: 'almuerzo',
      horario: '12:00 HRS.',
      lugar: 'Jardín La Enramada',
      direccion: 'Camino de la Enramada, Tarija',
      mapa: 'https://www.google.com/maps/search/?api=1&query=-21.5390,-64.7340'
    }
  ],
  dedicatoria: 'A toda mi familia y a mis amigos: los invito a mi acto de promoción. Gracias por acompañarme en las tareas, en los nervios antes de cada examen y en la alegría de llegar hasta aquí. ¡Quiero celebrar este día con ustedes!'
}
