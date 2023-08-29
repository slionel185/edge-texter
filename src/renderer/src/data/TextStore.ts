import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Text {
    name: string,
    bucket: string
}

interface TextStore {
    active: boolean,
    setActive: (status: boolean) => void,
    texts: Text[],
    addText: (text: Text) => void,
    clearTexts: () => void
}

export const useTextStore = create<TextStore>()(
    persist(
        (set) => ({
            active: false,
            setActive: (status) => set(() => ({ active: status })),
            texts: [],
            addText: (text) => set((state) => ({ texts: [...state.texts, text] })),
            clearTexts: () => set(() => ({ texts: [] }))
        }),
        {
            name: 'TextStorage',
            partialize: (state) => ({
                texts: state.texts
            })
        }
    )
)