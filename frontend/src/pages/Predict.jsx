import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import Notification from '../components/ui/Notification'
import { predictSurvival } from '../services/predictionApi'
import { toPredictionPayload, validatePredictionForm } from '../utils/predictionForm'

const defaultForm = {
  pclass: '',
  sex: '',
  age: '',
  sibsp: '0',
  parch: '0',
  fare: '',
  embarked: '',
}

const inputClass =
  'form-input w-full rounded-lg px-4 py-3 font-inter text-body-md text-on-surface appearance-none bg-white/70'

function FieldError({ id, message }) {
  if (!message) return null

  return (
    <p id={id} className="mt-2 font-inter text-body-sm text-error">
      {message}
    </p>
  )
}

export default function Predict() {
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const resetForm = () => {
    setForm(defaultForm)
    setErrors({})
    setNotice(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validatePredictionForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setNotice({
        type: 'error',
        title: 'Check the passenger details',
        message: 'A few fields need attention before the model can run.',
      })
      return
    }

    setLoading(true)
    setNotice({
      type: 'info',
      title: 'Analyzing passenger profile',
      message: 'Sending the validated details to the Flask prediction API.',
    })

    try {
      const result = await predictSurvival(toPredictionPayload(form))
      setNotice({
        type: result.survived ? 'success' : 'error',
        title: 'Prediction complete',
        message: result.label,
      })

      navigate('/result', {
        state: {
          ...result,
          notice: {
            type: result.survived ? 'success' : 'error',
            title: 'Prediction complete',
            message: result.label,
          },
        },
      })
    } catch (error) {
      setErrors(error.fieldErrors || {})
      setNotice({
        type: 'error',
        title: 'Prediction failed',
        message:
          error.message ||
          'The Flask API could not complete the request. Confirm the backend is running.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-margin-mobile md:px-margin-desktop relative z-10">
        <GlassCard
          variant="panel"
          className="w-full max-w-2xl rounded-xl p-unit-lg md:p-unit-xl relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-tertiary-fixed-dim" />

          <div className="relative z-10">
            <div className="text-center mb-unit-xl">
              <h1 className="font-geist text-headline-lg-mobile md:text-headline-xl text-primary mb-unit-sm">
                Survival Prediction
              </h1>
              <p className="font-inter text-body-lg text-on-surface-variant">
                Enter passenger details to evaluate survival probability using the trained Flask model.
              </p>
            </div>

            {notice && (
              <div className="mb-unit-lg">
                <Notification
                  type={notice.type}
                  title={notice.title}
                  message={notice.message}
                  onDismiss={() => setNotice(null)}
                />
              </div>
            )}

            <form className="space-y-unit-lg" onSubmit={handleSubmit} id="predictionForm" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-lg">
                <div>
                  <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="pclass">
                    Passenger Class
                  </label>
                  <select
                    id="pclass"
                    name="pclass"
                    required
                    className={inputClass}
                    value={form.pclass}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.pclass)}
                    aria-describedby={errors.pclass ? 'pclass-error' : undefined}
                  >
                    <option value="" disabled>Select Class</option>
                    <option value="1">1st Class (Upper)</option>
                    <option value="2">2nd Class (Middle)</option>
                    <option value="3">3rd Class (Lower)</option>
                  </select>
                  <FieldError id="pclass-error" message={errors.pclass} />
                </div>

                <div>
                  <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="sex">
                    Sex
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    required
                    className={inputClass}
                    value={form.sex}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.sex)}
                    aria-describedby={errors.sex ? 'sex-error' : undefined}
                  >
                    <option value="" disabled>Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <FieldError id="sex-error" message={errors.sex} />
                </div>

                <div>
                  <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="age">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    max="120"
                    required
                    inputMode="decimal"
                    placeholder="e.g. 29"
                    className={inputClass}
                    value={form.age}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.age)}
                    aria-describedby={errors.age ? 'age-error' : undefined}
                  />
                  <FieldError id="age-error" message={errors.age} />
                </div>

                <div>
                  <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="fare">
                    Ticket Fare ($)
                  </label>
                  <input
                    id="fare"
                    name="fare"
                    type="number"
                    min="0"
                    max="600"
                    step="0.01"
                    required
                    inputMode="decimal"
                    placeholder="e.g. 32.50"
                    className={inputClass}
                    value={form.fare}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.fare)}
                    aria-describedby={errors.fare ? 'fare-error' : undefined}
                  />
                  <FieldError id="fare-error" message={errors.fare} />
                </div>

                <div>
                  <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="sibsp">
                    Siblings / Spouse Aboard
                  </label>
                  <select
                    id="sibsp"
                    name="sibsp"
                    className={inputClass}
                    value={form.sibsp}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.sibsp)}
                    aria-describedby={errors.sibsp ? 'sibsp-error' : undefined}
                  >
                    {Array.from({ length: 11 }, (_, n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <FieldError id="sibsp-error" message={errors.sibsp} />
                </div>

                <div>
                  <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="parch">
                    Parents / Children Aboard
                  </label>
                  <select
                    id="parch"
                    name="parch"
                    className={inputClass}
                    value={form.parch}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.parch)}
                    aria-describedby={errors.parch ? 'parch-error' : undefined}
                  >
                    {Array.from({ length: 11 }, (_, n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <FieldError id="parch-error" message={errors.parch} />
                </div>
              </div>

              <div>
                <label className="block font-geist text-label-md text-on-surface mb-unit-xs" htmlFor="embarked">
                  Port of Embarkation
                </label>
                <select
                  id="embarked"
                  name="embarked"
                  required
                  className={inputClass}
                  value={form.embarked}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.embarked)}
                  aria-describedby={errors.embarked ? 'embarked-error' : undefined}
                >
                  <option value="" disabled>Select Port</option>
                  <option value="S">Southampton (S)</option>
                  <option value="C">Cherbourg (C)</option>
                  <option value="Q">Queenstown (Q)</option>
                </select>
                <FieldError id="embarked-error" message={errors.embarked} />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary py-4 rounded-lg font-geist text-label-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="loader" aria-hidden="true" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg" aria-hidden="true">science</span>
                      Run Prediction
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary py-4 px-6 rounded-lg font-geist text-label-md"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}
