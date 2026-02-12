"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Save, Loader2, Eye, FileText, Search, ChevronRight, Bold, Italic, Underline, List, ListOrdered, Link2, Heading2, Undo2, Redo2, Code, Plus, Trash2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useSWR from "swr"

interface Policy {
  id: string
  slug: string
  title: string
  content: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  is_published: boolean
  created_at: string
  updated_at: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const TOOLBAR_ACTIONS = [
  { cmd: "bold", icon: Bold, label: "Bold" },
  { cmd: "italic", icon: Italic, label: "Italic" },
  { cmd: "underline", icon: Underline, label: "Underline" },
  { cmd: "divider" as const },
  { cmd: "formatBlock:h2", icon: Heading2, label: "Heading" },
  { cmd: "insertUnorderedList", icon: List, label: "Bullet List" },
  { cmd: "insertOrderedList", icon: ListOrdered, label: "Numbered List" },
  { cmd: "divider" as const },
  { cmd: "createLink", icon: Link2, label: "Link" },
  { cmd: "removeFormat", icon: Code, label: "Clear Format" },
]

function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInternalUpdate = useRef(false)

  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      editorRef.current.innerHTML = value
    }
    isInternalUpdate.current = false
  }, [value])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalUpdate.current = true
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  const execCmd = (cmdStr: string) => {
    if (cmdStr.startsWith("formatBlock:")) {
      document.execCommand("formatBlock", false, `<${cmdStr.split(":")[1]}>`)
    } else if (cmdStr === "createLink") {
      const url = prompt("Enter URL:")
      if (url) document.execCommand("createLink", false, url)
    } else {
      document.execCommand(cmdStr, false)
    }
    editorRef.current?.focus()
    handleInput()
  }

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-secondary/50 border-b border-border">
        {TOOLBAR_ACTIONS.map((action, i) => {
          if (action.cmd === "divider") {
            return <div key={`d-${i}`} className="w-px h-5 bg-border mx-1" />
          }
          const Icon = action.icon!
          return (
            <button
              key={action.cmd}
              type="button"
              onClick={() => execCmd(action.cmd)}
              className="p-1.5 rounded-sm hover:bg-secondary transition-colors"
              title={action.label}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
        <div className="w-px h-5 bg-border mx-1" />
        <button
          type="button"
          onClick={() => document.execCommand("undo")}
          className="p-1.5 rounded-sm hover:bg-secondary transition-colors"
          title="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => document.execCommand("redo")}
          className="p-1.5 rounded-sm hover:bg-secondary transition-colors"
          title="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 text-sm leading-relaxed focus:outline-none prose prose-sm max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-ul:list-disc prose-ul:pl-5"
      />
    </div>
  )
}

export function AdminPolicies() {
  const { data: policies = [], mutate } = useSWR<Policy[]>("/api/admin/policies", fetcher)
  const [selected, setSelected] = useState<Policy | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [form, setForm] = useState({
    slug: "",
    title: "",
    content: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_published: true,
  })

  useEffect(() => {
    if (policies.length > 0 && !selected) {
      selectPolicy(policies[0])
    }
  }, [policies, selected])

  const selectPolicy = (p: Policy) => {
    setSelected(p)
    setForm({
      slug: p.slug,
      title: p.title,
      content: p.content,
      meta_title: p.meta_title,
      meta_description: p.meta_description,
      meta_keywords: p.meta_keywords,
      is_published: p.is_published,
    })
    setShowPreview(false)
    setError("")
  }

  const handleSave = async () => {
    if (!form.slug || !form.title || !form.content) {
      setError("Slug, title, and content are required")
      return
    }

    setSaving(true)
    setError("")

    try {
      const payload = selected ? { id: selected.id, ...form } : form
      const res = await fetch("/api/admin/policies", {
        method: selected ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save policy")
      }

      mutate()
      if (!selected) {
        setForm({ slug: "", title: "", content: "", meta_title: "", meta_description: "", meta_keywords: "", is_published: true })
      }
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this policy?")) return

    setDeleting(true)
    setError("")

    try {
      const res = await fetch(`/api/admin/policies?id=${id}`, { method: "DELETE" })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to delete policy")
      }

      if (selected?.id === id) {
        setSelected(null)
        setForm({ slug: "", title: "", content: "", meta_title: "", meta_description: "", meta_keywords: "", is_published: true })
      }
      mutate()
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">Policies Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage Terms, Privacy, Refund, Cookie, and other legal policies</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm p-4 rounded-md border border-red-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {policies.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => selectPolicy(p)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-sm border transition-colors ${
              selected?.id === p.id
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            {p.title}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold">{selected.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                /{selected.slug} • Updated: {new Date(selected.updated_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                {showPreview ? "Edit" : "Preview"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(selected.id)}
                disabled={deleting}
                className="text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <Button onClick={handleSave} disabled={saving} size="sm">
                {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          <div className="border border-border rounded-sm p-4 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">SEO Metadata</h3>
            </div>

            <div>
              <Label className="text-xs font-medium mb-1 block">Meta Title</Label>
              <Input
                value={form.meta_title}
                onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                placeholder="Title shown in search results"
                className="h-9 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs font-medium mb-1 block">Meta Description</Label>
              <Textarea
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                rows={2}
                className="text-sm"
                placeholder="Description shown in search results"
              />
              <p className="text-[10px] text-muted-foreground mt-0.5">{form.meta_description.length}/160 characters</p>
            </div>

            <div>
              <Label className="text-xs font-medium mb-1 block">Meta Keywords</Label>
              <Input
                value={form.meta_keywords}
                onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                className="h-9 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_published" className="text-sm font-medium cursor-pointer">
                Publish this policy
              </Label>
            </div>
          </div>

          {showPreview ? (
            <div className="border border-border rounded-sm">
              <div className="px-4 py-2 border-b border-border bg-secondary/30">
                <p className="text-xs font-medium text-muted-foreground">Preview</p>
              </div>
              <div
                className="p-6 prose prose-sm max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-foreground prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-ul:list-disc prose-ul:pl-5"
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            </div>
          ) : (
            <div>
              <Label className="text-xs font-medium mb-2 block">Content (Rich Text)</Label>
              <RichEditor value={form.content} onChange={(content) => setForm({ ...form, content })} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">No policies available. Create one to get started.</p>
        </div>
      )}
    </div>
  )
}
