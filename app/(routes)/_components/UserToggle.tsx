'use client'

import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { pb } from '@/lib/pocketbase'
import { useToast } from '@/components/ui/use-toast'

const UserToggle = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const checkAuth = () => {
            if (pb.authStore.isValid) {
                setIsAuthenticated(true);
                setUserName(pb.authStore.model?.name || pb.authStore.model?.username || "");
            } else {
                setIsAuthenticated(false);
                setUserName("");
            }
        };

        checkAuth();
        pb.authStore.onChange(() => {
            checkAuth();
        });
    }, []);

    const onSignout = async () => {
        try {
            pb.authStore.clear();
            toast({
                title: "Çıkış başarılı",
                variant: "default"
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            toast({
                title: "Çıkış yapılırken hata oluştu",
                variant: "destructive"
            });
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                        <UserCircleIcon className='h-6 w-6 text-white' />
                        <span className="text-sm font-medium text-white">
                            {userName}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/my-reservation">
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Rezervasyonlarım</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem 
                            className="cursor-pointer text-red-600 focus:text-red-600" 
                            onClick={onSignout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Çıkış Yap</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/auth/login" className="flex items-center gap-2">
                    <User className="h-5 w-5 text-white" />
                    <span className="text-sm text-white">Giriş Yap</span>
                </Link>
            )}
        </>
    )
}

export default UserToggle