// prisma/seed.ts
import { PrismaClient } from '../generated/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database')

  // --- Create Courses ---
  const courses = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.course.create({
        data: {
          title: faker.company.catchPhrase(),
          syllabus: faker.lorem.paragraph(),
        },
      })
    )
  )

  // --- Create Students and enroll in random courses ---
  const students = await Promise.all(
    Array.from({ length: 20 }).map(() => {
      const enrolledCourses = faker.helpers.arrayElements(
        courses,
        faker.number.int({ min: 1, max: 3 })
      )

      return prisma.student.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          courses: {
            connect: enrolledCourses.map((c) => ({ course_cuid: c.course_cuid })),
          },
        },
      })
    })
  )

  // --- Create Assignments, Problems, and Submissions ---
  for (const course of courses) {
    // each course has 2–4 assignments
    const assignments = await Promise.all(
      Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() =>
        prisma.assignment.create({
          data: {
            overview: faker.lorem.sentence(),
            course: {
              connect: { course_cuid: course.course_cuid },
            },
          },
        })
      )
    )

    for (const assignment of assignments) {
      // add 3–6 problems per assignment
      await Promise.all(
        Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map(() =>
          prisma.problem.create({
            data: {
              description: faker.lorem.sentence(),
              assignment: {
                connect: { assignment_cuid: assignment.assignment_cuid },
              },
            },
          })
        )
      )

      // pick 5–10 students from the course to submit
      const enrolledStudents = await prisma.student.findMany({
        where: { courses: { some: { course_cuid: course.course_cuid } } },
      })
      const randomStudents = faker.helpers.arrayElements(
        enrolledStudents,
        faker.number.int({ min: 5, max: 10 })
      )

      await Promise.all(
        randomStudents.map((student) =>
          prisma.submission.create({
            data: {
              submission: faker.lorem.paragraph(),
              assignment: {
                connect: { assignment_cuid: assignment.assignment_cuid },
              },
              student: {
                connect: { student_cuid: student.student_cuid },
              },
            },
          })
        )
      )
    }
  }

  console.log('Seeding complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
