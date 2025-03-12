import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';

function render(
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'wrapper'> & { preloadedState?: any } = {}
): RenderResult {
  const { preloadedState = {}, ...renderOptions } = options;
  
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  } as RenderResult;
}

export * from '@testing-library/react';
export { render };

// Add basic test
describe('test-utils', () => {
  it('renders with redux provider', () => {
    const TestComponent = () => <div>Test</div>;
    const { getByText } = render(<TestComponent />);
    expect(getByText('Test')).toBeInTheDocument();
  });
}); 