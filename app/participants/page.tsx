'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { getParticipants, getCitiesForFilter } from '@/lib/data'
import { Search, Filter } from 'lucide-react'

export default function ParticipantsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedActivity, setSelectedActivity] = useState('')
  
  const participants = getParticipants()
  const cities = getCitiesForFilter()

  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.phone.includes(searchTerm)
      const matchesCity = !selectedCity || p.city === selectedCity
      const matchesActivity = !selectedActivity || p.activityType === selectedActivity
      
      return matchesSearch && matchesCity && matchesActivity
    })
  }, [searchTerm, selectedCity, selectedActivity, participants])

  const activityColor = (type: string) => {
    switch (type) {
      case 'marathon':
        return 'bg-accent/20 text-accent'
      case 'camping':
        return 'bg-blue-500/20 text-blue-600'
      case 'both':
        return 'bg-purple-500/20 text-purple-600'
      default:
        return 'bg-gray-500/20 text-gray-600'
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Registered Participants
            </h1>
            <p className="text-lg text-muted-foreground">
              {filteredParticipants.length} adventurers ready to run across Uzbekistan
            </p>
          </div>

          {/* Filters & Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* City Filter */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-accent focus:outline-none transition-colors"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Filter */}
            <div>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:border-accent focus:outline-none transition-colors"
              >
                <option value="">All Activities</option>
                <option value="marathon">Marathon</option>
                <option value="camping">Camping</option>
                <option value="both">Marathon & Camping</option>
              </select>
            </div>

            {/* Reset Button */}
            <div>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCity('')
                  setSelectedActivity('')
                }}
                className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Participants Table */}
          {filteredParticipants.length > 0 ? (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Name</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Email</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Phone</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">City</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Activity</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">QR Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant) => (
                      <tr key={participant.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-foreground">{participant.name}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{participant.email}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{participant.phone}</td>
                        <td className="px-6 py-4 text-foreground">{participant.city}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${activityColor(participant.activityType)}`}>
                            {participant.activityType === 'both' ? 'Marathon & Camping' : participant.activityType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <code className="font-mono text-sm bg-secondary px-2 py-1 rounded text-accent">
                            {participant.qrCode}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                {participants.length === 0 
                  ? 'No participants yet. Be the first to register!'
                  : 'No participants match your filters.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
