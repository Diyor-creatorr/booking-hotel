"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { pb } from '@/lib/pocketbase'

const formSchema = z.object({
  email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
})

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      await pb.collection('users').authWithPassword(data.email, data.password);
      
      toast({
        title: "Başarılı",
        description: "Giriş işlemi başarılı",
        variant: "default",
      });
      
      // Yönlendirme öncesi kısa bir bekleme
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.refresh();
      router.push("/");
      
    } catch (error: any) {
      let errorMessage = "Giriş yapılırken bir hata oluştu";
      
      if (error.response?.message) {
        errorMessage = error.response.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="ornek@email.com" 
                  type="email"
                  disabled={isLoading}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="********" 
                  disabled={isLoading}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Giriş Yapılıyor...
            </>
          ) : (
            "Giriş Yap"
          )}
        </Button>
      </form>
      <div className='mt-8 text-center'>
        <Label>Hesabınız Yok mu?</Label>
        <Link 
          href="/auth/register" 
          className='mt-4 block text-slate-500 hover:text-slate-700 transition-colors'
        >
          Hesap Oluşturmak için Tıklayın
        </Link>
      </div>
    </Form>
  )
}

export default LoginPage