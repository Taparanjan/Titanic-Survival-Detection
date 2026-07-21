import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import Notification from '../components/ui/Notification'

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // If accessed directly without form data, redirect to predict
  if (!state) return <Navigate to="/predict" replace />

  const { survived, probability, inputs, notice } = state
  const displayProbability = Number.isFinite(probability) ? probability : survived ? 75 : 25
  const strokeDash = `${displayProbability}, 100`

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <main className="flex-grow pt-24 pb-unit-xl px-margin-mobile md:px-margin-desktop relative flex flex-col items-center justify-center min-h-[819px]">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary-fixed/40 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-unit-xl">
          {/* Title */}
          <div className="text-center space-y-unit-sm">
            <h1 className="font-geist text-headline-xl text-primary">Analysis Complete</h1>
            <p className="font-inter text-body-lg text-on-surface-variant">
              Review the survival probability assessment below.
            </p>
          </div>

          {notice && (
            <div className="w-full">
              <Notification type={notice.type} title={notice.title} message={notice.message} />
            </div>
          )}

          {/* Result Card */}
          <GlassCard
            className={`w-full rounded-xl p-unit-xl flex flex-col md:flex-row items-center gap-unit-xl transition-all duration-500 ${
              survived ? 'success-glow' : 'error-glow'
            }`}
          >
            {/* Text Side */}
            <div className="flex-1 text-center md:text-left space-y-unit-md">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-2 ${
                  survived ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}
              >
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {survived ? 'check_circle' : 'cancel'}
                </span>
              </div>
              <h2 className="font-geist text-headline-lg text-primary">
                {survived ? 'Passenger is predicted to survive' : 'Passenger is predicted not to survive'}
              </h2>
              <p className="font-inter text-body-md text-on-surface-variant">
                {survived
                  ? 'Based on the provided demographic and passenger class data, our model indicates a high probability of survival.'
                  : 'Based on the provided data, the model indicates a low probability of survival based on historical patterns.'}
              </p>

              {/* Confidence Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-geist font-semibold ${
                  survived
                    ? 'bg-success/5 border-success/20 text-success'
                    : 'bg-error/5 border-error/20 text-error'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {survived ? 'trending_up' : 'trending_down'}
                </span>
                Confidence: {displayProbability}%
              </div>
            </div>

            {/* Circular Chart */}
            <div className="w-48 h-48 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`circle ${survived ? 'success-circle' : 'error-circle'}`}
                  strokeDasharray={strokeDash}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18" y="20.5"
                  className="font-geist font-bold"
                  fill={survived ? '#00A86B' : '#ba1a1a'}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="Geist, sans-serif"
                  fontWeight="700"
                >
                  {displayProbability}%
                </text>
              </svg>
            </div>
          </GlassCard>

          {/* Input Summary */}
          <GlassCard className="w-full rounded-xl p-unit-lg">
            <h3 className="font-geist text-label-md text-primary mb-unit-md border-b border-outline/10 pb-unit-sm">
              Input Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-unit-md">
              {Object.entries(inputs).map(([key, val]) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="font-geist text-label-sm text-on-surface-variant uppercase tracking-wide">{key}</span>
                  <span className="font-inter text-body-sm text-primary font-medium">{val}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-unit-md w-full justify-center">
            <button
              onClick={() => navigate('/predict')}
              className="btn-primary px-8 py-3 rounded-md font-geist text-label-md"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Try Another Prediction
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary px-8 py-3 rounded-md font-geist text-label-md"
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              View Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
