"use client";
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";

import _ from "lodash";
import { motion } from "framer-motion";

const FullLoader = ({
  shouldClose,
  duration,
}: {
  shouldClose?: boolean;
  duration?: number;
}) => {
  const [closed, setClosed] = useState(false);
  const DURATION = duration ?? 500;

  useEffect(() => {
    if (shouldClose && !closed) {
      document.body.style.overflowY = "hidden";
      _.delay(() => setClosed(!closed), DURATION);
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [shouldClose, DURATION, setClosed, closed]);

  if (closed) return null;

  return (
    <div className="fixed top-0 w-full h-dvh flex items-center justify-center z-[999] bg-white">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <LucideLoader2
          size={64}
          strokeWidth={1}
          className="text-jean-orange animate-spin"
        />
        {shouldClose && <h3>Loading...</h3>}
      </motion.div>
    </div>
  );
};
export default FullLoader;
