import ChapterType from "@/types/ChapterType";
import { EntryType, ProcessedEntryType } from "@/types/EntryType";
import { generateChapterIds } from "@/utils/generateChapterIds";
import limitesJson from "./capitulos/limites.json";

export type ProcessedChapterType = Omit<ChapterType, "data"> & {
  data: ProcessedEntryType;
};

const rawSumario = {
  limites: {
    chapter: "limites",
    data: limitesJson as EntryType,
  },
} satisfies Record<string, { chapter: string; data: EntryType }>;

export const sumario: Record<string, ProcessedChapterType> = Object.fromEntries(
  Object.entries(rawSumario).map(([key, chapter]) => [
    key,
    generateChapterIds(chapter),
  ])
);