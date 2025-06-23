import {
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PatientStatus } from "../schemas/patient.schema";

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: "John" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional({ example: "Michael" })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiPropertyOptional({ example: "Doe" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional({ example: "1990-05-15", type: String })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: PatientStatus, default: PatientStatus.INQUIRY })
  @IsEnum(PatientStatus)
  @IsOptional()
  status?: PatientStatus;

  @ApiPropertyOptional({ example: "123 Main St" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  street?: string;

  @ApiPropertyOptional({ example: "New York" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @ApiPropertyOptional({ example: "NY" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  state?: string;

  @ApiPropertyOptional({ example: "10001" })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  zipCode?: string;
}
