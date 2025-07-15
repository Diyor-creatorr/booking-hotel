'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { pb } from '@/lib/pocketbase'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalUsers: 0,
    totalReservations: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [rooms, users, reservations] = await Promise.all([
          pb.collection('rooms').getList(1, 1),
          pb.collection('users').getList(1, 1),
          pb.collection('reservations').getList(1, 1),
        ])

        setStats({
          totalRooms: rooms.totalItems,
          totalUsers: users.totalItems,
          totalReservations: reservations.totalItems,
        })
      } catch (error) {
        console.error('İstatistikler alınırken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Oda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRooms}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Toplam Rezervasyon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReservations}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard 