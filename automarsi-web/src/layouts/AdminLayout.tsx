import { useEffect, useState, type ReactNode } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminTopbar from '../components/admin/AdminTopbar'

type AdminLayoutProps = {
  children: ReactNode
  currentPath: string
  onNavigate: (path: string) => void
}

function AdminLayout({ children, currentPath, onNavigate }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.add('admin-theme')

    return () => {
      document.documentElement.classList.remove('admin-theme')
    }
  }, [])

  return (
    <div className="admin-shell grid min-h-screen grid-cols-[236px_1fr] bg-background text-foreground max-md:grid-cols-1">
      <div className="hidden md:block">
        <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} />
      </div>
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="left-0 top-0 h-dvh max-w-[290px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-none bg-sidebar p-0 text-sidebar-foreground">
          <DialogTitle className="sr-only">Admin navigation</DialogTitle>
          <AdminSidebar
            currentPath={currentPath}
            onNavigate={(path) => {
              setMenuOpen(false)
              onNavigate(path)
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="flex min-w-0 flex-col">
        <AdminTopbar
          currentPath={currentPath}
          onNavigate={onNavigate}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <main className="admin-scrollbar mx-auto w-full max-w-[1600px] flex-1 p-5 lg:p-8 max-md:p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
