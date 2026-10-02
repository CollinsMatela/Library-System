/**
 * Shared helpers for the two library readers.
 */

/**
 * Turns stored HTML into speakable plain text.
 *
 * `textContent` (and `innerText` on a detached node) ignores block boundaries,
 * so `<p>Hello</p><p>World</p>` collapses to "HelloWorld" and is read as one
 * run-on word. Separators are injected after every block element first.
 */
export const htmlToText = (html) => {
  const container = document.createElement("div");
  container.innerHTML = html;

  container
    .querySelectorAll(
      "p, div, h1, h2, h3, h4, h5, h6, li, blockquote, br, tr, pre",
    )
    .forEach((node) => node.appendChild(document.createTextNode(" ")));

  return (container.textContent || "").replace(/\s+/g, " ").trim();
};

// Quill writes indentation as `ql-indent-N` classes that are normally styled by
// quill.core.css. Declaring them here keeps the readers self-sufficient and uses
// a tighter step than the editor's 3rem, which suits a narrow column.
export const QUILL_STYLES = [
  "[&_.ql-align-left]:text-left",
  "[&_.ql-align-center]:text-center",
  "[&_.ql-align-right]:text-right",
  "[&_.ql-align-justify]:text-justify",
  "[&_.ql-indent-1]:pl-6",
  "[&_.ql-indent-2]:pl-12",
  "[&_.ql-indent-3]:pl-18",
  "[&_.ql-indent-4]:pl-24",
  "[&_.ql-indent-5]:pl-30",
  "[&_.ql-indent-6]:pl-36",
  "[&_.ql-indent-7]:pl-42",
  "[&_.ql-indent-8]:pl-48",
].join(" ");

// Vertical rhythm, headings and inline elements for sanitized Quill markup.
// Heading sizes are expressed in `em` so they scale with the A-/A+ control.
export const PROSE_STYLES = [
  "[&>*+*]:mt-[0.85em]",
  "[&_h1]:text-[1.5em] sm:[&_h1]:text-[1.8em] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mt-[0.6em]",
  "[&_h2]:text-[1.3em] sm:[&_h2]:text-[1.5em] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-[1em]",
  "[&_h3]:text-[1.15em] sm:[&_h3]:text-[1.25em] [&_h3]:font-semibold [&_h3]:mt-[1em]",
  "[&_ul]:list-disc [&_ul]:pl-[1.4em] [&_ol]:list-decimal [&_ol]:pl-[1.4em] [&_li]:my-[0.2em]",
  "[&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:text-[0.95em]",
  "[&_a]:underline [&_a]:underline-offset-2",
  "[&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-xl",
  "[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-3 [&_pre]:text-[0.85em]",
  "[&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.9em]",
  "[&_hr]:my-6",
].join(" ");