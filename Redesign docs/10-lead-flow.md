# Lead flow + notifications (Phase 4)

All three public forms already STORE to Supabase. This phase adds one shared
notification pipeline (email via Resend + WhatsApp via CallMeBot) to all of them,
plus the contact acknowledgment and the thank-you page with a Cal.com embed.

| Form | Table (existing) | Path | Notifies |
|------|------------------|------|----------|
| Contact | `public.inquiries` | Server Action `app/contact/actions.ts` → `/contact/thank-you` | ack + team + WhatsApp |
| Careers | `public.career_applications` | Server Action `app/careers/actions.ts` | ack + team + WhatsApp |
| Partner | `public.partner_submissions` | Route `app/api/partner/route.ts` | ack + team + WhatsApp |

Shared notifier: `lib/notify.ts`. Everything is best-effort and reads config from
env at runtime, so an unset key just skips that channel. No secrets in the repo.

## 1. Database (only a small change — no new table)
The tables already exist. The contact action stores UTM + source, so add two
columns to `inquiries`:

```sql
alter table public.inquiries
  add column if not exists utm jsonb not null default '{}'::jsonb,
  add column if not exists source_page text;
```

(No SQL needed for careers or partner — those tables are unchanged.)

## 2. Environment — APPEND to the existing .env.local (keep the Supabase lines)
```
# Resend — the sender MUST be on a domain you verified in Resend.
# A gmail.com address CANNOT be the sender; gmails are recipients only.
RESEND_API_KEY=
LEAD_FROM_EMAIL=Stallwart <noreply@stallwart.in>
LEAD_NOTIFY_EMAILS=nuras1999@gmail.com, prathikkshaaramesh7014@gmail.com

# WhatsApp via CallMeBot — one apikey PER number ("phone:apikey", comma-separated)
CALLMEBOT_RECIPIENTS=+919952721458:ARUN_APIKEY,+916374601645:PRATHIK_APIKEY

# Cal.com inline embed (public)
NEXT_PUBLIC_CAL_LINK=stallwart/stallwart-discovery-call
```
Add the same variables to Vercel → Project → Settings → Environment Variables.

## 3. CallMeBot (free) — each recipient activates once
On EACH phone (Arun +91 9952721458, Prathik +91 6374601645):
1. Save +34 644 51 95 23 as a contact.
2. WhatsApp it: `I allow callmebot to send me messages`.
3. It replies with that number's apikey → put it in `CALLMEBOT_RECIPIENTS`.

## 4. Resend
Verify the sending domain (e.g. stallwart.in) in Resend and create an API key.
`stallwartofficial@gmail.com` can be a NOTIFY recipient, not the `from`.

## 5. Test
- Contact submit → row in `inquiries`, ack email to submitter, team email + 2 WhatsApps, redirect to `/contact/thank-you` (Cal embed).
- Careers submit → row in `career_applications` + notifications.
- Partner submit → row in `partner_submissions` + notifications.
Server logs show `[lead] / [career] / [notify]` lines and skip unset channels.

## Notes
- `app/api/demo-request/route.ts` is now unused (the contact form uses the Server Action). Safe to delete.
- WhatsApp reaches BOTH Arun and Prathik; email reaches the `LEAD_NOTIFY_EMAILS` list.
