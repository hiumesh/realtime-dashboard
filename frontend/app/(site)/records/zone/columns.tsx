import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { TaxiZoneLookup } from "@/types/api/records";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TaxiZoneLookup>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "borough",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borough" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "zone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Zone" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "serviceZone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Zone" />
    ),
    enableSorting: false,
  },
];
