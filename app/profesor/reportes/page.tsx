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
  Download: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  Document: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Table: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
    </svg>
  ),
  Users: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
}

// Tipos de reportes
const reportes = [
  {
    id: 'calificaciones',
    titulo: 'Acta de Calificaciones',
    descripcion: 'Lista completa de alumnos con calificación final del curso',
    icon: Icons.Document,
    formatos: ['PDF', 'Excel', 'CSV'],
    color: 'ink'
  },
  {
    id: 'asistencia',
    titulo: 'Reporte de Asistencia',
    descripcion: 'Historial de faltas y retardos por alumno',
    icon: Icons.Users,
    formatos: ['PDF', 'Excel'],
    color: 'emerald'
  },
  {
    id: 'boleta',
    titulo: 'Boletas Individuales',
    descripcion: 'Desglose de calificaciones por alumno para entregar',
    icon: Icons.Table,
    formatos: ['PDF'],
    color: 'amber'
  },
  {
    id: 'estadisticas',
    titulo: 'Estadísticas del Grupo',
    descripcion: 'Promedios, distribución de notas, comparativas',
    icon: Icons.Chart,
    formatos: ['PDF', 'Excel'],
    color: 'purple'
  },
]

// Datos del grupo mock
const datosGrupo = {
  total: 40,
  aprobados: 32,
  reprobados: 8,
  promedioGrupo: 78.5,
  asistenciaPromedio: 92,
  mejorPromedio: 98.5,
  peorPromedio: 45.2,
}

export default function ReportesPage() {
  const [generando, setGenerando] = useState<string | null>(null)
  const [formatoSeleccionado, setFormatoSeleccionado] = useState<Record<string, string>>({
    calificaciones: 'Excel',
    asistencia: 'PDF',
    boleta: 'PDF',
    estadisticas: 'PDF',
  })

  // Simular generación de reporte
  const generarReporte = (id: string) => {
    setGenerando(id)
    setTimeout(() => {
      setGenerando(null)
      // Aquí iría la lógica real de descarga
      alert(`Reporte "${reportes.find(r => r.id === id)?.titulo}" generado en formato ${formatoSeleccionado[id]}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white border-b border-pizarra-200">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profesor" className="text-pizarra-400 hover:text-pizarra-600 transition-colors">
              <Icons.Back />
            </Link>
            <div>
              <h1 className="text-xl font-display font-semibold text-pizarra-800">
                Reportes
              </h1>
              <p className="text-sm text-pizarra-500">
                Genera documentos para tu universidad
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats del grupo */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-pizarra-800 mb-4">Resumen del grupo 4A</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-pizarra-50 rounded-xl">
              <p className="text-3xl font-bold text-pizarra-800">{datosGrupo.total}</p>
              <p className="text-sm text-pizarra-500">Alumnos</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <p className="text-3xl font-bold text-emerald-600">{datosGrupo.aprobados}</p>
              <p className="text-sm text-emerald-600">Aprobados</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <p className="text-3xl font-bold text-red-600">{datosGrupo.reprobados}</p>
              <p className="text-sm text-red-600">Reprobados</p>
            </div>
            <div className="text-center p-4 bg-ink-50 rounded-xl">
              <p className="text-3xl font-bold text-ink-600">{datosGrupo.promedioGrupo}</p>
              <p className="text-sm text-ink-600">Promedio</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="flex justify-between p-3 bg-pizarra-50 rounded-lg">
              <span className="text-pizarra-500">Asistencia promedio:</span>
              <span className="font-semibold text-pizarra-800">{datosGrupo.asistenciaPromedio}%</span>
            </div>
            <div className="flex justify-between p-3 bg-pizarra-50 rounded-lg">
              <span className="text-pizarra-500">Mejor promedio:</span>
              <span className="font-semibold text-emerald-600">{datosGrupo.mejorPromedio}</span>
            </div>
            <div className="flex justify-between p-3 bg-pizarra-50 rounded-lg">
              <span className="text-pizarra-500">Menor promedio:</span>
              <span className="font-semibold text-red-600">{datosGrupo.peorPromedio}</span>
            </div>
          </div>
        </div>

        {/* Lista de reportes */}
        <div className="grid md:grid-cols-2 gap-6">
          {reportes.map(reporte => {
            const Icon = reporte.icon
            const isGenerando = generando === reporte.id
            
            return (
              <div key={reporte.id} className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    reporte.color === 'ink' ? 'bg-ink-100 text-ink-600' :
                    reporte.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    reporte.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <Icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-pizarra-800">{reporte.titulo}</h3>
                    <p className="text-sm text-pizarra-500 mt-1">{reporte.descripcion}</p>
                  </div>
                </div>
                
                {/* Selector de formato */}
                <div className="mb-4">
                  <p className="text-xs text-pizarra-500 mb-2">Formato:</p>
                  <div className="flex gap-2">
                    {reporte.formatos.map(formato => (
                      <button
                        key={formato}
                        onClick={() => setFormatoSeleccionado({ ...formatoSeleccionado, [reporte.id]: formato })}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          formatoSeleccionado[reporte.id] === formato
                            ? 'bg-ink-100 text-ink-700'
                            : 'bg-pizarra-100 text-pizarra-600 hover:bg-pizarra-200'
                        }`}
                      >
                        {formato}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Botón generar */}
                <button
                  onClick={() => generarReporte(reporte.id)}
                  disabled={isGenerando}
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    isGenerando 
                      ? 'bg-pizarra-100 text-pizarra-400 cursor-wait'
                      : 'bg-pizarra-800 text-white hover:bg-pizarra-900'
                  }`}
                >
                  {isGenerando ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generando...
                    </>
                  ) : (
                    <>
                      <Icons.Download />
                      Generar {formatoSeleccionado[reporte.id]}
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Nota */}
        <div className="mt-8 p-4 bg-ink-50 rounded-xl text-sm text-ink-700">
          <p className="font-medium mb-1">💡 Tip</p>
          <p>Los reportes se generan con los datos actuales. Asegúrate de tener las calificaciones y asistencias al día antes de generar documentos oficiales.</p>
        </div>
      </main>
    </div>
  )
}
