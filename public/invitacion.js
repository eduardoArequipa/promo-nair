import { evento } from './evento.js'

const byId = id => document.getElementById(id)
const audio = byId('audio')
const music = byId('music')
const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(evento.fecha)
const start = Date.parse(dateOnly ? evento.fecha + 'T00:00:00-04:00' : evento.fecha)
const timezone = { timeZone: 'America/La_Paz' }

document.querySelector('[data-name]').textContent = evento.nombre
if (evento.nombre) byId('title').textContent = evento.nombre
if (evento.iniciales) document.querySelector('.seal').textContent = evento.iniciales
if (evento.retrato) {
  const portrait = byId('portrait')
  portrait.onload = () => { portrait.hidden = false }
  portrait.src = evento.retrato
}
byId('dedication').textContent = evento.dedicatoria
for (const actividad of evento.programa) {
  const block = byId('actividad').content.cloneNode(true)
  block.querySelector('h2').textContent = actividad.titulo
  block.querySelector('use').setAttribute('href', '#' + actividad.icono)
  block.querySelector('.recinto').textContent = actividad.lugar
  block.querySelector('.direccion').textContent = actividad.direccion
  block.querySelector('.horario').textContent = actividad.horario
  const link = block.querySelector('a')
  link.href = actividad.mapa
  link.setAttribute('aria-label', 'Ver ubicación de ' + actividad.lugar)
  byId('programa').append(block)
}
const digits = document.querySelectorAll('#count b')
const dateLabel = byId('date')
if (Number.isFinite(start)) {
  const format = new Intl.DateTimeFormat('es-BO', {
    ...timezone, dateStyle: 'full', ...(dateOnly ? {} : { timeStyle: 'short' })
  })
  dateLabel.dateTime = evento.fecha
  dateLabel.textContent = format.format(start)
  byId('cover-date').textContent = dateLabel.textContent
} else {
  dateLabel.textContent = 'Fecha por confirmar'
}

function countdown() {
  const remaining = Math.max(0, Math.ceil((start - Date.now()) / 1000))
  byId('clock').hidden = false
  if (!remaining) {
    byId('clock').textContent = start + 86400000 > Date.now() ? '¡Llegó el día de mi promoción!' : '¡Gracias por acompañarme!'
    return
  }
  const units = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60]
  digits.forEach((digit, index) => {
    const value = String(units[index]).padStart(2, '0')
    if (value === digit.textContent) return
    digit.textContent = value
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      digit.animate([{ transform: 'rotateX(-42deg)', opacity: .65 }, { transform: 'rotateX(0)', opacity: 1 }], 330)
    }
  })
  setTimeout(countdown, 1000)
}

async function play() {
  try { await audio.play() } catch { music.textContent = 'Reproducir música' }
}
audio.onplay = () => { music.textContent = 'Pausar música' }
audio.onpause = () => { music.textContent = 'Reproducir música' }
music.onclick = () => audio.paused ? play() : audio.pause()
byId('open').addEventListener('click', () => {
  if (evento.cancion) {
    audio.src = evento.cancion
    music.hidden = false
    play()
  }
  byId('cover').classList.add('opening')
  setTimeout(() => {
    byId('cover').hidden = true
    byId('inside').hidden = false
    byId('inside').classList.add('reveal')
    byId('title').focus({ preventScroll: true })
    window.scrollTo(0, 0)
    if (Number.isFinite(start)) countdown()
    celebrate()
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.14 })
    for (const part of document.querySelectorAll('#dedication, .act-card, .actividad')) {
      observer.observe(part)
    }
  }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 1450)
}, { once: true })

function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const shower = document.querySelector('.celebration')
  for (let index = 0; index < 38; index++) {
    const ribbon = document.createElement('i')
    ribbon.style.left = Math.random() * 100 + '%'
    ribbon.style.setProperty('--drift', (Math.random() - 0.5) * 140 + 'px')
    ribbon.style.animationDelay = Math.random() * 1.2 + 's'
    ribbon.addEventListener('animationend', () => ribbon.remove(), { once: true })
    shower.append(ribbon)
  }
}
