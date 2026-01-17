import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProfeApp | Tu clase, simplificada',
  description: 'Gestiona asistencia, calificaciones y comunicación con tus alumnos. Sin complicaciones.',
  keywords: ['profesor', 'universidad', 'asistencia', 'QR', 'educación', 'México'],
  authors: [{ name: 'Colmena 2026' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#4f46e5',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-mesh">
        {children}
      </body>
    </html>
  )
}
