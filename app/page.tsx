'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// Hook para manejar instalación PWA
function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    
    // Detectar instalación exitosa
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return false
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setIsInstallable(false)
      return true
    }
    return false
  }

  return { isInstallable, isInstalled, install }
}

// Iconos SVG inline para evitar dependencias
const Icons = {
  QR: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.5v4.5h-4.5V4.5zm0 10.5h4.5v4.5h-4.5V15zm10.5-10.5h4.5v4.5h-4.5V4.5zm0 10.5h1.5m3 0h-1.5m-3 3v-3m3 3h-3m1.5-10.5v3m3-3h-3m-10.5 4.5h3m-3 3h3m4.5-3h3m-3 3h3" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Chart: () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Book: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

// Componente de feature card
function FeatureCard({ icon: Icon, title, description, delay }: { 
  icon: () => JSX.Element
  title: string
  description: string
  delay: string 
}) {
  return (
    <div 
      className={`card p-6 animate-slide-up opacity-0 ${delay}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="w-14 h-14 bg-ink-100 rounded-2xl flex items-center justify-center text-ink-600 mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-pizarra-800 mb-2">{title}</h3>
      <p className="text-pizarra-500 leading-relaxed">{description}</p>
    </div>
  )
}

// Componente de dolor/solución
function PainPoint({ pain, solution }: { pain: string; solution: string }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sol-100 flex items-center justify-center mt-0.5">
        <Icons.Check />
      </div>
      <div>
        <p className="text-pizarra-600 line-through decoration-pizarra-300">{pain}</p>
        <p className="text-pizarra-800 font-medium mt-1">{solution}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { isInstallable, isInstalled, install } = useInstallPrompt()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-pizarra-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-ink-500 to-ink-700 rounded-xl flex items-center justify-center">
              <Icons.Book />
            </div>
            <span className="font-display text-xl font-semibold text-pizarra-800">
              Profe<span className="text-ink-600">App</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Botón Instalar App */}
            {isInstallable && !isInstalled && (
              <button 
                onClick={install}
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-sol-400 to-sol-500 text-pizarra-900 px-4 py-2 rounded-xl text-sm font-semibold hover:from-sol-500 hover:to-sol-600 transition-all shadow-md hover:shadow-lg"
              >
                <Icons.Download />
                Instalar App
              </button>
            )}
            {isInstalled && (
              <span className="hidden sm:inline-flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <Icons.CheckCircle />
                Instalada
              </span>
            )}
            <Link href="/login" className="btn-outline text-sm py-2 px-4">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className={`${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-ink-100 text-ink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Para profesores universitarios
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-pizarra-900 leading-tight mb-6">
                Tu clase,{' '}
                <span className="text-gradient">simplificada</span>
              </h1>
              
              <p className="text-xl text-pizarra-600 leading-relaxed mb-8 max-w-lg">
                Olvídate del Excel, el papel y el WhatsApp. Gestiona asistencia con un QR, 
                calificaciones en un click, y comunicación sin dar tu número personal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/profesor" className="btn-profe">
                  <Icons.Users />
                  <span className="ml-2">Soy Profesor</span>
                  <span className="ml-2"><Icons.ArrowRight /></span>
                </Link>
                <Link href="/alumno" className="btn-alumno">
                  <Icons.Book />
                  <span className="ml-2">Soy Alumno</span>
                </Link>
              </div>
              
              <p className="mt-6 text-sm text-pizarra-400">
                Sin costo · Sin tarjeta · Funciona offline
              </p>
            </div>
            
            {/* Right: Visual */}
            <div className={`relative ${mounted ? 'animate-slide-up stagger-2' : 'opacity-0'}`} style={{ animationFillMode: 'forwards' }}>
              {/* QR Preview mockup */}
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-br from-ink-200/50 via-transparent to-sol-200/50 rounded-3xl blur-2xl"></div>
                
                {/* Main card */}
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-pizarra-100">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-pizarra-400">Estadística Aplicada</p>
                      <p className="text-lg font-semibold text-pizarra-800">Grupo 4A · Martes 8:00</p>
                    </div>
                    <div className="badge badge-success">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                      En vivo
                    </div>
                  </div>
                  
                  {/* QR Placeholder */}
                  <div className="aspect-square max-w-[280px] mx-auto bg-gradient-to-br from-ink-50 to-pizarra-100 rounded-2xl flex items-center justify-center mb-6 border-4 border-ink-100">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-ink-600 rounded-2xl flex items-center justify-center text-white">
                        <Icons.QR />
                      </div>
                      <p className="text-pizarra-500 font-medium">Código QR dinámico</p>
                      <p className="text-sm text-pizarra-400">Cambia cada 2 min</p>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-emerald-50 rounded-xl p-3">
                      <p className="text-2xl font-bold text-emerald-600">32</p>
                      <p className="text-xs text-emerald-600">Presentes</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3">
                      <p className="text-2xl font-bold text-amber-600">3</p>
                      <p className="text-xs text-amber-600">Retardos</p>
                    </div>
                    <div className="bg-pizarra-100 rounded-xl p-3">
                      <p className="text-2xl font-bold text-pizarra-600">5</p>
                      <p className="text-xs text-pizarra-500">Faltas</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-lg p-3 animate-float">
                  <p className="text-sm font-medium text-emerald-600">✓ Ana García - 8:02am</p>
                </div>
                <div className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: '1s' }}>
                  <p className="text-sm font-medium text-emerald-600">✓ Luis Pérez - 8:03am</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-pizarra-900 mb-4">
              ¿Te suena familiar?
            </h2>
            <p className="text-xl text-pizarra-500 max-w-2xl mx-auto">
              Sabemos que ser profe ya es suficiente trabajo. 
              No deberías perder tiempo en cosas que pueden ser automáticas.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <PainPoint 
              pain="Paso lista en papel y luego la capturo en Excel"
              solution="QR dinámico: los alumnos escanean y listo"
            />
            <PainPoint 
              pain="Los alumnos me escriben al WhatsApp a las 11pm"
              solution="Avisos en la app, sin dar tu número personal"
            />
            <PainPoint 
              pain="Uso 5 apps diferentes que no se conectan"
              solution="Todo en un solo lugar, funciona offline"
            />
            <PainPoint 
              pain="Al final tengo que volver a capturar todo en el sistema"
              solution="Exporta a Excel/CSV compatible con tu universidad"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-pizarra-900 mb-4">
              Simple pero poderoso
            </h2>
            <p className="text-xl text-pizarra-500">
              Todo lo que necesitas, nada que no
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Icons.QR}
              title="Asistencia con QR"
              description="Genera un código que cambia cada 2 minutos. Imposible de falsificar."
              delay="stagger-1"
            />
            <FeatureCard 
              icon={Icons.Clock}
              title="Funciona offline"
              description="Sin internet en el salón? No hay problema. Sincroniza después."
              delay="stagger-2"
            />
            <FeatureCard 
              icon={Icons.Shield}
              title="Tu privacidad"
              description="Comunícate con tus alumnos sin dar tu WhatsApp personal."
              delay="stagger-3"
            />
            <FeatureCard 
              icon={Icons.Chart}
              title="Reportes fáciles"
              description="Exporta calificaciones y asistencia en formatos que tu universidad acepta."
              delay="stagger-4"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink-600 to-ink-800 rounded-3xl"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] rounded-3xl opacity-50"></div>
            
            {/* Content */}
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Empieza gratis hoy
              </h2>
              <p className="text-xl text-ink-200 mb-8 max-w-lg mx-auto">
                No necesitas tarjeta de crédito. Configura tu primera clase en menos de 5 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/profesor" className="bg-white text-ink-700 px-8 py-4 rounded-xl font-semibold hover:bg-ink-50 transition-colors shadow-lg">
                  Crear mi cuenta de profesor
                </Link>
                {isInstallable && !isInstalled && (
                  <button 
                    onClick={install}
                    className="bg-sol-400 text-pizarra-900 px-8 py-4 rounded-xl font-semibold hover:bg-sol-300 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Icons.Download />
                    Instalar App
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón flotante de instalación para móvil */}
      {isInstallable && !isInstalled && (
        <button
          onClick={install}
          className="fixed bottom-6 right-6 sm:hidden z-50 bg-gradient-to-r from-sol-400 to-sol-500 text-pizarra-900 p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all animate-pulse-soft"
          aria-label="Instalar App"
        >
          <Icons.Download />
        </button>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-pizarra-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-ink-500 to-ink-700 rounded-lg flex items-center justify-center text-white">
                <Icons.Book />
              </div>
              <span className="font-display text-lg font-semibold text-pizarra-700">
                ProfeApp
              </span>
            </div>
            <p className="text-sm text-pizarra-400">
              Hecho con 🧡 por Colmena 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
