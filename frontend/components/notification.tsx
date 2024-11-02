import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { showErrorToast } from "@/lib/handle-error";
import { cn } from "@/lib/utils";
import { useSocketContext } from "@/providers/socket-io";
import { getNotifications } from "@/services/api/users";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface PropTypes {
  open: boolean;
  hide: () => void;
}

export function Notification({ open, hide }: PropTypes) {
  const { registerEventListener, unRegisterEventListener } = useSocketContext();
  const [notifications, setNotifications] = useState<{
    list: Notification[];
    loading: boolean;
  }>({ list: [], loading: true });

  const newNotificationListener = useCallback((notification: unknown) => {
    const newNotification = notification as Notification;
    if ("id" in newNotification) {
      setNotifications((prev) => ({
        ...prev,
        list: [newNotification, ...prev.list],
      }));
      toast.info("New Notification");
    }
  }, []);

  useEffect(() => {
    async function get() {
      try {
        const notifications = await getNotifications();
        setNotifications({ list: notifications, loading: false });
      } catch (error) {
        showErrorToast(error);
      }
    }
    get();
    const listinerId = registerEventListener(
      "new-notification",
      newNotificationListener
    );

    return () => {
      unRegisterEventListener(listinerId);
    };
  }, [newNotificationListener, registerEventListener, unRegisterEventListener]);

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          hide();
        }
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>
            Updates about your account activity.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {notifications.list.map((item) => (
            <NotificationCard key={item.id} type={item.type} body={item.body} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface NotificationCardPropTypes {
  type: string;
  body: string;
}
export function NotificationCard({ type, body }: NotificationCardPropTypes) {
  return (
    <div
      className={cn(
        "rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs",
        type === "error" && "bg-red-500 text-white"
      )}
    >
      {body}
    </div>
  );
}
