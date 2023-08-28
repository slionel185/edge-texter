import { useEffect } from 'react'

import { useTextStore } from '@/data/TextStore'

export default function TextListener() {
    const { addText } = useTextStore()

    useEffect(() => {    
        window.electron.ipcRenderer.on('text-sent', (_event, args) => {
            let name = args[0]
            let bucket = args[1]

            console.log(`Adding ${name} to text list.`)
            addText({ name, bucket })
        })
    }, [])

    return <></>
}