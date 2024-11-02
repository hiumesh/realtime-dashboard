"use client";

import { Table } from "@tanstack/react-table";
import { DialogUploader } from "../upload/dialog-uploader";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSuccessfulFileUpload?: ({
    filename,
    key,
  }: {
    filename: string;
    key: string;
  }) => Promise<void>;
}

export function DataTableToolbar<TData>({
  onSuccessfulFileUpload,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div></div>
      <div className="flex items-center">
        <DialogUploader
          title="Upload CSV"
          onSuccessfulFileUpload={onSuccessfulFileUpload}
        />
      </div>
    </div>
  );
}
