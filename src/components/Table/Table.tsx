import React from 'react';

import { cn } from '../../utils/cn';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  stickyHeader?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  bordered?: boolean;
  children: React.ReactNode;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
  children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  'data-selected'?: boolean;
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, stickyHeader, striped, hoverable, compact, bordered, children, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom text-sm',
            striped &&
              '[&_tbody_tr:nth-child(odd)]:bg-gray-100 dark:[&_tbody_tr:nth-child(odd)]:bg-gray-800',
            hoverable && '[&_tbody_tr:hover]:bg-gray-200 dark:[&_tbody_tr:hover]:bg-gray-700',
            compact ? 'border-collapse' : 'border-spacing-0',
            bordered && 'border border-gray-200 dark:border-gray-700 [&_th]:border [&_td]:border',
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(sticky && 'sticky top-0 z-10 bg-white dark:bg-gray-900 shadow', className)}
      {...props}
    />
  )
);

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors dark:border-gray-700',
        props['data-selected'] && 'bg-gray-100 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  )
);

TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<HTMLTableHeaderCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400',
        'bg-white dark:bg-gray-900',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
);

TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-4 align-middle',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
);

TableCell.displayName = 'TableCell';

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('bg-gray-900 font-medium text-gray-50', className)} {...props} />
  )
);

TableFooter.displayName = 'TableFooter';

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-gray-500 dark:text-gray-400', className)}
      {...props}
    />
  )
);

TableCaption.displayName = 'TableCaption';

export const TableHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400',
          '[&:has([role=checkbox])]:pr-0',
          className
        )}
        {...props}
      >
        {children}
      </th>
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';
