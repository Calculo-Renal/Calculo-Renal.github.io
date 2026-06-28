import { EntryContentType, ProcessedEntryContentType } from "@/types/EntryContentType"

export type EntryType = {
  id?: number;
  title: string;
  unnumbered?: boolean;
  content: EntryContentType | EntryContentType[];
};

export type ProcessedEntryType = Omit<EntryType, "content"> & {
  id: number;
  depth: number;
  label: string;
  unnumbered: boolean;
  content: ProcessedEntryContentType | ProcessedEntryContentType[];
};