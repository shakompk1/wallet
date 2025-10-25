import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFinanceStore = create()(
    persist(
        (set) => ({
            entries: [],
            addEntry: (e) =>
                set((s) => ({
                    entries: [{ id: Math.random(), ...e }, ...s.entries],
                })),
            removeEntry: (id) =>
                set((s) => ({ entries: s.entries.filter((x) => x.id !== id) })),
            clearAll: () => set({ entries: [] }),
        }),
        {
            name: "finance-tracker-v1",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (s) => ({ entries: s.entries }),
        },
    ),
);
useFinanceStore.getState().clearAll();
