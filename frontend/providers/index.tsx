import UseQueryProvider from "./use-query";
import AppContextProvider from "./app-context";
import MyNuqsAdapter from "./nuqs";
import { Toaster } from "sonner";
import SocketContextProvider from "./socket-io";

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyNuqsAdapter>
      <UseQueryProvider>
        <SocketContextProvider>
          <AppContextProvider>
            <>
              {children}
              <Toaster />
            </>
          </AppContextProvider>
        </SocketContextProvider>
      </UseQueryProvider>
    </MyNuqsAdapter>
  );
}
