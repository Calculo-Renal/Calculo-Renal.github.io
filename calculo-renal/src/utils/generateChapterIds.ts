import ContentType from "@/types/ContentType";
import { EntryType, ProcessedEntryContentType, ProcessedEntryType } from "@/types/EntryType";

let currentId = 1;

function isContentType(node: ContentType | EntryType): node is ContentType {
  return "type" in node && typeof node.type === "string";
}

function processNode(node: ContentType | EntryType): ProcessedEntryContentType {
  return isContentType(node) ? node : processEntry(node);
}

function processEntry(node: EntryType): ProcessedEntryType {
  const id = currentId++;

  if (Array.isArray(node.content)) {
    return {
      title: node.title,
      id,
      content: node.content.map((subNode) => processNode(subNode)),
    } as ProcessedEntryType;
  }

  if (isContentType(node.content)) {
    return {
      title: node.title,
      id,
      content: node.content,
    } as ProcessedEntryType;
  }

  return {
    title: node.title,
    id,
    content: processEntry(node.content),
  } as ProcessedEntryType;
}

// A função recebe a estrutura bruta baseada em EntryType e devolve a ProcessedChapterType
export function generateChapterIds(chapter: { chapter: string; data: EntryType }) {
  currentId = 1;
  return {
    chapter: chapter.chapter,
    data: processEntry(chapter.data),
  };
}