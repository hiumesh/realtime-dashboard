"use client";

import * as React from "react";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/table/data-table";

import { columns } from "./columns";
import { DataTableFilterField } from "@/types";
import { getAll } from "./actions";

interface PropTypes {
  promises: Promise<[Awaited<ReturnType<typeof getAll>>]>;
}

export function Table({ promises }: PropTypes) {
  const [{ data, pageCount }] = React.use(promises);

  const filterFields: DataTableFilterField<User>[] = [];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => `${originalRow.id}`,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <div className="overflow-hidden">
      <DataTable table={table}></DataTable>
    </div>
  );
}
