import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


// 1. Definir la interfaz para el estado y las acciones
interface BearState {
    bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: (newBears: number) => void;
}

export const useStore = create<BearState>()(
    persist(
        (set, get) => ({
            bears: 0,
            increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            removeAllBears: () => set({ bears: 0 }),
            updateBears: (newBears) => set({ bears: newBears }),
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)
