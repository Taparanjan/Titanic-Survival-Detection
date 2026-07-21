import GlassCard from '../components/ui/GlassCard'

const pipelineCards = [
  {
    icon: 'database',
    iconBg: 'bg-primary-container text-on-primary-container',
    title: 'Titanic Dataset',
    desc: 'Sourced from the foundational Kaggle competition. It contains demographics, ticket class, and cabin information for a subset of passengers, serving as the ground truth for our supervised learning models.',
    span: 'lg:col-span-2',
  },
  {
    icon: 'mop',
    iconBg: 'bg-surface-variant text-on-surface-variant border border-outline/10',
    title: 'Data Cleaning',
    desc: 'Addressing missing values systematically. Age gaps were imputed using median values stratified by class, while highly sparse columns like Cabin were dropped to reduce noise.',
    span: '',
  },
  {
    icon: 'precision_manufacturing',
    iconBg: 'bg-surface-variant text-on-surface-variant border border-outline/10',
    title: 'Feature Engineering',
    desc: "Synthesizing new predictive dimensions. 'Family Size' was derived from sibling/spouse and parent/child counts, and categorical variables like 'Sex' and 'Embarked' were encoded.",
    span: '',
  },
  {
    icon: 'model_training',
    iconBg: 'bg-surface-variant text-on-surface-variant border border-outline/10',
    title: 'Model Training',
    desc: 'Utilizing an 80/20 train-test split with k-fold cross-validation to ensure models generalize well to unseen data, preventing overfitting on the training set.',
    span: '',
  },
  {
    icon: 'rocket_launch',
    iconBg: 'bg-secondary-fixed text-on-secondary-fixed border border-secondary/20',
    title: 'Prediction Pipeline',
    desc: 'A streamlined API architecture that accepts live user input, processes it identically to the training data, and returns a real-time survival probability.',
    span: '',
  },
]

const algorithms = [
  {
    title: 'K-Nearest Neighbors (KNN)',
    desc: 'A non-parametric method classifying passengers based on the majority vote of their closest neighbors in the feature space. Highly sensitive to feature scaling.',
  },
  {
    title: 'Support Vector Machine (SVM)',
    desc: 'Constructs hyperplanes in a multidimensional space to separate classes. Effective in high-dimensional spaces but computationally intensive on large datasets.',
  },
  {
    title: 'Logistic Regression',
    desc: 'A fundamental linear model calculating the probability of a binary outcome. Serves as a strong, interpretable baseline for our predictive performance.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen text-on-surface flex flex-col" style={{
      backgroundColor: '#f7f9fb',
      backgroundImage:
        'radial-gradient(circle at top right, #e6e8ea, transparent 40%), radial-gradient(circle at bottom left, #dbe1ff, transparent 40%)',
      backgroundAttachment: 'fixed',
    }}>
      <main className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl w-full flex flex-col gap-unit-xl pt-24">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[512px]">
          <div className="lg:col-span-5 flex flex-col gap-unit-md">
            <div className="inline-flex items-center gap-unit-xs px-3 py-1 rounded-full bg-secondary-fixed/50 border border-secondary/20 w-fit">
              <span className="material-symbols-outlined text-base text-secondary">info</span>
              <span className="font-geist text-label-sm text-secondary">Project Overview</span>
            </div>
            <h1 className="font-geist text-headline-xl text-primary">
              Decoding Survival with Machine Learning.
            </h1>
            <p className="font-inter text-body-lg text-on-surface-variant leading-relaxed">
              Titanic AI represents a comprehensive exploration into predictive modeling. Our objective
              is to determine what factors contributed most significantly to survival during the
              infamous 1912 maritime disaster, transforming raw historical records into actionable
              mathematical insights.
            </p>
          </div>
          <div className="lg:col-span-7 relative h-[400px] rounded-xl overflow-hidden glass-card p-unit-sm">
            <img
              className="w-full h-full object-cover rounded-lg mix-blend-multiply opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdWTFM3ImabKqHHEPAtwIvlChqb0KbyF1jQ4BbH1arH91vVnLzficZkXuBIhfCMWe-9dy3TuBYlhuWxM8zpjiAhrxaoRJjXVVJNWhG-3N5Z8G34vOLWa2uatj2lBKGvVR__5EQGMUU5DwZ3mtLJCXKawtPMFlLkJgnh-X5ETpIescsqqpa9K8rqynoPX7IIFdXznFgtVWTdAjT_nBMzcR8Dt5JkjVf08MnMuOrpCms7A8xKFTcc6RK"
              alt="Abstract ML visualization"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent rounded-lg" />
          </div>
        </section>

        {/* Architecture bento */}
        <section className="flex flex-col gap-unit-lg pt-unit-xl border-t border-outline/10">
          <div className="flex flex-col gap-unit-xs">
            <h2 className="font-geist text-headline-lg text-primary">The Architecture</h2>
            <p className="font-inter text-body-md text-on-surface-variant max-w-2xl">
              A rigorous, multi-stage pipeline ensures raw historical data is refined into robust
              predictive signals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-unit-md">
            {pipelineCards.map((c) => (
              <GlassCard
                key={c.title}
                className={`rounded-xl p-unit-lg flex flex-col gap-unit-md ${c.span}`}
              >
                <div className={`w-12 h-12 rounded-lg ${c.iconBg} flex items-center justify-center`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {c.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-geist text-headline-md text-primary mb-2">{c.title}</h3>
                  <p className="font-inter text-body-sm text-on-surface-variant">{c.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Evaluated algorithms */}
        <section className="flex flex-col gap-unit-lg pt-unit-xl border-t border-outline/10">
          <h2 className="font-geist text-headline-lg text-primary text-center">Evaluated Algorithms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-unit-md">
            {algorithms.map((a) => (
              <GlassCard
                key={a.title}
                className="rounded-xl p-unit-md border-t-2 border-t-surface-variant flex flex-col gap-unit-sm hover:-translate-y-1 transition-transform duration-300"
              >
                <h4 className="font-geist text-label-md text-primary">{a.title}</h4>
                <p className="font-inter text-body-sm text-on-surface-variant">{a.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Champion model */}
        <section className="glass-card rounded-xl p-unit-lg border border-secondary/30 relative overflow-hidden flex flex-col md:flex-row gap-unit-lg items-center shadow-[0_8px_30px_rgba(0,81,213,0.05)] my-unit-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-secondary text-on-secondary flex items-center justify-center relative z-10 shadow-lg">
            <span
              className="material-symbols-outlined text-[40px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
          </div>
          <div className="flex flex-col gap-unit-sm relative z-10">
            <div className="font-geist text-label-sm text-secondary uppercase tracking-widest">
              Champion Model
            </div>
            <h3 className="font-geist text-headline-lg text-primary">AdaBoost Classifier</h3>
            <p className="font-inter text-body-md text-on-surface-variant max-w-3xl">
              Adaptive Boosting emerged as our best-performing algorithm. By combining multiple "weak
              learners" (short decision trees) sequentially, AdaBoost focuses heavily on the instances
              that previous iterations misclassified. This adaptive weighting mechanism proved highly
              effective in capturing the non-linear nuances of the Titanic dataset, yielding the
              highest accuracy and F1 score during evaluation.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
