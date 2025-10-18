export class CourseDTO {
    course_cuid!: string;
    title!: string;
    syllabus?: string;
}

export class AssignmentDTO {
    assignment_cuid!: string;
    course_cuid!: string;
    overview?: string;
}