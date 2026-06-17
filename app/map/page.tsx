'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { uzbekistanData } from '@/lib/data'
import { MapPin, Zap } from 'lucide-react'

export default function MapPage() {
  const [activeRegion, setActiveRegion] = useState(uzbekistanData.regions[0])
  const [carPosition, setCarPosition] = useState(0)

  // Animate car moving between regions
  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition(prev => (prev + 1) % (uzbekistanData.regions.length * 30))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const currentRegionIndex = Math.floor(carPosition / 30) % uzbekistanData.regions.length
  const nextRegionIndex = (currentRegionIndex + 1) % uzbekistanData.regions.length

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Route Map
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore the marathon route across all 14 regions of Uzbekistan
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map/Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-8 space-y-6">
                {/* Simplified Route Visualization */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Route Journey</h3>
                  
                  <div className="bg-secondary/50 rounded-lg p-6 space-y-4">
                    {/* Route line with animated segments */}
                    <div className="space-y-2">
                      {uzbekistanData.regions.map((region, idx) => (
                        <div key={region.name} className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                            idx === currentRegionIndex
                              ? 'bg-accent text-accent-foreground scale-125'
                              : idx <= currentRegionIndex
                              ? 'bg-accent/30 text-accent'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {idx < 10 ? `0${idx + 1}` : idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold transition-colors ${
                              idx === currentRegionIndex
                                ? 'text-accent'
                                : 'text-foreground'
                            }`}>
                              {region.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{region.city}</p>
                          </div>
                          {idx === currentRegionIndex && (
                            <Zap className="w-5 h-5 text-accent animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Current Location */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-bold text-foreground mb-4">Current Route Segment</h4>
                  <div className="bg-accent/10 border-l-4 border-accent rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-semibold text-foreground">
                        {uzbekistanData.regions[currentRegionIndex].name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Moving towards {uzbekistanData.regions[nextRegionIndex].name}
                    </p>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-100"
                        style={{ width: `${(carPosition % 30) * 3.33}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Details Sidebar */}
            <div>
              <div className="bg-card rounded-xl border border-border p-6 space-y-6 sticky top-24">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Region Information
                  </h3>
                </div>

                {/* Region List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {uzbekistanData.regions.map((region) => (
                    <button
                      key={region.name}
                      onClick={() => setActiveRegion(region)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all font-semibold ${
                        activeRegion.name === region.name
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>

                {/* Selected Region Details */}
                <div className="border-t border-border pt-6 space-y-4">
                  <h4 className="font-bold text-foreground">Selected Region</h4>
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Region</p>
                      <p className="font-bold text-foreground text-lg">{activeRegion.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Main City</p>
                      <p className="font-bold text-foreground">{activeRegion.city}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Coordinates</p>
                      <p className="font-mono text-sm text-accent">
                        {activeRegion.coordinates[0].toFixed(4)}, {activeRegion.coordinates[1].toFixed(4)}
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm">
                    Route Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Marathon Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Total Distance</p>
              <p className="text-3xl font-bold text-accent">523 km</p>
              <p className="text-xs text-muted-foreground">Across all 14 regions</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Elevation Gain</p>
              <p className="text-3xl font-bold text-accent">4,200 m</p>
              <p className="text-xs text-muted-foreground">Challenging mountain routes</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Estimated Duration</p>
              <p className="text-3xl font-bold text-accent">45 Days</p>
              <p className="text-xs text-muted-foreground">For full route completion</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
