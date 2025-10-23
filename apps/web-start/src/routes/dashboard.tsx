import { createFileRoute } from '@tanstack/react-router';
import { Suspense, useState } from "react"
import { useQueryClient } from '@tanstack/react-query';
import CourseList from '../components/CourseList';
import CourseFormModal from '../components/CourseFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { ProtectedRoute } from '../components/ProtectedRoute';


export const Route = createFileRoute('/dashboard')({
  component: () => (
    <ProtectedRoute>
      <DashboardComponent />
    </ProtectedRoute>
  )
});


export default function DashboardComponent() {
  const queryClient = useQueryClient();
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddCourse = async (courseData: any) => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      await queryClient.invalidateQueries({ queryKey: ['courses'],});
      setModalMode(null);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleEditCourse = async (courseId: string, updatedData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to edit course');
      }

      await queryClient.invalidateQueries({ queryKey: ['courses'] });
      await queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      setModalMode(null);
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/${courseId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      await queryClient.invalidateQueries({ queryKey: ['courses'] });
      setModalMode(null)
    } catch (error) {
      console.error('Error deleting course:', error);
    }
};
  
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        {/* Add Course Button */}
        <button onClick={() => {
          setSelectedCourse(null)
          setModalMode('add')
        }} 
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded">
          Add New Course
        </button>

        {/* Course Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">My Courses</h2>
        <Suspense fallback={<p>Loading courses...</p>}>
          <CourseList
            onEdit={(course) => {
              setSelectedCourse(course);
              setModalMode('edit');
            }}
            onDelete={(course) => {
              setSelectedCourse(course);
              setModalMode('delete');
            }}
          />
        </Suspense>
        </section>

        {/* Popups */}
        {modalMode === 'add' && (
          <CourseFormModal
            title="Add Course"
            onSubmit={handleAddCourse}
            onClose={() => setModalMode(null)}
          />
        )}

        {modalMode === 'edit' && selectedCourse && (
          <CourseFormModal
            title="Edit Course"
            course={selectedCourse}
            onSubmit={(data) => handleEditCourse(selectedCourse.course_cuid, data)}
            onClose={() => setModalMode(null)}
          />
        )}

        {modalMode === 'delete' && selectedCourse && (
          <ConfirmDeleteModal
            courseTitle={selectedCourse.title}
            onConfirm={() => handleDeleteCourse(selectedCourse.course_cuid)}
            onCancel={() => setModalMode(null)}
          />
        )}

        {/* Quick Stats */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Progress</h2>
          <div className="bg-white p-4 rounded shadow">
            <p>Course Completion: 70%</p>
            <p>Assignments Submitted: 8 / 10</p>
          </div>
        </section>
      </div>
    </main>
  )
}
