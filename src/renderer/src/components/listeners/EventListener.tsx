import { useEffect } from 'react'

import { useTextStore } from '@/data/TextStore'

export default function EventListener() {
    const { active, setActive } = useTextStore()
    
    useEffect(() => {
        window.electron.ipcRenderer.on('event', (_event, args) => {
            if(active) setActive(false)
            if(args[0] === 'active') setActive(true)
            if(args[0] === 'notActive') setActive(false)
        })
    }, [])
    
    return <></>
}