import { randomFromArray } from "../../_utils/randomFrom";

function copyToClipboard(text: string) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			// Show a success message or toast
			console.log("Copied to clipboard!");
		})
		.catch((err) => {
			console.error("Failed to copy: ", err);
		});
}

export { randomFromArray, copyToClipboard };
