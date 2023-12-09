import { useEffect, useRef } from "react";

function useLatest(value) {
  const ref = useRef(value);

  useEffect(() => {
    console.log("change", value);
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default useLatest;
