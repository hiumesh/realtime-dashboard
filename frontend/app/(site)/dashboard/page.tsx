"use client";

import { useSocketContext } from "@/providers/socket-io";
import { TripsPerMonth } from "./charts/trips-per-month";
import { useCallback, useEffect } from "react";

export default function Page() {
  const { registerEventListener, unRegisterEventListener } = useSocketContext();

  const newDashboardListener = useCallback((event: unknown) => {
    console.log(event);
  }, []);

  useEffect(() => {
    const listnerId = registerEventListener(
      "database-events",
      newDashboardListener
    );
    return () => {
      unRegisterEventListener(listnerId);
    };
  }, [newDashboardListener, registerEventListener, unRegisterEventListener]);
  return (
    <div>
      <div className="grid gap-12">
        <div
          id="examples"
          className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          <TripsPerMonth />
        </div>
      </div>
    </div>
  );
}
