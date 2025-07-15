'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import { Hotel } from '@/types/types'
import { getHotel } from '@/action/getHotel'
import { usePathname } from 'next/navigation'
import { pb } from '@/lib/pocketbase'

interface RouterLayoutProps {
  children: React.ReactNode
}

const RouterLayout = ({ children }: RouterLayoutProps) => {
  const [hotelInfo, setHotelInfo] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const datahotel = await getHotel();
        setHotelInfo(datahotel);
      } catch (error) {
        console.error('Otel bilgileri alınırken hata:', error);
        setHotelInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();

    // Pocketbase auth durumu değişikliklerini dinle
    pb.authStore.onChange(() => {
      console.log('Auth durumu değişti:', pb.authStore.isValid);
    });

    return () => {
      // Cleanup
      pb.authStore.onChange(() => {});
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        {pathname === "/about" && hotelInfo && (
          <div 
            className='pt-44 container'
            dangerouslySetInnerHTML={{ __html: hotelInfo.description }}
          />
        )}
        {children}
      </div>
      <Footer data={hotelInfo} loading={loading} />
    </>
  );
};

export default RouterLayout