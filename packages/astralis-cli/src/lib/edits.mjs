/**
 * Idempotent string transforms for init's entry-file edits. Every function
 * returns { source, changed, note? } and NEVER guesses: when a file's shape
 * is ambiguous (zero or multiple wrap targets), it declines with a note so
 * init can print manual instructions instead of corrupting code.
 */

/** Add import lines that aren't already present, after the last existing import. */
export function addImports(source, lines) {
  const missing = lines.filter((line) => !source.includes(line));
  if (missing.length === 0) return { source, changed: false };

  const block = missing.join("\n");
  const imports = [...source.matchAll(/^import\s[^\n]*$/gm)];
  if (imports.length > 0) {
    const last = imports[imports.length - 1];
    const insertAt = last.index + last[0].length;
    return { source: source.slice(0, insertAt) + "\n" + block + source.slice(insertAt), changed: true };
  }
  // No imports at all — put them at the top, after a directive if present.
  const directive = source.match(/^["']use \w+["'];?\s*\n/);
  const insertAt = directive ? directive[0].length : 0;
  return { source: source.slice(0, insertAt) + block + "\n" + source.slice(insertAt), changed: true };
}

/** Wrap a single unambiguous occurrence of `target` in open/close JSX tags. */
export function wrapJsx(source, target, open, close) {
  const count = source.split(target).length - 1;
  if (count === 0) return { source, changed: false, note: `no ${target} found to wrap` };
  if (count > 1) return { source, changed: false, note: `${target} appears ${count} times — wrap it manually` };
  return { source: source.replace(target, `${open}${target}${close}`), changed: true };
}

/** Add an attribute to a single unambiguous tag (e.g. suppressHydrationWarning on <html>). */
export function addTagAttribute(source, tag, attribute) {
  if (source.includes(attribute)) return { source, changed: false };
  const matches = [...source.matchAll(new RegExp(`<${tag}(?=[\\s>])`, "g"))];
  if (matches.length !== 1) return { source, changed: false, note: `<${tag}> not found unambiguously` };
  return { source: source.replace(matches[0][0], `<${tag} ${attribute}`), changed: true };
}

/** Insert markup right after the opening <body ...> tag. */
export function insertAfterBodyTag(source, insert) {
  if (source.includes(insert.trim())) return { source, changed: false };
  const matches = [...source.matchAll(/<body[^>]*>/g)];
  if (matches.length !== 1) return { source, changed: false, note: "<body> tag not found unambiguously" };
  const at = matches[0].index + matches[0][0].length;
  return { source: source.slice(0, at) + insert + source.slice(at), changed: true };
}

/** Insert a top-level statement after the import block (e.g. the theme-init const). */
export function addStatementAfterImports(source, statement) {
  if (source.includes(statement.slice(0, 40))) return { source, changed: false };
  const imports = [...source.matchAll(/^import\s[^\n]*$/gm)];
  const insertAt = imports.length > 0 ? imports[imports.length - 1].index + imports[imports.length - 1][0].length : 0;
  return { source: source.slice(0, insertAt) + "\n\n" + statement + source.slice(insertAt), changed: true };
}
