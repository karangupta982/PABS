// components/ui/Table/table.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
} from "@/lib/types";

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hasError, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50",
        hasError && "bg-red-50/50 hover:bg-red-50/70",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, error, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        error && "text-red-600",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {error && (
          <div className="group relative">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-red-500 px-2 py-1 text-xs text-white group-hover:block">
              {error}
            </div>
          </div>
        )}
      </div>
    </td>
  )
);
TableCell.displayName = "TableCell";
