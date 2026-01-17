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
  Send: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
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
  Users: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
}

// Avisos mock
const avisosIniciales = [
  {
    id: '1',
    titulo: 'Examen parcial 2 - Fecha confirmada',
    mensaje: 'El segundo examen parcial será el próximo martes 21 de enero. Temas: Capítulos 4, 5 y 6. Traer calculadora científica.',
    fecha: '2026-01-15T10:30:00',
    leidos: 35,
    total: 40,
    tipo: 'importante'
  },
  {
    id: '2',
    titulo: 'Material de apoyo disponible',
    mensaje: 'Ya subí los ejercicios resueltos del capítulo 5 a la carpeta compartida. Revísenlos antes del examen.',
    fecha: '2026-01-14T16:45:00',
    leidos: 28,
    total: 40,
    tipo: 'info'
  },
  {
    id: '3',
    titulo: 'Cambio de salón - Solo jueves',
    mensaje: 'Este jueves la clase será en el Aula 105 (edificio B) por mantenimiento del salón regular.',
    fecha: '2026-01-12T09:00:00',
    leidos: 40,
    total: 40,
    tipo: 'aviso'
  },
  {
    id: '4',
    titulo: 'Recordatorio: Entrega de proyecto',
    mensaje: 'La fecha límite para entregar el proyecto final es el 28 de enero. No habrá prórrogas.',
    fecha: '2026-01-10T14:20:00',
    leidos: 38,
    total: 40,
    tipo: 'importante'
  },
]

export default function AvisosPage() {
  const [avisos, setAvisos] = useState(avisosIniciales)
  const [nuevoAviso, setNuevoAviso] = useState({ titulo: '', mensaje: '', tipo: 'info' })
  const [mostrarForm, setMostrarForm] = useState(false)

  // Enviar nuevo aviso
  const enviarAviso = () => {
    if (!nuevoAviso.titulo.trim() || !nuevoAviso.mensaje.trim()) return
    
    const aviso = {
      id: Date.now().toString(),
      titulo: nuevoAviso.titulo,
      mensaje: nuevoAviso.mensaje,
      fecha: new Date().toISOString(),
      leidos: 0,
      total: 40,
      tipo: nuevoAviso.tipo
    }
    
    setAvisos([aviso, ...avisos])
    setNuevoAviso({ titulo: '', mensaje: '', tipo: 'info' })
    setMostrarForm(false)
  }

  // Eliminar aviso
  const eliminarAviso = (id: string) => {
    setAvisos(avisos.filter(a => a.id !== id))
  }

  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    const d = new Date(fecha)
    const ahora = new Date()
    const diff = ahora.getTime() - d.getTime()
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (dias === 0) return 'Hoy, ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    if (dias === 1) return 'Ayer, ' + d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    if (dias < 7) return `Hace ${dias} días`
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white border-b border-pizarra-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/profesor" className="text-pizarra-400 hover:text-pizarra-600 transition-colors">
                <Icons.Back />
              </Link>
              <div>
                <h1 className="text-xl font-display font-semibold text-pizarra-800">
                  Avisos
                </h1>
                <p className="text-sm text-pizarra-500">
                  Comunícate con tu grupo sin WhatsApp
                </p>
              </div>
            </div>
            <button 
              onClick={() => setMostrarForm(!mostrarForm)}
              className="btn-profe"
            >
              <Icons.Bell />
              <span className="ml-2">Nuevo aviso</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Formulario nuevo aviso */}
        {mostrarForm && (
          <div className="card p-6 mb-8 animate-slide-up">
            <h2 className="text-lg font-semibold text-pizarra-800 mb-4">Enviar aviso al grupo</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pizarra-700 mb-2">
                  Tipo de aviso
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'info', label: 'Información', color: 'bg-blue-100 text-blue-700' },
                    { value: 'aviso', label: 'Aviso', color: 'bg-amber-100 text-amber-700' },
                    { value: 'importante', label: 'Importante', color: 'bg-red-100 text-red-700' },
                  ].map(tipo => (
                    <button
                      key={tipo.value}
                      onClick={() => setNuevoAviso({ ...nuevoAviso, tipo: tipo.value })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        nuevoAviso.tipo === tipo.value 
                          ? tipo.color + ' ring-2 ring-offset-2 ring-pizarra-300' 
                          : 'bg-pizarra-100 text-pizarra-600 hover:bg-pizarra-200'
                      }`}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-pizarra-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={nuevoAviso.titulo}
                  onChange={(e) => setNuevoAviso({ ...nuevoAviso, titulo: e.target.value })}
                  placeholder="Ej: Cambio de fecha del examen"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-pizarra-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={nuevoAviso.mensaje}
                  onChange={(e) => setNuevoAviso({ ...nuevoAviso, mensaje: e.target.value })}
                  placeholder="Escribe el mensaje para tus alumnos..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setMostrarForm(false)}
                  className="btn-outline"
                >
                  Cancelar
                </button>
                <button 
                  onClick={enviarAviso}
                  disabled={!nuevoAviso.titulo.trim() || !nuevoAviso.mensaje.trim()}
                  className="btn-profe disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icons.Send />
                  <span className="ml-2">Enviar a 40 alumnos</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-pizarra-800">{avisos.length}</p>
            <p className="text-sm text-pizarra-500">Avisos enviados</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {Math.round(avisos.reduce((acc, a) => acc + (a.leidos / a.total), 0) / avisos.length * 100)}%
            </p>
            <p className="text-sm text-pizarra-500">Tasa de lectura</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-3xl font-bold text-ink-600">40</p>
            <p className="text-sm text-pizarra-500">Alumnos</p>
          </div>
        </div>

        {/* Lista de avisos */}
        <div className="space-y-4">
          {avisos.map(aviso => (
            <div key={aviso.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      aviso.tipo === 'importante' ? 'bg-red-100 text-red-700' :
                      aviso.tipo === 'aviso' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {aviso.tipo === 'importante' ? 'Importante' : aviso.tipo === 'aviso' ? 'Aviso' : 'Info'}
                    </span>
                    <span className="text-xs text-pizarra-400 flex items-center gap-1">
                      <Icons.Clock />
                      {formatearFecha(aviso.fecha)}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-pizarra-800 mb-1">{aviso.titulo}</h3>
                  <p className="text-pizarra-600 text-sm">{aviso.mensaje}</p>
                  
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <Icons.Check />
                      {aviso.leidos}/{aviso.total} leídos
                    </span>
                    <div className="flex-1 h-1.5 bg-pizarra-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${(aviso.leidos / aviso.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => eliminarAviso(aviso.id)}
                  className="text-pizarra-400 hover:text-red-500 transition-colors p-2"
                >
                  <Icons.Trash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {avisos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-pizarra-100 rounded-full flex items-center justify-center text-pizarra-400 mb-4">
              <Icons.Bell />
            </div>
            <p className="text-pizarra-500">No hay avisos enviados</p>
            <button 
              onClick={() => setMostrarForm(true)}
              className="btn-profe mt-4"
            >
              Enviar primer aviso
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
