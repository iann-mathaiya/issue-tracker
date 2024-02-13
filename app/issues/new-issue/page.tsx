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
import { initialValue } from "@/components/plate-editor"

import { DndProvider } from "react-dnd"
import { Plate } from "@udecode/plate-common"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Editor } from "@/components/plate-ui/editor"
import { plugins } from "@/lib/editor-config/plugins"
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar"
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar"
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons"
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons"

import axios, { AxiosError } from "axios"
import { Node } from "slate"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

type IssueSchema = z.infer<typeof createIssueSchema>

export default function NewIssue() {
  const router = useRouter()

  const [error, setError] = useState(false)

  const form = useForm<IssueSchema>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: initialValue,
    },
  })

  function serialize(value: any[] | string) {
    if (Array.isArray(value)) {
      return value.map((val) => Node.string(val)).join("\n")
    }

    return value
  }

  async function onSubmit(values: IssueSchema) {
    try {
      const data = {
        title: values.title,
        description:
          form.getFieldState("description").isDirty &&
          serialize(values.description),
      }

      await axios.post("/api/issues", data)

      router.push("/issues")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(true)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-3xl mx-auto p-4 sm:p-8 space-y-8'
      >
        <FormField
          name='title'
          control={form.control}
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

        <div className='-space-y-1'>
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <>
                <DndProvider backend={HTML5Backend}>
                  <FormLabel className={twMerge(error && "text-red-500")}>
                    Description
                  </FormLabel>
                  <Plate {...field} plugins={plugins}>
                    <FixedToolbar>
                      <FixedToolbarButtons />
                    </FixedToolbar>

                    <Editor placeholder='Type your description here.' />

                    <FormMessage className='pt-4' />
                    {error && (
                      <FormMessage>Description is required</FormMessage>
                    )}
                    <FloatingToolbar>
                      <FloatingToolbarButtons />
                    </FloatingToolbar>
                  </Plate>
                </DndProvider>
              </>
            )}
          />
        </div>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
