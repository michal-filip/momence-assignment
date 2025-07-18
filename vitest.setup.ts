import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockRatesData } from './src/__tests__/mocks/ratesData';

// Mock window.matchMedia for Mantine compatibility in tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for Mantine compatibility in tests
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock useRatesData globally for all tests
vi.mock('./src/utils/ratesData', () => ({
  useRatesData: () => ({
    data: mockRatesData,
    isLoading: false,
    error: null,
  }),
}));
