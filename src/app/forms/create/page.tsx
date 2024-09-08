import { FormBuilder } from '@/components/form/builder'

export function AppFormsCreatePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Form</h1>
      <FormBuilder />
    </div>
  )
}