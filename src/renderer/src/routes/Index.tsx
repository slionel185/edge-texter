import { Navigate, useLocation } from 'react-router-dom'

import SentTexts from '@/components/SentTexts'
import { useUserStore } from '@/data/UserStore'
import Navbar from '@/components/navbar/Navbar'
import { Button } from '@/components/ui/button'
import { useTextStore } from '@/data/TextStore'
import Dispatch from '@/components/forms/Dispatch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Index() {
    const location = useLocation()
    const { user } = useUserStore()
    const { texts, clearTexts } = useTextStore()

    if(user === null) return <Navigate to='/auth/login' state={{ from: location }} replace />

    return (
        <div className='h-screen w-full overflow-hidden relative'>
            <div className='w-full z-10 absolute top-0 left-0'>            
                <Navbar />
            </div>
            <div className='h-full flex flex-col pt-20 justify-center items-center'>
                <div className='grid w-full h-full grid-rows-3 lg:grid-rows-1 lg:grid-cols-4 max-w-7xl'>
                    <div className='row-span-2 lg:col-span-3 flex flex-col h-full w-full'>
                        <Card className='h-full w-full border-none'>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                                <CardDescription>Please double check values before sending.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Dispatch />
                            </CardContent>
                            <CardFooter>
                                <Button>Test</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className='w-full h-full flex flex-col gap-2 p-4 overflow-hidden border-t lg:border-t-0 lg:border-l' id='sendArray'>
                        <div className='w-full flex justify-between col-span-2'>
                            <h1 className='text-foreground scroll-m-20 text-xl font-extrabold tracking-tight'>Sent: {texts.length}</h1>
                            <Button onClick={() => clearTexts()}>Clear</Button>
                        </div>
                        <ScrollArea className='flex flex-col w-full'>
                            <SentTexts />
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
}