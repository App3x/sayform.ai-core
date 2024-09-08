'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Question = {
  id: number
  type: 'text' | 'multipleChoice'
  question: string
  options?: string[]
}

type FormData = {
  id: string
  title: string
  questions: Question[]
}

export function FormSubmission({ formData }: { formData: FormData }) {
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submission:', answers)
    // Here you would typically send the data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formData.questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <Label>{question.question}</Label>
          {question.type === 'text' ? (
            <Input
              value={answers[question.id] || ''}
              onChange={e => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
              placeholder="Enter your answer"
            />
          ) : (
            <RadioGroup
              value={answers[question.id]}
              onValueChange={value => setAnswers(prev => ({ ...prev, [question.id]: value }))}
            >
              {question.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  )
}