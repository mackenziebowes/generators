import { JSX, splitProps, createSignal, onMount } from "solid-js";
import { cn } from "~/devano/utils/cn";
import { Show } from "../stateful";

/**
 * The BackgroundSVG "Primitive" is meant for rendering Tiled SVG with live props - that meants animated values!
 * You can animate pattern selection, or use draw frames to update class parameters.
 * Style props are not drilled, feel free to refactor to do so if you feel you need it.
 */

// -- https://heropatterns.com patterns --
function AutumnTilerInstance(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
	const [l, rest] = splitProps(props, ["width", "height", "class"]);
	return (
		<svg
			width={l.width ?? "88"}
			height={l.height ?? "24"}
			viewBox="0 0 88 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class={cn(["fill-current h-auto", l?.class])} // fill-current consumes the parent's "text color" value, h-auto makes it easy to proportionally resize the art
			{...rest}
		>
			<g fill-rule="evenodd">
				<g id="autumn">
					<path d="M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z" />
				</g>
			</g>
		</svg>
	);
}

function HexagonTilerInstance(props: JSX.SvgSVGAttributes<SVGSVGElement>) {
	const [l, rest] = splitProps(props, ["width", "height", "class"]);
	return (
		<svg
			width={l.width ?? "28"}
			height={l.height ?? "49"}
			viewBox="0 0 28 49"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class={cn(["fill-current h-auto", l?.class])}
			{...rest}
		>
			<g fill-rule="evenodd">
				<g
					id="hexagons"
					fill-rule="nonzero"
				>
					<path d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z" />
				</g>
			</g>
		</svg>
	);
}

interface TileContainerProps {
	instance: () => JSX.Element;
	tileWidth: number;
	tileHeight: number;
}

function TileContainer(props: TileContainerProps) {
	const { instance, tileWidth, tileHeight } = props;
	const [cols, set_cols] = createSignal(0);
	const [rows, set_rows] = createSignal(0);
	onMount(() => {
		set_cols(Math.ceil(window.innerWidth / tileWidth));
		set_rows(Math.ceil(window.innerHeight / tileHeight));
	});
	return (
		<div class="w-[100dvw] h-[100dvh] absolute top-0 left-0 pointer-events-none">
			{Array.from({ length: rows() }).map((_, row) =>
				Array.from({ length: cols() }).map((_, col) => (
					<div
						style={{
							position: "absolute",
							left: `${col * tileWidth}px`,
							top: `${row * tileHeight}px`,
							"z-index": -10,
						}}
					>
						{instance()}
					</div>
				))
			)}
		</div>
	);
}

interface TilerProps extends JSX.HTMLAttributes<HTMLDivElement> {
	pattern: "autumn" | "hexagon";
	color?: string;
}

export function Tiler(props: TilerProps) {
	const [shouldShow, set_shouldShow] = createSignal(true);
	onMount(() => set_shouldShow(true));
	if (shouldShow()) {
		return (
			<Show
				content={[
					{
						condition: () => props.pattern == "autumn",
						content: (
							<TileContainer
								tileHeight={24}
								tileWidth={88}
								instance={() => <AutumnTilerInstance class={props?.class} />}
							/>
						),
					},
					{
						condition: () => props.pattern == "hexagon",
						content: (
							<TileContainer
								tileHeight={49}
								tileWidth={28}
								instance={() => <HexagonTilerInstance class={props?.class} />}
							/>
						),
					},
				]}
			/>
		);
	} else {
		return <></>;
	}
}
