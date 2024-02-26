export function remToPx(value: number): number {
	const fontSize =
		typeof window === "undefined"
			? 16
			: parseFloat(window.getComputedStyle(document.documentElement).fontSize);

	return value * fontSize;
}
