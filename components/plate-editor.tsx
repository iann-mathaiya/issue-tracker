"use client"

import { DndProvider } from "react-dnd"
import { Plate } from "@udecode/plate-common"
import { HTML5Backend } from "react-dnd-html5-backend"

import { Editor } from "@/components/plate-ui/editor"
import { plugins } from "@/lib/editor-config/plugins"
import { FixedToolbar } from "./plate-ui/fixed-toolbar"
import { FixedToolbarButtons } from "./plate-ui/fixed-toolbar-buttons"
import { FloatingToolbar } from "./plate-ui/floating-toolbar"
import { FloatingToolbarButtons } from "./plate-ui/floating-toolbar-buttons"

const initialValue = [
  {
    id: 1,
    type: "p",
    children: [{ text: "" }],
  },
]

export function PlateEditor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate plugins={plugins} initialValue={initialValue}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor placeholder='Type your description here.' />

        <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
      </Plate>
    </DndProvider>
  )
}
