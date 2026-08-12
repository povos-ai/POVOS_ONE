"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Rocket,
  Crown,
  Star,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

import { InteractiveDemo } from "@/components/InteractiveDemo";

export default function LandingPage() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description: "Smart algorithms match you with the best opportunities based on your profile.",
      color: "from-blue-500 to-purple-500",
      image: "Ã°Å¸Â¤â€“",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Real-Time Opportunities",
      description: "Thousands of live opportunities, schemes, and grants updated in real-time.",
      color: "from-emerald-500 to-teal-500",
      image: "Ã°Å¸â€œÅ ",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Platform",
      description: "Connect with organizations, reviewers, and fellow applicants.",
      color: "from-amber-500 to-orange-500",
      image: "Ã°Å¸Â¤Â",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track your applications, get insights, and improve your success rate.",
      color: "from-rose-500 to-pink-500",
      image: "Ã°Å¸â€œË†",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Trusted",
      description: "Enterprise-grade security with data encryption and privacy controls.",
      color: "from-indigo-500 to-blue-500",
      image: "Ã°Å¸â€â€™",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Reliable",
      description: "Built with modern tech for speed, scalability, and 99.9% uptime.",
      color: "from-cyan-500 to-sky-500",
      image: "Ã¢Å¡Â¡",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Founder, TechStart",
      text: "POVOS ONE helped us secure funding within 2 weeks! The AI matching is incredible.",
      avatar: "Ã°Å¸â€˜Â©Ã¢â‚¬ÂÃ°Å¸â€™Â¼",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Project Manager, NGO India",
      text: "Finding government schemes used to be a nightmare. Now it's just a few clicks away.",
      avatar: "Ã°Å¸â€˜Â¨Ã¢â‚¬ÂÃ°Å¸â€™Â¼",
      rating: 5,
    },
    {
      name: "Dr. Ananya Patel",
      role: "Researcher, IIT Delhi",
      text: "The AI recommendations are spot on. I found 3 grants I didn't even know existed!",
      avatar: "Ã°Å¸â€˜Â©Ã¢â‚¬ÂÃ°Å¸â€Â¬",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Live Opportunities", value: "12,846", icon: Briefcase, change: "+12%" },
    { label: "Government Schemes", value: "284", icon: Crown, change: "+8%" },
    { label: "AI Matches", value: "1,289", icon: Sparkles, change: "+23%" },
    { label: "Active Users", value: "3,245", icon: Users, change: "+18%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                P
              </div>
              <div>
                POVOS ONE
                <span className="hidden md:inline text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-medium ml-2">
                  AI Powered
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <GradientButton variant="outline" size="sm">
                  Log In
                </GradientButton>
              </Link>
              <Link href="/register">
                <GradientButton variant="primary" size="sm">
                  Get Started
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-28 px-4">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Opportunity Intelligence
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Discover Your
                <br />
                <span className="gradient-text">Next Big Opportunity</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-lg"
              >
                AI-powered platform connecting you with grants, jobs, schemes, and
                opportunities tailored to your profile. Join thousands of successful users.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link href="/register">
                  <GradientButton variant="primary" size="lg" className="group">
                    Get Started Free
                    <Rocket className="w-4 h-4 ml-2 inline group-hover:rotate-12 transition" />
                  </GradientButton>
                </Link>
                <Link href="/login">
                  <GradientButton variant="outline" size="lg">
                    Sign In
                  </GradientButton>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Free forever
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  AI-powered insights
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-8 flex items-center gap-6"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">{"Ã¢Ëœâ€¦".repeat(5)}</div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Trusted by 3,245+ users
                  </span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT - HERO IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10"></div>
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-200 to-blue-100 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                  <img
                    src="/images/hero-opportunity.jpg"
                    alt="POVOS ONE Platform"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20 p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl shadow-xl shadow-blue-500/30 mb-6">
                        <Briefcase className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                        Find Your Opportunity
                      </h3>
                      <p className="text-white/80 drop-shadow-lg">AI-powered matching engine</p>
                      <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                          <span className="text-white text-sm font-medium">12,846+ Opportunities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-blue-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        Ã¢Å“â€œ
                      </div>
                      <div>
                        <p className="text-xs font-medium dark:text-white">AI Match</p>
                        <p className="text-xs text-emerald-500">94%</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-blue-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        Ã°Å¸â€œÅ 
                      </div>
                      <div>
                        <p className="text-xs font-medium dark:text-white">Views</p>
                        <p className="text-xs text-blue-500">1,289</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-blue-500/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                        Ã¢Å“Â¨
                      </div>
                      <div>
                        <p className="text-xs font-medium dark:text-white">New</p>
                        <p className="text-xs text-purple-500">Today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition mb-3">
                  <stat.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                <div className="text-xs text-emerald-500 mt-1">{stat.change}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Features
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Everything You Need to <span className="gradient-text">Succeed</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              POVOS One combines AI intelligence with a powerful platform to help you
              find and manage opportunities effortlessly.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl glass hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl"></div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition`}
                >
                  {feature.image}
                </div>
                <h3 className="text-lg font-semibold dark:text-white">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE POVOS ONE */}
      <section className="py-20 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Why Choose <span className="gradient-text">POVOS One</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              More reasons to trust POVOS One for your opportunity discovery journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Ã°Å¸Å¡â‚¬", title: "Fast & Scalable", description: "Built with modern tech for speed and scalability." },
              { icon: "Ã°Å¸â€â€™", title: "Enterprise Security", description: "Bank-grade encryption and data protection." },
              { icon: "Ã°Å¸Å’Â", title: "Global Reach", description: "Opportunities from across the world." },
              { icon: "Ã°Å¸Â¤Â", title: "Community Support", description: "Join a community of successful applicants." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl glass hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold dark:text-white">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold"
            >
              What Our <span className="gradient-text">Users Say</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              Real stories from real users who found their next opportunity with POVOS One.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-sm mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              Choose the plan that works best for you. All plans include AI-powered matching.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for getting started",
                features: ["AI Matching", "5 Applications/month", "Basic Analytics", "Email Support"],
                button: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$29",
                description: "For serious applicants",
                features: ["AI Matching", "50 Applications/month", "Advanced Analytics", "Priority Support", "AI Recommendations"],
                button: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations and teams",
                features: ["Unlimited Applications", "Custom AI Models", "Team Collaboration", "Dedicated Support", "API Access"],
                button: "Contact Sales",
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl glass border transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular ? "border-blue-500 shadow-xl shadow-blue-500/10" : "border-slate-200/50 dark:border-slate-700/50"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold dark:text-white">{plan.name}</h3>
                <p className="text-3xl font-bold mt-2 dark:text-white">
                  {plan.price}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/month</span>
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <GradientButton variant={plan.popular ? "primary" : "outline"} size="md" className="w-full mt-8">
                  {plan.button}
                </GradientButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold"
            >
              See How It <span className="gradient-text">Works</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              Try our interactive demo to experience how AI finds your perfect opportunity.
            </motion.p>
          </div>
          <InteractiveDemo />
        </div>
      </section>

      {/* BLOG / RESOURCES */}
      <section className="py-20 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold"
              >
                Latest <span className="gradient-text">Resources</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-slate-600 dark:text-slate-300"
              >
                Guides, tips, and insights to help you succeed.
              </motion.p>
            </div>
            <Link href="/blog">
              <GradientButton variant="outline" size="sm">View All</GradientButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                image: "Ã°Å¸Å½Â¯",
                title: "How to Find the Right Grant",
                excerpt: "Learn the strategies to identify and apply for grants that match your profile.",
                date: "Dec 15, 2024",
              },
              {
                image: "Ã°Å¸â€œË†",
                title: "AI Matching Explained",
                excerpt: "Understand how our AI algorithm matches you with the best opportunities.",
                date: "Dec 10, 2024",
              },
              {
                image: "Ã°Å¸â€™Â¡",
                title: "5 Tips for a Winning Application",
                excerpt: "Expert advice on crafting applications that stand out from the crowd.",
                date: "Dec 5, 2024",
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl glass hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-4xl mb-4">{post.image}</div>
                <h3 className="text-lg font-semibold group-hover:text-blue-500 transition dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{post.excerpt}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">{post.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto max-w-4xl text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-3xl glass border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl shadow-xl shadow-blue-500/30 mb-6">
                Ã°Å¸Å¡â‚¬
              </div>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
                Ready to Find Your <span className="gradient-text">Next Opportunity</span>?
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Join thousands of users already discovering their next big opportunity
                with POVOS One.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <GradientButton variant="primary" size="lg" className="group">
                    Get Started Now
                    <Rocket className="w-4 h-4 ml-2 inline group-hover:rotate-12 transition" />
                  </GradientButton>
                </Link>
                <Link href="/login">
                  <GradientButton variant="outline" size="lg">Sign In</GradientButton>
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-400">Free forever. No credit card required.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}




