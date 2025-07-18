"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { Loader2, Loader2Icon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { pb } from '@/lib/pocketbase'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Adınız en az 2 karakter olmalıdır.",
  }),
  username: z.string().min(2, {
    message: "Kullanıcı Adınız en az 2 karakter olmalıdır.",
  }),
  email: z.string().min(2, {
    message: "Email en az 2 karakter olmalıdır.",
  }),
  password: z.string().min(2, {
    message: "Şifre en az 2 karakter olmalıdır.",
  }),
  passwordConfirm: z.string().min(2, {
    message: "Şifre Tekrarı en az 2 karakter olmalıdır.",
  }),
})


const RegisterPage = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>) => {

    setIsLoading(true)
    try {

      const postdata = {
        username: data.username,
        email: data.email,
        emailVisibility: true,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name
      };
      const record = await pb.collection('users').create(data);
      toast({
        variant: "default",
        title: "Kayıt Başarılı",
      })
      router.refresh();
      router.push("/auth/login");
      
    } catch (error) {

      toast({
        variant: "destructive",
        title: "Bir hata oluştu",
      })
      
    }
    finally{
      setIsLoading(false)
    }
    

   
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adınız</FormLabel>
              <FormControl>
                <Input placeholder="Örnek: John Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input placeholder="Kullanıcı Adınız" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Örnek: deneme@email.com" {...field} />
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
                <Input type='password'  placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre Tekrar</FormLabel>
              <FormControl>
                <Input type='password' placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading ? (
            <>
              <Loader2 size={20} className='animate-spin' /> Loading

            </>
          ) :
            <>
              Kayıt Ol
            </>
          }
        </Button>
      </form>
      <div className='mt-8'>
        <Label className='flex flex-col items-center'>
          Zaten Hesabınımi Var?
        </Label>
        <Link href="/auth/login" className='mt-10 text-slate-500'>
          Giriş Yapmak için Buraya Tıklayın
        </Link>


      </div>
    </Form>
  )
}

export default RegisterPage