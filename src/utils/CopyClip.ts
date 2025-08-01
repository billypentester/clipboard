export const copyClipData = async (
  e: React.MouseEvent<HTMLDivElement>,
  content: string
) => {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();

  // Calculate max distance to corners for full coverage
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  const radius = Math.max(
    Math.hypot(rect.width - clickX, rect.height - clickY),
    Math.hypot(clickX, rect.height - clickY),
    Math.hypot(rect.width - clickX, clickY),
    Math.hypot(clickX, clickY)
  );

  const ripple = document.createElement("span");
  ripple.className = "clip-ripple";
  const size = radius * 2;
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${clickX - radius}px`;
  ripple.style.top = `${clickY - radius}px`;

  target.appendChild(ripple);

  ripple.addEventListener("animationend", () => ripple.remove());

  await navigator.clipboard.writeText(content);
};
