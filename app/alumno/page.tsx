'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Iconos
const Icons = {
  Back: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  ),
  QR: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.5v4.5h-4.5V4.5zm0 10.5h4.5v4.5h-4.5V15zm10.5-10.5h4.5v4.5h-4.5V4.5zm0 10.5h1.5m3 0h-1.5m-3 3v-3m3 3h-3m1.5-10.5v3m3-3h-3m-10.5 4.5h3m-3 3h3m4.5-3h3m-3 3h3" />
    </svg>
  ),
  Check: () => (
    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  Book: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
}

// Datos de ejemplo de clases del alumno
const misClases = [
  { 
    id: '1', 
    nombre: 'Estadística Aplicada', 
    profesor: 'Dr. García López',
    horario: 'Mar/Jue 8:00',
    asistencias: 12,
    faltas: 1,
    color: 'ink'
  },
  { 
    id: '2', 
    nombre: 'Cálculo Diferencial', 
    profesor: 'Mtra. Rodríguez',
    horario: 'Lun/Mié 10:00',
    asistencias: 10,
    faltas: 2,
    color: 'emerald'
  },
  { 
    id: '3', 
    nombre: 'Programación II', 
    profesor: 'Ing. Martínez',
    horario: 'Vie 14:00',
    asistencias: 6,
    faltas: 0,
    color: 'amber'
  },
]

// Historial de asistencias recientes
const historialReciente = [
  { clase: 'Estadística Aplicada', fecha: 'Hoy, 8:03am', status: 'presente' },
  { clase: 'Cálculo Diferencial', fecha: 'Ayer, 10:15am', status: 'retardo' },
  { clase: 'Programación II', fecha: 'Viernes, 14:02', status: 'presente' },
  { clase: 'Estadística Aplicada', fecha: 'Mar 14, 8:05am', status: 'presente' },
]

export default function AlumnoDashboard() {
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Actualizar reloj
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simular escaneo
  const handleScan = () => {
    setScanning(true)
    
    // Simular proceso de escaneo
    setTimeout(() => {
      setScanning(false)
      setScanResult('success')
      
      // Ocultar resultado después de 3 segundos
      setTimeout(() => {
        setScanResult(null)
      }, 3000)
    }, 2000)
  }

  // Datos del alumno
  const alumno = {
    nombre: 'Ana García López',
    matricula: '20210001',
    carrera: 'Ingeniería en Sistemas',
    semestre: '4to Semestre'
  }

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white border-b border-pizarra-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-pizarra-400 hover:text-pizarra-600 transition-colors">
                <Icons.Back />
              </Link>
              <div>
                <h1 className="text-xl font-display font-semibold text-pizarra-800">
                  ¡Hola, {alumno.nombre.split(' ')[0]}!
                </h1>
                <p className="text-sm text-pizarra-500">
                  {alumno.carrera} · {alumno.semestre}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-mono font-semibold text-pizarra-800">
                {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Scanner Card */}
        <div className="card p-8 mb-8">
          {scanResult === 'success' ? (
            // Éxito
            <div className="text-center py-8 animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                <Icons.Check />
              </div>
              <h2 className="text-2xl font-display font-bold text-emerald-600 mb-2">
                ¡Asistencia registrada!
              </h2>
              <p className="text-pizarra-500">
                Estadística Aplicada · {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Presente
              </div>
            </div>
          ) : scanning ? (
            // Escaneando
            <div className="text-center py-8">
              <div className="relative w-64 h-64 mx-auto mb-6">
                {/* Scanner frame */}
                <div className="absolute inset-0 border-4 border-sol-400 rounded-3xl">
                  {/* Scanning line animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sol-400 to-transparent animate-pulse"></div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-sol-500 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-sol-500 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-sol-500 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-sol-500 rounded-br-2xl"></div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-pizarra-100 rounded-2xl flex items-center justify-center text-pizarra-400 animate-pulse mb-4">
                      <Icons.Camera />
                    </div>
                    <p className="text-pizarra-600 font-medium">Buscando código...</p>
                  </div>
                </div>
              </div>
              <p className="text-pizarra-500">
                Apunta la cámara al código QR del profesor
              </p>
            </div>
          ) : (
            // Estado inicial
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-sol-100 rounded-2xl flex items-center justify-center text-sol-600 mb-6">
                <Icons.QR />
              </div>
              <h2 className="text-2xl font-display font-bold text-pizarra-800 mb-2">
                Registra tu asistencia
              </h2>
              <p className="text-pizarra-500 mb-8 max-w-sm mx-auto">
                Escanea el código QR que muestra tu profesor para registrar tu asistencia
              </p>
              <button 
                onClick={handleScan}
                className="btn-alumno text-lg px-10 py-4"
              >
                <Icons.Camera />
                <span className="ml-3">Escanear código QR</span>
              </button>
            </div>
          )}
        </div>

        {/* Mis clases */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-pizarra-800 mb-4 flex items-center gap-2">
            <Icons.Book />
            Mis clases
          </h2>
          <div className="grid gap-4">
            {misClases.map((clase) => (
              <div key={clase.id} className="card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      clase.color === 'ink' ? 'bg-ink-100 text-ink-600' :
                      clase.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      <Icons.Book />
                    </div>
                    <div>
                      <h3 className="font-semibold text-pizarra-800">{clase.nombre}</h3>
                      <p className="text-sm text-pizarra-500">{clase.profesor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-pizarra-400 mb-1">
                      <Icons.Clock />
                      <span>{clase.horario}</span>
                    </div>
                    <p className="text-sm">
                      <span className="text-emerald-600 font-medium">{clase.asistencias} asistencias</span>
                      {clase.faltas > 0 && (
                        <span className="text-red-500 ml-2">· {clase.faltas} faltas</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial reciente */}
        <div>
          <h2 className="text-lg font-semibold text-pizarra-800 mb-4 flex items-center gap-2">
            <Icons.Calendar />
            Historial reciente
          </h2>
          <div className="card divide-y divide-pizarra-100">
            {historialReciente.map((registro, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-pizarra-800">{registro.clase}</p>
                  <p className="text-sm text-pizarra-400">{registro.fecha}</p>
                </div>
                <span className={`badge ${
                  registro.status === 'presente' ? 'badge-success' : 'badge-warning'
                }`}>
                  {registro.status === 'presente' ? 'Presente' : 'Retardo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom navigation hint */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pizarra-200 p-4 text-center">
        <p className="text-sm text-pizarra-500">
          Creado con 🧡 por <span className="font-medium">Colmena 2026</span>
        </p>
      </div>
    </div>
  )
}
