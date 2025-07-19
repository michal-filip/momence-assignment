import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'favoriteCurrencies';

function getFavoritesFromStorage(): string[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? stored.split(',').filter(Boolean) : [];
}

function setFavoritesToStorage(favorites: string[]) {
  localStorage.setItem(FAVORITES_KEY, favorites.join(','));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() =>
    getFavoritesFromStorage(),
  );

  useEffect(() => {
    setFavorites(getFavoritesFromStorage());
  }, []);

  const addFavorite = useCallback((code: string) => {
    setFavorites((prev) => {
      if (prev.includes(code)) {
        return prev;
      }

      const updated = [...prev, code];
      setFavoritesToStorage(updated);
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((code: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((c) => c !== code);
      setFavoritesToStorage(updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (code: string) => favorites.includes(code),
    [favorites],
  );

  const sortWithFavorites = useCallback(
    <T,>(items: T[], getCode: (item: T) => string): T[] => {
      const favSet = new Set(favorites);

      return [...items].sort((a, b) => {
        const aIsFav = favSet.has(getCode(a));
        const bIsFav = favSet.has(getCode(b));

        if (aIsFav && !bIsFav) return -1;
        if (!aIsFav && bIsFav) return 1;
        return 0;
      });
    },
    [favorites],
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    sortWithFavorites,
  };
}
