import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient, PatientStatus } from "./schemas/patient.schema";

@ApiTags("patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new patient" })
  @ApiResponse({
    status: 201,
    description: "Patient created successfully",
    type: Patient,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all patients with optional filtering" })
  @ApiQuery({
    name: "status",
    required: false,
    enum: PatientStatus,
    description: "Filter by patient status",
  })
  @ApiQuery({
    name: "search",
    required: false,
    description: "Search patients by name, city, or state",
  })
  @ApiResponse({
    status: 200,
    description: "List of patients",
    type: [Patient],
  })
  findAll(
    @Query("status") status?: string,
    @Query("search") search?: string,
  ): Promise<Patient[]> {
    if (search) {
      return this.patientsService.searchPatients(search);
    }
    if (status) {
      return this.patientsService.findByStatus(status);
    }
    return this.patientsService.findAll();
  }

  @Get("statuses")
  @ApiOperation({ summary: "Get available patient statuses" })
  @ApiResponse({ status: 200, description: "Available statuses" })
  getStatuses(): { statuses: string[] } {
    return { statuses: Object.values(PatientStatus) };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a patient by ID" })
  @ApiResponse({ status: 200, description: "Patient found", type: Patient })
  @ApiResponse({ status: 404, description: "Patient not found" })
  findOne(@Param("id") id: string): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a patient" })
  @ApiResponse({
    status: 200,
    description: "Patient updated successfully",
    type: Patient,
  })
  @ApiResponse({ status: 404, description: "Patient not found" })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param("id") id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a patient" })
  @ApiResponse({ status: 200, description: "Patient deleted successfully" })
  @ApiResponse({ status: 404, description: "Patient not found" })
  remove(@Param("id") id: string): Promise<void> {
    return this.patientsService.remove(id);
  }
}
