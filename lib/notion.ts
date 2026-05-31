import { Client } from '@notionhq/client';
import type { BlogPost, NotionBlock } from './types';

const isConfigured =
  !!process.env.NOTION_API_KEY && !!process.env.NOTION_DATABASE_ID;

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY ?? '',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? '';

function extractPlainText(richTexts: Array<{ plain_text: string }>): string {
  return richTexts.map((t) => t.plain_text).join('');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePost(page: any): BlogPost {
  const props = page.properties;

  const title = extractPlainText(props.Title?.title ?? []);
  const category = props.Category?.select?.name ?? null;
  const tags = (props.Tags?.multi_select ?? []).map(
    (t: { name: string }) => t.name
  );
  const published = props.Published?.date?.start ?? null;
  const status = props.Status?.select?.name ?? null;

  const summaryRichTexts: Array<{ plain_text: string }> =
    props.Summary?.rich_text ?? [];
  const summary = extractPlainText(summaryRichTexts);

  return { id: page.id, title, category, tags, published, status, summary };
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!isConfigured) return [];

  const response = await notionClient.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'Status',
      select: { equals: '발행됨' },
    },
    sorts: [{ property: 'Published', direction: 'descending' }],
  });

  return response.results.map(parsePost);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  if (!isConfigured) return [];

  const response = await notionClient.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        { property: 'Status', select: { equals: '발행됨' } },
        { property: 'Category', select: { equals: category } },
      ],
    },
    sorts: [{ property: 'Published', direction: 'descending' }],
  });

  return response.results.map(parsePost);
}

export async function getPost(pageId: string): Promise<BlogPost> {
  const page = await notionClient.pages.retrieve({ page_id: pageId });
  return parsePost(page);
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  const response = await notionClient.blocks.children.list({
    block_id: pageId,
  });

  return response.results as NotionBlock[];
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getPosts();
  const categories = posts
    .map((p) => p.category)
    .filter((c): c is string => c !== null);
  return [...new Set(categories)];
}
