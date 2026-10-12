# Admin publishing

The admin **Articles & Events** screen at `/admin/publishing` manages the public case studies, blog posts, and events. It requires an authenticated user whose profile role is `admin`.

## Enable the library

Apply `supabase/migrations/0013_editorial_publishing.sql` in the project's Supabase SQL editor after the earlier migrations. It creates the content table, access policies, version trigger, and public `editorial-images` storage bucket, then imports the existing 20 publications. The import does not overwrite existing records when rerun.

No service role key is needed by the editor. It uses the administrator's authenticated session and database policies. Until the table is installed, public pages continue showing the existing static content and the admin library displays setup instructions. Once installed, the database is authoritative, including when every entry is unpublished.

## Editorial workflow

1. Open **Articles & Events** and choose **New publication**, or search and edit an existing entry.
2. Select case study, blog post, or event. Set its title and URL slug, then save an incomplete draft if needed.
3. Edit the summary, category, author, disclosure, cover image, and article sections. Blank lines separate paragraphs. Sections support checklists and comparison tables and can be reordered. Outcome panels and additional figures are optional.
4. Upload JPEG, PNG, or WebP images up to 4 MB, or reuse a local `/images/` path or an uploaded editorial image URL. Uploads are public assets even when the article is a private draft.
5. For events, optionally set both start and end times in China Standard Time (UTC+8) and the venue. Leave dates empty for an unconfirmed event. For cases, optionally feature the entry on the homepage; if multiple are featured, the newest is selected.
6. Save and open **Preview saved entry** to review the actual public layout privately. This preview shows the last saved version, not unsaved changes.
7. Choose **published** and **Save & publish**. Required metadata and section content are checked before publishing. Public listings, detail pages, related articles, and the featured homepage case update after saving.
8. Choose **draft** to unpublish for revision or **archived** to remove an entry from the public site while retaining its editable content. Moving a published entry to either status requires confirmation.

Changing a slug or collection retires the old public URL. If another administrator saves the same record first, your stale save is rejected without overwriting their work. Copy your unsaved changes before reloading the latest version.

Use the disclosure field to clearly identify fictional cases, modeled outcomes, or unconfirmed events. Publishing does not independently verify claims or send invitations.
