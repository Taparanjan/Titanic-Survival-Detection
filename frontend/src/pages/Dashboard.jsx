import StatCard from '../components/ui/StatCard'
import GlassCard from '../components/ui/GlassCard'

const stats = [
  { label: 'Accuracy', value: '82.4%', trend: '+1.2%', trendIcon: 'trending_up', variant: 'accent' },
  { label: 'Precision', value: '79.1%' },
  { label: 'Recall', value: '74.5%' },
  { label: 'F1 Score', value: '76.7%' },
  { label: 'ROC-AUC', value: '0.865', variant: 'accent' },
]

const featureBars = [
  { label: 'Sex_female', width: '85%', opacity: 'bg-secondary/80' },
  { label: 'Pclass_3',   width: '60%', opacity: 'bg-secondary/60' },
  { label: 'Age',        width: '45%', opacity: 'bg-secondary/40' },
  { label: 'Fare',       width: '35%', opacity: 'bg-secondary/30' },
  { label: 'SibSp',      width: '20%', opacity: 'bg-secondary/20' },
]

const modelRows = [
  { model: 'Random Forest (Current)', acc: '82.4%', f1: '76.7%', current: true },
  { model: 'Logistic Regression',     acc: '79.2%', f1: '73.1%' },
  { model: 'XGBoost',                 acc: '81.5%', f1: '75.8%' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <main className="pt-24 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Header */}
        <header className="mb-unit-xl">
          <h1 className="font-geist text-headline-lg text-primary mb-unit-xs">
            Model Performance Dashboard
          </h1>
          <p className="font-inter text-body-lg text-on-surface-variant">
            Real-time metrics and evaluations for the Titanic survival prediction model.
          </p>
        </header>

        {/* Summary Stat Cards */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-unit-md md:gap-gutter mb-unit-xl">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Confusion Matrix */}
          <GlassCard variant="elevated" className="rounded-xl p-unit-lg flex flex-col min-h-[360px]">
            <div className="flex justify-between items-center mb-unit-md border-b border-outline/10 pb-unit-sm">
              <h2 className="font-geist text-label-md text-primary">Confusion Matrix</h2>
              <span className="material-symbols-outlined text-on-surface-variant">grid_on</span>
            </div>
            <div className="flex-grow flex items-center justify-center">
              {/* Visual confusion matrix */}
              <div className="grid grid-cols-2 gap-2 w-64">
                {[
                  { label: 'TN', val: '145', bg: 'bg-secondary/20' },
                  { label: 'FP', val: '23', bg: 'bg-error/10' },
                  { label: 'FN', val: '31', bg: 'bg-error/10' },
                  { label: 'TP', val: '92', bg: 'bg-secondary/30' },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className={`${cell.bg} rounded-lg p-4 flex flex-col items-center justify-center`}
                  >
                    <span className="font-geist text-headline-md font-bold text-primary">{cell.val}</span>
                    <span className="font-inter text-label-sm text-on-surface-variant">{cell.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                <span className="w-3 h-3 rounded-sm bg-secondary/20 inline-block" /> True
              </div>
              <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                <span className="w-3 h-3 rounded-sm bg-error/10 inline-block" /> False
              </div>
            </div>
          </GlassCard>

          {/* ROC Curve */}
          <GlassCard variant="elevated" className="rounded-xl p-unit-lg flex flex-col min-h-[360px]">
            <div className="flex justify-between items-center mb-unit-md border-b border-outline/10 pb-unit-sm">
              <h2 className="font-geist text-label-md text-primary">ROC Curve</h2>
              <span className="material-symbols-outlined text-on-surface-variant">show_chart</span>
            </div>
            <div className="flex-grow flex items-center justify-center relative">
              <div className="w-full h-full border border-dashed border-outline/30 rounded-lg bg-surface-container-low/30 relative overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full text-secondary opacity-30"
                  preserveAspectRatio="none"
                >
                  {/* Grid */}
                  {[20, 40, 60, 80].map((v) => (
                    <g key={v}>
                      <line x1={v} y1="0" x2={v} y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                      <line x1="0" y1={v} x2="100" y2={v} stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
                    </g>
                  ))}
                  {/* Diagonal (random) */}
                  <path d="M0,100 L100,0" fill="none" stroke="currentColor" strokeDasharray="4" strokeWidth="1" opacity="0.4" />
                  {/* ROC Curve */}
                  <path d="M0,100 C15,70 30,35 50,25 Q75,10 100,0" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  {/* AUC fill */}
                  <path d="M0,100 C15,70 30,35 50,25 Q75,10 100,0 L100,100 Z" fill="currentColor" opacity="0.05" />
                </svg>
                <div className="relative z-10 text-center">
                  <p className="font-geist text-headline-md font-bold text-secondary">0.865</p>
                  <p className="font-inter text-label-sm text-on-surface-variant">AUC Score</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Feature Importance */}
          <GlassCard variant="elevated" className="rounded-xl p-unit-lg flex flex-col min-h-[360px]">
            <div className="flex justify-between items-center mb-unit-md border-b border-outline/10 pb-unit-sm">
              <h2 className="font-geist text-label-md text-primary">Feature Importance</h2>
              <span className="material-symbols-outlined text-on-surface-variant">bar_chart</span>
            </div>
            <div className="flex-grow flex flex-col justify-center gap-3 mt-4">
              {featureBars.map((f) => (
                <div key={f.label} className="flex items-center gap-4">
                  <span className="w-24 font-inter text-label-sm text-on-surface-variant truncate text-right">
                    {f.label}
                  </span>
                  <div className="flex-1 h-6 bg-surface-container rounded-r-sm overflow-hidden">
                    <div
                      className={`h-full ${f.opacity} rounded-r-sm transition-all duration-700`}
                      style={{ width: f.width }}
                    />
                  </div>
                  <span className="font-inter text-label-sm text-on-surface-variant w-10">{f.width}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Model Comparison */}
          <GlassCard variant="elevated" className="rounded-xl p-unit-lg flex flex-col min-h-[360px]">
            <div className="flex justify-between items-center mb-unit-md border-b border-outline/10 pb-unit-sm">
              <h2 className="font-geist text-label-md text-primary">Model Comparison</h2>
              <span className="material-symbols-outlined text-on-surface-variant">compare_arrows</span>
            </div>
            <div className="flex-grow flex items-center">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="font-inter text-label-sm text-on-surface-variant border-b border-outline/10">
                    <th className="py-3">Model</th>
                    <th className="py-3">Accuracy</th>
                    <th className="py-3">F1</th>
                  </tr>
                </thead>
                <tbody className="font-inter text-body-sm">
                  {modelRows.map((r) => (
                    <tr
                      key={r.model}
                      className={`border-b border-outline/5 ${r.current ? 'bg-secondary/5' : ''}`}
                    >
                      <td className={`py-3 ${r.current ? 'font-semibold text-primary' : 'text-on-surface-variant'}`}>
                        {r.model}
                        {r.current && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-geist">
                            Active
                          </span>
                        )}
                      </td>
                      <td className={`py-3 ${r.current ? 'text-secondary font-semibold' : ''}`}>{r.acc}</td>
                      <td className="py-3">{r.f1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  )
}
