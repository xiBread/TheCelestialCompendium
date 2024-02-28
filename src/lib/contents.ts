import { remToPx } from "./util";

export class Contents extends HTMLElement {
	#anchors = [...document.querySelectorAll("a")];
	#headings = document.querySelectorAll("article [id]");
	#current: Element | null;

	#timeout = NaN;
	#observer: IntersectionObserver | undefined;

	public constructor() {
		super();

		this.#current = this.querySelector("a[aria-current='true']");
		this.#observe();

		const onIdle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));

		addEventListener("resize", () => {
			this.#observer?.disconnect();

			clearTimeout(this.#timeout);
			this.#timeout = setTimeout(() => onIdle(() => this.#observe()), 200);
		});
	}

	protected set current(anchor: HTMLAnchorElement) {
		if (anchor === this.#current) return;

		this.#current?.removeAttribute("aria-current");
		anchor.setAttribute("aria-current", "true");

		this.#current = anchor;
	}

	get #rootMargin(): string {
		const topBar = document.querySelector("header")?.getBoundingClientRect().height || 0;
		const mobileToC =
			document.getElementById("mobile-toc")?.getBoundingClientRect().height || 0;

		const top = topBar + mobileToC + remToPx(2);
		const bottom = top + remToPx(mobileToC ? 2.5 : 3.5);

		return `-${top}px 0% ${bottom - document.documentElement.clientHeight}px`;
	}

	#getHeading(element: Element | null): HTMLHeadingElement | null {
		if (!element) return null;

		const ref = element;

		while (element) {
			if (element instanceof HTMLHeadingElement && Number(element.tagName[1]) < 4) {
				return element;
			}

			element = element.previousElementSibling;

			while (element?.lastElementChild) {
				element = element.lastElementChild;
			}

			const heading = this.#getHeading(element);
			if (heading) return heading;
		}

		return this.#getHeading(ref.parentElement);
	}

	#observe(): void {
		this.#observer?.disconnect();
		this.#observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;

					const heading = this.#getHeading(entry.target);
					if (!heading) continue;

					const anchor = this.#anchors.find(
						(a) => a.hash === `#${encodeURIComponent(heading.id)}`,
					);

					if (anchor) {
						this.current = anchor;
						break;
					}
				}
			},
			{ rootMargin: this.#rootMargin },
		);

		this.#headings.forEach((h) => this.#observer!.observe(h));
	}
}

customElements.define("table-of-contents", Contents);
