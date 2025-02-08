import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

import { Drawer } from '../Drawer';

describe('Drawer Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('should not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={onCloseMock} title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should call onClose when clicking outside', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    // Simulate click outside by clicking the backdrop
    const backdrop = screen.getByTestId('drawer-container');
    fireEvent.mouseDown(backdrop);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose when pressing Escape', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not call onClose when clicking inside the drawer', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    fireEvent.mouseDown(screen.getByText('Test Content'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('should apply correct position class', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} position="left" title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    const drawerContent = screen.getByTestId('drawer-content');
    expect(drawerContent).toHaveClass('left-0');
  });

  it('should apply correct size class', () => {
    render(
      <Drawer isOpen={true} onClose={onCloseMock} size="lg" position="right" title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    const drawerContent = screen.getByTestId('drawer-content');
    expect(drawerContent).toHaveClass('w-96');
  });

  it('should not render overlay when overlay prop is false', () => {
    const { container } = render(
      <Drawer isOpen={true} onClose={onCloseMock} overlay={false} title="Test Drawer">
        <div>Test Content</div>
      </Drawer>
    );

    const overlay = container.querySelector('.bg-black.bg-opacity-50');
    expect(overlay).not.toBeInTheDocument();
  });
});
