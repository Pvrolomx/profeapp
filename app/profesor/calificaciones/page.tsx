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
  Edit: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  Warning: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
}

// Datos mock de rubros
const rubrosIniciales = [
  { id: '1', nombre: 'Examen Parcial 1', peso: 20 },
  { id: '2', nombre: 'Examen Parcial 2', peso: 20 },
  { id: '3', nombre: 'Examen Final', peso: 30 },
  { id: '4', nombre: 'Tareas', peso: 15 },
  { id: '5', nombre: 'Participación', peso: 15 },
]

// Datos mock de alumnos con calificaciones
const alumnosIniciales: Array<{
  id: string
  nombre: string
  matricula: string
  calificaciones: Record<string, number | null>
}> = [
  { id: '1', nombre: 'Ana García López', matricula: '20210001', calificaciones: { '1': 85, '2': 78, '3': null, '4': 90, '5': 95 } },
  { id: '2', nombre: 'Carlos Rodríguez', matricula: '20210002', calificaciones: { '1': 72, '2': 68, '3': null, '4': 85, '5': 80 } },
  { id: '3', nombre: 'María Fernanda Ruiz', matricula: '20210003', calificaciones: { '1': 95, '2': 92, '3': null, '4': 100, '5': 98 } },
  { id: '4', nombre: 'José Luis Hernández', matricula: '20210004', calificaciones: { '1': 58, '2': 62, '3': null, '4': 70, '5': 75 } },
  { id: '5', nombre: 'Sofía Martínez', matricula: '20210005', calificaciones: { '1': 88, '2': 85, '3': null, '4': 92, '5': 90 } },
  { id: '6', nombre: 'Diego Sánchez', matricula: '20210006', calificaciones: { '1': 45, '2': 52, '3': null, '4': 60, '5': 70 } },
  { id: '7', nombre: 'Valentina Torres', matricula: '20210007', calificaciones: { '1': 78, '2': 82, '3': null, '4': 88, '5': 85 } },
  { id: '8', nombre: 'Alejandro Flores', matricula: '20210008', calificaciones: { '1': 90, '2': 88, '3': null, '4': 95, '5': 92 } },
]

export default function CalificacionesPage() {
  const [alumnos, setAlumnos] = useState(alumnosIniciales)
  const [rubros] = useState(rubrosIniciales)
  const [editingCell, setEditingCell] = useState<{ alumnoId: string; rubroId: string } | null>(null)
  const [tempValue, setTempValue] = useState('')

  // Calcular promedio ponderado
  const calcularPromedio = (calificaciones: Record<string, number | null>) => {
    let suma = 0
    let pesoTotal = 0
    
    rubros.forEach(rubro => {
      const cal = calificaciones[rubro.id]
      if (cal !== null && cal !== undefined) {
        suma += cal * (rubro.peso / 100)
        pesoTotal += rubro.peso
      }
    })
    
    if (pesoTotal === 0) return null
    return (suma / (pesoTotal / 100)).toFixed(1)
  }

  // Iniciar edición
  const startEdit = (alumnoId: string, rubroId: string, currentValue: number | null) => {
    setEditingCell({ alumnoId, rubroId })
    setTempValue(currentValue?.toString() || '')
  }

  // Guardar edición
  const saveEdit = () => {
    if (!editingCell) return
    
    const value = tempValue === '' ? null : Math.min(100, Math.max(0, parseInt(tempValue)))
    
    setAlumnos(prev => prev.map(a => {
      if (a.id === editingCell.alumnoId) {
        return {
          ...a,
          calificaciones: {
            ...a.calificaciones,
            [editingCell.rubroId]: value
          }
        }
      }
      return a
    }))
    
    setEditingCell(null)
    setTempValue('')
  }

  // Exportar a CSV
  const exportarCSV = () => {
    let csv = 'Matrícula,Nombre,' + rubros.map(r => r.nombre).join(',') + ',Promedio\n'
    
    alumnos.forEach(a => {
      const promedio = calcularPromedio(a.calificaciones)
      csv += `${a.matricula},"${a.nombre}",`
      csv += rubros.map(r => a.calificaciones[r.id] ?? '').join(',')
      csv += `,${promedio ?? ''}\n`
    })
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'calificaciones_estadistica_4A.csv'
    link.click()
  }

  // Contar alumnos en riesgo
  const alumnosEnRiesgo = alumnos.filter(a => {
    const promedio = calcularPromedio(a.calificaciones)
    return promedio !== null && parseFloat(promedio) < 70
  }).length

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white border-b border-pizarra-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/profesor" className="text-pizarra-400 hover:text-pizarra-600 transition-colors">
                <Icons.Back />
              </Link>
              <div>
                <h1 className="text-xl font-display font-semibold text-pizarra-800">
                  Calificaciones
                </h1>
                <p className="text-sm text-pizarra-500">
                  Estadística Aplicada · Grupo 4A
                </p>
              </div>
            </div>
            <button 
              onClick={exportarCSV}
              className="btn-outline flex items-center gap-2"
            >
              <Icons.Download />
              Exportar CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-pizarra-800">{alumnos.length}</p>
            <p className="text-sm text-pizarra-500">Alumnos</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-ink-600">{rubros.length}</p>
            <p className="text-sm text-pizarra-500">Rubros</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {alumnos.filter(a => {
                const p = calcularPromedio(a.calificaciones)
                return p !== null && parseFloat(p) >= 70
              }).length}
            </p>
            <p className="text-sm text-pizarra-500">Aprobando</p>
          </div>
          <div className="card p-4 text-center bg-red-50 border-red-200">
            <p className="text-3xl font-bold text-red-600">{alumnosEnRiesgo}</p>
            <p className="text-sm text-red-600">En riesgo</p>
          </div>
        </div>

        {/* Aviso de alumnos en riesgo */}
        {alumnosEnRiesgo > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="text-amber-600">
              <Icons.Warning />
            </div>
            <p className="text-amber-800">
              <strong>{alumnosEnRiesgo} alumno{alumnosEnRiesgo > 1 ? 's' : ''}</strong> con promedio menor a 70. 
              Considera dar seguimiento.
            </p>
          </div>
        )}

        {/* Tabla de calificaciones */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-pizarra-50 border-b border-pizarra-200">
                  <th className="text-left py-4 px-4 font-semibold text-pizarra-700 sticky left-0 bg-pizarra-50 min-w-[200px]">
                    Alumno
                  </th>
                  {rubros.map(rubro => (
                    <th key={rubro.id} className="text-center py-4 px-3 font-semibold text-pizarra-700 min-w-[100px]">
                      <div className="text-sm">{rubro.nombre}</div>
                      <div className="text-xs font-normal text-pizarra-400">{rubro.peso}%</div>
                    </th>
                  ))}
                  <th className="text-center py-4 px-4 font-semibold text-ink-700 bg-ink-50 min-w-[100px]">
                    Promedio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pizarra-100">
                {alumnos.map(alumno => {
                  const promedio = calcularPromedio(alumno.calificaciones)
                  const enRiesgo = promedio !== null && parseFloat(promedio) < 70
                  
                  return (
                    <tr key={alumno.id} className={`hover:bg-pizarra-50/50 ${enRiesgo ? 'bg-red-50/30' : ''}`}>
                      <td className="py-3 px-4 sticky left-0 bg-white">
                        <div className="font-medium text-pizarra-800">{alumno.nombre}</div>
                        <div className="text-xs text-pizarra-400">{alumno.matricula}</div>
                      </td>
                      {rubros.map(rubro => {
                        const cal = alumno.calificaciones[rubro.id]
                        const isEditing = editingCell?.alumnoId === alumno.id && editingCell?.rubroId === rubro.id
                        
                        return (
                          <td key={rubro.id} className="py-3 px-3 text-center">
                            {isEditing ? (
                              <div className="flex items-center justify-center gap-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={tempValue}
                                  onChange={(e) => setTempValue(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                  className="w-16 px-2 py-1 border border-ink-400 rounded text-center text-sm"
                                  autoFocus
                                />
                                <button onClick={saveEdit} className="text-emerald-600 hover:text-emerald-700">
                                  <Icons.Save />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEdit(alumno.id, rubro.id, cal)}
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                                  cal === null 
                                    ? 'text-pizarra-400 hover:bg-pizarra-100' 
                                    : cal >= 70 
                                      ? 'text-pizarra-800 hover:bg-emerald-50' 
                                      : 'text-red-600 font-medium hover:bg-red-50'
                                }`}
                              >
                                {cal ?? '—'}
                                <span className="opacity-0 group-hover:opacity-100">
                                  <Icons.Edit />
                                </span>
                              </button>
                            )}
                          </td>
                        )
                      })}
                      <td className={`py-3 px-4 text-center font-bold ${
                        promedio === null 
                          ? 'text-pizarra-400' 
                          : parseFloat(promedio) >= 70 
                            ? 'text-emerald-600' 
                            : 'text-red-600'
                      } bg-ink-50/50`}>
                        {promedio ?? '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-pizarra-500">
          <span>Click en una celda para editar</span>
          <span className="text-emerald-600">● ≥70 Aprobando</span>
          <span className="text-red-600">● &lt;70 En riesgo</span>
        </div>
      </main>
    </div>
  )
}
