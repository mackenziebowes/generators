import { splitProps, JSX } from "solid-js";

/**
 * For use with a key listener system. Don't use this on mobile apps - higher in the component tree, use tailwind or smth to turn these off and replace them with plain text.
 */

interface KeyIndicatorArgs extends JSX.HTMLAttributes<HTMLHeadingElement> {
	label: string;
	key: string;
}
export function KeyIndicator(props: KeyIndicatorArgs) {
	const [l, rest] = splitProps(props, ["label", "key", "class"]);

	const wrapKey = (text: string, key: string) => {
		const split = text.split(key);
		if (split.length < 2) {
			return (
				<>
					<strong>[{key}]</strong> {text}
				</>
			);
		} else {
			return (
				<>
					{split[0]}
					<strong>[{key}]</strong>
					{split.slice(1).join(key)}
				</>
			);
		}
	};

	return wrapKey(l.label, l.key);
}
