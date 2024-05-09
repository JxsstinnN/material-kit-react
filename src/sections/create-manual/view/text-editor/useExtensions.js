import {
  Bold,
  Code,
  Link,
  Text,
  Color,
  Italic,
  Strike,
  History,
  useMemo,
  Document,
  ListItem,
  TableRow,
  TaskItem,
  TaskList,
  CodeBlock,
  Gapcursor,
  HardBreak,
  Highlight,
  Paragraph,
  Subscript,
  TableCell,
  TextStyle,
  Underline,
  BulletList,
  FontFamily,
  OrderedList,
  Placeholder,
  Superscript,
  TableHeader,
  HorizontalRule
} from "@tiptap/core";


export default function useExtensions({ placeholder } = {}) {
  return useMemo(() => [
      TableRow,
      TableHeader,
      TableCell,

      BulletList,
      CodeBlock,
      Document,
      HardBreak,
      ListItem,
      OrderedList,
      Paragraph,
      Subscript.extend({
        excludes: "superscript",
      }),
      Superscript.extend({
        excludes: "subscript",
      }),
      Text,

      Bold,

      Code,
      Italic,
      Underline,
      Strike,
      Link.extend({
        inclusive: false,
        autolink: true,
        linkOnPaste: true,
        openOnClick: false,
      }),
      // Other extensions
      Gapcursor,

      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      HorizontalRule,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      History,
    ], [placeholder]);
}
