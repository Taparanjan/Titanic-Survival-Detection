import { Link } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'

const features = [
  {
    icon: 'psychology',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    title: 'Machine Learning',
    desc: 'Utilizes Random Forest and Logistic Regression models trained on the verified Titanic dataset.',
  },
  {
    icon: 'check_circle',
    color: 'text-tertiary-fixed-dim',
    bg: 'bg-tertiary-fixed-dim/10',
    title: 'High Accuracy',
    desc: 'Achieves over 85% prediction accuracy with fine-tuned hyperparameters and feature engineering.',
  },
  {
    icon: 'bolt',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    title: 'Instant Prediction',
    desc: 'Real-time inference pipeline delivers survival probabilities in milliseconds.',
  },
  {
    icon: 'devices',
    color: 'text-tertiary-fixed-dim',
    bg: 'bg-tertiary-fixed-dim/10',
    title: 'Responsive Design',
    desc: 'A modern, glass-tech interface that works seamlessly across desktop, tablet, and mobile.',
  },
]

const steps = [
  { num: '01', title: 'Enter Passenger Details', desc: 'Input key demographics such as Class, Age, Sex, and Fare into the secure form.' },
  { num: '02', title: 'Model Processes Data', desc: 'Our serialized AI model standardizes the input and applies learned weights.' },
  { num: '03', title: 'Prediction is Generated', desc: 'A binary classification is calculated alongside statistical confidence metrics.' },
  { num: '04', title: 'View Survival Probability', desc: 'Review the actionable insights presented in a clear, glassmorphic visual dashboard.' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-unit-xl pb-unit-xl px-margin-mobile md:px-margin-desktop overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3GZKkwEjHwkyZQNdhESldh3rRF7GDCd_z202Bf6C1el0QbWK6PThfBO4K2j8x8-kGcPE-KNIF4jmDgK1FEoYtBKInv0usjBENcaWWq8E8kCdM_Uj6A1fhCl1TVV8YoOlSyeMA-vp1KsXNIpdDE0PE1_hXbOCvaWE8Qx08izIMSc1DPWmE7cS1FznMQA-VjH9vVlO2HPAVuY9b04E--MX-a6RYObtiP1NeLP-OX0P123r0cyXHHUuF')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-8 lg:col-start-3 text-center flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-label-sm mb-unit-lg fade-in-up">
              <span className="material-symbols-outlined text-base">model_training</span>
              Powered by Advanced Neural Networks
            </div>

            {/* Headline */}
            <h1 className="font-geist text-headline-lg-mobile md:text-headline-xl text-primary mb-unit-lg fade-in-up delay-100 leading-tight">
              Titanic <span className="text-gradient">Survival Detection</span> System
            </h1>

            {/* Sub */}
            <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl mb-unit-xl fade-in-up delay-200">
              Predict whether a passenger would survive the historical Titanic disaster using our
              state-of-the-art Machine Learning classification models. Analyze demographics, cabin
              class, and ticket fare in real-time.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-unit-md justify-center w-full sm:w-auto fade-in-up delay-300">
              <Link
                to="/predict"
                className="btn-primary px-8 py-3 rounded-md font-geist text-label-md"
              >
                Predict Now
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
              <a
                href="#how-it-works"
                className="btn-secondary px-8 py-3 rounded-md bg-surface/50 backdrop-blur-sm font-geist text-label-md"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-unit-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low relative z-10" id="features">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-unit-xl">
            <h2 className="font-geist text-headline-lg-mobile md:text-headline-lg text-primary mb-unit-sm">
              Core Capabilities
            </h2>
            <p className="font-inter text-body-md text-on-surface-variant">
              Built with precision, designed for clarity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {features.map((f) => (
              <GlassCard
                key={f.title}
                className="rounded-xl p-unit-lg flex flex-col items-start hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${f.bg} flex items-center justify-center mb-unit-md`}>
                  <span className={`material-symbols-outlined ${f.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-geist text-headline-md text-primary mb-unit-sm">{f.title}</h3>
                <p className="font-inter text-body-sm text-on-surface-variant">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-unit-xl px-margin-mobile md:px-margin-desktop bg-background relative z-10 overflow-hidden"
        id="how-it-works"
      >
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-unit-xl items-center">
            {/* Steps */}
            <div>
              <h2 className="font-geist text-headline-lg-mobile md:text-headline-lg text-primary mb-unit-lg">
                The Inference Pipeline
              </h2>
              <div className="space-y-unit-lg relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant/30 before:to-transparent">
                {steps.map((s) => (
                  <div key={s.num} className="relative flex items-start gap-unit-md">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-outline/10 shadow-sm relative z-10">
                      <span className="font-geist text-label-md text-secondary">{s.num}</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-geist text-headline-md text-primary mb-unit-xs">{s.title}</h4>
                      <p className="font-inter text-body-sm text-on-surface-variant">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Console Placeholder */}
            <GlassCard className="rounded-xl p-unit-lg min-h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(#0051d5 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <span
                className="material-symbols-outlined text-[64px] text-tertiary-fixed-dim mb-unit-md opacity-50"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                query_stats
              </span>
              <h3 className="font-geist text-headline-md text-primary mb-unit-sm relative z-10">
                Interactive Console
              </h3>
              <p className="font-inter text-body-sm text-on-surface-variant relative z-10 max-w-sm">
                Ready to test the model? Proceed to the prediction dashboard to input data parameters.
              </p>
              <Link
                to="/predict"
                className="mt-unit-lg btn-primary px-6 py-2 rounded-md text-label-sm relative z-10"
              >
                Launch Console
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  )
}
