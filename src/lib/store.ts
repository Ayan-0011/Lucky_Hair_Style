export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  description: string;
  active: boolean;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface SalonSettings {
  bookingEnabled: boolean;
  closedDates: string[];
  availableSlots: string[];
}

const DEFAULT_SERVICES: Service[] = [
  { id: "1", name: "Hair Cut", price: 30, duration: 30, description: "Professional haircut with styling", active: true },
  { id: "2", name: "Beard Trim", price: 15, duration: 20, description: "Clean beard trim and shaping", active: true },
  { id: "3", name: "Facial", price: 45, duration: 45, description: "Deep cleansing facial treatment", active: true },
  { id: "4", name: "Hair Color", price: 80, duration: 90, description: "Full hair coloring service", active: true },
  { id: "5", name: "Hair Spa", price: 50, duration: 60, description: "Relaxing hair spa treatment", active: true },
  { id: "6", name: "Shave", price: 12, duration: 15, description: "Traditional clean shave", active: true },
];

const DEFAULT_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const DEFAULT_SETTINGS: SalonSettings = {
  bookingEnabled: true,
  closedDates: [],
  availableSlots: DEFAULT_SLOTS,
};

function load<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getServices(): Service[] {
  return load("salon_services", DEFAULT_SERVICES);
}

export function saveServices(services: Service[]) {
  save("salon_services", services);
}

export function getAppointments(): Appointment[] {
  return load("salon_appointments", []);
}

export function saveAppointments(appointments: Appointment[]) {
  save("salon_appointments", appointments);
}

export function addAppointment(appt: Omit<Appointment, "id" | "createdAt" | "status">): Appointment {
  const appointments = getAppointments();
  const newAppt: Appointment = {
    ...appt,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppt);
  saveAppointments(appointments);
  // increment notification count
  const count = getNotificationCount();
  saveNotificationCount(count + 1);
  return newAppt;
}

export function getSettings(): SalonSettings {
  return load("salon_settings", DEFAULT_SETTINGS);
}

export function saveSettings(settings: SalonSettings) {
  save("salon_settings", settings);
}

export function getNotificationCount(): number {
  return load("salon_notifications", 0);
}

export function saveNotificationCount(n: number) {
  save("salon_notifications", n);
}

export function getAvailableSlots(date: string): string[] {
  const settings = getSettings();
  if (settings.closedDates.includes(date)) return [];
  const appointments = getAppointments().filter(a => a.date === date && a.status !== "cancelled");
  const booked = new Set(appointments.map(a => a.time));
  return settings.availableSlots.filter(s => !booked.has(s));
}

/** Format 24h time string to 12h AM/PM */
export function formatTime12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

/** Validate mobile number: exactly 10 digits */
export function isValidMobile(phone: string): boolean {
  return /^\d{10}$/.test(phone);
}
