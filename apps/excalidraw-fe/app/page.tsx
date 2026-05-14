import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#6965db] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-[#121212]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#6965db] rounded-lg flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">SketchSync</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link
              href="#features"
              className="hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#community"
              className="hover:text-white transition-colors"
            >
              Community
            </Link>
            <Link href="#blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#6965db] hover:bg-[#5b57d1] text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-[#6965db]/20 hover:shadow-[#6965db]/40"
            >
              Start Drawing
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#6965db]/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#a8a5ff] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6965db] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6965db]"></span>
            </span>
            v0.1.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 pb-2">
            Virtual whiteboard for <br className="hidden md:block" />
            <span className="text-white relative">
              sketching ideas
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#6965db]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Collaborate with your team in real-time. Create beautiful hand-drawn
            like diagrams, wireframes, and prototypes with an open-source tool
            loved by developers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#6965db] hover:bg-[#5b57d1] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#6965db]/25 hover:shadow-[#6965db]/40 flex items-center justify-center gap-2 group"
            >
              Start Drawing Now
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
            <Link
              href="https://github.com/pavanpurohit999/SketchSync"
              target="_blank"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-9.999-10h.001z"
                />
              </svg>
              GitHub
            </Link>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-20 md:mt-28 relative max-w-6xl mx-auto">
          <div className="absolute -inset-1 bg-linear-to-r from-[#6965db] to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl overflow-hidden aspect-video group">
            <div className="absolute inset-0 bg-linear-to-tr from-[#6965db]/5 to-transparent pointer-events-none"></div>
            {/* Abstract UI representation */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400/20 border border-yellow-400/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"></div>
            </div>

            <div className="flex h-full items-center justify-center text-gray-700">
              <svg
                className="w-32 h-32 opacity-20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>

            {/* Floating Elements Animation */}
            <div className="absolute top-1/4 left-1/4 p-4 bg-[#2a2a2a] rounded-lg border border-white/5 shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-500 cursor-default">
              <div className="w-8 h-8 bg-[#6965db]/20 rounded-md flex items-center justify-center mb-2">
                <svg
                  className="w-5 h-5 text-[#6965db]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-20 bg-white/10 rounded"></div>
                <div className="h-2 w-16 bg-white/10 rounded"></div>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/4 p-4 bg-[#2a2a2a] rounded-lg border border-white/5 shadow-xl transform -rotate-2 hover:-rotate-1 transition-transform duration-500 cursor-default">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-blue-400"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-red-400 -ml-4 border-2 border-[#2a2a2a]"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-400 to-emerald-400 -ml-4 border-2 border-[#2a2a2a]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-[#181818]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Built for speed and creativity
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Everything you need to create perfect diagrams, without the
              complexity of traditional tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Collaboration",
                description:
                  "Work together with your team in real-time. See cursor movements and updates instantly.",
                icon: (
                  <svg
                    className="w-6 h-6 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ),
                gradient: "from-emerald-500/20 to-teal-500/5",
                border: "hover:border-emerald-500/30",
              },
              {
                title: "Hand-drawn Style",
                description:
                  "Your diagrams look like they were sketched by hand, making them feel more approachable and drafted.",
                icon: (
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                ),
                gradient: "from-purple-500/20 to-indigo-500/5",
                border: "hover:border-purple-500/30",
              },
              {
                title: "End-to-End Encryption",
                description:
                  "Your drawings are encrypted locally in your browser. Even our servers can't see what you create.",
                icon: (
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
                gradient: "from-blue-500/20 to-cyan-500/5",
                border: "hover:border-blue-500/30",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl bg-[#1e1e1e] border border-white/5 ${feature.border} transition-colors group relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-[#6965db]/10 blur-[80px] -z-10 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to start creating?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of developers and designers who use SketchSync to
            visualize their ideas.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#6965db] hover:bg-[#5b57d1] text-white font-bold rounded-xl transition-all shadow-xl shadow-[#6965db]/20 hover:scale-105"
          >
            Launch SketchSync
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-300">SketchSync</span>
            <span className="text-gray-600 text-sm">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
