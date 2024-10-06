// https://github.com/mantinedev/mantine/blob/e0721af0aafc7acf2c32aa5275633b218d2fc6af/packages/%40mantine/hooks/src/use-callback-ref/use-callback-ref.ts

import { useEffect, useMemo, useRef } from "react";

export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
