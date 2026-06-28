import { LoadingSpinner } from "@/components/LoadingSpinner";
import { RouterProvider } from "@tanstack/react-router";
import { Suspense } from "react";
import { router } from "./router";

function App() {
  return (
    <div className="min-h-screen bg-transparent font-body antialiased dark bg-silhouette-overlay">
      <Suspense
        fallback={
          <LoadingSpinner fullScreen text="Loading Entangled Retrievals..." />
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
