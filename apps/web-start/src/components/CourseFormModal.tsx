import React, { useState } from 'react';

export default function CourseFormModal({
    title,
    course,
    onSubmit,
    onClose,
}: {
    title: string
    course?: { title?: string; syllabus?: string}
    onSubmit: (payload: { title?: string; syllabus?: string}) => void
    onClose: () => void
}
) {
    const [formData, setFormData] = useState({
        title: course?.title ?? '',
        syllabus: course?.syllabus ?? '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: { title?: string; syllabus?: string } = {}
        if (formData.title.trim()) payload.title = formData.title.trim()
        if (formData.syllabus.trim()) payload.syllabus = formData.syllabus.trim()
        onSubmit(payload)
    }

    return(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {title}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Course title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            name="syllabus"
            placeholder="Course syllabus"
            value={formData.syllabus}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}