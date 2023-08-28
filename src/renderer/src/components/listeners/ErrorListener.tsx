import { useEffect } from 'react'

import { useToast } from '@/components/ui/use-toast'

export default function ErrorListener() {
    const { toast } = useToast()

    useEffect(() => {
        window.electron.ipcRenderer.on('error', (_event, args) => {
            console.log(args)
            toast({
                title: 'Error',
                description: args[0],
                variant: 'destructive'
            })
        })
    }, [])
    
    return <></>
}