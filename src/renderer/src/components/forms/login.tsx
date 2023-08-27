import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginFormType, LoginFormSchema } from '@/types/LoginForm'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/data/UserStore'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

export default function LoginForm() {
    const { setUser } = useUserStore()

    const form = useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema) })

    function onSubmit(values: LoginFormType) {
        setUser(values)
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <FormField name='username' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input className='w-full' autoCapitalize='false' placeholder='Username' {...field} />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField name='password' control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input className='w-full' type='password' autoCapitalize='false' placeholder='Password' {...field} />
                        </FormControl>
                    </FormItem>
                )} />

                <Button className='w-full mt-4' type='submit'>Login</Button>
            </form>
        </Form>
    )
}