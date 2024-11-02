"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile, getSession } from "@/services/api/users";
import { showErrorToast } from "@/lib/handle-error";
import { Notification } from "@/components/notification";

type Context = {
  profile: undefined | UserProfile;
  session: Awaited<ReturnType<typeof getSession>> | undefined;
  setProfile: Dispatch<SetStateAction<UserProfile | undefined>>;
  refreshProfile: () => Promise<void>;
  showNotification: () => void;
};

const AppContext = createContext<Context>({
  profile: undefined,
  session: undefined,
  setProfile: () => {},
  refreshProfile: async () => {},
  showNotification: () => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<undefined | UserProfile>(undefined);
  const [session, setSession] = useState<
    Awaited<ReturnType<typeof getSession>> | undefined
  >();
  const [notifications, setNotifications] = useState(false);

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await getProfile();

      setProfile(profile);
    } catch (error: unknown) {
      showErrorToast(error, "Failed to refresh the profile data.");
    }
  }, []);

  useEffect(() => {
    async function getCurrentSession() {
      try {
        const session = await getSession();
        setSession(session);
      } catch (error: unknown) {
        showErrorToast(error, "Failed to refresh the profile data.");
      }
    }

    getCurrentSession();
    refreshProfile();
  }, [refreshProfile]);

  return (
    <AppContext.Provider
      value={{
        profile,
        session,
        setProfile,
        refreshProfile,
        showNotification: () => {
          setNotifications(true);
        },
      }}
    >
      {children}
      <Notification open={notifications} hide={() => setNotifications(false)} />
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
