import { marked } from "marked";
import { createHighlighter } from "shiki";

export async function setupMarkdownHighlighter() {
  const highlighter = await createHighlighter({
    themes: ["catppuccin-latte", "tokyo-night"],
    langs: [
      "go",
      "typescript",
      "javascript",
      "bash",
      "python",
      "yaml",
      "json",
      "markdown",
      "text",
      "txt",
      "sql",
      "dockerfile",
      "rust",
      "cpp",
      "c",
    ],
  });

  marked.use({
    renderer: {
      code(textOrToken: any, langOrUndefined?: string) {
        let text = "";
        let lang = "";

        if (typeof textOrToken === "string") {
          text = textOrToken;
          lang = langOrUndefined || "";
        } else {
          // It's a token (Marked v12+)
          text = textOrToken.text || "";
          lang = textOrToken.lang || "";
        }
        
        const mappedLang = (lang || "").toLowerCase();

        // Standard Shiki variables for fallback/plaintext consistency
        const fallbackStyle = "--shiki-light:#4c4f69;--shiki-dark:#a9b1d6;--shiki-light-bg:#eff1f5;--shiki-dark-bg:#1a1b26";

        if (!mappedLang || mappedLang === "text" || mappedLang === "txt" || mappedLang === "plaintext") {
          return `<pre class="shiki not-prose" style="${fallbackStyle}"><code>${text}</code></pre>`;
        }

        try {
          const html = highlighter.codeToHtml(text, {
            lang: mappedLang,
            themes: {
              light: "catppuccin-latte",
              dark: "tokyo-night",
            },
            defaultColor: false,
          });
          // Inject not-prose class
          return html.replace('<pre class="shiki', '<pre class="shiki not-prose');
        } catch (e) {
          console.warn(`Shiki highlighting failed for ${mappedLang}, falling back to plain text.`);
          return `<pre class="shiki not-prose" style="${fallbackStyle}"><code>${text}</code></pre>`;
        }
      },
    },
  });
}
