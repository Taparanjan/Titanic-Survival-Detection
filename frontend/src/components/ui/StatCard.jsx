/**
 * StatCard - metric display card for the Dashboard
 */
export default function StatCard({ label, value, trend, trendIcon, variant = 'default' }) {
  return (
    <div className="glass-panel rounded-xl p-unit-md flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
      <span className="font-geist text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">
        {label}
      </span>
      <span className={`font-geist text-headline-md font-semibold ${variant === 'accent' ? 'text-secondary' : 'text-primary'}`}>
        {value}
      </span>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs font-medium" style={{ color: '#4cd7f6' }}>
          {trendIcon && (
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
              {trendIcon}
            </span>
          )}
          <span>{trend}</span>
        </div>
      )}
    </div>
  )
}
