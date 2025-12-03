interface Vehicle {
  id: number;
  driver: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  type: string;
  documentos?: string;
  licensePlatePhoto: string;
  registration: string;
  vehiclePhoto: string;
  vehicleInsurance: string;
  verified: boolean;
}

export default Vehicle;
