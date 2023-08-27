import { useEffect, useState } from 'react'
import { SunMoon } from 'lucide-react'

import { useUserStore } from '@/data/UserStore'

import { Button } from '@/components/ui/button'
import { useTextStore } from '@/data/TextStore'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useTheme } from '@/components/providers/ThemeProvider'
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'

export default function Navbar() {
    const { clearTexts } = useTextStore()
    const { theme, setTheme } = useTheme()
    const { user, clearUser } = useUserStore()

    const [selectedTheme, setSelectedTheme] = useState<string>(theme)

    useEffect(() => {
        if(selectedTheme === 'light') return setTheme('light')
        if(selectedTheme === 'dark') return setTheme('dark')
        if(selectedTheme === 'system') return setTheme('system')
    }, [selectedTheme])

    return (
        <div className='h-20 flex justify-center items-center border-b'>
            <div className='flex flex-row justify-between items-center w-full max-w-7xl p-4 h-full'>
                <div className='flex flex-col justify-start items-start'>
                    <h1 className='text-foreground scroll-m-20 text-3xl font-extrabold tracking-tight'>The Edge</h1>
                    <p className='text-muted-foreground'>Text Blaster</p>
                </div>

                <div className='flex gap-4 items-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'} size={'icon'} className='rounded-full'>
                                <SunMoon className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-24'>
                            <DropdownMenuRadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
                                <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value='system'>System</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className='border-solid cursor-pointer' onClick={() => { clearUser(); clearTexts() }}>
                                    <AvatarFallback>{user?.username.split('')[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}