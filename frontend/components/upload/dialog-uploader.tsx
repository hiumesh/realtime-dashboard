"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUploader from "./file-uploader";

interface DialogUploaderProps {
  title?: string;
  onSuccessfulFileUpload?: ({
    filename,
    key,
  }: {
    filename: string;
    key: string;
  }) => Promise<void>;
}
export function DialogUploader({
  title,
  onSuccessfulFileUpload,
}: DialogUploaderProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shadow" variant="outline">
          {title || "Upload Files"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Upload your files</DialogTitle>
          <DialogDescription className="text-center">
            The only file upload you will ever need
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FileUploader onSuccessfulFileUpload={onSuccessfulFileUpload} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
