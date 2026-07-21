import { useState } from 'react'
import GlassCard from '../components/ui/GlassCard'

const contactInfo = [
  {
    icon: 'location_on',
    title: 'Headquarters',
    lines: ['123 Neural Pathway, Suite 404', 'San Francisco, CA 94107'],
  },
  {
    icon: 'mail',
    title: 'Email',
    lines: ['hello@titanic.ai', 'support@titanic.ai'],
  },
  {
    icon: 'call',
    title: 'Phone',
    lines: ['+1 (555) 010-1912', 'Mon-Fri, 9am-6pm PST'],
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', subject: 'general', message: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-mesh min-h-screen text-on-surface flex flex-col">
      <main className="flex-grow pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10">

          {/* Left info */}
          <div className="md:col-span-5 flex flex-col justify-center gap-unit-lg mb-unit-lg md:mb-0 pr-0 md:pr-unit-lg">
            <div>
              <h1 className="font-geist text-headline-xl text-primary mb-unit-sm">Get in Touch</h1>
              <p className="font-inter text-body-lg text-on-surface-variant">
                Whether you have a question about our predictive models, need API access, or want to
                explore enterprise solutions, our team is ready to help.
              </p>
            </div>

            <div className="flex flex-col gap-unit-md mt-unit-md">
              {contactInfo.map((c) => (
                <div key={c.title} className="flex items-start gap-unit-md">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {c.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-geist text-label-md text-primary mb-1">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="font-inter text-body-sm text-on-surface-variant">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-7">
            <GlassCard variant="panel" className="rounded-xl p-unit-lg md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

              {submitted ? (
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] text-center gap-unit-lg">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-success" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <h2 className="font-geist text-headline-lg text-primary">Message Sent!</h2>
                  <p className="font-inter text-body-md text-on-surface-variant max-w-sm">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ first_name: '', last_name: '', email: '', subject: 'general', message: '' }) }}
                    className="btn-secondary px-6 py-2 rounded-lg font-geist text-label-md"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="relative z-10 flex flex-col gap-unit-lg" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-md">
                    {[
                      { id: 'first_name', label: 'First Name', placeholder: 'Jane' },
                      { id: 'last_name', label: 'Last Name', placeholder: 'Doe' },
                    ].map((f) => (
                      <div key={f.id} className="flex flex-col gap-unit-xs">
                        <label className="font-geist text-label-sm text-on-surface-variant" htmlFor={f.id}>
                          {f.label}
                        </label>
                        <input
                          id={f.id} name={f.id} type="text" required
                          placeholder={f.placeholder}
                          value={form[f.id]} onChange={handleChange}
                          className="w-full bg-white/50 border border-outline/20 rounded-lg px-4 py-3 font-inter text-body-md text-primary placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all backdrop-blur-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-unit-xs">
                    <label className="font-geist text-label-sm text-on-surface-variant" htmlFor="email">
                      Work Email
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="jane@company.com"
                      value={form.email} onChange={handleChange}
                      className="w-full bg-white/50 border border-outline/20 rounded-lg px-4 py-3 font-inter text-body-md text-primary placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all backdrop-blur-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-unit-xs">
                    <label className="font-geist text-label-sm text-on-surface-variant" htmlFor="subject">
                      Subject
                    </label>
                    <select
                      id="subject" name="subject"
                      value={form.subject} onChange={handleChange}
                      className="w-full bg-white/50 border border-outline/20 rounded-lg px-4 py-3 font-inter text-body-md text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all backdrop-blur-sm appearance-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales & Enterprise</option>
                      <option value="press">Press</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-unit-xs">
                    <label className="font-geist text-label-sm text-on-surface-variant" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows="4" required
                      placeholder="How can we help you?"
                      value={form.message} onChange={handleChange}
                      className="w-full bg-white/50 border border-outline/20 rounded-lg px-4 py-3 font-inter text-body-md text-primary placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all backdrop-blur-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-secondary to-tertiary-fixed-dim text-white font-geist text-label-md py-4 rounded-lg shadow-sm hover:shadow-md hover:brightness-110 active:scale-[0.98] transition-all duration-200 mt-2 flex justify-center items-center gap-2"
                  >
                    Send Message
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  )
}
