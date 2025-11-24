interface Driver {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  documentos?: string;
  photo: string;
  INE: string;
  license: string;
  proofOfAddress: string;
  taxCompliance: string;
  verified: boolean;
}

export default Driver;
