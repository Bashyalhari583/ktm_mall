# The Kathmandu Mall — Branding & Advertising Spaces

Premium single-file landing site for selling advertising / branding inventory inside The Kathmandu Mall (Sundhara), built for **Dreams Media & Marketing**. Opens directly from `file://` — no server, no build step.

```
ktm mall/
├── index.html              ← THE site (open this in any browser)
├── data/spaces.json        ← reference copy of inventory data
├── assets/
│   ├── img/logo.png        ← Dreams Marketing logo
│   └── img/spaces/         ← 134 web-optimized photos (20.5 MB total)
├── n8n/
│   ├── booking-webhook.json   ← lead capture → Google Sheet
│   └── chatbot-gemini.json    ← Gemini 1.5 Flash branding assistant
├── extracted/              ← raw docx output (kept for reference, can delete)
└── README.md
```

---

## 1. Open the site

Double-click `index.html` — that's it. Works on Chrome, Edge, Firefox, Safari, mobile, anywhere.

The site already runs a **local fallback** for both the booking form and the chatbot — so you can demo it right now without any backend. The form pretends to send and shows the success animation; the chatbot answers from a small built-in ruleset that knows your inventory.

To wire it to your real n8n endpoints, see step 2.

---

## 2. Wire up n8n (when you're ready)

### a. Edit `index.html` — set your n8n base URL

Open `index.html` and find this block near the bottom:

```js
const N8N_BASE = "{{N8N_BASE}}";
const BOOKING_PATH = "/webhook/ktm-mall-booking";
const CHAT_PATH    = "/webhook/ktm-mall-chat";
```

Replace `{{N8N_BASE}}` with your n8n URL, e.g. `"https://n8n.dreamsmarketing.com"`. Save. Re-open. Done.

### b. Import the workflows

In n8n: **Workflows → Import from File** → pick each JSON in `n8n/`.

Then for each workflow:

**`booking-webhook.json`**
- Open the **Append to Google Sheet** node
- Pick your Google Sheets credential (or create one)
- Set the sheet — recommended columns:
  `Timestamp | Space ID | Space | Price | Name | Phone | WhatsApp | Company | Source | Status | Owner | Notes`
- Set env var `GOOGLE_SHEET_ID` in n8n, OR replace `YOUR_SHEET_ID_HERE` directly in the node
- **Activate** the workflow
- Webhook URL will be `https://your-n8n/webhook/ktm-mall-booking`

**`chatbot-gemini.json`**
- Set env var `GEMINI_API_KEY` in n8n (free tier at aistudio.google.com)
- **Activate**
- Webhook URL will be `https://your-n8n/webhook/ktm-mall-chat`

### c. CORS

Both workflows return `Access-Control-Allow-Origin: *` on success responses. Since `index.html` runs from `file://` (origin `null`), this matters. If you see CORS errors in the browser console, also enable n8n's global CORS env vars:

```
N8N_CORS_ORIGINS=*
```
(in your n8n `.env`, then restart the container.)

---

## 3. Hand-off to OpenClaw on WhatsApp

### Flow
```
indexv1.html → n8n booking-webhook → Google Sheet (Status=NEW)
                                              ↓ (every 2 min)
                                   n8n openclaw-handoff
                                              ↓
                                   Evolution API → first WA message
                                              ↓
                                   OpenClaw AI agent takes over
```

### a. Import `n8n/openclaw-handoff.json`

In n8n: **Workflows → Import from File** → pick `openclaw-handoff.json`

Set these env vars in n8n before activating:

| Env var | Example value |
|---|---|
| `GOOGLE_SHEET_ID` | `1BxiM...` (from Sheet URL) |
| `EVOLUTION_API_URL` | `https://evo.yourdomain.com` |
| `EVOLUTION_INSTANCE` | `ktm-mall` |
| `EVOLUTION_API_KEY` | your Evolution API key (set in HTTP Header Auth credential) |

The workflow:
1. Polls the **Leads** sheet every 2 minutes for rows where `Status = NEW`
2. Builds a personalized WhatsApp opening message (handles both booking-form leads and chatbot-detected leads)
3. Sends via Evolution API with a 1.2s typing delay
4. Sets `Status = CONTACTED` in the sheet
5. Sends a lead-alert message to your own sales team WhatsApp number

### b. HTTP Header Auth credential in n8n

Create a credential: **Generic → HTTP Header Auth**
- Name: `Evolution API Key`
- Header Name: `apikey`
- Header Value: your Evolution API key

Assign this credential to both HTTP Request nodes inside `openclaw-handoff`.

### c. OpenClaw setup

1. In OpenClaw → **Settings → Inboxes → New Inbox → WhatsApp (Evolution API)**
   - Instance URL: your Evolution API instance
   - API key: same key as above
2. **Settings → AI Agents → New Agent** — paste this system prompt:

```
You are Priya, a warm sales executive at Dreams Media & Marketing,
the exclusive advertising partner for The Kathmandu Mall, Sundhara, Kathmandu.

GOAL: Qualify the lead, answer questions about spaces, and book a site visit or close the deal.

SPACES (summarized):
- Main Gate Pillar Wrap — Rs. 40,000/mo, exterior, 500k+ monthly footfall
- Façade Light Board (Flagship) — Rs. 25,00,000/yr, 500+ sqft, landmark visibility
- Parking Hoarding A/B/C — Rs. 15,000–25,000/mo, covered parking
- Lift Branding (all floors) — Rs. 8,000/mo, interior, high dwell time
- Stair Soffit Boards (Tier A/B/C) — Rs. 12,000/mo
- Floor Hoardings (GF/1F/2F) — Rs. 20,000–35,000/mo
- Pillar Standard (interior) — Rs. 4,000/mo

CONVERSATION FLOW:
1. Confirm which space they saw / are interested in
2. Ask: brand/company name, campaign duration, budget range
3. Budget matches → offer site visit ("Shall I arrange a visit this week?")
4. Budget too low → suggest smaller alternatives from the list
5. Collect: confirmed budget, preferred visit date and time

RULES:
- Never offer discounts > 5% without manager approval
- If asked for >10% discount or complex custom deal → say "Let me connect you with our senior manager" and stop
- Reply in whatever language the client uses (Nepali or English)
- Tone: warm, helpful, not pushy

ESCALATION TAG: If you cannot handle the query, say exactly: "ESCALATE_TO_HUMAN"
```

3. **Automations → New Rule**:
   - Trigger: Conversation created in KTM Mall inbox
   - Action: Assign to AI Agent (Priya)

4. **Automations → New Rule**:
   - Trigger: Message contains `ESCALATE_TO_HUMAN`
   - Action: Unassign bot → Assign to your human sales team → Send notification

### d. Sales team notification

The handoff workflow also sends a WA alert to your team number. Set `TEAM_WA_NUMBER` in the Code node (line with `TEAM_NUMBER`) or hardcode it directly.

### e. Closing the loop

When a deal is closed, update the sheet row `Status = CLOSED` manually or via an OpenClaw webhook → n8n → Google Sheets update node.

This keeps the site completely dumb — all intelligence lives in OpenClaw and n8n.

---

## 4. Editing the inventory

Two places hold space data — **the live source is inside `index.html`** (the `DATA` constant in the `<script>` near the bottom). `data/spaces.json` is a reference copy you can keep in sync manually, or use as the source of truth for any future tooling.

To add / edit / remove a space, just edit the `DATA.spaces` array in `index.html`. Each entry needs:

```js
{
  id: "UNIQUE-ID",
  name: "Display name",
  category: "Façade / Exterior" | "Main Gate" | "Parking" | "Pillars" | "Stairs & Escalator" | "Floor Hoardings" | "Interior Spots" | "Lift",
  zone: "Exterior" | "Ground" | "Floor 1" | "Floor 2" | ...,
  size: "human-readable size",
  price_npr: 40000,
  price_label: "Rs. 40,000 / month",
  quantity: 1,
  status: "available",
  highlights: ["bullet 1", "bullet 2"],
  image: "imageXX.jpg"   // filename in assets/img/spaces/
}
```

---

## 5. Re-optimizing photos

If you swap in new photos:
1. Drop originals into `extracted/word/media/` (or anywhere)
2. Edit the `SRC` path in `extracted/_optimize.py` if needed
3. Run: `python extracted/_optimize.py`
4. Optimized JPEGs land in `assets/img/spaces/` (max 1400px wide, q82)

Requires Pillow: `pip install pillow`

---

## 6. Tech notes

- No build, no bundler, no framework. Pure HTML + Tailwind CDN + GSAP CDN + ~400 lines of vanilla JS.
- Fonts: Google Fonts (Playfair Display + Inter)
- Anti-spam: honeypot field + 30-second client rate-limit + Nepal phone regex (`^9[678]\d{8}$`)
- Site weight: ~21 MB (mostly the 134 photos). First-paint is fast since photos are `loading="lazy"`.
- Browser support: anything from 2020 onward.

---

## 7. Contact

Project for **Dreams Media & Marketing**
Subekchya Marg, Kathmandu
WhatsApp: +977-9860499000 · Phone: +977-9840066285
Email: info.dreamsmarketing@gmail.com
Web: hoardingboardnepal.com
