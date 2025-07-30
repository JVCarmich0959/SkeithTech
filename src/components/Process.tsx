export interface ProcessProps {
  onScheduleClick?: () => void; //make optional
}

export default function Process({ onScheduleClick }: ProcessProps) {
  const steps = [
    { 
      number: 1, 
      title: 'Discovery Call', 
      subtitle: ' 30-minute consultation',
      desc: 'We discuss your challenges, goals, and current systems. No sales pitch - just understanding what you really need.',
      duration: '30 minutes',
      deliverable: 'Clear problem assessment',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      )
    },
    { 
      number: 2, 
      title: 'Custom Proposal', 
      subtitle: 'Tailored solution & pricing',
      desc: 'A detailed plan with fixed pricing, timeline, and exactly what you\'ll get. No surprises, no hidden costs.',
      duration: '2-3 days',
      deliverable: 'Written proposal & timeline',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125-.504-1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    },
    { 
      number: 3, 
      title: 'Development', 
      subtitle: 'Build with regular check-ins',
      desc: 'I build your solution with weekly updates. You\'ll see progress and can request changes before it\'s too late.',
      duration: 'Project dependent',
      deliverable: 'Working solution + training',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    { 
      number: 4, 
      title: 'Launch & Support', 
      subtitle: 'Go live with confidence',
      desc: 'Full deployment, team training, and ongoing support. I\'m here when you need help, without long-term contracts.',
      duration: 'Ongoing as needed',
      deliverable: 'Live system + documentation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84a14.927 14.927 0 015.84 2.58m-2.58 5.84a14.927 14.927 0 002.58 5.84" />
        </svg>
      )
    },
  ]

  return (
    <section id="process" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Process</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From first conversation to launch day - here is exactly how we will work together
          </p>
        </div>
        
        {/* Desktop Timeline View */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600"></div>
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map(({ number, title, subtitle, desc, duration, deliverable, icon }) => (
              <div key={number} className="relative">
                {/* Timeline Dot */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
                  <div className="text-blue-600">
                    {icon}
                  </div>
                </div>
                
                {/* Card */}
                <div className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 mt-32">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mb-2">
                      {number}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{title}</h3>
                    <p className="text-blue-600 text-sm font-medium">{subtitle}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-700">{duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">You Get:</span>
                      <span className="font-medium text-gray-700">{deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical View */}
        <div className="lg:hidden space-y-6">
          {steps.map(({ number, title, subtitle, desc, duration, deliverable, icon }, index) => (
            <div key={number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-20 bg-gradient-to-b from-blue-400 to-blue-200"></div>
              )}
              
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white relative z-10">
                  {icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl border-2 border-gray-100 p-5 hover:border-blue-200 transition-colors">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                        {number}
                      </span>
                      <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                    </div>
                    <p className="text-blue-600 text-sm font-medium">{subtitle}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block">Duration:</span>
                      <span className="font-medium text-gray-700">{duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">You Get:</span>
                      <span className="font-medium text-gray-700">{deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
             Let&apos;s have that first discovery call. No commitment, no sales pressure - just an honest conversation about your needs.
          </p>
          <button 
            onClick={onScheduleClick}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            Schedule Your Discovery Call
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No long-term contracts
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fixed-price projects
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Local Goldsboro support
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}