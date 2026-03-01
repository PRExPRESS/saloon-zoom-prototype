# 💈 Salon Web App — Full Architecture Document
> **Version:** 2.0.0
> **Date:** 2026-03-01
> **Architect:** Principal Software Architect
> **Stack:** Next.js 15 · TypeScript · MySQL · Sequelize · shadcn/ui · Tailwind CSS v4 · Axios · TanStack Query v5 · Firebase Realtime Database

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Specification](#2-tech-stack-specification)
3. [Application Pages & Routes](#3-application-pages--routes)
4. [Project Folder Structure](#4-project-folder-structure)
5. [Database Schema Design](#5-database-schema-design)
6. [Entity Relationship Diagram (ERD)](#6-entity-relationship-diagram-erd)
7. [Sequelize Models](#7-sequelize-models)
8. [Axios HTTP Client Layer](#8-axios-http-client-layer)
9. [React Query (TanStack v5) Data Layer](#9-react-query-tanstack-v5-data-layer)
10. [API Route Design](#10-api-route-design)
11. [Firebase Realtime Database — Notification System](#11-firebase-realtime-database--notification-system)
12. [Component Architecture](#12-component-architecture)
13. [Authentication & Authorization](#13-authentication--authorization)
14. [Admin Panel Design](#14-admin-panel-design)
15. [State Management Strategy](#15-state-management-strategy)
16. [Environment Variables](#16-environment-variables)
17. [Phased Delivery Plan](#17-phased-delivery-plan)
18. [Appendix](#18-appendix)

---

## 1. Project Overview

A **premium, full-stack salon web application** built for a professional hair salon business.
The platform serves two primary user groups:

| User Type | Access | Purpose |
|---|---|---|
| **Public Visitor** | No login required | Browse services, team, rates, book via Fresha, leave reviews |
| **System Admin** | Login required (Clerk) | Manage services, team members, reviews, bookings, and page content |

### Core Features

- 📅 **Fresha Booking Integration** — embedded widget with webhook → Firebase notifications
- 🔔 **Real-Time Booking Toasts** — social proof popups via Firebase Realtime Database
- ⭐ **Ratings & Reviews** — customers rate stylists and services
- 🛠️ **Admin CRUD Panel** — manage services, team members, reviews, and settings
- 🌐 **Axios + React Query** — typed, cached, and optimistic data fetching layer
- 🎨 **Content Management** — admin edits page content without coding (Phase 2: Sanity CMS)

---

## 2. Tech Stack Specification

### 2.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.x | Full-stack React framework (App Router) |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Static type safety across all layers |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **shadcn/ui** | Latest | Pre-built, accessible, copy-paste component library |
| **Framer Motion** | 11.x | Page transitions, scroll animations, micro-interactions |
| **Lucide React** | Latest | Icon library (consistent with shadcn/ui) |
| **Sonner** | Latest | Toast notification UI system |
| **next-themes** | Latest | Dark/light mode support |

### 2.2 shadcn/ui Component Registry

The following shadcn/ui components are installed and used across the project:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add drawer
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add navigation-menu
npx shadcn@latest add select
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add skeleton
npx shadcn@latest add sonner
npx shadcn@latest add table
npx shadcn@latest add tabs
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add progress
npx shadcn@latest add switch
npx shadcn@latest add alert
npx shadcn@latest add alert-dialog
npx shadcn@latest add breadcrumb
npx shadcn@latest add calendar
npx shadcn@latest add command
npx shadcn@latest add popover
npx shadcn@latest add scroll-area
npx shadcn@latest add sidebar
```

### 2.3 Data Fetching Layer

| Technology | Version | Purpose |
|---|---|---|
| **Axios** | 1.x | HTTP client — typed requests, interceptors, base URL config |
| **TanStack Query (React Query)** | v5.x | Server state management — caching, background refetch, mutations, optimistic updates |
| **@tanstack/react-query-devtools** | v5.x | Dev-time query inspector |

#### Why Axios + React Query Together

```
┌────────────────────────────────────────────────────────────────┐
│                  DATA FETCHING ARCHITECTURE                    │
│                                                                │
│  React Query  ──── manages WHEN and HOW OFTEN to fetch        │
│       │            (cache, stale time, refetch, retry)        │
│       │                                                        │
│  Axios ──────────── manages HOW to fetch                      │
│                     (base URL, headers, interceptors,          │
│                      auth tokens, error normalization)         │
└────────────────────────────────────────────────────────────────┘
```

| Concern | Handled By |
|---|---|
| Base URL configuration | Axios instance |
| Auth token injection | Axios request interceptor |
| HTTP error normalization | Axios response interceptor |
| Caching & stale data | React Query |
| Background refetching | React Query |
| Optimistic updates | React Query `useMutation` |
| Loading / error states | React Query |
| Paginated / infinite data | React Query `useInfiniteQuery` |

### 2.4 Real-Time Notifications

| Technology | Version | Purpose |
|---|---|---|
| **Firebase** | 10.x | Firebase SDK (App + Realtime Database) |
| **firebase-admin** | 12.x | Server-side Firebase Admin (write from API routes) |

#### Why Firebase Realtime Database (over Pusher)

| Feature | Firebase RTDB | Pusher |
|---|---|---|
| **Persistence** | Events stored in DB — queryable history | Fire-and-forget |
| **Offline sync** | Built-in — reconnects and replays missed events | Manual |
| **Admin read** | Admin panel reads notification history directly | Separate DB needed |
| **Free tier** | Generous (1 GB storage, 10 GB/month transfer) | Limited connections |
| **SDK** | First-party Google SDK | Third-party |
| **Security rules** | Declarative Firebase rules | API key-based |

### 2.5 Backend & Database

| Technology | Version | Purpose |
|---|---|---|
| **Next.js Route Handlers** | 15.x | REST API endpoints |
| **Next.js Server Actions** | 15.x | Form mutations (admin panel) |
| **Sequelize** | 6.x | MySQL ORM |
| **mysql2** | 3.x | MySQL driver |
| **MySQL** | 8.x | Primary relational database |

### 2.6 Authentication

| Technology | Version | Purpose |
|---|---|---|
| **Clerk** | Latest | Authentication, session management, role-based access |

### 2.7 Media & Email

| Technology | Version | Purpose |
|---|---|---|
| **Uploadthing** | 7.x | File/image upload for admin panel |
| **Resend** | 3.x | Transactional email |
| **react-email** | Latest | Email templates as React components |

### 2.8 Developer Tooling

| Technology | Purpose |
|---|---|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Husky + lint-staged** | Pre-commit hooks |
| **sequelize-cli** | Database migrations and seeders |
| **@sentry/nextjs** | Error monitoring |
| **Vercel Analytics** | Web vitals tracking |

---

## 3. Application Pages & Routes

### 3.1 Public Pages

| Route | Page | Data Source |
|---|---|---|
| `/` | **Home** | MySQL via Sequelize (Server Component) |
| `/about` | **About** | MySQL site_settings |
| `/team` | **Team** | MySQL via React Query |
| `/team/[slug]` | **Stylist Profile** | MySQL via React Query |
| `/services` | **Services** | MySQL via React Query |
| `/services/[slug]` | **Service Detail** | MySQL via React Query |
| `/rates` | **Rates** | MySQL via React Query |
| `/booking` | **Booking** | Fresha widget + Firebase toasts |
| `/reviews` | **Reviews** | MySQL via React Query |
| `/gallery` | **Gallery** | MySQL site_settings |

### 3.2 Admin Pages (Protected)

| Route | Page | Description |
|---|---|---|
| `/admin` | **Dashboard** | Stats: bookings, reviews, team |
| `/admin/services` | **Services Manager** | List, create, edit, delete |
| `/admin/services/new` | **New Service** | Create form |
| `/admin/services/[id]` | **Edit Service** | Edit form |
| `/admin/team` | **Team Manager** | List, create, edit, delete |
| `/admin/team/new` | **New Team Member** | Add stylist |
| `/admin/team/[id]` | **Edit Team Member** | Edit stylist |
| `/admin/reviews` | **Review Moderator** | Approve / reject / delete |
| `/admin/notifications` | **Notification Feed** | Firebase RTDB booking log |
| `/admin/settings` | **Site Settings** | Editable page content |

### 3.3 API Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/services` | Public | List active services |
| `POST` | `/api/services` | Admin | Create service |
| `GET` | `/api/services/[id]` | Public | Get single service |
| `PUT` | `/api/services/[id]` | Admin | Update service |
| `DELETE` | `/api/services/[id]` | Admin | Delete service |
| `GET` | `/api/team` | Public | List active team members |
| `POST` | `/api/team` | Admin | Create team member |
| `GET` | `/api/team/[id]` | Public | Get single team member |
| `PUT` | `/api/team/[id]` | Admin | Update team member |
| `DELETE` | `/api/team/[id]` | Admin | Delete team member |
| `GET` | `/api/reviews` | Public | List approved reviews |
| `POST` | `/api/reviews` | Public | Submit new review |
| `PUT` | `/api/reviews/[id]` | Admin | Approve / reject review |
| `DELETE` | `/api/reviews/[id]` | Admin | Delete review |
| `POST` | `/api/bookings/notify` | Fresha Webhook | Receive Fresha event → write to Firebase |
| `GET` | `/api/settings` | Public | Get site settings |
| `PUT` | `/api/settings` | Admin | Update site settings |
| `POST` | `/api/upload` | Admin | Upload image |

---

## 4. Project Folder Structure

```
salon-app/
│
├── app/
│   ├── (public)/
│   │   ├── layout.tsx                     # Header, Footer, BookingToastProvider
│   │   ├── page.tsx                       # Home — Server Component
│   │   ├── about/page.tsx
│   │   ├── team/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── rates/page.tsx
│   │   ├── booking/page.tsx               # Fresha widget + Firebase toast listener
│   │   ├── reviews/page.tsx
│   │   └── gallery/page.tsx
│   │
│   ├── (admin)/
│   │   ├── layout.tsx                     # Admin shell: Sidebar + TopBar
│   │   └── admin/
│   │       ├── page.tsx                   # Dashboard
│   │       ├── services/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── team/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── reviews/page.tsx
│   │       ├── notifications/page.tsx     # Firebase RTDB notification history
│   │       └── settings/page.tsx
│   │
│   ├── api/
│   │   ├── services/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── team/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── reviews/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── bookings/
│   │   │   └── notify/route.ts            # Fresha webhook → Firebase Admin write
│   │   ├── settings/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx                         # Root: fonts, QueryProvider, ThemeProvider
│   └── not-found.tsx
│
├── components/
│   ├── ui/                                # shadcn/ui generated components
│   │   └── ... (button, card, dialog, form, table, badge, etc.)
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── AdminTopBar.tsx
│   │
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedServices.tsx
│   │   ├── StatsCounter.tsx               # 'use client' — Framer count-up
│   │   ├── TeamPreview.tsx
│   │   ├── TestimonialsCarousel.tsx       # 'use client'
│   │   └── CtaSection.tsx
│   │
│   ├── booking/
│   │   ├── FreshaWidget.tsx               # 'use client' — iframe
│   │   ├── BookingToastContainer.tsx      # 'use client' — Firebase listener
│   │   └── BookingToastItem.tsx           # Framer Motion animated card
│   │
│   ├── reviews/
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewsGrid.tsx
│   │   ├── ReviewForm.tsx                 # 'use client' — react-hook-form
│   │   └── StarRating.tsx                 # 'use client'
│   │
│   ├── team/
│   │   ├── TeamCard.tsx
│   │   ├── TeamGrid.tsx
│   │   └── StylistProfile.tsx
│   │
│   ├── services/
│   │   ├── ServiceCard.tsx
│   │   ├── ServicesGrid.tsx
│   │   └── PriceTable.tsx
│   │
│   ├── admin/
│   │   ├── DataTable.tsx                  # Reusable shadcn Table wrapper
│   │   ├── ServiceForm.tsx
│   │   ├── TeamMemberForm.tsx
│   │   ├── ReviewModerationCard.tsx
│   │   ├── DashboardStatCard.tsx
│   │   ├── NotificationFeed.tsx           # 'use client' — Firebase RTDB feed
│   │   └── ImageUploader.tsx
│   │
│   └── shared/
│       ├── SectionHeading.tsx
│       ├── AnimatedSection.tsx
│       ├── PageTransition.tsx
│       ├── QueryBoundary.tsx              # Wraps useQuery with Suspense + error
│       └── EmptyState.tsx
│
├── features/                              # Feature-level business logic
│   ├── services/
│   │   ├── api.ts                         # Axios calls for services
│   │   ├── queries.ts                     # useQuery / useMutation hooks
│   │   ├── actions.ts                     # Server Actions (admin mutations)
│   │   └── types.ts
│   ├── team/
│   │   ├── api.ts
│   │   ├── queries.ts
│   │   ├── actions.ts
│   │   └── types.ts
│   ├── reviews/
│   │   ├── api.ts
│   │   ├── queries.ts
│   │   ├── actions.ts
│   │   └── types.ts
│   └── notifications/
│       ├── firebase.ts                    # Firebase client RTDB listeners
│       └── types.ts
│
├── lib/
│   ├── axios/
│   │   ├── index.ts                       # Axios instance (singleton)
│   │   └── interceptors.ts                # Auth + error interceptors
│   │
│   ├── react-query/
│   │   ├── client.ts                      # QueryClient singleton
│   │   └── provider.tsx                   # 'use client' QueryClientProvider
│   │
│   ├── firebase/
│   │   ├── client.ts                      # Firebase client SDK init
│   │   ├── admin.ts                       # Firebase Admin SDK init (server only)
│   │   └── notifications.ts               # RTDB helpers: write + subscribe
│   │
│   ├── db/
│   │   ├── index.ts                       # Sequelize singleton
│   │   ├── models/
│   │   │   ├── index.ts                   # Model registry + associations
│   │   │   ├── Service.model.ts
│   │   │   ├── ServiceCategory.model.ts
│   │   │   ├── TeamMember.model.ts
│   │   │   ├── Review.model.ts
│   │   │   ├── ReviewMedia.model.ts
│   │   │   └── SiteSetting.model.ts
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── auth.ts                            # Clerk helpers
│   ├── email.ts                           # Resend client
│   ├── uploadthing.ts
│   └── utils.ts                           # cn(), slugify(), formatDate()
│
├── hooks/
│   ├── useBookingToasts.ts                # Firebase RTDB subscription hook
│   ├── useMediaQuery.ts
│   └── useDebounce.ts
│
├── types/
│   ├── index.ts
│   ├── api.ts                             # Request/response envelope types
│   ├── models.ts                          # DB model mirror types
│   └── firebase.ts                        # Firebase RTDB schema types
│
├── middleware.ts
├── .sequelizerc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
└── package.json
```

---

## 5. Database Schema Design

> **Note:** Firebase Realtime Database replaces the `booking_notifications` MySQL table.
> Notification data lives in Firebase RTDB for real-time delivery. MySQL handles all other persistent data.

### 5.1 MySQL Tables Overview

| Table | Description |
|---|---|
| `service_categories` | Groups of services (Haircuts, Colour, Treatments…) |
| `services` | Individual salon services with pricing |
| `team_members` | Stylists and staff profiles |
| `team_member_services` | Junction: which stylist offers which service |
| `reviews` | Customer ratings and reviews |
| `review_media` | Photos attached to reviews |
| `site_settings` | Key-value store for admin-editable site content |

### 5.2 Firebase Realtime Database Schema

> Notification data is stored here — real-time push, queryable history, offline resilience.

```
Firebase RTDB Structure:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
salon-app/
  notifications/
    {pushId}/
      customerNameMasked : "Sarah B."
      serviceName        : "Brazilian Blowout"
      stylistName        : "Emma"
      freshaBookingId    : "frsh_abc123"
      bookedAt           : 1740825600000   (Unix ms timestamp)
      appointmentAt      : 1740912000000
      isRead             : false
      createdAt          : 1740825600000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Firebase Security Rules

```json
{
  "rules": {
    "salon-app": {
      "notifications": {
        ".read": "auth != null",
        ".write": false,
        "$notifId": {
          ".write": "auth != null && auth.token.role === 'admin'"
        }
      }
    }
  }
}
```

> Public toast listeners read via a **server-proxied snapshot** — the Firebase client key is scoped
> to read-only on the `notifications` node. Writes happen exclusively from the server via `firebase-admin`.

---

### 5.3 Table: `service_categories`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | e.g. "Haircuts" |
| `slug` | VARCHAR(110) | NOT NULL, UNIQUE | URL identifier |
| `description` | TEXT | NULLABLE | |
| `icon` | VARCHAR(255) | NULLABLE | Icon name or URL |
| `display_order` | TINYINT | DEFAULT 0 | Sort order |
| `is_active` | BOOLEAN | DEFAULT TRUE | |
| `created_at` | DATETIME | DEFAULT NOW() | |
| `updated_at` | DATETIME | DEFAULT NOW() | |

---

### 5.4 Table: `services`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | |
| `category_id` | INT UNSIGNED | FK → service_categories.id | |
| `name` | VARCHAR(150) | NOT NULL | |
| `slug` | VARCHAR(160) | NOT NULL, UNIQUE | |
| `description` | TEXT | NULLABLE | |
| `short_description` | VARCHAR(255) | NULLABLE | |
| `price_from` | DECIMAL(8,2) | NOT NULL | |
| `price_to` | DECIMAL(8,2) | NULLABLE | |
| `duration_minutes` | SMALLINT | NOT NULL | |
| `image_url` | VARCHAR(500) | NULLABLE | |
| `is_featured` | BOOLEAN | DEFAULT FALSE | |
| `is_active` | BOOLEAN | DEFAULT TRUE | |
| `display_order` | SMALLINT | DEFAULT 0 | |
| `created_at` | DATETIME | DEFAULT NOW() | |
| `updated_at` | DATETIME | DEFAULT NOW() | |

---

### 5.5 Table: `team_members`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | |
| `name` | VARCHAR(150) | NOT NULL | |
| `slug` | VARCHAR(160) | NOT NULL, UNIQUE | |
| `role` | VARCHAR(100) | NOT NULL | e.g. "Senior Stylist" |
| `bio` | TEXT | NULLABLE | |
| `short_bio` | VARCHAR(255) | NULLABLE | |
| `profile_image_url` | VARCHAR(500) | NULLABLE | |
| `cover_image_url` | VARCHAR(500) | NULLABLE | |
| `instagram_url` | VARCHAR(255) | NULLABLE | |
| `experience_years` | TINYINT UNSIGNED | NULLABLE | |
| `display_order` | TINYINT | DEFAULT 0 | |
| `is_featured` | BOOLEAN | DEFAULT FALSE | |
| `is_active` | BOOLEAN | DEFAULT TRUE | |
| `created_at` | DATETIME | DEFAULT NOW() | |
| `updated_at` | DATETIME | DEFAULT NOW() | |

---

### 5.6 Table: `team_member_services` (Junction)

| Column | Type | Constraints |
|---|---|---|
| `team_member_id` | INT UNSIGNED | FK → team_members.id, PK(composite) |
| `service_id` | INT UNSIGNED | FK → services.id, PK(composite) |

---

### 5.7 Table: `reviews`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | |
| `customer_name` | VARCHAR(150) | NOT NULL | |
| `customer_email` | VARCHAR(255) | NULLABLE | Admin only |
| `rating` | TINYINT UNSIGNED | NOT NULL, CHECK 1–5 | Star rating |
| `comment` | TEXT | NOT NULL | |
| `team_member_id` | INT UNSIGNED | FK → team_members.id, NULLABLE | |
| `service_id` | INT UNSIGNED | FK → services.id, NULLABLE | |
| `status` | ENUM | 'pending','approved','rejected' DEFAULT 'pending' | |
| `is_featured` | BOOLEAN | DEFAULT FALSE | |
| `admin_notes` | TEXT | NULLABLE | |
| `created_at` | DATETIME | DEFAULT NOW() | |
| `updated_at` | DATETIME | DEFAULT NOW() | |

---

### 5.8 Table: `review_media`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | |
| `review_id` | INT UNSIGNED | FK → reviews.id, CASCADE DELETE | |
| `media_url` | VARCHAR(500) | NOT NULL | |
| `media_type` | ENUM | 'image','video' DEFAULT 'image' | |
| `created_at` | DATETIME | DEFAULT NOW() | |

---

### 5.9 Table: `site_settings`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | INT UNSIGNED | PK, AUTO_INCREMENT | |
| `setting_key` | VARCHAR(100) | NOT NULL, UNIQUE | e.g. `hero_headline` |
| `setting_value` | TEXT | NULLABLE | |
| `setting_type` | ENUM | 'text','image','url','json','boolean' | |
| `label` | VARCHAR(150) | NOT NULL | Human-readable label |
| `group` | VARCHAR(100) | NOT NULL | e.g. `hero`, `contact`, `seo` |
| `updated_at` | DATETIME | DEFAULT NOW() | |

---

### 5.10 Site Settings Key Reference

| `setting_key` | `group` | `setting_type` |
|---|---|---|
| `hero_headline` | `hero` | `text` |
| `hero_subheadline` | `hero` | `text` |
| `hero_image_url` | `hero` | `image` |
| `hero_cta_text` | `hero` | `text` |
| `about_heading` | `about` | `text` |
| `about_body` | `about` | `text` |
| `about_image_url` | `about` | `image` |
| `fresha_widget_url` | `booking` | `url` |
| `contact_phone` | `contact` | `text` |
| `contact_email` | `contact` | `text` |
| `contact_address` | `contact` | `text` |
| `opening_hours` | `contact` | `json` |
| `instagram_url` | `social` | `url` |
| `facebook_url` | `social` | `url` |
| `tiktok_url` | `social` | `url` |
| `seo_title` | `seo` | `text` |
| `seo_description` | `seo` | `text` |
| `stat_clients` | `stats` | `text` |
| `stat_years` | `stats` | `text` |
| `stat_stylists` | `stats` | `text` |

---

## 6. Entity Relationship Diagram (ERD)

```
┌─────────────────────┐         ┌──────────────────────────────────────┐
│  service_categories │         │              services                 │
├─────────────────────┤         ├──────────────────────────────────────┤
│ PK  id              │◄────────┤ FK  category_id                      │
│     name            │  1   N  │ PK  id                               │
│     slug            │         │     name · slug · description        │
│     description     │         │     price_from · price_to            │
│     icon            │         │     duration_minutes · image_url     │
│     display_order   │         │     is_featured · is_active          │
│     is_active       │         │     display_order                    │
└─────────────────────┘         └───────────────┬──────────────────────┘
                                                │
                                                │ N
                                                │
                               ┌────────────────▼─────────────────┐
                               │       team_member_services        │
                               │           (junction)              │
                               ├──────────────────────────────────┤
                               │ FK  team_member_id ───────────────┼──────────────────────┐
                               │ FK  service_id                    │                      │
                               └──────────────────────────────────┘                      │ N
                                                                                          │
                               ┌─────────────────────────┐    ┌───────────────────────────▼──────────┐
                               │         reviews          │    │            team_members               │
                               ├─────────────────────────┤    ├──────────────────────────────────────┤
                               │ PK  id                   │    │ PK  id                               │
                               │     customer_name        │    │     name · slug · role               │
                               │     customer_email       │    │     bio · short_bio                  │
                               │     rating               │    │     profile_image_url                │
                               │     comment              │    │     cover_image_url                  │
                               │ FK  team_member_id ──────┼───►│     instagram_url                    │
                               │ FK  service_id           │    │     experience_years                 │
                               │     status               │    │     display_order                    │
                               │     is_featured          │    │     is_featured · is_active          │
                               │     admin_notes          │    └──────────────────────────────────────┘
                               └────────────┬────────────┘
                                           │ 1
                                           │ N
                               ┌───────────▼────────────┐
                               │      review_media       │
                               ├────────────────────────┤
                               │ PK  id                  │
                               │ FK  review_id (CASCADE) │
                               │     media_url           │
                               │     media_type          │
                               └────────────────────────┘


┌──────────────────────────────┐     ┌──────────────────────────────┐
│        site_settings         │     │   Firebase RTDB              │
├──────────────────────────────┤     │   (notifications)            │
│ PK  id                       │     ├──────────────────────────────┤
│     setting_key  (UNIQUE)    │     │  salon-app/                  │
│     setting_value            │     │    notifications/            │
│     setting_type             │     │      {pushId}/               │
│     label · group            │     │        customerNameMasked    │
│     updated_at               │     │        serviceName           │
└──────────────────────────────┘     │        stylistName           │
                                     │        freshaBookingId       │
                                     │        bookedAt (ms)         │
                                     │        appointmentAt (ms)    │
                                     │        isRead                │
                                     │        createdAt (ms)        │
                                     └──────────────────────────────┘

RELATIONSHIPS SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  service_categories  ──< services              [1:N]
  services            >──< team_members          [M:N via team_member_services]
  reviews             >── team_members           [N:1, nullable]
  reviews             >── services               [N:1, nullable]
  reviews             ──< review_media           [1:N, CASCADE DELETE]
  site_settings                                  [standalone key-value store]
  Firebase RTDB notifications                    [real-time event log — no MySQL]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 7. Sequelize Models

### 7.1 Sequelize Singleton

```typescript
// lib/db/index.ts
import { Sequelize } from 'sequelize'

declare global {
  var sequelize: Sequelize | undefined
}

const sequelize =
  global.sequelize ??
  new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT ?? 3306),
      dialect: 'mysql',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  )

if (process.env.NODE_ENV !== 'production') global.sequelize = sequelize

export default sequelize
```

### 7.2 Service Category Model

```typescript
// lib/db/models/ServiceCategory.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

interface ServiceCategoryAttributes {
  id: number
  name: string
  slug: string
  description?: string
  icon?: string
  displayOrder: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

type CreationAttrs = Optional<ServiceCategoryAttributes, 'id' | 'displayOrder' | 'isActive'>

export class ServiceCategory
  extends Model<ServiceCategoryAttributes, CreationAttrs>
  implements ServiceCategoryAttributes
{
  declare id: number
  declare name: string
  declare slug: string
  declare description?: string
  declare icon?: string
  declare displayOrder: number
  declare isActive: boolean
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

ServiceCategory.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    slug: { type: DataTypes.STRING(110), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING(255) },
    displayOrder: { type: DataTypes.TINYINT, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'service_categories', underscored: true, timestamps: true }
)
```

### 7.3 Service Model

```typescript
// lib/db/models/Service.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

interface ServiceAttributes {
  id: number
  categoryId: number
  name: string
  slug: string
  description?: string
  shortDescription?: string
  priceFrom: number
  priceTo?: number
  durationMinutes: number
  imageUrl?: string
  isFeatured: boolean
  isActive: boolean
  displayOrder: number
  createdAt?: Date
  updatedAt?: Date
}

type CreationAttrs = Optional<ServiceAttributes, 'id' | 'isFeatured' | 'isActive' | 'displayOrder'>

export class Service
  extends Model<ServiceAttributes, CreationAttrs>
  implements ServiceAttributes
{
  declare id: number
  declare categoryId: number
  declare name: string
  declare slug: string
  declare description?: string
  declare shortDescription?: string
  declare priceFrom: number
  declare priceTo?: number
  declare durationMinutes: number
  declare imageUrl?: string
  declare isFeatured: boolean
  declare isActive: boolean
  declare displayOrder: number
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Service.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    name: { type: DataTypes.STRING(150), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    shortDescription: { type: DataTypes.STRING(255) },
    priceFrom: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
    priceTo: { type: DataTypes.DECIMAL(8, 2) },
    durationMinutes: { type: DataTypes.SMALLINT, allowNull: false },
    imageUrl: { type: DataTypes.STRING(500) },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    displayOrder: { type: DataTypes.SMALLINT, defaultValue: 0 },
  },
  { sequelize, tableName: 'services', underscored: true, timestamps: true }
)
```

### 7.4 Team Member Model

```typescript
// lib/db/models/TeamMember.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

interface TeamMemberAttributes {
  id: number
  name: string
  slug: string
  role: string
  bio?: string
  shortBio?: string
  profileImageUrl?: string
  coverImageUrl?: string
  instagramUrl?: string
  experienceYears?: number
  displayOrder: number
  isFeatured: boolean
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

type CreationAttrs = Optional<TeamMemberAttributes, 'id' | 'displayOrder' | 'isFeatured' | 'isActive'>

export class TeamMember
  extends Model<TeamMemberAttributes, CreationAttrs>
  implements TeamMemberAttributes
{
  declare id: number
  declare name: string
  declare slug: string
  declare role: string
  declare bio?: string
  declare shortBio?: string
  declare profileImageUrl?: string
  declare coverImageUrl?: string
  declare instagramUrl?: string
  declare experienceYears?: number
  declare displayOrder: number
  declare isFeatured: boolean
  declare isActive: boolean
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

TeamMember.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    role: { type: DataTypes.STRING(100), allowNull: false },
    bio: { type: DataTypes.TEXT },
    shortBio: { type: DataTypes.STRING(255) },
    profileImageUrl: { type: DataTypes.STRING(500) },
    coverImageUrl: { type: DataTypes.STRING(500) },
    instagramUrl: { type: DataTypes.STRING(255) },
    experienceYears: { type: DataTypes.TINYINT.UNSIGNED },
    displayOrder: { type: DataTypes.TINYINT, defaultValue: 0 },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'team_members', underscored: true, timestamps: true }
)
```

### 7.5 Review Model

```typescript
// lib/db/models/Review.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../index'

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

interface ReviewAttributes {
  id: number
  customerName: string
  customerEmail?: string
  rating: number
  comment: string
  teamMemberId?: number
  serviceId?: number
  status: ReviewStatus
  isFeatured: boolean
  adminNotes?: string
  createdAt?: Date
  updatedAt?: Date
}

type CreationAttrs = Optional<ReviewAttributes, 'id' | 'status' | 'isFeatured'>

export class Review
  extends Model<ReviewAttributes, CreationAttrs>
  implements ReviewAttributes
{
  declare id: number
  declare customerName: string
  declare customerEmail?: string
  declare rating: number
  declare comment: string
  declare teamMemberId?: number
  declare serviceId?: number
  declare status: ReviewStatus
  declare isFeatured: boolean
  declare adminNotes?: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Review.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    customerName: { type: DataTypes.STRING(150), allowNull: false },
    customerEmail: { type: DataTypes.STRING(255) },
    rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT, allowNull: false },
    teamMemberId: { type: DataTypes.INTEGER.UNSIGNED },
    serviceId: { type: DataTypes.INTEGER.UNSIGNED },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    adminNotes: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: 'reviews', underscored: true, timestamps: true }
)
```

### 7.6 Model Associations Registry

```typescript
// lib/db/models/index.ts
import { ServiceCategory } from './ServiceCategory.model'
import { Service } from './Service.model'
import { TeamMember } from './TeamMember.model'
import { Review } from './Review.model'
import { ReviewMedia } from './ReviewMedia.model'
import { SiteSetting } from './SiteSetting.model'
import sequelize from '../index'

// ServiceCategory ──< Services
ServiceCategory.hasMany(Service, { foreignKey: 'categoryId', as: 'services' })
Service.belongsTo(ServiceCategory, { foreignKey: 'categoryId', as: 'category' })

// Services >──< TeamMembers (M:N)
Service.belongsToMany(TeamMember, {
  through: 'team_member_services',
  foreignKey: 'serviceId',
  as: 'teamMembers',
})
TeamMember.belongsToMany(Service, {
  through: 'team_member_services',
  foreignKey: 'teamMemberId',
  as: 'services',
})

// Reviews >── TeamMembers (N:1, nullable)
Review.belongsTo(TeamMember, { foreignKey: 'teamMemberId', as: 'teamMember' })
TeamMember.hasMany(Review, { foreignKey: 'teamMemberId', as: 'reviews' })

// Reviews >── Services (N:1, nullable)
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' })
Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' })

// Reviews ──< ReviewMedia (CASCADE DELETE)
Review.hasMany(ReviewMedia, { foreignKey: 'reviewId', as: 'media', onDelete: 'CASCADE' })
ReviewMedia.belongsTo(Review, { foreignKey: 'reviewId', as: 'review' })

export { sequelize, ServiceCategory, Service, TeamMember, Review, ReviewMedia, SiteSetting }
```

---

## 8. Axios HTTP Client Layer

### 8.1 Axios Instance Singleton

```typescript
// lib/axios/index.ts
import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
```

### 8.2 Request & Response Interceptors

```typescript
// lib/axios/interceptors.ts
import api from './index'

// ── Request interceptor: inject Clerk session token ──────────────
api.interceptors.request.use(async (config) => {
  // In client components, get token from Clerk's useAuth hook and
  // pass it via a custom Axios call wrapper — see features/*/api.ts
  // This interceptor handles the fallback base case
  return config
})

// ── Response interceptor: normalize errors ───────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ??
      error.response?.data?.message ??
      error.message ??
      'An unexpected error occurred'

    // Normalize to a consistent shape for React Query error handling
    return Promise.reject(new Error(message))
  }
)

export default api
```

### 8.3 Typed API Service — Services Feature

```typescript
// features/services/api.ts
import api from '@/lib/axios'
import type { Service, CreateServiceDto, UpdateServiceDto, ApiResponse } from '@/types'

export const servicesApi = {

  getAll: async (params?: { categoryId?: number; featured?: boolean }) => {
    const { data } = await api.get<ApiResponse<Service[]>>('/services', { params })
    return data.data
  },

  getBySlug: async (slug: string) => {
    const { data } = await api.get<ApiResponse<Service>>(`/services/${slug}`)
    return data.data
  },

  create: async (payload: CreateServiceDto, token: string) => {
    const { data } = await api.post<ApiResponse<Service>>('/services', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data.data
  },

  update: async (id: number, payload: UpdateServiceDto, token: string) => {
    const { data } = await api.put<ApiResponse<Service>>(`/services/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data.data
  },

  delete: async (id: number, token: string) => {
    await api.delete(`/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}
```

---

## 9. React Query (TanStack v5) Data Layer

### 9.1 QueryClient Singleton

```typescript
// lib/react-query/client.ts
import { QueryClient } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,        // 5 minutes — data stays fresh
        gcTime: 1000 * 60 * 30,           // 30 minutes — cache garbage collection
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new instance
    return makeQueryClient()
  }
  // Browser: reuse singleton
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
```

### 9.2 QueryClientProvider

```typescript
// lib/react-query/provider.tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './client'
import { type ReactNode } from 'react'

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
```

### 9.3 Query Keys Registry

```typescript
// lib/react-query/keys.ts
export const queryKeys = {
  services: {
    all: ['services'] as const,
    lists: () => [...queryKeys.services.all, 'list'] as const,
    list: (filters?: object) => [...queryKeys.services.lists(), filters] as const,
    details: () => [...queryKeys.services.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.services.details(), slug] as const,
    featured: () => [...queryKeys.services.all, 'featured'] as const,
  },
  team: {
    all: ['team'] as const,
    lists: () => [...queryKeys.team.all, 'list'] as const,
    detail: (slug: string) => [...queryKeys.team.all, 'detail', slug] as const,
    featured: () => [...queryKeys.team.all, 'featured'] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (filters?: object) => [...queryKeys.reviews.lists(), filters] as const,
    pending: () => [...queryKeys.reviews.all, 'pending'] as const,
  },
  settings: {
    all: ['settings'] as const,
    group: (group: string) => [...queryKeys.settings.all, group] as const,
  },
}
```

### 9.4 Services Feature Hooks

```typescript
// features/services/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { servicesApi } from './api'
import { queryKeys } from '@/lib/react-query/keys'
import type { CreateServiceDto, UpdateServiceDto } from '@/types'

// ── Queries ──────────────────────────────────────────────────────

export function useServices(filters?: { categoryId?: number; featured?: boolean }) {
  return useQuery({
    queryKey: queryKeys.services.list(filters),
    queryFn: () => servicesApi.getAll(filters),
  })
}

export function useService(slug: string) {
  return useQuery({
    queryKey: queryKeys.services.detail(slug),
    queryFn: () => servicesApi.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useFeaturedServices() {
  return useQuery({
    queryKey: queryKeys.services.featured(),
    queryFn: () => servicesApi.getAll({ featured: true }),
    staleTime: 1000 * 60 * 10, // 10 min — featured changes rarely
  })
}

// ── Mutations ────────────────────────────────────────────────────

export function useCreateService() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (payload: CreateServiceDto) => {
      const token = await getToken()
      return servicesApi.create(payload, token!)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all })
    },
  })
}

export function useUpdateService() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: UpdateServiceDto }) => {
      const token = await getToken()
      return servicesApi.update(id, payload, token!)
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all })
      queryClient.setQueryData(queryKeys.services.detail(updated.slug), updated)
    },
  })
}

export function useDeleteService() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (id: number) => {
      const token = await getToken()
      return servicesApi.delete(id, token!)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.all })
    },
  })
}
```

### 9.5 Server Component Prefetch Pattern

```typescript
// app/(public)/services/page.tsx  — Server Component
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/react-query/client'
import { servicesApi } from '@/features/services/api'
import { queryKeys } from '@/lib/react-query/keys'
import ServicesGrid from '@/components/services/ServicesGrid'

export default async function ServicesPage() {
  const queryClient = getQueryClient()

  // Prefetch on server — client gets instant hydrated data, no loading flash
  await queryClient.prefetchQuery({
    queryKey: queryKeys.services.lists(),
    queryFn: () => servicesApi.getAll(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServicesGrid />
    </HydrationBoundary>
  )
}
```

```typescript
// components/services/ServicesGrid.tsx — Client Component
'use client'
import { useServices } from '@/features/services/queries'
import ServiceCard from './ServiceCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function ServicesGrid() {
  const { data: services, isLoading, isError } = useServices()

  if (isLoading) return <ServicesGridSkeleton />
  if (isError) return <p>Failed to load services.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services?.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}

function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-2xl" />
      ))}
    </div>
  )
}
```

---

## 10. API Route Design

### 10.1 Services Route Handler

```typescript
// app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { Service, ServiceCategory } from '@/lib/db/models'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const where: Record<string, unknown> = { isActive: true }
  if (searchParams.get('categoryId')) where.categoryId = Number(searchParams.get('categoryId'))
  if (searchParams.get('featured') === 'true') where.isFeatured = true

  const services = await Service.findAll({
    where,
    include: [{ model: ServiceCategory, as: 'category', attributes: ['id', 'name', 'slug'] }],
    order: [['displayOrder', 'ASC'], ['name', 'ASC']],
  })

  return NextResponse.json({ data: services })
}

export async function POST(req: NextRequest) {
  const { userId, sessionClaims } = await auth()
  if (!userId || sessionClaims?.metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const service = await Service.create(body)
  return NextResponse.json({ data: service }, { status: 201 })
}
```

### 10.2 Standardized API Response Envelope

```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    perPage?: number
  }
}

export interface ApiError {
  error: string
  code?: string
  details?: Record<string, string[]>
}
```

---

## 11. Firebase Realtime Database — Notification System

### 11.1 Architecture Flow

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING TOAST FLOW (Firebase RTDB)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

① Customer books appointment on Fresha.com
         │
         ▼
② Fresha fires webhook → POST /api/bookings/notify
         │
         ▼
③ Next.js Route Handler (server):
   · Validates Fresha webhook signature
   · Masks customer name: "Sarah B." (privacy)
   · Uses firebase-admin to write to RTDB:
     salon-app/notifications/{pushId} = { ... }
         │
         ▼
④ Firebase RTDB pushes event to all connected clients
         │
         ▼
⑤ useBookingToasts() hook (Client Component):
   · onChildAdded() listener fires
   · Appends new notification to local state
         │
         ▼
⑥ BookingToastContainer renders Framer Motion toast:
   "Sarah B. just booked a Brazilian Blowout with Emma! 🎉"
   Auto-dismisses after 6 seconds
         │
         ▼
⑦ Admin Panel reads full history from RTDB:
   /admin/notifications page shows paginated log
   Admin can mark notifications as isRead = true

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 11.2 Firebase Client SDK Init

```typescript
// lib/firebase/client.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Prevent duplicate initialization in Next.js dev hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const rtdb = getDatabase(app)
```

### 11.3 Firebase Admin SDK Init (Server Only)

```typescript
// lib/firebase/admin.ts
import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

let adminApp: App

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0]

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export const adminDb = getDatabase(getAdminApp())
```

### 11.4 Firebase RTDB Helpers

```typescript
// lib/firebase/notifications.ts
import { rtdb } from './client'
import { ref, onChildAdded, off, query, orderByChild, limitToLast, DataSnapshot } from 'firebase/database'
import type { BookingNotification } from '@/types/firebase'

const NOTIFICATIONS_PATH = 'salon-app/notifications'

/**
 * Subscribe to new booking notifications (client-side)
 * Returns an unsubscribe function
 */
export function subscribeToNotifications(
  onNew: (notification: BookingNotification) => void,
  limit = 1
): () => void {
  const notifRef = query(
    ref(rtdb, NOTIFICATIONS_PATH),
    orderByChild('createdAt'),
    limitToLast(limit)
  )

  const handler = (snapshot: DataSnapshot) => {
    if (snapshot.exists()) {
      onNew({ id: snapshot.key!, ...snapshot.val() } as BookingNotification)
    }
  }

  onChildAdded(notifRef, handler)

  // Return cleanup function
  return () => off(notifRef, 'child_added', handler)
}
```

### 11.5 Fresha Webhook → Firebase Admin Write

```typescript
// app/api/bookings/notify/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import { ref, push, serverTimestamp } from 'firebase-admin/database'

export async function POST(req: NextRequest) {
  // 1. Validate Fresha webhook signature
  const signature = req.headers.get('x-fresha-signature')
  if (!signature || !isValidFreshaSignature(signature, await req.text())) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payload = await req.json()

  // 2. Mask customer name for privacy (GDPR-friendly)
  const fullName: string = payload.customer?.name ?? 'A customer'
  const parts = fullName.trim().split(' ')
  const maskedName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0]

  // 3. Write notification to Firebase RTDB via Admin SDK
  const notificationsRef = ref(adminDb, 'salon-app/notifications')
  await push(notificationsRef, {
    customerNameMasked: maskedName,
    serviceName: payload.service?.name ?? 'a service',
    stylistName: payload.stylist?.name ?? null,
    freshaBookingId: payload.bookingId ?? null,
    bookedAt: payload.bookedAt ?? Date.now(),
    appointmentAt: payload.appointmentAt ?? null,
    isRead: false,
    createdAt: Date.now(),
  })

  return NextResponse.json({ success: true })
}

function isValidFreshaSignature(signature: string, body: string): boolean {
  const crypto = require('crypto')
  const expected = crypto
    .createHmac('sha256', process.env.FRESHA_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')
  return signature === expected
}
```

### 11.6 useBookingToasts Hook

```typescript
// hooks/useBookingToasts.ts
'use client'
import { useEffect, useState } from 'react'
import { subscribeToNotifications } from '@/lib/firebase/notifications'
import type { BookingNotification } from '@/types/firebase'

export function useBookingToasts() {
  const [toasts, setToasts] = useState<BookingNotification[]>([])

  useEffect(() => {
    let isFirstLoad = true

    const unsubscribe = subscribeToNotifications((notification) => {
      // Skip the initial value event — only show truly new arrivals
      if (isFirstLoad) {
        isFirstLoad = false
        return
      }

      setToasts((prev) => [notification, ...prev].slice(0, 5)) // max 5 toasts

      // Auto-dismiss after 6 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== notification.id))
      }, 6000)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, dismissToast }
}
```

### 11.7 BookingToastContainer Component

```typescript
// components/booking/BookingToastContainer.tsx
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useBookingToasts } from '@/hooks/useBookingToasts'
import BookingToastItem from './BookingToastItem'

export default function BookingToastContainer() {
  const { toasts, dismissToast } = useBookingToasts()

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <BookingToastItem toast={toast} onDismiss={() => dismissToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

### 11.8 Firebase RTDB TypeScript Types

```typescript
// types/firebase.ts
export interface BookingNotification {
  id: string                    // Firebase push key
  customerNameMasked: string    // "Sarah B."
  serviceName: string
  stylistName: string | null
  freshaBookingId: string | null
  bookedAt: number              // Unix ms
  appointmentAt: number | null  // Unix ms
  isRead: boolean
  createdAt: number             // Unix ms
}
```

---

## 12. Component Architecture

### 12.1 Server vs. Client Component Classification

```
Component                          | Type   | Data Source
────────────────────────────────────────────────────────────────────
app/(public)/page.tsx              | Server | Sequelize direct query
HeroSection.tsx                    | Server | Props from page (site_settings)
FeaturedServices.tsx               | Server | Prefetched React Query cache
StatsCounter.tsx                   | Client | Props (count-up animation)
TestimonialsCarousel.tsx           | Client | Drag/swipe interaction
TeamCard.tsx                       | Server | Props
ServicesGrid.tsx                   | Client | useServices() React Query hook
ServiceCard.tsx                    | Server | Props
BookingToastContainer.tsx          | Client | Firebase RTDB onChildAdded()
FreshaWidget.tsx                   | Client | iframe + external script
ReviewForm.tsx                     | Client | react-hook-form + useMutation()
StarRating.tsx                     | Client | Local state
AdminSidebar.tsx                   | Client | Collapsible state
ServiceForm.tsx                    | Client | react-hook-form + useMutation()
DataTable.tsx (admin)              | Client | useQuery() + local sort/filter
NotificationFeed.tsx (admin)       | Client | Firebase RTDB onValue()
ImageUploader.tsx                  | Client | Uploadthing drag-drop
```

### 12.2 Data Flow Summary

```
┌─────────────────────────────────────────────────────────────┐
│              DATA FLOW ARCHITECTURE                         │
│                                                             │
│  Public Page (Server Component)                             │
│      │                                                      │
│      ├── prefetchQuery() on server                          │
│      │       └── Axios → /api/* → Sequelize → MySQL         │
│      │                                                      │
│      └── <HydrationBoundary> wraps client children          │
│              │                                              │
│              └── Client Component                           │
│                      │                                      │
│                      ├── useQuery() → cache HIT (instant)  │
│                      ├── useMutation() → Axios POST/PUT     │
│                      │       └── invalidateQueries()        │
│                      │                                      │
│                      └── useBookingToasts()                 │
│                              └── Firebase RTDB listener     │
└─────────────────────────────────────────────────────────────┘
```

---

## 13. Authentication & Authorization

### 13.1 Role Strategy

| Role | Access | How Set |
|---|---|---|
| `public` | All public routes | No login |
| `admin` | `/admin/*` + write API routes | Clerk `publicMetadata.role = "admin"` |

### 13.2 Middleware

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/services',           // POST only — GET is public
  '/api/services/:id',       // PUT, DELETE
  '/api/team',               // POST
  '/api/team/:id',           // PUT, DELETE
  '/api/reviews/:id',        // PUT, DELETE
  '/api/settings',           // PUT
  '/api/upload',
])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth()
    if (!userId) return auth.redirectToSignIn({ returnBackUrl: req.url })
    if (sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
```

---

## 14. Admin Panel Design

### 14.1 Admin Layout

```
/admin layout (AdminSidebar + AdminTopBar)
├── Dashboard       → DashboardStatCard × 4 (services, team, reviews, bookings)
├── Services        → DataTable + Dialog (create/edit) + AlertDialog (delete)
├── Team            → DataTable + Sheet (create/edit) + Avatar
├── Reviews         → Tabs (Pending/Approved/Rejected) + ReviewModerationCard
├── Notifications   → NotificationFeed (Firebase RTDB, live + history)
└── Settings        → Tabs (Hero/Contact/Social/SEO/Stats) + Form per group
```

### 14.2 Admin Page → shadcn/ui Component Mapping

| Admin Page | Components Used |
|---|---|
| **Dashboard** | `Card`, `Badge`, `Skeleton`, `Progress` |
| **Services** | `Table`, `Dialog`, `AlertDialog`, `Badge`, `Switch`, `Select` |
| **New/Edit Service** | `Form`, `Input`, `Textarea`, `Select`, `Switch`, `Separator` |
| **Team** | `Table`, `Avatar`, `Badge`, `Dialog`, `Sheet` |
| **New/Edit Team** | `Form`, `Input`, `Textarea`, `Switch`, `Command` (multi-select services) |
| **Reviews** | `Tabs`, `Badge`, `Card`, `Alert`, `AlertDialog`, `ScrollArea` |
| **Notifications** | `ScrollArea`, `Badge`, `Card`, `Skeleton` |
| **Settings** | `Form`, `Tabs`, `Input`, `Textarea`, `Switch`, `Separator` |

---

## 15. State Management Strategy

| Concern | Solution | Reason |
|---|---|---|
| **Server data (read)** | React Query `useQuery` + Axios | Caching, deduplication, background refresh |
| **Server data (write)** | React Query `useMutation` + Axios | Optimistic updates, cache invalidation |
| **Server prefetch (SSR)** | `prefetchQuery` + `HydrationBoundary` | Zero loading flash on page load |
| **Real-time notifications** | Firebase RTDB + `onChildAdded` | Persistent, offline-resilient, queryable |
| **Form state** | `react-hook-form` + `zod` | Type-safe, integrates with shadcn Form |
| **UI state** (modals, tabs) | Local `useState` | Scoped, no global store needed |
| **Theme / Sidebar state** | React Context | Minimal, cross-cutting UI only |

```
No Redux · No Zustand · No Jotai
React Query IS the global data cache.
Firebase RTDB IS the real-time state.
Everything else is local component state.
```

---

## 16. Environment Variables

```bash
# .env.local

# ── MySQL Database ─────────────────────────────────────────────
DB_HOST=localhost
DB_PORT=3306
DB_NAME=salon_db
DB_USER=salon_user
DB_PASSWORD=your_strong_password

# ── Clerk Auth ─────────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin

# ── Firebase Client (public — read-only scoped) ────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-app-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# ── Firebase Admin (server only — never expose to client) ──────
FIREBASE_ADMIN_PROJECT_ID=your-app
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-app.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ── Fresha ─────────────────────────────────────────────────────
FRESHA_WEBHOOK_SECRET=your_webhook_secret

# ── Uploadthing ────────────────────────────────────────────────
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# ── Resend Email ───────────────────────────────────────────────
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yoursalon.com

# ── App ────────────────────────────────────────────────────────
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_APP_URL=https://yoursalon.com

# ── Sentry ─────────────────────────────────────────────────────
SENTRY_DSN=https://...
```

---

## 17. Phased Delivery Plan

### Phase 1 — Foundation & Public Pages (Week 1–2)
- [ ] Scaffold Next.js 15 project: TypeScript, Tailwind v4, shadcn/ui
- [ ] Set up Axios singleton + interceptors
- [ ] Set up React Query client + provider + devtools
- [ ] Set up MySQL + Sequelize + run initial migrations
- [ ] Build public layout: Header, Footer, MobileNav
- [ ] Build Home page: Hero, Featured Services, Stats, Team Preview
- [ ] Build About page and Rates page

### Phase 2 — Team & Services Pages (Week 3)
- [ ] Build Team page + Stylist Profile page (`useTeam`, `useTeamMember` hooks)
- [ ] Build Services page + Service Detail page (`useServices`, `useService` hooks)
- [ ] Build Gallery page
- [ ] Implement server-side prefetch + HydrationBoundary pattern on all pages
- [ ] Add Framer Motion scroll animations

### Phase 3 — Booking & Firebase Notifications (Week 4)
- [ ] Set up Firebase project + Realtime Database
- [ ] Initialize Firebase client SDK + Admin SDK
- [ ] Build Booking page with Fresha widget embed
- [ ] Implement `/api/bookings/notify` webhook → Firebase Admin write
- [ ] Build `useBookingToasts` hook with `onChildAdded` listener
- [ ] Build `BookingToastContainer` with Framer Motion animations
- [ ] Test full flow: Fresha → webhook → Firebase → toast
- [ ] Build Admin Notifications page (RTDB history feed)

### Phase 4 — Reviews System (Week 5)
- [ ] Build Review submission form (react-hook-form + zod + `useCreateReview`)
- [ ] Build Reviews page with filters (`useReviews` hook with query params)
- [ ] Build ReviewCard with media support
- [ ] Review moderation flow with optimistic updates
- [ ] Email notification to admin on new review (Resend)

### Phase 5 — Admin Panel (Week 6)
- [ ] Set up Clerk + admin role + middleware
- [ ] Build Admin shell: Sidebar (shadcn) + TopBar
- [ ] Build Dashboard with stat cards (React Query aggregate queries)
- [ ] Build Services CRUD with `useCreateService`, `useUpdateService`, `useDeleteService`
- [ ] Build Team CRUD with image upload (Uploadthing)
- [ ] Build Review Moderator with `useMutation` approve/reject
- [ ] Build Site Settings panel (grouped form, `useUpdateSettings`)

### Phase 6 — Polish, SEO & Deployment (Week 7)
- [ ] Add Next.js `metadata` API (static + dynamic) for all pages
- [ ] Add `loading.tsx`, `error.tsx`, `not-found.tsx` boundaries
- [ ] Lighthouse audit — target 95+ on all metrics
- [ ] Set up Sentry + Vercel Analytics
- [ ] CI/CD via Vercel with env config
- [ ] Write DB seed data for staging environment

---

## 18. Appendix

### Appendix A — Full Package List

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "latest",
    "next-themes": "latest",
    "sonner": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "class-variance-authority": "latest",

    "axios": "^1.0.0",
    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-query-devtools": "^5.0.0",

    "firebase": "^10.0.0",
    "firebase-admin": "^12.0.0",

    "sequelize": "^6.0.0",
    "mysql2": "^3.0.0",

    "@clerk/nextjs": "latest",

    "uploadthing": "^7.0.0",
    "@uploadthing/react": "^7.0.0",
    "resend": "^3.0.0",
    "@react-email/components": "latest",

    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "latest",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "sequelize-cli": "^6.0.0",
    "@sentry/nextjs": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "prettier": "latest",
    "husky": "latest",
    "lint-staged": "latest"
  }
}
```

### Appendix B — Sequelize CLI Config

```javascript
// .sequelizerc
const path = require('path')
module.exports = {
  config: path.resolve('lib/db', 'config.json'),
  'models-path': path.resolve('lib/db', 'models'),
  'seeders-path': path.resolve('lib/db', 'seeders'),
  'migrations-path': path.resolve('lib/db', 'migrations'),
}
```

### Appendix C — Query Key Strategy

All React Query cache keys follow a hierarchical factory pattern defined in
`lib/react-query/keys.ts`. This guarantees:
- Precise invalidation (invalidate one item vs. all items)
- No magic strings scattered across the codebase
- Full TypeScript inference on all query keys

```
services                          ← invalidates ALL service queries
services > list                   ← invalidates all list views
services > list > { featured }    ← invalidates only featured list
services > detail > "balayage"    ← invalidates one service by slug
```

### Appendix D — Firebase RTDB vs MySQL Decision Table

| Data | Where Stored | Reason |
|---|---|---|
| Services | MySQL | Relational, admin CRUD, SEO-indexed |
| Team Members | MySQL | Relational, associations, admin CRUD |
| Reviews | MySQL | Needs approval workflow, relational filters |
| Site Settings | MySQL | Admin CRUD, structured groups |
| Booking Notifications | **Firebase RTDB** | Real-time push, persistent history, offline resilience |

---

*Document Version 2.0.0 — maintained by principal architect.*
*Update version on every structural change.*