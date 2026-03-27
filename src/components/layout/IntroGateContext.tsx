"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroGateContextValue = {
  /** When true, hero drop-in and similar post-intro content may run. */
  introComplete: boolean;
  signalIntroComplete: () => void;
};

const IntroGateContext = createContext<IntroGateContextValue | null>(null);

export function IntroGateProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  const signalIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const value = useMemo(
    () => ({ introComplete, signalIntroComplete }),
    [introComplete, signalIntroComplete],
  );

  return (
    <IntroGateContext.Provider value={value}>
      {children}
    </IntroGateContext.Provider>
  );
}

export function useIntroGate() {
  const ctx = useContext(IntroGateContext);
  if (!ctx) {
    return {
      introComplete: true,
      signalIntroComplete: () => {},
    };
  }
  return ctx;
}
