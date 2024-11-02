"use client";

import * as React from "react";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/table/data-table";
import { DataTableToolbar } from "@/components/table/data-table-toolbar";

import { columns } from "./columns";
import { DataTableFilterField } from "@/types";
import { GreenTripRecords } from "@/types/api/records";
import { getAll, uploadCSV } from "./actions";
import { showErrorToast } from "@/lib/handle-error";
import { toast } from "sonner";

interface PropTypes {
  promises: Promise<[Awaited<ReturnType<typeof getAll>>]>;
}

export function Table({ promises }: PropTypes) {
  const [{ data, pageCount }] = React.use(promises);

  const filterFields: DataTableFilterField<GreenTripRecords>[] = [];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  });

  const onSuccessfulFileUpload = React.useCallback(
    async ({ filename, key }: { filename: string; key: string }) => {
      try {
        await uploadCSV(key, filename);
        toast.success(`"${filename}" file Queued for processing`);
      } catch (error) {
        showErrorToast(error);
      }
    },
    []
  );

  const Toolbar = DataTableToolbar;

  return (
    <div className="overflow-hidden">
      <DataTable table={table}>
        <Toolbar
          table={table}
          onSuccessfulFileUpload={onSuccessfulFileUpload}
        ></Toolbar>
      </DataTable>
    </div>
  );
}
