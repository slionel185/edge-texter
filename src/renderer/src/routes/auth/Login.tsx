import { Navigate, useLocation } from 'react-router-dom'

import { useUserStore } from '@/data/UserStore'

import LoginForm from '@/components/forms/login'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Login() {
    const location = useLocation()
    const { user } = useUserStore()

    if(user !== null) return <Navigate to='/' state={{ from: location }} replace />

    return (
        <div className='h-screen flex justify-center items-center'>
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle className='text-foreground scroll-m-20 text-3xl font-extrabold tracking-tight'>The Edge</CardTitle>
                    <CardDescription>Login with Club-OS</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}