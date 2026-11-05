"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// Custom schema extending defaultSchema to safely permit table alignments, code styling, and sanitized links
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    th: [...(defaultSchema.attributes?.th || []), "align", "style"],
    td: [...(defaultSchema.attributes?.td || []), "align", "style"],
    code: [...(defaultSchema.attributes?.code || []), "className"],
    a: [...(defaultSchema.attributes?.a || []), "target", "rel"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
  },
};

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = memo(function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content text-sm leading-relaxed text-neutral-200 break-words min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl font-bold text-neutral-100 mt-4 mb-2 pb-1 border-b border-neutral-800 tracking-tight first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg font-bold text-amber-400 mt-3.5 mb-2 tracking-tight first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base font-semibold text-neutral-100 mt-3 mb-1.5 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-mono text-amber-400/90 mt-2.5 mb-1 first:mt-0">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-xs font-semibold text-neutral-300 mt-2 mb-1 first:mt-0">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-xs font-medium text-neutral-400 mt-2 mb-1 first:mt-0">
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="my-2 leading-relaxed text-neutral-200 first:mt-0 last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-neutral-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-300">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="my-2.5 space-y-1.5 pl-5 list-disc marker:text-amber-500/80 text-neutral-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2.5 space-y-1.5 pl-5 list-decimal marker:text-amber-500/80 text-neutral-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-0.5">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-amber-500/70 bg-neutral-900/60 px-3.5 py-2 text-neutral-300 italic rounded-r-lg text-sm">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-3.5 border-neutral-800" />,
          a: ({ href, children }) => {
            const isSafe =
              href &&
              (href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("/") ||
                href.startsWith("mailto:"));

            if (!isSafe) {
              return <span className="underline text-neutral-300">{children}</span>;
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 font-medium underline underline-offset-2 hover:text-amber-300 transition-colors"
              >
                {children}
              </a>
            );
          },
          table: ({ children }) => (
            <div className="my-3.5 w-full overflow-x-auto rounded-xl border border-neutral-800 bg-[#101012] shadow-md">
              <table className="w-full min-w-full divide-y divide-neutral-800 text-left text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-neutral-900/90 font-semibold text-neutral-100 border-b border-neutral-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-neutral-800/30 even:bg-neutral-900/20">
              {children}
            </tr>
          ),
          th: ({ children, style }) => (
            <th
              style={style}
              className="px-3.5 py-2.5 font-mono text-[11px] sm:text-xs tracking-wider uppercase text-neutral-300 font-medium whitespace-nowrap"
            >
              {children}
            </th>
          ),
          td: ({ children, style }) => (
            <td
              style={style}
              className="px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 align-top leading-relaxed"
            >
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <div className="relative my-3 overflow-hidden rounded-xl border border-neutral-800 bg-[#0c0c0e]">
              <pre className="overflow-x-auto p-3.5 font-mono text-xs text-neutral-200 leading-relaxed">
                {children}
              </pre>
            </div>
          ),
          code: ({ className, children }) => {
            const isMultiLine = String(children).includes("\n");
            const isLanguage = Boolean(className);
            const isInline = !isMultiLine && !isLanguage;

            if (isInline) {
              return (
                <code className="rounded bg-neutral-900 border border-neutral-800/90 px-1.5 py-0.5 font-mono text-[12px] text-amber-300 font-medium whitespace-nowrap">
                  {children}
                </code>
              );
            }

            return (
              <code className={`${className || ""} font-mono text-xs text-neutral-200`}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
