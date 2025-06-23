/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PatientStatus } from "../schemas/patient.schema";

export class CreatePatientDto {
  @ApiProperty({ example: "John" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: "Michael" })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: "Doe" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: "1990-05-15", type: String })
  @IsDateString()
  dateOfBirth: string;

  @ApiPropertyOptional({ enum: PatientStatus, default: PatientStatus.INQUIRY })
  @IsEnum(PatientStatus)
  @IsOptional()
  status?: PatientStatus;

  @ApiProperty({ example: "123 Main St" })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: "New York" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "NY" })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: "10001" })
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
