import * as React from "react";
import { Table } from "./table";
import { getAll } from "./actions";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { columns } from "./columns";

interface PropTypes {
  searchParams: {
    perPage?: number;
    page?: number;
  };
}
export default function Page({ searchParams }: PropTypes) {
  const promises = Promise.all([getAll({ ...searchParams, withCount: true })]);

  return (
    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={columns.length}
          searchableColumnCount={0}
          filterableColumnCount={0}
          shrinkZero
        />
      }
    >
      <Table promises={promises} />
    </React.Suspense>
  );
}
