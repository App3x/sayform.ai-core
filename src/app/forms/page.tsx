'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from a database
const forms = [
  { id: 1, title: "Customer Feedback", responses: 24 },
  { id: 2, title: "Employee Survey", responses: 15 },
  { id: 3, title: "Product Evaluation", responses: 8 },
]

export function AppFormsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <Button asChild>
          <Link href="/forms/create">Create New Form</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{form.responses} responses</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href={`/forms/${form.id}`}>View</Link>
              </Button>
              <Button asChild>
                <Link href={`/forms/${form.id}/edit`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}