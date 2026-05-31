import React from 'react';
import Image from 'next/image';
import type { NotionBlock, RichText } from '@/lib/types';

interface NotionRendererProps {
  blocks: NotionBlock[];
}

function renderRichText(richTexts: RichText[]): React.ReactNode {
  return richTexts.map((text, i) => {
    let node: React.ReactNode = text.plain_text;

    if (text.annotations.bold) node = <strong key={i}>{node}</strong>;
    if (text.annotations.italic) node = <em key={i}>{node}</em>;
    if (text.annotations.code)
      node = (
        <code key={i} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
          {node}
        </code>
      );
    if (text.annotations.strikethrough) node = <del key={i}>{node}</del>;
    if (text.href)
      node = (
        <a key={i} href={text.href} className="underline text-primary" target="_blank" rel="noopener noreferrer">
          {node}
        </a>
      );

    return <span key={i}>{node}</span>;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Block({ block }: { block: any }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="my-3 leading-7 text-foreground">
          {renderRichText(block.paragraph.rich_text)}
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="mt-8 mb-4 text-3xl font-bold text-foreground">
          {renderRichText(block.heading_1.rich_text)}
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="mt-6 mb-3 text-2xl font-semibold text-foreground">
          {renderRichText(block.heading_2.rich_text)}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="mt-5 mb-2 text-xl font-semibold text-foreground">
          {renderRichText(block.heading_3.rich_text)}
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li className="my-1 ml-6 list-disc text-foreground">
          {renderRichText(block.bulleted_list_item.rich_text)}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="my-1 ml-6 list-decimal text-foreground">
          {renderRichText(block.numbered_list_item.rich_text)}
        </li>
      );

    case 'code':
      return (
        <pre className="my-4 p-4 bg-muted rounded-lg overflow-x-auto">
          <code className="text-sm font-mono text-foreground">
            {block.code.rich_text.map((t: RichText) => t.plain_text).join('')}
          </code>
        </pre>
      );

    case 'quote':
      return (
        <blockquote className="my-4 pl-4 border-l-4 border-primary text-muted-foreground italic">
          {renderRichText(block.quote.rich_text)}
        </blockquote>
      );

    case 'image': {
      const url =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      const caption = block.image.caption
        ?.map((t: RichText) => t.plain_text)
        .join('') ?? '';

      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video">
            <Image
              src={url}
              alt={caption || '이미지'}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'divider':
      return <hr className="my-6 border-border" />;

    default:
      return null;
  }
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
}
