// scripts/inject-tw-hint-global.ts
import { Project, SyntaxKind } from "ts-morph";
// Point this at your compiled utils (or .ts if your runtime supports it)
import { min, max } from "../src/devano/utils";

// bump this to your actual breakpoint keys
const bpKeys = ["sm", "md", "lg", "xl", "2xl"] as const;
type Bp = (typeof bpKeys)[number];

const patterns = process.argv.slice(2);
if (patterns.length === 0) {
	console.error("Usage: inject-tw-hint-global.ts <glob> [more globs]");
	process.exit(1);
}
const project = new Project({
	tsConfigFilePath: "./tsconfig.json",
	skipAddingFilesFromTsConfig: true,
});
const sf = project.addSourceFilesAtPaths(patterns);
let changeCounter = 0;
sf.forEach((file) => {
	let changeFlag = false;
	file.forEachDescendant((node) => {
		if (!node.isKind(SyntaxKind.CallExpression)) return;
		const call = node.asKindOrThrow(SyntaxKind.CallExpression);
		const text = call.getText();

		// 1) Skip any calls we've already transformed:
		if (text.includes("/* from ")) return;

		// 2) Narrow to exactly min.bp(...) or max.bp(...)
		//    (same logic as before)
		const expr = call.getExpression();
		if (!expr.isKind(SyntaxKind.PropertyAccessExpression)) return;
		const pae = expr.asKindOrThrow(SyntaxKind.PropertyAccessExpression);
		const objName = pae.getExpression().getText(); // "min" or "max"
		const propName = pae.getNameNode().getText(); // "sm","md",…,"2xl"
		if (
			(objName !== "min" && objName !== "max") ||
			!bpKeys.includes(propName as Bp)
		)
			return;

		// 3) Extract the raw string (ignores Prettier line‐breaks)
		const [arg] = call.getArguments();
		if (!arg || !arg.isKind(SyntaxKind.StringLiteral)) return;
		const raw = arg.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralText();

		// 4) Get the real classes from your util
		const hint =
			objName === "min"
				? (min as Record<Bp, (s: string) => string>)[propName as Bp](raw)
				: (max as Record<Bp, (s: string) => string>)[propName as Bp](raw);

		// 5) Replace the entire call with:
		//    - a string literal of the hint
		//    - plus a trailing comment with the original call text
		call.replaceWithText(
			`"${hint}" \n/* from ${objName}["${propName}"]("${raw.trim()}"); */`
		);
		changeFlag = true;
		changeCounter++;
	});
	if (changeFlag) {
		file.saveSync();
		console.log(
			`✅ Injected tw-hints into ${file.getDirectoryPath()}/${file.getBaseName()}`
		);
	}
});

if (changeCounter == 0) {
	console.log("👾 Nothing Updated");
} else if (changeCounter > 0) {
	console.log("💯 ", changeCounter, " Files Updated");
}
