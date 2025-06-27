import { JSX, splitProps, createSignal, Show } from "solid-js";
import { cn } from "~/devano/utils";

interface AvatarFallbackProps extends JSX.HTMLAttributes<HTMLDivElement> {
	name?: string;
	size?: number;
}

interface AvatarProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
	name?: string;
	size?: number;
}

export const Avatar = (props: AvatarProps) => {
	const [loaded, setLoaded] = createSignal(false);
	const [l, rest] = splitProps(props, ["name", "class", "src", "size", "alt"]);

	const px = `${l.size ? Math.max(l.size, 44) : 44}px`; // default 44px
	const randomIndex = Math.floor(Math.random() * 6) + 1;
	const initials = getInitials(l.name);
	return (
		<div
			class={cn("relative rounded-full overflow-hidden", l.class)}
			style={{ width: px, height: px }}
		>
			{/* Fallback layer */}
			<div
				class={cn(
					"absolute inset-0 flex items-center justify-center z-1",
					{
						"opacity-100": !loaded(),
						"opacity-0": loaded(),
					},
					{
						"bg-(--color1-200) text-(--color1-700)": randomIndex == 1,
						"bg-(--color2-200) text-(--color2-700)": randomIndex == 2,
						"bg-(--color3-200) text-(--color3-700)": randomIndex == 3,
						"bg-(--color4-200) text-(--color4-700)": randomIndex == 4,
						"bg-(--color5-200) text-(--color5-700)": randomIndex == 5,
						"bg-(--color6-200) text-(--color6-700)": randomIndex == 6,
					}
				)}
				style={{
					"font-size": `calc(${px} / 2)`,
					"line-height": 1,
				}}
			>
				{initials}
			</div>

			{/* Single image, fades in when loaded */}
			<img
				{...rest}
				src={l.src}
				alt={l.alt || l.name}
				class={cn(
					"w-full h-full object-cover transition-opacity duration-200 z-3",
					{ "opacity-0": !loaded(), "opacity-100": loaded() }
				)}
				onLoad={() => setLoaded(true)}
				onError={() => setLoaded(false)}
			/>
		</div>
	);
};

function getInitials(name = "Anonymous User") {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "";
	if (parts.length === 1) return parts[0][0].toUpperCase();
	return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
}
