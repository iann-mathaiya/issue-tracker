import { TypographyH1 } from "@/components/typography/typography-h1"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Issues() {
  return (
    <div className='max-w-7xl mx-auto py-4 sm:py-8'>
      <div className="flex items-center justify-between">
        <TypographyH1>Issues</TypographyH1>
        <Button variant='link'>
          <Link href='/issues/new-issue'>Create New Issue +</Link>
        </Button>
      </div>
    </div>
  )
}
