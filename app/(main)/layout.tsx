import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Background from '@/components/layout/Background'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Navbar />
      <main className="flex-1 relative z-10 pt-14">
        {children}
      </main>
      <Footer />
    </div>
  )
}
