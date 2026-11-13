// The small solid star used as a typographic mark (eyebrows, marquee, loader).
export default function Star(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 0 C12.7 7.9 16.1 11.3 24 12 C16.1 12.7 12.7 16.1 12 24 C11.3 16.1 7.9 12.7 0 12 C7.9 11.3 11.3 7.9 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
