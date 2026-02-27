# Setup Guide - Hub Central Lua+UE5

## 🚀 Quick Start

This guide covers setting up all backend integrations for the Hub Central platform.

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase account (free tier available)
- Claude API key from Anthropic
- Optional: Stripe for payments

---

## 📦 Installation

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js @anthropic-ai/sdk
```

### 2. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...

# Claude API
CLAUDE_API_KEY=sk-ant-xxxx...
```

---

## 🗄️ Supabase Setup

### Create Supabase Project

1. Go to https://supabase.com
2. Create new project
3. Copy URL and keys to `.env.local`

### Create Database Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Users Progress Table
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  progress_percentage INT DEFAULT 0,
  final_score INT,
  completed_at TIMESTAMP,
  completed_lessons TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Chat History Table
CREATE TABLE chat_history (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  module_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Progress Trigger (auto-update updated_at)
CREATE TRIGGER update_user_progress_timestamp
BEFORE UPDATE ON user_progress
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Enable Authentication

1. In Supabase: Go to Authentication > Providers
2. Enable Email/Password
3. Configure redirect URL: `http://localhost:3000/auth/callback`

---

## 🤖 Claude API Setup

### Get API Key

1. Go to https://console.anthropic.com
2. Create API key
3. Add to `.env.local`: `CLAUDE_API_KEY=sk-ant-xxx`

### Test Claude Integration

```bash
npm run dev
# Open browser to http://localhost:3000/chat
# Send a message to test Claude
```

---

## 💾 Save Progress Feature

### Database Schema

The `user_progress` table stores:
- `user_id`: UUID of user
- `module_id`: Module identifier
- `progress_percentage`: 0-100
- `final_score`: Quiz/exam score
- `completed_lessons`: Array of completed lesson IDs

### Usage in Components

```tsx
import { useProgressSaver } from "@/hooks/useProgressSaver";

export default function MyModule() {
  const { saveProgress, loading } = useProgressSaver();

  const handleComplete = async () => {
    await saveProgress({
      userId: "user-id",
      moduleId: "mes-01",
      progress: 100,
      score: 95,
    });
  };

  return (
    <button onClick={handleComplete} disabled={loading}>
      {loading ? "Guardando..." : "Marcar Completado"}
    </button>
  );
}
```

---

## 🎯 ContentLocker Integration

### Adding to Modules

```tsx
import ContentLocker from "@/components/ContentLocker";

export default function ModuleContent() {
  const [modulesCompleted, setModulesCompleted] = useState(3);
  const isPremium = false; // From user context
  
  const isContentLocked = !isPremium && modulesCompleted > 3;

  return (
    <ContentLocker
      isLocked={isContentLocked}
      lockedMessage="Siguiente módulo desbloqueado con Premium"
      onUnlock={() => saveProgress()}
      lockDuration={30}
    >
      <ModuleContentHere />
    </ContentLocker>
  );
}
```

---

## 📺 Ads Architecture

### Setup

1. Import AdProvider at app root:

```tsx
// src/app/layout.tsx
import AdProvider from "@/components/AdProvider";

export default function Layout({ children }) {
  return (
    <AdProvider>
      {/* Your app */}
    </AdProvider>
  );
}
```

2. Add ads to pages:

```tsx
import { getAdForSlot, getAdContent } from "@/components/AdProvider";

export default function Page() {
  const bannerAd = getAdForSlot("header");

  return (
    <div>
      {bannerAd && (
        <div className="mb-4">
          {getAdContent(bannerAd)}
        </div>
      )}
      {/* Page content */}
    </div>
  );
}
```

---

## 🎤 Chat with Claude

### API Endpoint

**POST** `/api/chat`

```json
{
  "message": "¿Cómo uso tablas en Lua?",
  "userId": "user-123",
  "moduleId": "mes-01",
  "useAI": true
}
```

Response:
```json
{
  "success": true,
  "response": "Las tablas en Lua...",
  "isOnTopic": true
}
```

### Topic Validation

26 allowed topics (Spanish + English):
- Lua, Roblox, Unreal, UE5
- Programming concepts
- Variables, Functions, Loops
- Debugging, Errors, APIs

---

## 🔐 Security Best Practices

1. **Never expose service role key** in frontend
2. **Use Row Level Security (RLS)** in Supabase
3. **Validate tokens** on API endpoints
4. **Rate limit** chat API calls
5. **Sanitize** user inputs

### Enable RLS

```sql
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see own progress"
ON user_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON user_progress
FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 📊 Monitoring & Analytics

### Track Events

```tsx
// Example: Track module completion
async function trackEvent(eventName: string, data: any) {
  await fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventName, data }),
  });
}
```

---

## 🐛 Troubleshooting

### Claude API Returns Error
- Check API key is valid
- Check rate limits (free tier: 5 RPM)
- Check token count (max 4096 input tokens)

### Supabase Connection Failed
- Verify URL and keys in `.env.local`
- Check network connectivity
- Verify Supabase project is active

### Save Progress Not Working
- Check table exists: `user_progress`
- Verify user authentication
- Check browser console for errors

---

## 📚 Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 🎉 You're Ready!

Run the dev server:
```bash
npm run dev
```

Visit: `http://localhost:3000`

Test the features:
- 📝 Chat with AI at `/chat`
- 📊 Check progress at `/analytics`
- 🎓 Save progress in modules
- 💳 Unlock premium content

---

*Last Updated: February 2026*
*Built with Next.js 16, React 19, Supabase, Claude API*
