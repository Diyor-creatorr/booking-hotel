'use client'

import ImageVawes from '@/components/ImageVawes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Hotel } from '@/types/types'
import { PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface FooterProps {
    data: Hotel | null;
    loading: boolean;
}

const Footer = ({ data, loading }: FooterProps) => {
    // Eğer veri yükleniyorsa veya veri boşsa
    if (loading || !data) {
        return (
            <div className="relative text-white">
                <div className="z-30 absolute inset-0">
                    <ImageVawes myclassName="absolute -top-5 transform rotate-180" />
                </div>
                <div className="z-20 relative h-96">
                    <Skeleton className="h-full w-full bg-slate-600" />
                </div>
            </div>
        )
    }

    return (
        <div className="relative text-white">
            <div className="z-10 absolute inset-0">
                <ImageVawes myclassName="absolute -top-5 transform rotate-180" />
            </div>
            <div className="z-0 absolute inset-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: 'url(/slider/1.jpg)' }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>

            <div className="z-20 relative">
                <div className="container mx-auto pt-24 pb-16 px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Subscribe Newsletter</h2>
                        <p className="text-gray-400 mt-2">
                            Newsletter dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="mt-4 flex justify-center">
                            <Input placeholder="Your Email Address" className="max-w-lg text-black" />
                            <Button variant="mybutton" className="ml-2 bg-yellow-600">
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="w-24 py-4 px-3 rounded-xl bg-white">
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    width={500}
                                    height={500}
                                    className="w-full"
                                />
                            </div>
                            <p className="text-gray-400 mt-2">
                                {data.summary?.replace(/<\/?[^>]+(>|$)/g, '')}
                            </p>
                        </div>

                        <div>
                            <h3 className='text-xl font-bold mb-4'>Rooms</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Hotel One Suite Turkey Ayvalik Lux Spa Welness</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Hotel One Suite Turkey Ayvalik Lux Spa Welness</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Hotel One Suite Turkey Ayvalik Lux Spa Welness</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Hotel One Suite Turkey Ayvalik Lux Spa Welness</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Hotel One Suite Turkey Ayvalik Lux Spa Welness</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Hotel One Suite Turkey Ayvalik Lux Spa Welness</a></li>
                            </ul>

                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Contact</h3>
                            <p className="text-gray-400 space-y-2">
                                <span className="block">{data.location}</span>
                                <span className="block">{data.contact_phone}</span>
                                <span className="block">{data.contact_email}</span>
                            </p>
                        </div>
                    </div>

                    {/* Alt Bilgi */}
                    <div className="text-center mt-8">
                        <p className="text-gray-400">© Youtube UZKZTEAMCHANNEL</p>
                        <p className="text-gray-400">
                            Designed By Istanbul Topkapi Öğrencisi{' '}
                            <span className="text-yellow-500">Diyorjon Ochilov</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
