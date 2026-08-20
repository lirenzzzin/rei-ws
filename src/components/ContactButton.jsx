import { Link } from "wouter";
import { getWhatsAppUrl } from "../config/site";

function ContactButton({
  children = "Entrar em contato",
  appearance = "primary",
  className = "",
  href = "/contato",
  message,
}) {
  const appearanceClass =
    appearance === "secondary"
      ? "border-line bg-canvas text-ink"
      : "border-black bg-black text-white";

  const whatsappUrl = getWhatsAppUrl(message);
  const sharedProps = {
    className: `inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-center text-sm font-semibold ${appearanceClass} ${className}`,
  };

  if (whatsappUrl) {
    return <a {...sharedProps} href={whatsappUrl} target="_blank" rel="noreferrer">{children}</a>;
  }

  return (
    <Link
      href={href}
      {...sharedProps}
    >
      {children}
    </Link>
  );
}

export default ContactButton;
