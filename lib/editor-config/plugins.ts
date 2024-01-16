import { withProps } from "@udecode/cn"
import { createPlugins, PlateLeaf } from "@udecode/plate-common"
import { withPlaceholders } from "@/components/plate-ui/placeholder"
import { withDraggables } from "@/components/plate-ui/with-draggables"
import { HeadingElement } from "@/components/plate-ui/heading-element"
import { ParagraphElement } from "@/components/plate-ui/paragraph-element"
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading'
import { createBoldPlugin, createCodePlugin, createItalicPlugin, createStrikethroughPlugin, createSubscriptPlugin, createSuperscriptPlugin, createUnderlinePlugin, MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from "@udecode/plate-basic-marks"
import { CodeLeaf } from "@/components/plate-ui/code-leaf"
import { createCodeBlockPlugin } from "@udecode/plate-code-block"
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf"
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight';

export const plugins = createPlugins([
    createParagraphPlugin(),
    createHeadingPlugin(),
    createCodeBlockPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createHighlightPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin()
], {
  components: withDraggables(withPlaceholders({
    [MARK_CODE]: CodeLeaf,
    [MARK_HIGHLIGHT]: HighlightLeaf,
    // [ELEMENT_TODO_LI]: TodoListElement,
    [ELEMENT_PARAGRAPH]: ParagraphElement,
    [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
    [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
    [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
    [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
    [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
    [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
  })),
})
