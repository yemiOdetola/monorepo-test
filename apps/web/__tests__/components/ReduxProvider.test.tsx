import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ReduxProvider } from '@/data/providers/redux-provider';

describe('ReduxProvider', () => {
  it('renders children without crashing', () => {
    const { getByText } = render(
      <ReduxProvider>
        <div>Test Child</div>
      </ReduxProvider>
    );
    
    expect(getByText('Test Child')).toBeInTheDocument();
  });
}); 