export default function Contact() {
  return (
    <section
      id="contact"
      className="my-12 rounded-xl p-6 md:p-8 text-white bg-gray-900 border border-gray-700 max-w-3xl mx-auto text-center"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-medium mb-3">Let's Work Together</h2>
        <p className="max-w-md mx-auto text-gray-300">
          Get in touch to discuss how we can solve your specific business challenges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
          <h3 className="font-medium mb-3 text-lg">Direct Contact</h3>
          <div className="space-y-3">
            <a
              href="mailto:Ske1th@proton.me"
              className="flex items-center justify-center gap-2 hover:text-blue-300 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Ske1th@proton.me
            </a>
            <a
              href="tel:+12523517076"
              className="flex items-center justify-center gap-2 hover:text-blue-300 transition-colors text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              (252) 351-7076
            </a>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
          <h3 className="font-medium mb-3 text-lg">Follow Along</h3>
          <div className="flex justify-center gap-3">
            <a 
              href="https://linkedin.com/in/yourprofile" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/yourhandle" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="mailto:Ske1th@proton.me"
          className="inline-block rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 transition-colors text-sm"
        >
          Email Me
        </a>
        <a
          href="tel:+12523517076"
          className="inline-block rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium px-6 py-3 transition-colors text-sm"
        >
          Call Now
        </a>
      </div>

      <p className="mt-6 text-gray-400 text-xs">
        Typically respond within 24 hours • Available Mon-Fri 9am-5pm EST
      </p>
    </section>
  )
}