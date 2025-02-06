import { fireEvent, render } from '@testing-library/react';

import React from 'react';

import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return <div ref={ref}>Inside</div>;
    };

    const { container } = render(<TestComponent />);
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler when clicking inside', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return <div ref={ref}>Inside</div>;
    };

    const { getByText } = render(<TestComponent />);
    fireEvent.mouseDown(getByText('Inside'));
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
