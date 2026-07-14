import { navigation } from "@/lib/navigation";
import { TIER0, type Tier0Entry } from "./tier0";

/**
 * The Tier 0 matcher: scores a free-text question against each entry's alias
 * phrases with normalized token overlap. Deliberately lexical and tiny — it
 * runs in the browser on every keystroke-submitted question, costs nothing,
 * and only needs to catch the well-trodden questions (misses fall through to
 * page suggestions now, and to the Tier 1 model in Phase B).
 */

const STOPWORDS = new Set([
  "a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in",
  "is", "it", "my", "of", "on", "or", "the", "this", "that", "to", "use",
  "what", "when", "where", "which", "why", "with", "you", "u", "we", "me", "your",
]);

/** Spelling/wording variants folded before matching. */
const SYNONYMS: Record<string, string> = {
  colour: "color",
  colours: "colors",
  theming: "theme",
  themes: "theme",
  colorschemes: "colorscheme",
  components: "component",
  props: "prop",
  buttons: "button",
  tokens: "token",
  installing: "install",
  installed: "install",
  installation: "install",
  tailwindcss: "tailwind",
  toasts: "toast",
  darkmode: "dark",
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map((t) => SYNONYMS[t] ?? t);
}

/** Fraction of the alias's tokens present in the question (0..1). */
function aliasScore(questionTokens: Set<string>, alias: string): number {
  const aliasTokens = tokenize(alias);
  if (aliasTokens.length === 0) return 0;
  const matched = aliasTokens.filter((t) => questionTokens.has(t)).length;
  return matched / aliasTokens.length;
}

export interface Tier0Match {
  entry: Tier0Entry;
  score: number;
}

/** Best Tier 0 entry for a question, or null when nothing clears the bar. */
export function matchTier0(question: string): Tier0Match | null {
  const questionTokens = new Set(tokenize(question));
  if (questionTokens.size === 0) return null;

  let best: Tier0Match | null = null;
  for (const entry of TIER0) {
    let score = 0;
    for (const alias of entry.aliases) {
      score = Math.max(score, aliasScore(questionTokens, alias));
      if (score === 1) break;
    }
    if (!best || score > best.score) best = { entry, score };
  }

  // 0.65: a two-token alias needs both tokens; a three-token alias allows one
  // miss. Below that, a wrong-but-confident canned answer is worse than the
  // page-suggestion fallback.
  return best && best.score >= 0.65 ? best : null;
}

export interface PageSuggestion {
  title: string;
  href: string;
}

/** Docs pages whose titles overlap the question — the graceful-miss fallback. */
export function suggestPages(question: string, limit = 3): PageSuggestion[] {
  const questionTokens = new Set(tokenize(question));
  const scored: Array<PageSuggestion & { score: number }> = [];

  for (const section of navigation) {
    for (const item of section.items) {
      if (item.status === "soon") continue;
      const titleTokens = tokenize(`${item.title} ${section.title}`);
      const matched = titleTokens.filter((t) => questionTokens.has(t)).length;
      if (matched > 0) {
        scored.push({ title: item.title, href: item.href, score: matched / titleTokens.length });
      }
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ title, href }) => ({ title, href }));
}
