import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-bg-surface text-accent hover:scale-95 border-0',
  secondary:
    'bg-text-inverse text-bg-surface hover:scale-95 border-0',
  ghost:
    'bg-transparent text-text-inverse border border-text-inverse/40 hover:border-accent hover:text-accent',
}

const base =
  'inline-flex items-center justify-center rounded-[48px] px-7 py-3 text-sm tracking-[0.14em] transition-[transform,background-color,color,border-color] duration-200'

type ButtonLinkProps = {
  to: string
  children: ReactNode
  variant?: Variant
  className?: string
  external?: boolean
  onClick?: () => void
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
  external,
  onClick,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim()
  if (external || to.startsWith('http')) {
    return (
      <a href={to} className={classes} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
