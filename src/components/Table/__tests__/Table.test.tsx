import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
} from '../Table';

describe('Table Component', () => {
  it('should render basic table structure', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should apply striped rows when striped prop is true', () => {
    render(
      <Table striped>
        <TableBody>
          <TableRow>
            <TableCell>Row 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('[&_tbody_tr:nth-child(odd)]:bg-gray-100');
  });

  it('should apply hover effect when hoverable prop is true', () => {
    render(
      <Table hoverable>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('[&_tbody_tr:hover]:bg-gray-200');
  });

  describe('TableHeader', () => {
    it('should render sticky header when sticky prop is true', () => {
      render(
        <Table>
          <TableHeader sticky>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const thead = screen.getByRole('rowgroup');
      expect(thead).toHaveClass('sticky', 'top-0', 'z-10');
    });
  });

  describe('TableCell', () => {
    it('should apply correct alignment classes', () => {
      const { rerender } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByText('Content')).toHaveClass('text-center');

      rerender(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByText('Content')).toHaveClass('text-right');
    });
  });

  describe('TableHead', () => {
    it('should render with correct base styles', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass('h-10');
    });
  });

  describe('TableRow', () => {
    it('should apply selected state styles', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-selected={true}>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByRole('row');
      expect(row).toHaveClass('bg-gray-100');
    });
  });

  describe('TableCaption', () => {
    it('should render with correct styles', () => {
      render(
        <Table>
          <TableCaption>Caption Text</TableCaption>
        </Table>
      );
      const caption = screen.getByText('Caption Text');
      expect(caption).toHaveClass('mt-4', 'text-sm');
    });
  });

  describe('TableFooter', () => {
    it('should render with correct styles', () => {
      render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer Content</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const footer = screen.getByRole('rowgroup');
      expect(footer).toHaveClass('bg-gray-900', 'font-medium');
    });
  });
});
