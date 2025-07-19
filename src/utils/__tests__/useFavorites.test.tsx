import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../useFavorites';

const FAVORITES_KEY = 'favoriteCurrencies';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with favorites from localStorage', () => {
    localStorage.setItem(FAVORITES_KEY, 'USD,EUR');
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual(['USD', 'EUR']);
  });

  it('should add a favorite and update localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite('USD');
    });
    expect(result.current.favorites).toContain('USD');
    expect(localStorage.getItem(FAVORITES_KEY)).toContain('USD');
  });

  it('should not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite('USD');
      result.current.addFavorite('USD');
    });
    expect(result.current.favorites).toEqual(['USD']);
  });

  it('should remove a favorite and update localStorage', () => {
    localStorage.setItem(FAVORITES_KEY, 'USD,EUR');
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.removeFavorite('USD');
    });
    expect(result.current.favorites).toEqual(['EUR']);
    expect(localStorage.getItem(FAVORITES_KEY)).toBe('EUR');
  });

  it('should check if a code is favorite', () => {
    localStorage.setItem(FAVORITES_KEY, 'USD');
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorite('USD')).toBe(true);
    expect(result.current.isFavorite('EUR')).toBe(false);
  });

  it('should sort items with favorites on top (stable)', () => {
    localStorage.setItem(FAVORITES_KEY, 'USD,EUR');
    const { result } = renderHook(() => useFavorites());
    const items = [
      { code: 'GBP' },
      { code: 'USD' },
      { code: 'EUR' },
      { code: 'CZK' },
    ];
    const sorted = result.current.sortWithFavorites(items, (i) => i.code);
    expect(sorted.map((i) => i.code)).toEqual(['USD', 'EUR', 'GBP', 'CZK']);
  });
});
