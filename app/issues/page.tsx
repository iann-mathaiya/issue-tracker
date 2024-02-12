import Link from "next/link"
import prisma from "@/prisma/client"
import { Button } from "@/components/ui/button"
import { TypographyH1 } from "@/components/typography/typography-h1"

export default async function Issues() {

  const issues = await prisma.issue.findMany()

  return (
    <div className='max-w-7xl mx-auto py-4 sm:py-8'>
      <div className="flex items-center justify-between">
        <TypographyH1>Issues</TypographyH1>
        <Button variant='link'>
          <Link href='/issues/new-issue'>Create New Issue +</Link>
        </Button>
      </div>

      <div>
        {issues.map(issue => (
          <pre>
            {JSON.stringify(issue, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  )
}
