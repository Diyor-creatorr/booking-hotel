'use client'

import { pb } from '@/lib/pocketbase';
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (pb.authStore.isValid) {
        router.push("/");
        router.refresh();
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Auth durumu değiştiğinde kontrol et
    pb.authStore.onChange(() => {
      checkAuth();
    });
  }, [router]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 size={48} className='animate-spin' />
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa auth sayfalarını göster
  return (
    <div className='h-screen flex justify-center items-center bgone'>
      <div className='hidden lg:block w-1/2 h-full'>
        <Image
          alt='login'
          src="/auth.jpg"
          width={1080}
          height={1920}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='w-full lg:w-1/2 p-10 flex flex-col items-center'>
        <div className='flex items-center mb-6'>
          <div className='w-24 py-4 px-3 rounded-xl bg-white'>
            <Link href="/">
              <Image
                src="/logo.png"
                alt='logo'
                width={500}
                height={500}
                className='w-full'
              />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout