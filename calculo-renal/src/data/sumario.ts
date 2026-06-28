import ChapterType from "@/types/ChapterType";
import { EntryType, ProcessedEntryType } from "@/types/EntryType";
import { processJSON } from "@/utils/processJSON";
import limitesJson from "./capitulos/limites.json";

export type ProcessedChapterType = Omit<ChapterType, "data"> & {
  id: number;
  data: ProcessedEntryType;
};

const rawSumario = {
  limites: {
    chapter: "limites",
    data: limitesJson as EntryType,
  },
} satisfies Record<string, { chapter: string; data: EntryType }>;

let chapterIdCounter = 1;

export const sumario: Record<string, ProcessedChapterType> = Object.fromEntries(
  Object.entries(rawSumario).map(([key, chapter]) => {
    const currentId = chapterIdCounter++;
    
    return [
      key,
      {
        ...processJSON(chapter, currentId),
        id: currentId,
      },
    ];
  })
);