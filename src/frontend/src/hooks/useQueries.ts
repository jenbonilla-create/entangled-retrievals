import { createActor } from "@/backend";
import type {
  Address,
  Booking,
  RetrievalType,
  SafetyAssessment,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMyBookings() {
  const { actor } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings", "my"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getMyBookings();
      if (result.__kind__ === "ok") return result.ok;
      return [];
    },
    enabled: !!actor,
  });
}

export function useCreateBooking() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    Booking,
    string,
    {
      retrievalType: RetrievalType;
      pickupAddress: Address;
      safetyAssessment: SafetyAssessment;
      scheduledDate: bigint;
      totalAmount: bigint;
    }
  >({
    mutationFn: async (payload) => {
      if (!actor) throw new Error("Backend unavailable");
      const result = await actor.createBooking(
        payload.retrievalType,
        payload.pickupAddress,
        payload.safetyAssessment,
        payload.scheduledDate,
        payload.totalAmount,
      );
      if (result.__kind__ === "ok") return result.ok;
      const err = result.err;
      if (err.__kind__ === "badRequest") throw new Error(err.badRequest);
      if (err.__kind__ === "internalError") throw new Error(err.internalError);
      if (err.__kind__ === "notFound") throw new Error("Not found");
      if (err.__kind__ === "unauthorized") throw new Error("Unauthorized");
      throw new Error("Booking failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "my"] });
    },
  });
}
