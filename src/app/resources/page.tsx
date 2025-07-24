import { Metadata } from 'next'
import Link from 'next/link'
import { Download, Clock, Users, FileText, Shield, Target, Zap } from 'lucide-react'


export const metadata: Metadata = {
  title: 'Free Tech Independence Resources | Skeith Studio - Goldsboro, NC',
  description: 'Free guides and tools to help Goldsboro businesses build tech resilience and break free from corporate dependency. Own your automation.',
  keywords: 'tech independence, business automation, Goldsboro NC, tech sovereignty, break vendor lock-in, own your tools',
}

// Sample data - in a real app, this would come from a CMS or database
const featuredResources = [
  {
    id: 'tech-independence-kit',
    title: 'Break Free from Big Tech: Independence Starter Kit',
    description: 'A complete guide to identifying corporate dependencies and building your own tech stack. Includes vendor audit templates and cost-benefit analysis.',
    type: 'PDF Guide',
    downloadSize: '2.8 MB',
    estimatedTime: '20 min read',
    downloads: 178,
    featured: true,
    category: 'Tech Independence'
  },
  {
    id: 'subscription-audit-tool',
    title: 'Corporate Dependency Audit Calculator',
    description: 'Interactive tool to calculate how much you\'re paying in subscriptions vs. what you could own outright. Eye-opening results guaranteed.',
    type: 'Excel Template',
    downloadSize: '245 KB',
    estimatedTime: '15 min to complete',
    downloads: 124,
    featured: true,
    category: 'Assessment'
  },
  {
    id: 'local-tech-resilience-guide',
    title: 'Building Community Tech Resilience',
    description: 'Strategic playbook for small businesses to prepare for the AI economy without selling their soul to Silicon Valley.',
    type: 'PDF Guide',
    downloadSize: '1.2 MB',
    estimatedTime: '25 min read',
    downloads: 203,
    featured: true,
    category: 'Strategy'
  }
]

const blogPosts = [
  {
    id: 'local-restaurant-breaks-free',
    title: 'How Wayne County Restaurant Ditched $400/Month in Subscriptions',
    excerpt: 'Case study: Local restaurant builds custom order system, saves $4,800 annually and owns their customer data.',
    readTime: '8 min read',
    date: '2025-01-15',
    category: 'Liberation Story',
    tags: ['Restaurant', 'Cost Savings', 'Data Ownership']
  },
  {
    id: 'email-independence',
    title: 'Own Your Email Marketing: Escape the Subscription Trap',
    excerpt: 'Stop paying MailChimp forever. Build your own email system that you control completely.',
    readTime: '10 min read',
    date: '2025-01-10',
    category: 'How-To',
    tags: ['Email Marketing', 'Cost Reduction', 'Ownership']
  },
  {
    id: 'ai-economy-preparation',
    title: 'Is Your Business Ready for the AI Economy?',
    excerpt: 'The AI revolution is coming to Goldsboro. Are you prepared to compete, or will you be left behind?',
    readTime: '12 min read',
    date: '2025-01-08',
    category: 'Economic Reality',
    tags: ['AI Economy', 'Competition', 'Future-Proofing']
  },
  {
    id: 'scheduling-sovereignty',
    title: 'Own Your Scheduling: Stop Paying Calendly Forever',
    excerpt: 'Build your own booking system that works exactly how you want - no monthly fees, no limits.',
    readTime: '9 min read',
    date: '2025-01-05',
    category: 'How-To',
    tags: ['Scheduling', 'Cost Savings', 'Customization']
  },
  {
    id: 'financial-freedom-dashboards',
    title: 'Financial Dashboards You Own: No More QuickBooks Ransom',
    excerpt: 'Create powerful financial reporting that belongs to you, not Intuit shareholders.',
    readTime: '11 min read',
    date: '2025-01-03',
    category: 'Financial Freedom',
    tags: ['Financial Reporting', 'Data Control', 'Cost Reduction']
  },
  {
    id: 'customer-data-ownership',
    title: 'Why Big Tech Wants Your Customer Data (And How to Keep It)',
    excerpt: 'Your customers are your most valuable asset. Don\'t let corporations monetize them behind your back.',
    readTime: '7 min read',
    date: '2024-12-30',
    category: 'Data Sovereignty',
    tags: ['Customer Data', 'Privacy', 'Business Control']
  }
]

const categories = [
  'All Posts',
  'Tech Independence',
  'Liberation Story',
  'How-To',
  'Economic Reality',
  'Financial Freedom',
  'Data Sovereignty'
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free Tech Independence Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical guides and tools to help Goldsboro businesses break free from corporate 
              dependency and build lasting tech resilience for the AI economy.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl">
                <p className="text-red-800 font-medium">
                  <Shield className="inline w-5 h-5 mr-2" />
                  The AI economy is coming. Do you have the tools to survive? If not, you might get left behind or locked in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Start Your Liberation: Most Downloaded Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {resource.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {resource.downloads} downloads
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {resource.type}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.estimatedTime}
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Free ({resource.downloadSize})
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Statement CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 mb-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Break Free from Corporate Control?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            These resources are your first step toward tech independence. But every business is unique. 
            We help you build custom solutions that you actually own and understand.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Own Your Tools</h3>
              <p className="text-sm opacity-90">No more subscription hostages</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Local Focus</h3>
              <p className="text-sm opacity-90">Building Goldsboro&apos;s AI Economy</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">AI-Ready</h3>
              <p className="text-sm opacity-90">Prepare for the economic shift</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/audit" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Independence Audit
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Your Liberation
            </Link>
          </div>
        </section>

        {/* Blog/Articles Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Stories & Practical Liberation Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How Goldsboro businesses are breaking free from corporate dependency 
              and building their own tech sovereignty.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      post.category === 'Liberation Story' ? 'bg-green-100 text-green-700' :
                      post.category === 'Economic Reality' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600">
                    <Link href={`/resources/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                    <Link 
                      href={`/resources/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center mt-16 py-12 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join the Tech Independence Movement?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            These resources are your foundation. Let&apos;s work together to build the custom solutions 
            that will keep your business competitive and independent in the AI economy.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <p className="text-gray-800 font-medium mb-2">
              &quot;The future belongs to businesses that own their technology, not rent it.&quot;
            </p>
            <p className="text-sm text-gray-600">
              - Building Goldsboro&apos;s tech resilience, one business at a time
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Independence Journey
            </Link>
            <Link 
              href="tel:252-351-7076" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Call (252) 351-7076
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}