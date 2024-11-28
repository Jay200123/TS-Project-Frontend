import { User } from "./user";
import { Image } from "./image";

type Type =
  | "Printer"
  | "System Unit"
  | "Laptop"
  | "Monitor"
  | "Mobile"
  | "Keyboard"
  | "Mouse"
  | "AVR"
  | "UPS"
  | "Router"
  | "Switch"
  | "Hub"
  | "Access Point"
  | "Cable";

type STATUS =
  | "Available"
  | "Used"
  | "Repair"
  | "Replacement"
  | "Disposal"
  | "Return";

interface Device extends Document {
  _id: string;
  owner: User;
  type: Type;
  description: string;
  date_requested: Date;
  date_purchased: Date;
  serial_number: string;
  status: STATUS;
  image: Image[];
}

interface DeviceState {
  devices: Device[];
  device: Device | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  getAllDevices: () => Promise<Device[]>;
  getOneDevice: (id: string) => Promise<Device>;
  createDevice: (formData: FormData) => Promise<Device>;
  updateDeviceById: (id: string, formData: FormData) => Promise<Device>;
  deleteDeviceById: (id: string) => Promise<void>;
}

export type { Device, DeviceState }; 