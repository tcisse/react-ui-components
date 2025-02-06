import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from '../Table';

describe('Table Component', () => {
  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  it('renders table with header and body', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

    // Verify header cells
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();

    // Verify data cells
    mockData.forEach((row) => {
      expect(screen.getByText(row.id.toString())).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.email)).toBeInTheDocument();
    });
  });

  it('applies custom className to table components', () => {
    const { container } = render(
      <Table className="custom-table">
        <TableHead className="custom-head">
          <TableRow className="custom-row">
            <TableHeadCell className="custom-header-cell">Header</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="custom-body">
          <TableRow className="custom-row">
            <TableCell className="custom-cell">Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(container.querySelector('.custom-table')).toBeInTheDocument();
    expect(container.querySelector('.custom-head')).toBeInTheDocument();
    expect(container.querySelector('.custom-body')).toBeInTheDocument();
    expect(container.querySelector('.custom-header-cell')).toBeInTheDocument();
    expect(container.querySelector('.custom-cell')).toBeInTheDocument();
  });

  it('forwards ref to table element', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <TableHead>
          <TableRow>
            <TableHeadCell>Header</TableHeadCell>
          </TableRow>
        </TableHead>
      </Table>
    );

    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});
