const styles = {
  success: {
    icon: 'check_circle',
    className: 'border-success/25 bg-success/10 text-success',
  },
  error: {
    icon: 'error',
    className: 'border-error/25 bg-error/10 text-error',
  },
  info: {
    icon: 'info',
    className: 'border-secondary/25 bg-secondary/10 text-secondary',
  },
}

export default function Notification({ type = 'info', title, message, onDismiss }) {
  const style = styles[type] || styles.info

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${style.className}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <span className="material-symbols-outlined mt-0.5 shrink-0" aria-hidden="true">
        {style.icon}
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="font-geist text-label-md">{title}</p>}
        {message && <p className="font-inter text-body-sm text-on-surface-variant">{message}</p>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full p-1 text-on-surface-variant transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
          aria-label="Dismiss notification"
        >
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            close
          </span>
        </button>
      )}
    </div>
  )
}
