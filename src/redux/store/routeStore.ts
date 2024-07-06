import create from 'zustand';

export const useStore = create((set) => ({
    route: [],
    path: [],
    setRoute: (route: any) => set({ route }),
    setPath: (path: string[]) => set({ path }),
}));