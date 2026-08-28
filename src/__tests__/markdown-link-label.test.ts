import {describe, expect, it} from "vitest";
import {escapeMarkdownLinkLabel} from "../markdown-link-label";

describe("escapeMarkdownLinkLabel", () => {
    it("leaves ordinary names unchanged", () => {
        expect(escapeMarkdownLinkLabel("report.txt")).toBe("report.txt");
    });

    it("escapes closing brackets and collapses line breaks", () => {
        expect(escapeMarkdownLinkLabel("notes].md")).toBe("notes\\].md");
        expect(escapeMarkdownLinkLabel("line one\nline two")).toBe("line one line two");
    });
});
