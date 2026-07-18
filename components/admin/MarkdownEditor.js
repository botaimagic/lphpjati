'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';

function ToolbarButton({ onClick, active, children, title }) {
    return (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            className={active ? 'active' : ''}
            title={title}
        >
            {children}
        </button>
    );
}

export default function MarkdownEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TiptapImage,
            TiptapLink.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: 'Write your post…' }),
            Markdown.configure({ html: false, transformPastedText: true }),
        ],
        content: value || '',
        immediatelyRender: false,
        onUpdate: ({ editor: ed }) => {
            onChange(ed.storage.markdown.getMarkdown());
        },
    });

    if (!editor) return null;

    function insertLink() {
        const url = window.prompt('Link URL');
        if (!url) return;
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }

    function insertImage() {
        const url = window.prompt('Image URL');
        if (!url) return;
        editor.chain().focus().setImage({ src: url, alt: '' }).run();
    }

    return (
        <div className="md-editor">
            <div className="md-toolbar">
                <ToolbarButton title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <b>B</b>
                </ToolbarButton>
                <ToolbarButton title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <i>I</i>
                </ToolbarButton>
                <ToolbarButton title="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <s>S</s>
                </ToolbarButton>
                <span className="md-toolbar-divider" />
                <ToolbarButton title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    H2
                </ToolbarButton>
                <ToolbarButton title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    H3
                </ToolbarButton>
                <span className="md-toolbar-divider" />
                <ToolbarButton title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    • List
                </ToolbarButton>
                <ToolbarButton title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    1. List
                </ToolbarButton>
                <ToolbarButton title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    &ldquo;Quote&rdquo;
                </ToolbarButton>
                <ToolbarButton title="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    Code
                </ToolbarButton>
                <span className="md-toolbar-divider" />
                <ToolbarButton title="Insert link" active={editor.isActive('link')} onClick={insertLink}>
                    Link
                </ToolbarButton>
                <ToolbarButton title="Insert image" onClick={insertImage}>
                    Image
                </ToolbarButton>
                <span className="md-toolbar-divider" />
                <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>↺</ToolbarButton>
                <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>↻</ToolbarButton>
            </div>
            <EditorContent editor={editor} className="md-editor-content" />
            <span className="admin-field-hint">
                Formats like a normal document — bold looks bold, headings look like headings. Saved as Markdown behind the scenes.
            </span>
        </div>
    );
}
