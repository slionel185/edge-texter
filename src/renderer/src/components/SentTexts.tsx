import { useTextStore } from '@/data/TextStore'

export default function SentTexts() {
    const { texts } = useTextStore()

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 h-full w-full'>
            {texts.map((text, idx) => (
                <div className='flex h-full px-4 py-2 justify-between' key={idx}>
                    <h1>{text.name}</h1>
                    <h1>{text.bucket}</h1>
                </div>
            ))}
        </div>
    )
}