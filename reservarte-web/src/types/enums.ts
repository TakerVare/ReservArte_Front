export enum AppointmentStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  NoShow = 'NoShow',
}

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Employee = 'Employee',
  Customer = 'Customer',
}

export enum PaymentMethod {
  Card = 'Card',
  Cash = 'Cash',
  Transfer = 'Transfer',
  Bizum = 'Bizum',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Authorized = 'Authorized',
  Captured = 'Captured',
  Failed = 'Failed',
  Refunded = 'Refunded',
}
