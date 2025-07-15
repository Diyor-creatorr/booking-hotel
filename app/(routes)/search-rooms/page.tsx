'use client';

import { pb } from '@/lib/pocketbase';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RoomItem from '../_components/RoomItem';

const SearchPageRooms = () => {
    const searchParams = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // URL parametrelerini al
    const arrivalDate = searchParams.get('arrivalDate');
    const departureDate = searchParams.get('departureDate');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');

    // Kullanılabilir odaları getir
    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                // Rezervasyonları getir ve dolu odaları belirle
                const reservations = await pb.collection('reservations').getFullList({
                    filter: `arrival_date <= "${departureDate}" && departure_date >= "${arrivalDate}"`,
                    sort: '-created',
                });

                const reservedRoomIds = reservations.map((reservation) => reservation.room);

                // Odaları filtrele
                const filters = reservedRoomIds.length
                    ? reservedRoomIds.map((id) => `id != ${JSON.stringify(id)}`).join(' && ')
                    : '';

                // Filtrelenmiş odaları getir
                const resultList = await pb.collection('rooms').getList(1, 50, {
                    filter: `${filters ? `(${filters}) && ` : ''}created >= "2025-01-01 00:00:00"`,
                });

                setRooms(resultList.items);
            } catch (error) {
                console.error('Oda verileri yüklenirken hata:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailableRooms();
    }, [arrivalDate, departureDate, adults, children]);

    // Yükleme ekranı
    if (isLoading) {
        return (
            <div className="pt-44 container flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    // Oda bulunmazsa
    if (rooms.length === 0) {
        return (
            <div className="pt-44 container text-center">
                <h2 className="text-2xl font-bold mb-4">Uygun oda bulunamadı</h2>
                <p>Lütfen farklı tarihler veya kişi sayıları deneyin.</p>
            </div>
        );
    }

    // Oda listesi
    return (
        <div className="pt-44 container mb-44">
            <h1 className="text-3xl font-bold mb-4">Uygun Odalar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {rooms.map((room) => (
                    <RoomItem room={room} key={room.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchPageRooms;
