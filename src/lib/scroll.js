let lenis = null;

export const setLenis = (l) => {
  lenis = l;
};
export const getLenis = () => lenis;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!lenis) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  lenis.scrollTo(el, {
    duration: 1.8,
    // If the page changed height on the way (a card closing behind the
    // pointer, say), settle exactly on the section.
    onComplete: () => {
      if (Math.abs(el.getBoundingClientRect().top) > 2) lenis.scrollTo(el, { duration: 0.5 });
    },
  });
}
