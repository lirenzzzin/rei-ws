import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "loja-iphone-template-cart-v1";

function readCart() {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function usePersistentCart() {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item) => {
    setItems((current) => [...current, { ...item, id: createId() }]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  return { items, addItem, removeItem, clearCart };
}
