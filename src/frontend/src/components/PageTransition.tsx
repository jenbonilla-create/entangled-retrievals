import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPath}
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
