'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { addParticipant, getCitiesForFilter } from '@/lib/data'
import { CheckCircle, QrCode } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    activityType: 'marathon' as 'marathon' | 'camping' | 'both',
    emergencyContact: '',
  })

  const [registered, setRegistered] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [participantId, setParticipantId] = useState('')
  const cities = getCitiesForFilter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const participant = addParticipant(formData)
      setQrCode(participant.qrCode)
      setParticipantId(participant.id)
      setRegistered(true)
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        activityType: 'marathon',
        emergencyContact: '',
      })
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  if (registered) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen py-20 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Card */}
            <div className="bg-card rounded-2xl border border-accent p-8 md:p-12 text-center space-y-6">
              <CheckCircle className="w-16 h-16 text-accent mx-auto" />
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground">
                  Welcome to Marathon UZ!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Registration successful. Here&apos;s your unique QR code.
                </p>
              </div>

              {/* QR Code Display */}
              <div className="bg-white p-8 rounded-xl inline-block shadow-lg">
                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-accent">
                  <div className="text-center space-y-4">
                    <QrCode className="w-24 h-24 text-accent mx-auto" />
                    <div className="font-mono text-lg font-bold text-foreground">
                      {qrCode}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-foreground">Your Participant ID:</p>
                <p className="font-mono text-lg text-accent">{participantId}</p>
              </div>

              <div className="text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Next Steps:</p>
                <ul className="text-left space-y-2">
                  <li>✓ Save or screenshot your QR code</li>
                  <li>✓ Check your email for event details</li>
                  <li>✓ Join our community on social media</li>
                  <li>✓ Prepare for an amazing adventure!</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  href="/participants"
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  View All Participants
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join the Adventure
            </h1>
            <p className="text-lg text-muted-foreground">
              Register for Marathon UZ and get your unique QR code to track your journey
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activity Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Activity Type *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['marathon', 'camping', 'both'] as const).map(type => (
                    <label
                      key={type}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.activityType === type
                          ? 'border-accent bg-accent/10'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="activityType"
                        value={type}
                        checked={formData.activityType === type}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="capitalize font-semibold text-foreground text-sm">
                        {type === 'both' ? 'Marathon & Camping' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Emergency Contact *
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name & phone number"
                  required
                  className="w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:border-accent focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Register & Get QR Code
              </button>

              <p className="text-center text-sm text-muted-foreground">
                By registering, you agree to our terms and conditions
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
