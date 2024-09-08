'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AppAuthResetPasswordPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <Button type="submit" className="w-full">Reset Password</Button>
      <div className="text-center text-sm">
        Remember your password? <Link href="/auth/signin" className="text-blue-500 hover:underline">Sign In</Link>
      </div>
    </form>
  )
}