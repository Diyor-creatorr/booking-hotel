'use client'

import { Button } from '@/components/ui/button'
import { pb } from '@/lib/pocketbase'
import { useToast } from '@/components/ui/use-toast'
import { Home, Hotel, Image, LogOut, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminSidebar = () => {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      pb.authStore.clear()
      toast({
        title: 'Başarıyla çıkış yapıldı',
        variant: 'default',
      })
      router.push('/auth/login')
    } catch (error) {
      toast({
        title: 'Çıkış yapılırken hata oluştu',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="space-y-4">
        <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin/rooms">
          <Button variant="ghost" className="w-full justify-start">
            <Hotel className="mr-2" />
            Odalar
          </Button>
        </Link>
        <Link href="/admin/users">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2" />
            Kullanıcılar
          </Button>
        </Link>
        <Link href="/admin/slider">
          <Button variant="ghost" className="w-full justify-start">
            <Image className="mr-2" />
            Slider
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  )
}

export default AdminSidebar 