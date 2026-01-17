'use client'

import { useState } from 'react'
import Link from 'next/link'

// Iconos
const Icons = {
  Back: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  ),
}

// Eventos mock
const eventosIniciales = [
  { id: '1', titulo: 'Examen Parcial 2', fecha: '2026-01-21', tipo: 'examen', color: 'red' },
  { id: '2', titulo: 'Entrega: Ejercicios Cap. 5', fecha: '2026-01-20', tipo: 'entrega', color: 'amber' },
  { id: '3', titulo: 'Entrega: Proyecto Final', fecha: '2026-01-28', tipo: 'entrega', color: 'amber' },
  { id: '4', titulo: 'Examen Final', fecha: '2026-02-04', tipo: 'examen', color: 'red' },
  { id: '5', titulo: 'Sin clase - Día festivo', fecha: '2026-02-03', tipo: 'festivo', color: 'gray' },
  { id: '6', titulo: 'Clase en Aula 105', fecha: '2026-01-16', tipo: 'aviso', color: 'blue' },
  { id: '7', titulo: 'Asesorías extra', fecha: '2026-01-19', tipo: 'aviso', color: 'blue' },
]

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function CalendarioPage() {
  const [eventos, setEventos] = useState(eventosIniciales)
  const [mesActual, setMesActual] = useState(new Date(2026, 0, 1)) // Enero 2026
  const [mostrarNuevo, setMostrarNuevo] = useState(false)
  const [nuevoEvento, setNuevoEvento] = useState({ titulo: '', fecha: '', tipo: 'aviso' })
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null)

  // Generar días del mes
  const generarDias = () => {
    const año = mesActual.getFullYear()
    const mes = mesActual.getMonth()
    const primerDia = new Date(año, mes, 1)
    const ultimoDia = new Date(año, mes + 1, 0)
    const diasEnMes = ultimoDia.getDate()
    const diaSemanaInicio = primerDia.getDay()
    
    const dias: { fecha: string; dia: number; esMesActual: boolean }[] = []
    
    // Días del mes anterior
    const mesAnterior = new Date(año, mes, 0)
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      const dia = mesAnterior.getDate() - i
      const fecha = `${año}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
      dias.push({ fecha, dia, esMesActual: false })
    }
    
    // Días del mes actual
    for (let i = 1; i <= diasEnMes; i++) {
      const fecha = `${año}-${String(mes + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      dias.push({ fecha, dia: i, esMesActual: true })
    }
    
    // Días del mes siguiente
    const diasRestantes = 42 - dias.length
    for (let i = 1; i <= diasRestantes; i++) {
      const fecha = `${año}-${String(mes + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      dias.push({ fecha, dia: i, esMesActual: false })
    }
    
    return dias
  }

  // Navegar meses
  const mesAnterior = () => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1))
  const mesSiguiente = () => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1))

  // Obtener eventos de un día
  const eventosDelDia = (fecha: string) => eventos.filter(e => e.fecha === fecha)

  // Crear evento
  const crearEvento = () => {
    if (!nuevoEvento.titulo.trim() || !nuevoEvento.fecha) return
    
    const colores: Record<string, string> = {
      examen: 'red',
      entrega: 'amber',
      festivo: 'gray',
      aviso: 'blue'
    }
    
    const evento = {
      id: Date.now().toString(),
      titulo: nuevoEvento.titulo,
      fecha: nuevoEvento.fecha,
      tipo: nuevoEvento.tipo,
      color: colores[nuevoEvento.tipo]
    }
    
    setEventos([...eventos, evento])
    setNuevoEvento({ titulo: '', fecha: '', tipo: 'aviso' })
    setMostrarNuevo(false)
  }

  const dias = generarDias()
  const hoy = new Date().toISOString().split('T')[0]
  const eventosProximos = eventos
    .filter(e => e.fecha >= hoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white border-b border-pizarra-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/profesor" className="text-pizarra-400 hover:text-pizarra-600 transition-colors">
                <Icons.Back />
              </Link>
              <div>
                <h1 className="text-xl font-display font-semibold text-pizarra-800">
                  Calendario
                </h1>
                <p className="text-sm text-pizarra-500">
                  Fechas importantes del curso
                </p>
              </div>
            </div>
            <button 
              onClick={() => setMostrarNuevo(true)}
              className="btn-profe"
            >
              <Icons.Plus />
              <span className="ml-2">Nuevo evento</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Modal nuevo evento */}
        {mostrarNuevo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card p-6 w-full max-w-md animate-slide-up">
              <h2 className="text-lg font-semibold text-pizarra-800 mb-4">Nuevo evento</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pizarra-700 mb-2">Tipo</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'examen', label: '📝 Examen' },
                      { value: 'entrega', label: '📁 Entrega' },
                      { value: 'festivo', label: '🎉 Sin clase' },
                      { value: 'aviso', label: '📢 Aviso' },
                    ].map(tipo => (
                      <button
                        key={tipo.value}
                        onClick={() => setNuevoEvento({ ...nuevoEvento, tipo: tipo.value })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          nuevoEvento.tipo === tipo.value 
                            ? 'bg-ink-100 text-ink-700 ring-2 ring-ink-400' 
                            : 'bg-pizarra-100 text-pizarra-600 hover:bg-pizarra-200'
                        }`}
                      >
                        {tipo.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-pizarra-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={nuevoEvento.titulo}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })}
                    placeholder="Ej: Examen Parcial 3"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-pizarra-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    value={nuevoEvento.fecha}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button onClick={() => setMostrarNuevo(false)} className="btn-outline">
                  Cancelar
                </button>
                <button 
                  onClick={crearEvento}
                  disabled={!nuevoEvento.titulo.trim() || !nuevoEvento.fecha}
                  className="btn-profe disabled:opacity-50"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendario */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              {/* Header del calendario */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={mesAnterior} className="p-2 hover:bg-pizarra-100 rounded-lg transition-colors">
                  <Icons.ChevronLeft />
                </button>
                <h2 className="text-xl font-display font-semibold text-pizarra-800">
                  {MESES[mesActual.getMonth()]} {mesActual.getFullYear()}
                </h2>
                <button onClick={mesSiguiente} className="p-2 hover:bg-pizarra-100 rounded-lg transition-colors">
                  <Icons.ChevronRight />
                </button>
              </div>
              
              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DIAS.map(dia => (
                  <div key={dia} className="text-center text-sm font-medium text-pizarra-500 py-2">
                    {dia}
                  </div>
                ))}
              </div>
              
              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {dias.map((d, i) => {
                  const eventosHoy = eventosDelDia(d.fecha)
                  const esHoy = d.fecha === hoy
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setDiaSeleccionado(d.fecha)}
                      className={`relative aspect-square p-1 rounded-lg transition-all ${
                        !d.esMesActual ? 'text-pizarra-300' :
                        esHoy ? 'bg-ink-600 text-white' :
                        diaSeleccionado === d.fecha ? 'bg-ink-100 text-ink-700' :
                        'hover:bg-pizarra-100'
                      }`}
                    >
                      <span className="text-sm">{d.dia}</span>
                      {eventosHoy.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          {eventosHoy.slice(0, 3).map((e, j) => (
                            <span 
                              key={j}
                              className={`w-1.5 h-1.5 rounded-full ${
                                e.color === 'red' ? 'bg-red-500' :
                                e.color === 'amber' ? 'bg-amber-500' :
                                e.color === 'blue' ? 'bg-blue-500' :
                                'bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              
              {/* Leyenda */}
              <div className="mt-6 pt-4 border-t border-pizarra-200 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  Examen
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  Entrega
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Aviso
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  Sin clase
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Eventos del día seleccionado */}
            {diaSeleccionado && (
              <div className="card p-5">
                <h3 className="font-semibold text-pizarra-800 mb-3">
                  {new Date(diaSeleccionado + 'T12:00:00').toLocaleDateString('es-MX', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </h3>
                {eventosDelDia(diaSeleccionado).length > 0 ? (
                  <div className="space-y-2">
                    {eventosDelDia(diaSeleccionado).map(e => (
                      <div 
                        key={e.id}
                        className={`p-3 rounded-lg ${
                          e.color === 'red' ? 'bg-red-50 border-l-4 border-red-500' :
                          e.color === 'amber' ? 'bg-amber-50 border-l-4 border-amber-500' :
                          e.color === 'blue' ? 'bg-blue-50 border-l-4 border-blue-500' :
                          'bg-gray-50 border-l-4 border-gray-400'
                        }`}
                      >
                        <p className="font-medium text-pizarra-800">{e.titulo}</p>
                        <p className="text-xs text-pizarra-500 mt-1 capitalize">{e.tipo}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-pizarra-400 text-sm">Sin eventos</p>
                )}
              </div>
            )}

            {/* Próximos eventos */}
            <div className="card p-5">
              <h3 className="font-semibold text-pizarra-800 mb-4">Próximos eventos</h3>
              <div className="space-y-3">
                {eventosProximos.map(e => (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      e.color === 'red' ? 'bg-red-500' :
                      e.color === 'amber' ? 'bg-amber-500' :
                      e.color === 'blue' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-pizarra-800 truncate">{e.titulo}</p>
                      <p className="text-xs text-pizarra-400">
                        {new Date(e.fecha + 'T12:00:00').toLocaleDateString('es-MX', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
