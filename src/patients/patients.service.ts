import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Patient } from "./schemas/patient.schema";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel({
      ...createPatientDto,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
    });
    return createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const updateData: Record<string, any> = { ...updatePatientDto };

    // Convert dateOfBirth string to Date if provided
    if (updatePatientDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updatePatientDto.dateOfBirth);
    }

    const updatedPatient = await this.patientModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedPatient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return updatedPatient;
  }

  async remove(id: string): Promise<void> {
    const result = await this.patientModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async findByStatus(status: string): Promise<Patient[]> {
    return this.patientModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  async searchPatients(query: string): Promise<Patient[]> {
    const regex = new RegExp(query, "i");
    return this.patientModel
      .find({
        $or: [
          { firstName: regex },
          { middleName: regex },
          { lastName: regex },
          { city: regex },
          { state: regex },
        ],
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}
