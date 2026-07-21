/**
 * GlassCard - reusable glassmorphism card wrapper
 * variant: 'card' | 'panel' | 'elevated'
 */
export default function GlassCard({ children, className = '', variant = 'card', ...props }) {
  const variantClass =
    variant === 'panel'
      ? 'glass-panel'
      : variant === 'elevated'
      ? 'glass-panel-elevated'
      : 'glass-card'

  return (
    <div className={`${variantClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
