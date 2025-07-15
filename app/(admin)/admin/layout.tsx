'use client'

import { pb } from '@/lib/pocketbase'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AdminSidebar from './_components/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!pb.authStore.isValid) {
          router.push('/auth/login')
          return
        }

        const user = pb.authStore.model
        if (!user?.admin) {
          router.push('/')
          return
        }

        setIsLoading(false)
      } catch (error) {
        router.push('/auth/login')
      }
    }

    checkAdmin()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

export default AdminLayout 