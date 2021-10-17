import { useEffect, useRef } from 'react';

export default function usePreviousState(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
