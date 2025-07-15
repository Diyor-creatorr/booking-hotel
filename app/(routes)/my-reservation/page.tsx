'use client'

import { pb } from '@/lib/pocketbase';
import { Reservation } from '@/types/types';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const MyReservationPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                // Önce auth kontrolü yap
                if (!pb.authStore.isValid) {
                    toast({
                        title: "Erişim Reddedildi",
                        description: "Lütfen önce giriş yapın",
                        variant: "destructive"
                    });
                    router.push('/auth/login');
                    return;
                }

                const userId = pb.authStore.model?.id;
                
                const records = await pb.collection('reservations').getList(1, 50, {
                    filter: `user = "${userId}"`,
                    sort: '-created',
                    expand: 'room'
                });

                setReservations(records.items);
                
            } catch (error) {
                console.error('Rezervasyon bilgileri alınırken hata:', error);
                toast({
                    title: "Hata",
                    description: "Rezervasyonlar yüklenirken bir hata oluştu",
                    variant: "destructive"
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchReservations();

        // Auth durumu değişikliklerini dinle
        pb.authStore.onChange((token) => {
            if (!token) {
                router.push('/auth/login');
            }
        });

        return () => {
            // Cleanup
            pb.authStore.onChange(() => {});
        };
    }, [router, toast]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto pt-44 pb-20">
            <h1 className="text-2xl font-bold mb-6">Rezervasyonlarım</h1>
            
            {reservations.length === 0 ? (
                <div className="text-center py-8">
                    <p>Henüz bir rezervasyonunuz bulunmuyor.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {reservations.map((reservation) => (
                        <div 
                            key={reservation.id} 
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <p className="font-semibold">Misafir Bilgileri</p>
                                    <p>İsim: {reservation.guest_fullname}</p>
                                    <p>Email: {reservation.guest_email}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Rezervasyon Detayları</p>
                                    <p>Giriş: {format(new Date(reservation.arrival_date), 'dd.MM.yyyy')}</p>
                                    <p>Çıkış: {format(new Date(reservation.departure_date), 'dd.MM.yyyy')}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Kişi Sayısı</p>
                                    <p>Yetişkin: {reservation.adults}</p>
                                    <p>Çocuk: {reservation.children}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReservationPage;