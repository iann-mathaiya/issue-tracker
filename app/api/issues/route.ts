import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"
import { createIssueSchema } from "@/lib/types"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const issueValidation = createIssueSchema.safeParse(body)

  if (!issueValidation.success) {
    return NextResponse.json(issueValidation.error.format(), {
      status: 400,
    })
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })

  revalidatePath('/issues')

  return NextResponse.json(newIssue, { status: 201 })
}
