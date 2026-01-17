'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// Generador simple de QR como SVG (sin dependencias externas)
function generateQRPattern(data: string): boolean[][] {
  // Crear un patrón pseudoaleatorio basado en el hash del string
  const hash = data.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0
  }, 0)
  
  const size = 21 // QR estándar version 1
  const pattern: boolean[][] = []
  
  for (let i = 0; i < size; i++) {
    pattern[i] = []
    for (let j = 0; j < size; j++) {
      // Patrones de posición (esquinas)
      const isPositionPattern = 
        (i < 7 && j < 7) || // Top-left
        (i < 7 && j >= size - 7) || // Top-right
        (i >= size - 7 && j < 7) // Bottom-left
      
      if (isPositionPattern) {
        // Dibujar patrón de posición
        const isOuter = i === 0 || i === 6 || j === 0 || j === 6 ||
                       (i < 7 && (j === size - 7 || j === size - 1)) ||
                       (i >= size - 7 && (j === 0 || j === 6)) ||
                       (j < 7 && (i === 0 || i === 6)) ||
                       ((i === 0 || i === 6) && j >= size - 7)
        const isInner = (i >= 2 && i <= 4 && j >= 2 && j <= 4) ||
                       (i >= 2 && i <= 4 && j >= size - 5 && j <= size - 3) ||
                       (i >= size - 5 && i <= size - 3 && j >= 2 && j <= 4)
        pattern[i][j] = isOuter || isInner
      } else {
        // Datos pseudoaleatorios
        const seed = (hash * (i + 1) * (j + 1)) % 100
        pattern[i][j] = seed > 45
      }
    }
  }
  
  return pattern
}

function QRCode({ data, size = 200 }: { data: string; size?: number }) {
  const pattern = generateQRPattern(data)
  const moduleSize = size / pattern.length
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {pattern.map((row, i) =>
        row.map((cell, j) =>
          cell ? (
            <rect
              key={`${i}-${j}`}
              x={j * moduleSize}
              y={i * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill="#1e1b4b"
            />
          ) : null
        )
      )}
    </svg>
  )
}

// Iconos
const Icons = {
  Back: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  ),
  Refresh: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Warning: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Stop: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
    </svg>
  ),
  Play: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
}

// Datos de ejemplo de alumnos
const mockAlumnos = [
  { id: '1', nombre: 'Ana García López', matricula: '20210001' },
  { id: '2', nombre: 'Carlos Rodríguez', matricula: '20210002' },
  { id: '3', nombre: 'María Fernanda Ruiz', matricula: '20210003' },
  { id: '4', nombre: 'José Luis Hernández', matricula: '20210004' },
  { id: '5', nombre: 'Sofía Martínez', matricula: '20210005' },
  { id: '6', nombre: 'Diego Sánchez', matricula: '20210006' },
  { id: '7', nombre: 'Valentina Torres', matricula: '20210007' },
  { id: '8', nombre: 'Alejandro Flores', matricula: '20210008' },
  { id: '9', nombre: 'Camila Morales', matricula: '20210009' },
  { id: '10', nombre: 'Daniel Ortiz', matricula: '20210010' },
]

interface Asistencia {
  alumnoId: string
  hora: string
  status: 'presente' | 'retardo'
}

export default function ProfesorDashboard() {
  const [sessionActive, setSessionActive] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(120)
  const [asistencias, setAsistencias] = useState<Asistencia[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Configuración de la clase
  const clase = {
    nombre: 'Estadística Aplicada',
    grupo: '4A',
    horario: 'Martes y Jueves 8:00 - 10:00',
    salon: 'Aula 302',
  }

  // Actualizar reloj
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Generar nuevo código QR
  const generateNewQR = useCallback(() => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const code = `PROFEAPP-${clase.grupo}-${timestamp}-${random}`
    setQrCode(code)
    setTimeLeft(120)
  }, [clase.grupo])

  // Iniciar/detener sesión
  const toggleSession = () => {
    if (sessionActive) {
      setSessionActive(false)
      setQrCode('')
    } else {
      setSessionActive(true)
      generateNewQR()
      // Simular asistencias entrando
      simulateAsistencias()
    }
  }

  // Simular asistencias (para demo)
  const simulateAsistencias = () => {
    const shuffled = [...mockAlumnos].sort(() => Math.random() - 0.5)
    let delay = 0
    
    shuffled.slice(0, 8).forEach((alumno, index) => {
      delay += Math.random() * 3000 + 1000
      setTimeout(() => {
        const now = new Date()
        const hora = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
        const status = index < 6 ? 'presente' : 'retardo'
        
        setAsistencias(prev => [...prev, {
          alumnoId: alumno.id,
          hora,
          status
        }])
      }, delay)
    })
  }

  // Countdown del QR
  useEffect(() => {
    if (!sessionActive) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          generateNewQR()
          return 120
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [sessionActive, generateNewQR])

  // Calcular estadísticas
  const presentes = asistencias.filter(a => a.status === 'presente').length
  const retardos = asistencias.filter(a => a.status === 'retardo').length
  const faltas = mockAlumnos.length - asistencias.length

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white border-b border-pizarra-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-pizarra-400 hover:text-pizarra-600 transition-colors">
                <Icons.Back />
              </Link>
              <div>
                <h1 className="text-xl font-display font-semibold text-pizarra-800">
                  {clase.nombre}
                </h1>
                <p className="text-sm text-pizarra-500">
                  Grupo {clase.grupo} · {clase.horario}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-semibold text-pizarra-800">
                {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm text-pizarra-500">
                {currentTime.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: QR */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-pizarra-800">
                  Tomar Asistencia
                </h2>
                {sessionActive && (
                  <span className="badge badge-success">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                    En vivo
                  </span>
                )}
              </div>

              {sessionActive ? (
                <>
                  {/* QR Code */}
                  <div className="bg-white rounded-2xl p-4 border-4 border-ink-100 mb-6">
                    <QRCode data={qrCode} size={250} />
                  </div>

                  {/* Timer */}
                  <div className="bg-pizarra-100 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-pizarra-600">
                        <Icons.Clock />
                        <span className="text-sm">Próximo código en:</span>
                      </div>
                      <span className="font-mono text-2xl font-bold text-ink-600">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-pizarra-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-ink-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${(timeLeft / 120) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Manual refresh */}
                  <button 
                    onClick={generateNewQR}
                    className="w-full btn-outline mb-4"
                  >
                    <Icons.Refresh />
                    <span className="ml-2">Generar nuevo código</span>
                  </button>

                  {/* Stop session */}
                  <button 
                    onClick={toggleSession}
                    className="w-full bg-red-50 text-red-600 border border-red-200 px-6 py-3 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Icons.Stop />
                    <span>Terminar sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto bg-pizarra-100 rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-12 h-12 text-pizarra-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.5v4.5h-4.5V4.5zm0 10.5h4.5v4.5h-4.5V15zm10.5-10.5h4.5v4.5h-4.5V4.5zm0 10.5h1.5m3 0h-1.5m-3 3v-3m3 3h-3m1.5-10.5v3m3-3h-3m-10.5 4.5h3m-3 3h3m4.5-3h3m-3 3h3" />
                      </svg>
                    </div>
                    <p className="text-pizarra-500 mb-6">
                      Inicia la sesión para generar el código QR de asistencia
                    </p>
                    <button 
                      onClick={toggleSession}
                      className="btn-profe w-full"
                    >
                      <Icons.Play />
                      <span className="ml-2">Iniciar sesión de asistencia</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Columna derecha: Lista y stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-emerald-600">{presentes}</p>
                <p className="text-sm text-pizarra-500 mt-1">Presentes</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-amber-500">{retardos}</p>
                <p className="text-sm text-pizarra-500 mt-1">Retardos</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-pizarra-400">{faltas}</p>
                <p className="text-sm text-pizarra-500 mt-1">Sin registrar</p>
              </div>
            </div>

            {/* Lista de alumnos */}
            <div className="card">
              <div className="p-6 border-b border-pizarra-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-pizarra-800 flex items-center gap-2">
                    <Icons.Users />
                    Lista del grupo
                  </h2>
                  <span className="text-sm text-pizarra-500">
                    {mockAlumnos.length} alumnos
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-pizarra-100">
                {mockAlumnos.map((alumno) => {
                  const asistencia = asistencias.find(a => a.alumnoId === alumno.id)
                  
                  return (
                    <div 
                      key={alumno.id}
                      className={`p-4 flex items-center justify-between transition-colors ${
                        asistencia ? 'bg-emerald-50/50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          asistencia 
                            ? asistencia.status === 'presente'
                              ? 'bg-emerald-100 text-emerald-600'
                              : 'bg-amber-100 text-amber-600'
                            : 'bg-pizarra-100 text-pizarra-400'
                        }`}>
                          {asistencia ? (
                            asistencia.status === 'presente' ? <Icons.Check /> : <Icons.Warning />
                          ) : (
                            alumno.nombre.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-pizarra-800">{alumno.nombre}</p>
                          <p className="text-sm text-pizarra-400">{alumno.matricula}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {asistencia ? (
                          <>
                            <span className={`badge ${
                              asistencia.status === 'presente' ? 'badge-success' : 'badge-warning'
                            }`}>
                              {asistencia.status === 'presente' ? 'Presente' : 'Retardo'}
                            </span>
                            <p className="text-xs text-pizarra-400 mt-1">{asistencia.hora}</p>
                          </>
                        ) : (
                          <span className="text-sm text-pizarra-400">—</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
