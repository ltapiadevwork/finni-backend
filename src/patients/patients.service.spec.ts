/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { PatientsService } from "./patients.service";
import { Patient } from "./schemas/patient.schema";

const mockPatient = {
  firstName: "John",
  middleName: "Michael",
  lastName: "Doe",
  dateOfBirth: new Date("1990-05-15"),
  status: "Inquiry",
  street: "123 Main St",
  city: "New York",
  state: "NY",
  zipCode: "10001",
};

const patientArray = [
  { ...mockPatient, _id: "1" },
  { ...mockPatient, _id: "2", firstName: "Jane" },
];

const mockSave = jest.fn().mockResolvedValue(mockPatient);

const mockPatientModel = jest.fn().mockImplementation(() => ({
  save: mockSave,
}));

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
(mockPatientModel as any).find = jest.fn().mockReturnThis();
(mockPatientModel as any).sort = jest.fn().mockReturnThis();
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
(mockPatientModel as any).exec = jest.fn().mockResolvedValue(patientArray);
(mockPatientModel as any).findById = jest.fn().mockResolvedValue(mockPatient);
(mockPatientModel as any).findByIdAndUpdate = jest.fn().mockReturnThis();
(mockPatientModel as any).findByIdAndDelete = jest.fn().mockReturnThis();
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

jest.clearAllMocks();

describe("PatientsService", () => {
  let service: PatientsService;
  let model: typeof mockPatientModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getModelToken(Patient.name),
          useValue: mockPatientModel,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    model = module.get(getModelToken(Patient.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a patient", async () => {
    mockSave.mockResolvedValueOnce(mockPatient);
    const result = await service.create({
      ...mockPatient,
      dateOfBirth: "1990-05-15",
    } as any);
    expect(result).toEqual(mockPatient);
  });

  it("should return all patients", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (model as any).exec.mockResolvedValueOnce(patientArray);
    const result = await service.findAll();
    expect(result).toEqual(patientArray);
  });
});
