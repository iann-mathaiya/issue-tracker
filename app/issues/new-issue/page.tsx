"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createIssueSchema } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import { PlateEditor } from "@/components/plate-editor"

export default function NewIssue() {
  const form = useForm<z.infer<typeof createIssueSchema>>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(values: z.infer<typeof createIssueSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-3xl mx-auto py-4 sm:py-8 space-y-8'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Issue Title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PlateEditor />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
