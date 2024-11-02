export type FVHTripRecords = {
  id: string;
  dispatchingBaseNum: string;
  pickupDatetime: Date;
  dropoffDatetime: Date;
  puLocationId: number;
  doLocationId: number;
  srFlag: number | null;
  affiliatedBaseNum: string;
};

export type HVFHVTripRecords = {
  id: string;
  hvfhsLicenseNum: string;
  dispatchingBaseNum: string;
  pickupDatetime: Date;
  dropOffDatetime: Date;
  puLocationId: number;
  doLocationId: number;
  originatingBaseNum: string;
  requestDatetime: Date;
  onSceneDatetime: Date;
  tripMiles: number;
  tripTime: number;
  basePassengerFare: number;
  tolls: number;
  bcf: number;
  salesTax: number;
  congestionSurcharge: number;
  airportFee: number;
  tips: number;
  driverPay: number;
  sharedRequestFlag: boolean;
  sharedMatchFlag: boolean;
  accessARideFlag: boolean;
  wavRequestFlag: boolean;
  wavMatchFlag: boolean;
};

export type TaxiZoneLookup = {
  id: number;
  borough: string;
  zone: string;
  serviceZone: string;
};

export type GreenTripRecords = {
  id: string;
  vendorId: number;
  lpepPickupDatetime: Date;
  lpepDropoffDatetime: Date;
  storeAndFwdFlag: "Y" | "N";
  rateCodeId: number;
  puLocationId: number;
  doLocationId: number;
  passengerCount: number;
  tripDistance: number;
  fareAmount: number;
  extra: number;
  mtaTax: number;
  tipAmount: number;
  tollsAmount: number;
  improvementSurcharge: number;
  totalAmount: number;
  ehailFee?: number;
  paymentType: number;
  tripTip: number;
  congestionSurcharge: number;
  airportFee?: string;
};

export type YellowTripRecords = {
  id: string;
  vendorId: number;
  tpepPickupDatetime: Date;
  tpepDropoffDatetime: Date;
  storeAndFwdFlag: "Y" | "N";
  rateCodeId: number;
  puLocationId: number;
  doLocationId: number;
  passengerCount: number;
  tripDistance: number;
  fareAmount: number;
  extra: number;
  mtaTax: number;
  tipAmount: number;
  tollsAmount: number;
  improvementSurcharge: number;
  totalAmount: number;
  paymentType: number;
  ehailFee?: number;
  tripTip: number;
  congestionSurcharge: number;
  airportFee: string;
};
