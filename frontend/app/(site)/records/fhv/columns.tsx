import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { FVHTripRecords } from "@/types/api/records";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FVHTripRecords>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "dispatchingBaseNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dispatching Base Num" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "pickupDatetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pickup Datetime" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "dropoffDatetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dropoff Datetime" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "puLocationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pickup Location Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "doLocationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dropoff Location Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "srFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SR Flag" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "affiliatedBaseNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Affiliated Base Num" />
    ),
    enableSorting: false,
  },
];
