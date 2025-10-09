// TODO: Implement useToast hook with shadcn/ui toast
export const useToast = () => {
  return {
    toast: (message: string) => {
      console.log('Toast:', message);
    },
  };
};
