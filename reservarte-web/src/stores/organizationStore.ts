import { create } from 'zustand';

interface OrganizationState {
  currentOrganization: any | null;
  setOrganization: (org: any) => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  currentOrganization: null,
  setOrganization: (org) => set({ currentOrganization: org }),
}));
