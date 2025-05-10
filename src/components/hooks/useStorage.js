import { useState, useEffect } from 'react';

export default function useStorage(storageKey, initialValue) {
  let savedData;

  const unparsedSavedData = localStorage.getItem(storageKey);
  savedData = unparsedSavedData ? JSON.parse(unparsedSavedData) : null;

  const [data, setData] = useState(savedData ?? initialValue);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
