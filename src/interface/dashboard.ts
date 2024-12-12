
import { DeviceType } from "./device";
import { DeviceStatus } from "./device";
import { TicketCategory } from "./ticket";
import { TicketLevel } from "./ticket";
import { TicketStatus } from "./ticket";


type TypeCount = Record<DeviceType, number>;
type DeviceStatusCount = Record<DeviceStatus, number>;
type TicketCategoryCount = Record<TicketCategory, number>;
type TicketLevelCount = Record<TicketLevel, number>;
type TicketStatusCount = Record<TicketStatus, number>;

export type {
    TypeCount,
    DeviceStatusCount,
    TicketCategoryCount,
    TicketLevelCount,
    TicketStatusCount
};    
