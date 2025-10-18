import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDTO {
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    syllabus?: string;
}

export class UpdateCourseDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    syllabus?: string;
}

export class DeleteCourseDTO {
    @IsString()
    course_cuid!: string;
}