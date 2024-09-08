'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Question = {
  id: number
  type: 'text' | 'multipleChoice'
  question: string
  options?: string[]
}

type FormData = {
  id?: string
  title: string
  questions: Question[]
}

export function FormBuilder({ initialData }: { initialData?: FormData }) {
  const [formData, setFormData] = useState<FormData>(initialData || { title: '', questions: [] })

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { id: Date.now(), type: 'text', question: '' }]
    }))
  }

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === id ? { ...q, ...updates } : q)
    }))
  }

  const removeQuestion = (id: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to save form');
      }
      // Handle successful form submission (e.g., redirect to forms list)
    } catch (error) {
      console.error('Error saving form:', error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Form Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter form title"
        />
      </div>

      {formData.questions.map((question, index) => (
        <div key={question.id} className="space-y-4 p-4 border rounded">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Question {index + 1}</h3>
            <Button type="button" variant="destructive" onClick={() => removeQuestion(question.id)}>Remove</Button>
          </div>

          <div>
            <Label htmlFor={`question-${question.id}`}>Question</Label>
            <Input
              id={`question-${question.id}`}
              value={question.question}
              onChange={e => updateQuestion(question.id, { question: e.target.value })}
              placeholder="Enter question"
            />
          </div>

          <div>
            <Label htmlFor={`type-${question.id}`}>Question Type</Label>
            <Select
              value={question.type}
              onValueChange={(value: 'text' | 'multipleChoice') => updateQuestion(question.id, { type: value })}
            >
              <SelectTrigger id={`type-${question.id}`}>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {question.type === 'multipleChoice' && (
            <div>
              <Label htmlFor={`options-${question.id}`}>Options (one per line)</Label>
              <Textarea
                id={`options-${question.id}`}
                value={question.options?.join('\n') || ''}
                onChange={e => updateQuestion(question.id, { options: e.target.value.split('\n').filter(Boolean) })}
                placeholder="Enter options, one per line"
              />
            </div>
          )}
        </div>
      ))}

      <Button type="button" onClick={addQuestion}>Add Question</Button>
      <Button type="submit"className="ml-4">Save Form</Button>
    </form>
  )
}