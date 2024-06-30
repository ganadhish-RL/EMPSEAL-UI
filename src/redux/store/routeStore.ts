import create from 'zustand';

export const useStore = create((set) => ({
    route: [],
    setRoute: (route: any) => set({ route }),
}));