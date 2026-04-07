import React from 'react'
import { Clock, Sparkles, Star } from 'lucide-react'

const Features = () => {
  return (
    <section className="container py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Premium care tailored to your unique style ✨
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Star, title: "Expert Stylists", desc: "Professional Hair & Facial Artists✨" },
            { icon: Sparkles, title: "Premium Products", desc: "Luxury products for flawless hair & skin " },
            { icon: Clock, title: "Flexible Hours", desc: "Open 7 days for your convenience, Your Time, Your Style 🔥" },
          ].map((f, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border bg-card/60 backdrop-blur-md p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 animate-fade-in"
              style={{ animationDelay: `${0.15 * (i + 1)}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/10 via-transparent to-primary/10"></div>

              {/* Icon */}
              <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-md group-hover:scale-110 transition">
                <f.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="relative mb-3 text-xl font-semibold tracking-wide">
                {f.title}
              </h3>

              {/* Description */}
              <p className="relative text-sm text-muted-foreground font-body leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </section>

  )
}

export default Features
