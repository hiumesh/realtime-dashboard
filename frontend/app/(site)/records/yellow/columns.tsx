import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { YellowTripRecords } from "@/types/api/records";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<YellowTripRecords>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "vendorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tpepPickupDatetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pickup Datetime" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tpepDropoffDatetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dropoff Datetime" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "storeAndFwdFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store And Fwd Flag" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "rateCodeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate Code Id" />
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
    accessorKey: "passengerCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Passenger Count" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tripDistance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trip Distance" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "fareAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fare Amount" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "extra",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extra" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "mtaTax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mta Tax" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tipAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tip Amount" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tollsAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tolls Amount" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "improvementSurcharge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Improvement Surcharge" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "paymentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Type" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tripTip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trip Tip" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "congestionSurcharge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Congestion Surcharge" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "airportFee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Airport Fee" />
    ),
    enableSorting: false,
  },
];
