import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export function useQueryParam(
  key: string,
  defaultValue: string = ""
): [string, (value: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlValue = searchParams.get(key) || defaultValue;

  const [value, setValueState] = useState(urlValue);

  useEffect(() => {
    // Keep internal state in sync with URL when back/forward is used
    setValueState(urlValue);
  }, [urlValue]);

  const setValue = (newValue: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, newValue);
    setSearchParams(updatedParams); // updates URL
    setValueState(newValue); // updates internal state
  };

  return [value, setValue];
}

export function usePageParam(
  key: string = "page",
  defaultValue: number = 1
): [number, (page: number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlValue = parseInt(searchParams.get(key) || `${defaultValue}`, 10);

  const [value, setValueState] = useState(urlValue);

  useEffect(() => {
    setValueState(urlValue);
  }, [urlValue]);

  const setValue = (newPage: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, String(newPage));
    setSearchParams(updatedParams);
    setValueState(newPage);
  };

  return [value, setValue];
}
