import '@testing-library/jest-dom';

// Mock web APIs
Object.defineProperty(global, 'Request', {
  value: jest.fn().mockImplementation(() => ({})),
  writable: true
});

Object.defineProperty(global, 'Response', {
  value: jest.fn().mockImplementation((body, init) => ({
    json: () => Promise.resolve(body),
    error: () => new Response(),
    redirect: (url) => new Response(null, { status: 302, headers: { Location: url } }),
  })),
  writable: true
});

Object.defineProperty(global, 'Headers', {
  value: jest.fn().mockImplementation(() => ({})),
  writable: true
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
})); 