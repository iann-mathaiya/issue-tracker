import { z } from "zod"
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const issueValidation = createIssueSchema.safeParse(body)

  if (!issueValidation.success) {
    return NextResponse.json(issueValidation.error.errors, {
      status: 400,
    })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(newIssue, { status: 201 })
}
