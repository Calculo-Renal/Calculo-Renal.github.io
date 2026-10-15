import { ReactNode } from "react";

type ContentType =
  | {
      type: "formula";
      data: string;
    }
  | {
      type: "text";
      data: string;
    }
  | {
      type: "video";
      title: string;
      data: string;
    }
  | {
      type: "interactive";
      data: ReactNode;
    }
  | {
      type: "list";
      data: (string | ContentType)[];
    }
  | {
      type: "row";
      data: ContentType[];
    }
  | {
      type: "col";
      data: ContentType[];
    };

export default ContentType;
