import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-neon-400 to-neon-500 text-navy-950 shadow-lg shadow-neon-500/30 hover:shadow-neon-400/50 hover:-translate-y-0.5",
  gold:
    "bg-gradient-to-r from-gold-300 to-gold-500 text-navy-950 shadow-lg shadow-gold-500/30 hover:shadow-gold-400/50 hover:-translate-y-0.5",
  outline:
    "border border-white/25 text-white bg-white/5 hover:bg-white/10 hover:border-neon-400 hover:-translate-y-0.5",
  ghost: "text-neon-300 hover:text-white hover:bg-white/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

// Renders a router <Link> when `to` is given, an <a> when `href` is given,
// otherwise a <button>.
export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon: Icon,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {Icon && <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
