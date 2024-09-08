'use client'

import { FormBuilder } from '@/components/FormBuilder'

// This would typically come from a database
const getFormData = (id: string) => ({
  id,
  title: "Sample Form",
  questions: [
    { id: 1, type: 'text', question: "What's your name?" },
    { id: 2, type: 'multipleChoice', question: "How did you hear about us?", options: ['Search Engine', 'Social Media', 'Friend', 'Other'] },
  ]
})

export function AppFormsIdEditPage({ params }: { params: { id: string } }) {
  const formData = getFormData(params.id)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Form: {formData.title}</h1>
      <FormBuilder initialData={formData} />
    </div>
  )
}