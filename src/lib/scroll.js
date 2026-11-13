let lenis = null;

export const setLenis = (l) => {
  lenis = l;
};
export const getLenis = () => lenis;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.8 });
  else el.scrollIntoView({ behavior: "smooth" });
}
