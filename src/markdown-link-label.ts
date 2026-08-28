/**
 * Escape a file or resource name used as a markdown link label.
 * Names come from callers and may contain ']' or line breaks.
 */
export function escapeMarkdownLinkLabel(value: string): string {
    return value
        .replaceAll("\\", "\\\\")
        .replaceAll("]", "\\]")
        .replaceAll(/[\r\n]+/g, " ");
}
