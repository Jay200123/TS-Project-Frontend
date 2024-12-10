const type = [
  'Printer',
  'System Unit',
  'Laptop',
  'Monitor',
  'Mobile',
  'AVR',
  'UPS',
  'Router',
  'Switch',
  'Hub',
  'Access Point',
  'Cable'
]

const status = [
  'Available',
  'Used',
  'Defective',
  'Repair',
  'Replacement',
  'Disposal',
  'Return'
]

const ticketStatus = [
  'pending', 'resolved', 'in-progress', 'closed'
]

const level = [
  'urgent', 'priority', 'non-urgent'
]

const category = ['Hardware', 'Software', 'Network']


export { type, status, category, ticketStatus, level };