import { createActor as rawCreateActor } from "@/backend";
import type { Backend } from "@/backend";

/**
 * Safe wrapper around the generated createActor that handles missing
 * canister IDs and other initialization failures gracefully.
 */
export function createActorSafe(): Backend | null {
  try {
    const canisterId = import.meta.env.CANISTER_ID_BACKEND || "";
    const host =
      import.meta.env.CANISTER_BACKEND_HOST || "http://localhost:4943";

    if (!canisterId || canisterId === "undefined") {
      console.warn(
        "[createActorSafe] No backend canister ID available. Actor not created.",
      );
      return null;
    }

    // Provide no-op upload/download handlers since we don't use file storage yet
    const noopUpload = async (): Promise<Uint8Array> => new Uint8Array(0);
    const noopDownload = async (bytes: Uint8Array) => {
      // Return a minimal ExternalBlob-like object
      return {
        directURL: "",
        getBytes: async () => bytes,
        getDirectURL: () => "",
      } as unknown as import("@/backend").ExternalBlob;
    };

    return rawCreateActor(canisterId, noopUpload, noopDownload, {
      agentOptions: { host },
    });
  } catch (err) {
    console.error("[createActorSafe] Failed to create actor:", err);
    return null;
  }
}
