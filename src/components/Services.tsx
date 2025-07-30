export default function Services() {
  const services = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
        </svg>
      ), 
      title: 'Website Development', 
      desc: 'Professional websites that look great and work perfectly on all devices.',
      pricing: {
        starting: '$800',
        range: '$800 - $5,000',
        note: 'Based on pages and features'
      },
      features: [
        'Mobile-responsive design',
        'Fast loading speeds',
        'SEO optimization',
        '30-day support included'
      ]
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      title: 'Website Revitalization', 
      desc: 'Breathe new life into your existing website with modern design and improved performance.',
      pricing: {
        starting: '$400',
        range: '$400 - $2,500',
        note: 'Depends on current site condition'
      },
      features: [
        'Design modernization',
        'Speed optimization',
        'Mobile compatibility fixes',
        'Content updates included'
      ]
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: 'Mobile Apps', 
      desc: 'Custom mobile applications for iOS and Android that your customers will actually use.',
      pricing: {
        starting: '$2,500',
        range: '$2,500 - $15,000',
        note: 'Varies by app complexity'
      },
      features: [
        'iOS & Android compatible',
        'Native performance',
        'App store deployment',
        '90-day warranty'
      ]
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l 1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ), 
      title: 'Process Automation', 
      desc: 'Simple bots and tools that handle your repetitive tasks, saving you 5-15 hours per week.',
      pricing: {
        starting: '$300',
        range: '$300 - $2,500',
        note: 'Depends on complexity'
      },
      features: [
        'Email & report automation',
        'Data entry elimination',
        'Workflow streamlining',
        '30-day support included'
      ]
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Business Tools', 
      desc: 'Custom applications built specifically for your workflow - no more generic software struggles.',
      pricing: {
        starting: '$1,200',
        range: '$1,200 - $8,000',
        note: 'Based on features needed'
      },
      features: [
        'Custom web applications',
        'Database integration',
        'User management systems',
        '90-day warranty'
      ]
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      ),
      title: 'Data Dashboards', 
      desc: 'Visual dashboards that show exactly what matters to your business, updated automatically.',
      pricing: {
        starting: '$600',
        range: '$600 - $3,500',
        note: 'Varies by data sources'
      },
      features: [
        'Real-time reporting',
        'Custom visualizations',
        'Multiple data sources',
        '60-day support included'
      ]
    },
  ]

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Digital Solutions</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From simple website updates to complex mobile apps - practical technology solutions for Goldsboro businesses
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {services.map(({ icon, title, desc, pricing, features }) => (
            <div
              key={title}
              className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 relative group"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                {icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{desc}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900">{pricing.starting}</span>
                  <span className="text-sm text-gray-500">starting at</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Typical range: {pricing.range}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  {pricing.note}
                </p>
              </div>

              {/* CTA Button */}
              <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Get Quote
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Tiers Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Solutions for Every Budget
            </h3>
            <p className="text-gray-600">From quick fixes to complete digital transformations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-green-600 font-bold text-lg mb-2">Starter Projects</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">$300 - $800</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Website updates & fixes</li>
                <li>Simple automation tools</li>
                <li>Basic dashboard setup</li>
                <li>Quick turnaround (1-2 weeks)</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-blue-200">
              <div className="text-blue-600 font-bold text-lg mb-2">Standard Solutions</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">$800 - $3,500</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Complete websites</li>
                <li>Custom business tools</li>
                <li>Data integration projects</li>
                <li>Timeline: 2-6 weeks</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-purple-600 font-bold text-lg mb-2">Enterprise Level</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">$3,500+</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Mobile applications</li>
                <li>Complex integrations</li>
                <li>Multi-user systems</li>
                <li>Timeline: 6-12 weeks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Why Choose Local Development?
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-sm text-gray-600 mb-6">
              <div>
                <div className="font-medium text-blue-600 mb-1">Consultations</div>
                <p>30-minute discussion to understand your needs</p>
              </div>
              <div>
                <div className="font-medium text-blue-600 mb-1">Fixed Pricing</div>
                <p>Know exactly what you&apos;ll pay before we start</p>
              </div>
              <div>
                <div className="font-medium text-blue-600 mb-1">Local Support</div>
                <p>Face-to-face meetings and ongoing assistance</p>
              </div>
              <div>
                <div className="font-medium text-blue-600 mb-1">Quick Response</div>
                <p>Same-day replies, not overseas delays</p>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                <span className="font-medium text-blue-600">No over-engineering:</span> I build exactly what you need, explain everything clearly, and provide ongoing support when you need it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}