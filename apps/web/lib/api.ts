export async function fetchCourses() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch courses');
    }
    return res.json();
}

export async function fetchCourse(course_cuid: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${course_cuid}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
}


export async function fetchAssignments(course_cuid: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${course_cuid}/assignments`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch assignments');
    }
    return res.json();
}