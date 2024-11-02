import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { updateRole } from "./actions";
import { showErrorToast } from "@/lib/handle-error";
import { toast } from "sonner";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),

    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created On" />
    ),

    cell: ({ row }) => {
      return moment(row.getValue("created_at")).format("ll");
    },
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const updateUserRole = async (data: {
        user_id: string;
        role: string;
      }) => {
        try {
          await updateRole(data);
          toast.success("Role Updated");
        } catch (error) {
          showErrorToast(error);
        }
      };
      return (
        <div className="w-32">
          <Select
            disabled={row.getValue("role") === "admin"}
            defaultValue={row.getValue("role")}
            onValueChange={(value) => {
              if (value) {
                updateUserRole({
                  user_id: row.id,
                  role: value,
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin" disabled>
                Admin
              </SelectItem>

              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },

    enableSorting: false,
  },
];
