import ContentType from "@/types/ContentType";

export type EntryContentType = ContentType | EntryType;

export type EntryType = {
  id?: number;
  title: string;
  content: EntryContentType | EntryContentType[];
};

export type ProcessedEntryContentType = ContentType | ProcessedEntryType;

export type ProcessedEntryType = Omit<EntryType, "content"> & {
  id: number;
  content: ProcessedEntryContentType | ProcessedEntryContentType[];
};
