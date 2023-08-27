import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    username: string,
    password: string
}

interface UserStore {
    user: User | null,
    setUser: (newUser: User) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (newUser) => set(() => ({ user: newUser })),
            clearUser: () => set(() => ({ user: null }))
        }),
        {
            name: 'UserStorage'
        }
    )
)