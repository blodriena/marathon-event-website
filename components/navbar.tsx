'use client'

import Link from 'next/link'
import { Activity } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-accent transition-colors">
            <Activity className="w-6 h-6 text-accent" />
            <span>Marathon UZ</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/register" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Register
            </Link>
            <Link href="/participants" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Participants
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Gallery
            </Link>
            <Link href="/map" className="text-foreground hover:text-accent transition-colors text-sm font-medium">
              Map
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/register"
            className="hidden sm:inline-flex px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  )
}
