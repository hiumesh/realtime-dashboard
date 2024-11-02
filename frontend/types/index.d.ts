export interface DataTableFilterField<TData> {
  id: keyof TData;
  label: string;
  placeholder?: string;
  options?: Option[];
}
