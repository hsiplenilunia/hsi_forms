import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type FlowState = 'invitation' | 'form' | 'success';


interface FlujoRegistroState {
    step: FlowState;
    isRegistered?: boolean;
    isFlowOpen: boolean;
    totalRegistrations: number;
    setCurrentStep: (step: FlowState) => void;
    openFlow: () => void;
    closeFlow: () => void;
    registerOk: () => void;
}

export const useFlujoRegistroStore = create<FlujoRegistroState>()(
    persist(
        (set, get) => ({
            step: 'form',
            isFlowOpen: false,
            isRegistered: false,
            totalRegistrations: 0,
            setCurrentStep: (step) => set({ step }),
            openFlow: () => set({ isFlowOpen: true }),
            closeFlow: () => set({ isFlowOpen: false, step: 'form' }),
            registerOk: () => set({ isRegistered: true, totalRegistrations: get().totalRegistrations + 1}),
        }),
        {
            name: 'flujo-registro-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)