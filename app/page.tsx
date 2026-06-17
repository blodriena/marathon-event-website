'use client'

import { Navbar } from '@/components/navbar'
import Link from 'next/link'
import { MapPin, Users, Camera, Zap } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: MapPin,
      title: 'Explore Uzbekistan',
      description: 'Run through 14 regions with stunning landscapes and rich cultural heritage',
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Join thousands of runners and adventurers from around the world',
    },
    {
      icon: Camera,
      title: 'Capture Moments',
      description: 'Share your running journey with our vibrant photo gallery',
    },
    {
      icon: Zap,
      title: 'Experience Adventure',
      description: 'Marathon running meets camping excitement across Uzbekistan',
    },
  ]

  return (
    <>
      <Navbar />
      
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
          {/* Background gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-40 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
                Run Across
                <span className="text-accent"> Uzbekistan</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
                Experience the ultimate marathon adventure. Run through stunning landscapes, connect with global runners, and explore 14 regions of untamed beauty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/register"
                className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Register Now
              </Link>
              <Link
                href="/map"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-bold text-lg hover:bg-muted transition-colors"
              >
                Explore Routes
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-12 md:gap-8">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-accent">2.5K+</div>
                <div className="text-sm md:text-base text-muted-foreground">Registered Runners</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-accent">14</div>
                <div className="text-sm md:text-base text-muted-foreground">Regions</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-accent">45+</div>
                <div className="text-sm md:text-base text-muted-foreground">Partner Cities</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Why Join Marathon UZ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Experience the perfect blend of athletic challenge and cultural adventure
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="p-8 bg-card rounded-xl border border-border hover:border-accent transition-colors hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <Icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-accent/5 via-transparent to-accent/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Run?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Join thousands of adventurers. Register today and get your unique QR code to track your journey.
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-muted/50 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-muted-foreground text-sm">
              <p>&copy; 2026 Marathon UZ. All rights reserved. | Running Beyond Borders</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
