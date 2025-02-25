import { fireEvent, render } from '@testing-library/react';

import React from 'react';

import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = jest.fn();
    
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <div ref={ref} data-testid="inside">
          Inside Content
        </div>
      );
    };

    render(<TestComponent />);
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    
    fireEvent.mouseDown(outsideElement);
    expect(handler).toHaveBeenCalled();
    
    document.body.removeChild(outsideElement);
  });

  it('should not call handler when clicking inside', () => {
    const handler = jest.fn();
    
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <div ref={ref} data-testid="inside">
          Inside Content
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const insideElement = getByTestId('inside');
    
    fireEvent.mouseDown(insideElement);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle null ref', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return null;
    };

    render(<TestComponent />);
    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();
  });
});
