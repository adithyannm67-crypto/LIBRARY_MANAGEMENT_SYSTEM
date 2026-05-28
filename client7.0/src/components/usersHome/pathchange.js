
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Pathhange() {
  const pathname = usePathname();
  useEffect(() => {
    console.log("Path changed:", pathname);
  }, [pathname]);
  return null;
}
