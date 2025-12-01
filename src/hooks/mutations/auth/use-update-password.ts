import { updatePassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: (error: Error) => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
