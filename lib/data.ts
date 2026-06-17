// Data structure for participants
export interface Participant {
  id: string
  name: string
  phone: string
  email: string
  city: string
  activityType: 'marathon' | 'camping' | 'both'
  emergencyContact: string
  registeredAt: string
  qrCode: string
}

// Mock data storage using localStorage
const STORAGE_KEY = 'marathon_participants'

export function getParticipants(): Participant[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function addParticipant(participant: Omit<Participant, 'id' | 'registeredAt' | 'qrCode'>): Participant {
  const id = Math.random().toString(36).substring(2, 11)
  const qrCode = `${id}-${participant.name.replace(/\s+/g, '')}`
  const newParticipant: Participant = {
    ...participant,
    id,
    qrCode,
    registeredAt: new Date().toISOString(),
  }
  
  const participants = getParticipants()
  participants.push(newParticipant)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants))
  
  return newParticipant
}

export function getParticipantById(id: string): Participant | undefined {
  return getParticipants().find(p => p.id === id)
}

// Uzbekistan cities by region
export const uzbekistanData = {
  regions: [
    { name: 'Tashkent', city: 'Tashkent', coordinates: [69.2401, 41.2995] },
    { name: 'Samarkand', city: 'Samarkand', coordinates: [66.9597, 39.6548] },
    { name: 'Bukhara', city: 'Bukhara', coordinates: [64.4229, 39.7747] },
    { name: 'Khiva', city: 'Khiva', coordinates: [61.3787, 41.3786] },
    { name: 'Fergana', city: 'Fergana', coordinates: [71.7590, 40.3843] },
    { name: 'Andijan', city: 'Andijan', coordinates: [72.6337, 40.7321] },
    { name: 'Namangan', city: 'Namangan', coordinates: [71.6734, 40.9977] },
    { name: 'Kokand', city: 'Kokand', coordinates: [70.5169, 40.5263] },
    { name: 'Margilon', city: 'Margilon', coordinates: [71.7254, 40.4753] },
    { name: 'Urgench', city: 'Urgench', coordinates: [61.5361, 41.5467] },
    { name: 'Gijduvan', city: 'Gijduvan', coordinates: [65.3169, 39.7831] },
    { name: 'Shakhrisabz', city: 'Shakhrisabz', coordinates: [66.5169, 39.0167] },
    { name: 'Karshi', city: 'Karshi', coordinates: [65.7719, 38.8297] },
    { name: 'Surkhandarya', city: 'Surkhandarya', coordinates: [67.2765, 37.2256] },
  ],
}

export function getCitiesForFilter() {
  return uzbekistanData.regions.map(r => r.city).sort()
}
