import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum PatientStatus {
  INQUIRY = "Inquiry",
  ONBOARDING = "Onboarding",
  ACTIVE = "Active",
  CHURNED = "Churned",
}

@Schema({ timestamps: true })
export class Patient extends Document {
  @ApiProperty({ example: "John" })
  @Prop({ required: true, trim: true })
  firstName: string;

  @ApiPropertyOptional({ example: "Michael" })
  @Prop({ trim: true })
  middleName?: string;

  @ApiProperty({ example: "Doe" })
  @Prop({ required: true, trim: true })
  lastName: string;

  @ApiProperty({ example: "1990-05-15T00:00:00.000Z", type: String })
  @Prop({ required: true })
  dateOfBirth: Date;

  @ApiProperty({ enum: PatientStatus, example: PatientStatus.INQUIRY })
  @Prop({
    required: true,
    enum: PatientStatus,
    default: PatientStatus.INQUIRY,
  })
  status: PatientStatus;

  @ApiProperty({ example: "123 Main St" })
  @Prop({ required: true, trim: true })
  street: string;

  @ApiProperty({ example: "New York" })
  @Prop({ required: true, trim: true })
  city: string;

  @ApiProperty({ example: "NY" })
  @Prop({ required: true, trim: true })
  state: string;

  @ApiProperty({ example: "10001" })
  @Prop({ required: true, trim: true })
  zipCode: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
