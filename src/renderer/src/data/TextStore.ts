import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Text {
    name: string,
    bucket: string
}

interface TextStore {
    texts: Text[],
    addText: (text: Text) => void,
    clearTexts: () => void
}

export const useTextStore = create<TextStore>()(
    persist(
        (set) => ({
            texts: [],
            addText: (text) => set((state) => ({ texts: [...state.texts, text] })),
            clearTexts: () => set(() => ({ texts: [] }))
        }),
        {
            name: 'TextStorage'
        }
    )
)