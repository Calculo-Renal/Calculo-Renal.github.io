import ContentType from "@/types/ContentType";
import { EntryType, ProcessedEntryType } from "@/types/EntryType"

export type EntryContentType = ContentType | EntryType;
export type ProcessedEntryContentType = ContentType | ProcessedEntryType;
