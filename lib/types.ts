export interface BlogPost {
  id: string;
  title: string;
  category: string | null;
  tags: string[];
  published: string | null;
  status: string | null;
  summary: string;
}

export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'code'
  | 'quote'
  | 'image'
  | 'divider';

export interface RichText {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    code: boolean;
    strikethrough: boolean;
  };
  href: string | null;
}

export interface NotionBlock {
  id: string;
  type: NotionBlockType | string;
  [key: string]: unknown;
}
