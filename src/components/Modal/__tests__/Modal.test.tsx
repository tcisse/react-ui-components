import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';

import { Modal } from '../Modal';

describe('Modal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <div>Test Content</div>
      </Modal>
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Test Content</div>
      </Modal>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Title">
        <div>Test Content</div>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should call onClose when clicking outside', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Test Content</div>
      </Modal>
    );

    // Simulate click outside by clicking the backdrop
    const backdrop = screen.getByRole('dialog').parentElement;
    if (backdrop) {
      fireEvent.mouseDown(backdrop);
    }

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should call onClose when pressing Escape', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Test Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not call onClose when clicking inside the modal', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Test Content</div>
      </Modal>
    );

    fireEvent.mouseDown(screen.getByText('Test Content'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('should apply correct size class', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} size="lg">
        <div>Test Content</div>
      </Modal>
    );

    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('max-w-lg');
  });
});
