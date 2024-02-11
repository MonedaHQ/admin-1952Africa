import { useEffect, useState } from 'react';

export function useRefreshData(time = 1000) {
  const [isReloading, setIsReloading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReloading(false);
    }, time);

    return () => clearTimeout(timeoutId);
  }, [setIsReloading]);

  return isReloading;
}
