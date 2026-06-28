import ContentType from "@/types/ContentType";
import { ProcessedEntryContentType } from "@/types/EntryContentType";
import { EntryType, ProcessedEntryType } from "@/types/EntryType";

let currentId = 1;

function isContentType(node: ContentType | EntryType): node is ContentType {
  return "type" in node && typeof node.type === "string";
}

function processNode(
  node: ContentType | EntryType, 
  depth: number, 
  pushedDepth: number,
  numberState: { currentNumbers: number[] }
): ProcessedEntryContentType {
  return isContentType(node) ? node : processEntry(node, depth, pushedDepth, numberState);
}

function processEntry(
  node: EntryType, 
  depth: number = 0, 
  pushedDepth: number = 0,
  numberState: { currentNumbers: number[] } = { currentNumbers: [] }
): ProcessedEntryType {
  const id = currentId++;
  const isUnnumbered = node.unnumbered ?? false;

  let localLabel = "";
  let nextPushedDepth = pushedDepth;

  if (!isUnnumbered) {
    while (numberState.currentNumbers.length <= pushedDepth) {
      numberState.currentNumbers.push(0);
    }
    
    numberState.currentNumbers = numberState.currentNumbers.slice(0, pushedDepth + 1);
    
    if (depth > 0) {
      numberState.currentNumbers[pushedDepth]++;
    }
    
    localLabel = numberState.currentNumbers.join(".");
    nextPushedDepth = pushedDepth + 1;
  }

  const childState = {
    currentNumbers: isUnnumbered ? [] : [...numberState.currentNumbers],
  };

  let processedContent: ProcessedEntryContentType | ProcessedEntryContentType[];

  if (Array.isArray(node.content)) {
    processedContent = node.content.map((subNode) => 
      processNode(subNode, depth + 1, isUnnumbered ? 0 : nextPushedDepth, childState)
    );
  } else {
    processedContent = processNode(node.content, depth + 1, isUnnumbered ? 0 : nextPushedDepth, childState);
  }

  return {
    title:
    depth === 0 && localLabel
      ? `Capítulo ${localLabel}: ${node.title}`
      : node.title,
    id,
    depth,
    label: localLabel,
    unnumbered: isUnnumbered,
    content: processedContent,
  } as ProcessedEntryType;
}

export function processJSON(chapter: { chapter: string; data: EntryType }, chapterNumber: number) {
  currentId = 1;
  return {
    chapter: chapter.chapter,
    data: processEntry(chapter.data, 0, 0, { currentNumbers: [chapterNumber] }),
  };
}