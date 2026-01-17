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
  File: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
}

// Tareas mock
const tareasIniciales = [
  {
    id: '1',
    titulo: 'Ejercicios Capítulo 5',
    descripcion: 'Resolver ejercicios 5.1 al 5.15 del libro. Mostrar procedimiento completo.',
    fechaCreacion: '2026-01-10',
    fechaLimite: '2026-01-20',
    entregas: [
      { alumnoId: '1', nombre: 'Ana García', fecha: '2026-01-18', archivo: 'ejercicios_ana.pdf', calificacion: 95 },
      { alumnoId: '2', nombre: 'Carlos Rodríguez', fecha: '2026-01-19', archivo: 'cap5_carlos.pdf', calificacion: 85 },
      { alumnoId: '3', nombre: 'María Ruiz', fecha: '2026-01-17', archivo: 'tarea5_maria.pdf', calificacion: 100 },
      { alumnoId: '5', nombre: 'Sofía Martínez', fecha: '2026-01-19', archivo: 'ejercicios_sofia.pdf', calificacion: null },
      { alumnoId: '7', nombre: 'Valentina Torres', fecha: '2026-01-20', archivo: 'cap5_vale.pdf', calificacion: null },
    ],
    totalAlumnos: 40,
    status: 'activa'
  },
  {
    id: '2',
    titulo: 'Proyecto Final - Análisis Estadístico',
    descripcion: 'Realizar un análisis estadístico completo de un dataset real. Incluir: estadística descriptiva, gráficos, pruebas de hipótesis y conclusiones.',
    fechaCreacion: '2026-01-05',
    fechaLimite: '2026-01-28',
    entregas: [
      { alumnoId: '3', nombre: 'María Ruiz', fecha: '2026-01-15', archivo: 'proyecto_maria.pdf', calificacion: null },
    ],
    totalAlumnos: 40,
    status: 'activa'
  },
  {
    id: '3',
    titulo: 'Cuestionario Capítulo 4',
    descripcion: 'Responder el cuestionario de repaso del capítulo 4.',
    fechaCreacion: '2026-01-01',
    fechaLimite: '2026-01-08',
    entregas: [
      { alumnoId: '1', nombre: 'Ana García', fecha: '2026-01-07', archivo: 'cuest_ana.pdf', calificacion: 90 },
      { alumnoId: '2', nombre: 'Carlos Rodríguez', fecha: '2026-01-08', archivo: 'c4_carlos.pdf', calificacion: 75 },
      { alumnoId: '3', nombre: 'María Ruiz', fecha: '2026-01-06', archivo: 'cap4_maria.pdf', calificacion: 100 },
      // ... más entregas
    ],
    totalAlumnos: 40,
    status: 'cerrada'
  },
]

export default function TareasPage() {
  const [tareas, setTareas] = useState(tareasIniciales)
  const [tareaSeleccionada, setTareaSeleccionada] = useState<string | null>(null)
  const [mostrarNueva, setMostrarNueva] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fechaLimite: '' })

  // Crear tarea
  const crearTarea = () => {
    if (!nuevaTarea.titulo.trim() || !nuevaTarea.fechaLimite) return
    
    const tarea = {
      id: Date.now().toString(),
      titulo: nuevaTarea.titulo,
      descripcion: nuevaTarea.descripcion,
      fechaCreacion: new Date().toISOString().split('T')[0],
      fechaLimite: nuevaTarea.fechaLimite,
      entregas: [],
      totalAlumnos: 40,
      status: 'activa' as const
    }
    
    setTareas([tarea, ...tareas])
    setNuevaTarea({ titulo: '', descripcion: '', fechaLimite: '' })
    setMostrarNueva(false)
  }

  // Calcular días restantes
  const diasRestantes = (fecha: string) => {
    const limite = new Date(fecha)
    const hoy = new Date()
    const diff = Math.ceil((limite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const tarea = tareas.find(t => t.id === tareaSeleccionada)

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
                  Tareas
                </h1>
                <p className="text-sm text-pizarra-500">
                  Asigna y revisa entregas
                </p>
              </div>
            </div>
            <button 
              onClick={() => setMostrarNueva(true)}
              className="btn-profe"
            >
              <Icons.Plus />
              <span className="ml-2">Nueva tarea</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Modal nueva tarea */}
        {mostrarNueva && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card p-6 w-full max-w-lg animate-slide-up">
              <h2 className="text-lg font-semibold text-pizarra-800 mb-4">Nueva tarea</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pizarra-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={nuevaTarea.titulo}
                    onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                    placeholder="Ej: Ejercicios Capítulo 6"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-pizarra-700 mb-2">Descripción</label>
                  <textarea
                    value={nuevaTarea.descripcion}
                    onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                    placeholder="Instrucciones para los alumnos..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-pizarra-700 mb-2">Fecha límite</label>
                  <input
                    type="date"
                    value={nuevaTarea.fechaLimite}
                    onChange={(e) => setNuevaTarea({ ...nuevaTarea, fechaLimite: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button onClick={() => setMostrarNueva(false)} className="btn-outline">
                  Cancelar
                </button>
                <button 
                  onClick={crearTarea}
                  disabled={!nuevaTarea.titulo.trim() || !nuevaTarea.fechaLimite}
                  className="btn-profe disabled:opacity-50"
                >
                  Crear tarea
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-pizarra-800">{tareas.length}</p>
            <p className="text-sm text-pizarra-500">Tareas creadas</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-ink-600">
              {tareas.filter(t => t.status === 'activa').length}
            </p>
            <p className="text-sm text-pizarra-500">Activas</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {tareas.reduce((acc, t) => acc + t.entregas.filter(e => e.calificacion !== null).length, 0)}
            </p>
            <p className="text-sm text-pizarra-500">Calificadas</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lista de tareas */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-pizarra-800">Todas las tareas</h2>
            
            {tareas.map(t => {
              const dias = diasRestantes(t.fechaLimite)
              const porcentajeEntregas = Math.round((t.entregas.length / t.totalAlumnos) * 100)
              
              return (
                <div 
                  key={t.id}
                  onClick={() => setTareaSeleccionada(t.id)}
                  className={`card p-5 cursor-pointer transition-all hover:shadow-md ${
                    tareaSeleccionada === t.id ? 'ring-2 ring-ink-400' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          t.status === 'cerrada' ? 'bg-pizarra-100 text-pizarra-600' :
                          dias < 0 ? 'bg-red-100 text-red-700' :
                          dias <= 3 ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {t.status === 'cerrada' ? 'Cerrada' :
                           dias < 0 ? 'Vencida' :
                           dias === 0 ? 'Hoy' :
                           dias === 1 ? 'Mañana' :
                           `${dias} días`}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-pizarra-800">{t.titulo}</h3>
                      <p className="text-sm text-pizarra-500 mt-1 line-clamp-2">{t.descripcion}</p>
                      
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-pizarra-500">
                          <Icons.File />
                          {t.entregas.length}/{t.totalAlumnos} entregas
                        </span>
                        <div className="flex-1 h-1.5 bg-pizarra-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-ink-500 rounded-full"
                            style={{ width: `${porcentajeEntregas}%` }}
                          />
                        </div>
                        <span className="text-pizarra-500">{porcentajeEntregas}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detalle de tarea */}
          <div>
            {tarea ? (
              <div className="card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-pizarra-800">{tarea.titulo}</h2>
                  <span className="text-sm text-pizarra-500">
                    Límite: {new Date(tarea.fechaLimite).toLocaleDateString('es-MX')}
                  </span>
                </div>
                
                <p className="text-pizarra-600 text-sm mb-6">{tarea.descripcion}</p>
                
                <h3 className="font-medium text-pizarra-700 mb-3">
                  Entregas ({tarea.entregas.length})
                </h3>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {tarea.entregas.length === 0 ? (
                    <p className="text-pizarra-400 text-sm py-8 text-center">
                      Aún no hay entregas
                    </p>
                  ) : (
                    tarea.entregas.map(entrega => (
                      <div key={entrega.alumnoId} className="flex items-center justify-between p-3 bg-pizarra-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-ink-100 rounded-full flex items-center justify-center text-ink-600 text-sm font-medium">
                            {entrega.nombre.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-pizarra-800 text-sm">{entrega.nombre}</p>
                            <p className="text-xs text-pizarra-400">{entrega.fecha}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-pizarra-400 hover:text-ink-600 transition-colors">
                            <Icons.Download />
                          </button>
                          {entrega.calificacion !== null ? (
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              entrega.calificacion >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {entrega.calificacion}
                            </span>
                          ) : (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="Cal."
                              className="w-16 px-2 py-1 border border-pizarra-200 rounded text-sm text-center"
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-pizarra-200 text-sm text-pizarra-500">
                  {tarea.totalAlumnos - tarea.entregas.length} alumnos sin entregar
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-pizarra-100 rounded-full flex items-center justify-center text-pizarra-400 mb-4">
                  <Icons.File />
                </div>
                <p className="text-pizarra-500">Selecciona una tarea para ver detalles</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
