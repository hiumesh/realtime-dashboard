import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { HVFHVTripRecords } from "@/types/api/records";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<HVFHVTripRecords>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "hvfhsLicenseNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HVFHS License Num" />
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
    accessorKey: "originatingBaseNum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Originating Base Num" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "requestDatetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Datetime" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "onSceneDatetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="On Scene Datetime" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tripMiles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trip Miles" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tripTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trip Time" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "basePassengerFare",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Base Passenger Fare" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "tolls",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tolls" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "bcf",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BCF" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "salesTax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Tax" />
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
  {
    accessorKey: "tips",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tips" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "driverPay",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver Pay" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "sharedRequestFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shared Request Flag" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "sharedMatchFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shared Match Flag" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "accessARideFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Access A Ride Flag" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "wavRequestFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WAV Request Flag" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "wavMatchFlag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WAV Match Flag" />
    ),
    enableSorting: false,
  },
];
