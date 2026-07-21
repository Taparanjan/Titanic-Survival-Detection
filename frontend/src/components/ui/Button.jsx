/**
 * Button - Primary or secondary variant
 * variant: 'primary' | 'secondary'
 */
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} px-8 py-3 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
