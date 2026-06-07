import { create } from "zustand";

const useBookingStore = create((set) => ({
  step: 0,
  selectedService: null,
  selectedDate: null,
  selectedSlot: null,
  selectedPortfolio: null,
  customer: { firstName: "", lastName: "", phone: "" },
  trackingNumber: null,

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),

  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setSelectedPortfolio: (portfolio) => set({ selectedPortfolio: portfolio }),
  setCustomer: (customer) => set({ customer }),

  resetBooking: () =>
    set({
      step: 0,
      selectedService: null,
      selectedDate: null,
      selectedSlot: null,
      selectedPortfolio: null,
      customer: { firstName: "", lastName: "", phone: "" },
      trackingNumber: null,
    }),

  setTrackingNumber: (number) => set({ trackingNumber: number }),
}));

export default useBookingStore;