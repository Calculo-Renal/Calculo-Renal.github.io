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
      data: string;
    }
  | {
      type: "interactive";
      data: ReactNode;
    }
  | {
      type: "row";
      data: ContentType[];
    };

export default ContentType;
