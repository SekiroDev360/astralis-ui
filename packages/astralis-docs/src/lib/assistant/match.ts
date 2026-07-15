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

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map((t) => SYNONYMS[t] ?? t);
}

/** Bounded Levenshtein — bails to Infinity once the distance exceeds `max`. */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return Infinity;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, row[j]);
    }
    if (rowMin > max) return Infinity;
    prev = row;
  }
  return prev[b.length];
}

/**
 * Typo-tolerant token equality: exact match, a fused word containing the
 * other ("isastralis" ⊃ "astralis" — stopword typed into its neighbor), or a
 * small misspelling ("instal", "thming"). Length floors keep short tokens
 * exact so "form"/"from"-class near-misses can't cascade.
 */
function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  if (shorter.length >= 5 && longer.includes(shorter)) return true;
  if (shorter.length >= 4) return editDistance(a, b, shorter.length >= 8 ? 2 : 1) !== Infinity;
  return false;
}

/** Fraction of the alias's tokens present in the question, plus the raw count. */
function aliasScore(questionTokens: Set<string>, alias: string): { score: number; matched: number } {
  const aliasTokens = tokenize(alias);
  if (aliasTokens.length === 0) return { score: 0, matched: 0 };
  let matched = 0;
  for (const aliasToken of aliasTokens) {
    if (questionTokens.has(aliasToken)) {
      matched += 1;
      continue;
    }
    for (const questionToken of questionTokens) {
      if (tokensMatch(questionToken, aliasToken)) {
        matched += 1;
        break;
      }
    }
  }
  return { score: matched / aliasTokens.length, matched };
}

/** Brand-ish tokens carry no topic signal — every question mentions the library. */
function isBrandToken(token: string): boolean {
  return token.includes("astralis") || token === "ui" || token === "library" || token === "lib";
}

export interface Tier0Match {
  entry: Tier0Entry;
  score: number;
}

/** Best Tier 0 entry for a question, or null when nothing clears the bar. */
export function matchTier0(question: string): Tier0Match | null {
  const questionTokens = new Set(tokenize(question));
  if (questionTokens.size === 0) return null;

  // Identity fast-path: a question that is ONLY brand words ("what is
  // astralis?", "what isastralis" — everything else is stopwords) is asking
  // what the library is. Aliases can't express this: "astralis" alone is too
  // broad a token to score against.
  if ([...questionTokens].every(isBrandToken)) {
    const whatIs = TIER0.find((entry) => entry.id === "what-is");
    if (whatIs) return { entry: whatIs, score: 1 };
  }

  let best: (Tier0Match & { matched: number }) | null = null;
  for (const entry of TIER0) {
    let score = 0;
    let matched = 0;
    for (const alias of entry.aliases) {
      const s = aliasScore(questionTokens, alias);
      if (s.score > score || (s.score === score && s.matched > matched)) {
        score = s.score;
        matched = s.matched;
      }
    }
    // Ties break toward the more specific alias — the one that matched more
    // of the question's actual words.
    if (!best || score > best.score || (score === best.score && matched > best.matched)) {
      best = { entry, score, matched };
    }
  }

  // 0.65: a two-token alias needs both tokens; a three-token alias allows one
  // miss. Below that, a wrong-but-confident canned answer is worse than the
  // Tier 1 fallback.
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
