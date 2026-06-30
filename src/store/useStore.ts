import { create } from "zustand";
import type { PersonalData } from "@/types/personal";
import { defaultData } from "@/data/default";

const STORAGE_KEY = "personal-site-data";
const VERSION_KEY = "personal-site-version";
const DATA_VERSION = "5"; // bump this to force-clear stale localStorage

function isClient() {
  return typeof window !== "undefined";
}

function loadData(): PersonalData {
  if (!isClient()) return defaultData;
  try {
    // Force-clear stale cache when data version changes
    const ver = localStorage.getItem(VERSION_KEY);
    if (ver !== DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, DATA_VERSION);
      return defaultData;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<PersonalData>;
      return { ...defaultData, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return defaultData;
}

function saveData(data: PersonalData) {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

interface StoreState {
  data: PersonalData;
  isEditing: boolean;
  updateData: (data: PersonalData) => void;
  resetData: () => void;
  exportData: () => void;
  importData: (json: string) => boolean;
}

export const useStore = create<StoreState>((set) => ({
  data: loadData(),
  isEditing: false,
  updateData: (data: PersonalData) => {
    saveData(data);
    set({ data });
  },
  resetData: () => {
    saveData(defaultData);
    set({ data: defaultData });
  },
  exportData: () => {
    if (!isClient()) return;
    const state = useStore.getState();
    const blob = new Blob([JSON.stringify(state.data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "personal-site-data.json";
    a.click();
    URL.revokeObjectURL(url);
  },
  importData: (json: string) => {
    try {
      const data = { ...defaultData, ...JSON.parse(json) } as PersonalData;
      saveData(data);
      set({ data });
      return true;
    } catch {
      return false;
    }
  },
}));
