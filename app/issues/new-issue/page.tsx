"use client"

import * as z from "zod"
import { useForm, Controller } from "react-hook-form"
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

export default function NewIssue() {
  // const form = useForm<z.infer<typeof createIssueSchema>>({
  //   resolver: zodResolver(createIssueSchema),
  //   defaultValues: {
  //     title: "",
  //     // description: "",
  //   },
  // })

  const form = useForm<z.infer<typeof createIssueSchema>>()

  function onSubmit(values: z.infer<typeof createIssueSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className='max-w-3xl mx-auto p-4 sm:p-8 space-y-8'
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

        <div className='-space-y-1'>
          <Controller
            name='description'
            control={form.control}
            render={({ field }) => (
              <DndProvider backend={HTML5Backend}>
                <FormLabel>Description</FormLabel>
                <Plate plugins={plugins} initialValue={initialValue} {...field}>
                  <FixedToolbar>
                    <FixedToolbarButtons />
                  </FixedToolbar>

                  <Editor
                    placeholder='Type your description here.' 
                  />

                  <FloatingToolbar>
                    <FloatingToolbarButtons />
                  </FloatingToolbar>
                </Plate>
                <FormMessage />
              </DndProvider>
            )}
          />
        </div>

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
