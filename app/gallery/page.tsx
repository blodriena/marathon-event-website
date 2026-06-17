'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import Image from 'next/image'

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'running' | 'camping'>('running')

  const runningPhotos = [
    { id: 1, title: 'Desert Marathon Start', location: 'Samarkand' },
    { id: 2, title: 'Runner at Sunrise', location: 'Bukhara' },
    { id: 3, title: 'Mountain Trail Run', location: 'Fergana Valley' },
    { id: 4, title: 'Urban Sprint', location: 'Tashkent' },
  ]

  const campingPhotos = [
    { id: 5, title: 'Desert Camp Setup', location: 'Kyzylkum Desert' },
    { id: 6, title: 'Campfire Evening', location: 'Aydarkul Lake' },
    { id: 7, title: 'Mountain Camping', location: 'Chatkal Mountains' },
    { id: 8, title: 'Starry Night', location: 'Central Uzbekistan' },
  ]

  const photos = activeTab === 'running' ? runningPhotos : campingPhotos

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore moments from our marathon and camping adventures
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => setActiveTab('running')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'running'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              Running Events
            </button>
            <button
              onClick={() => setActiveTab('camping')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'camping'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              Camping Adventures
            </button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-colors hover:shadow-lg"
              >
                {/* Image Placeholder */}
                <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-center space-y-2 z-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">{photo.id}</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {photo.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {photos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No photos available yet. Check back soon!
              </p>
            </div>
          )}

          {/* Upload CTA */}
          <div className="mt-16 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 rounded-xl p-8 text-center border border-accent/20">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Share Your Adventure
            </h3>
            <p className="text-muted-foreground mb-6">
              Upload your photos from the marathon and camping events
            </p>
            <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Upload Photo
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
