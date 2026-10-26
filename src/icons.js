const svg = (paths) =>
  `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`

export const icons = {
  screen: svg('<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M9 8l3 3-2 3 4 3"/>'),
  battery: svg('<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10.5v3"/><path d="M11 9l-2 3h4l-2 3"/>'),
  port: svg('<path d="M9 2v5M15 2v5"/><rect x="6" y="7" width="12" height="6" rx="2"/><path d="M12 13v4a3 3 0 0 1-3 3H8"/>'),
  water: svg('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>'),
  camera: svg('<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>'),
  laptop: svg('<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>'),
  data: svg('<ellipse cx="12" cy="5" rx="7" ry="2.5"/><path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'),
  software: svg('<path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5"/><circle cx="12" cy="12" r="3.5"/>'),
  cases: svg('<rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="10" cy="6" r="1.4"/><circle cx="10" cy="10" r="1.4"/>'),
  protection: svg('<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'),
  power: svg('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
  audio: svg('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>'),
  refurb: svg('<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16"/><path d="M20 21v-5h-5"/>'),
  star: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"/></svg>',
}
