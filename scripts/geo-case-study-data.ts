/**
 * scripts/geo-case-study-data.ts
 *
 * Case study copy keyed by project slug. Format understood by the case study
 * page renderer: "## Heading", "1) **Bold**" list items, plain paragraphs.
 *
 * Content rules: only claims supported by the repository or by the owner.
 * No unmeasured performance, uptime, accuracy or percentage figures.
 */

export type CaseStudyEntry = {
  title: string;
  markdown: string;
};

export const GEO_CASE_STUDIES: Record<string, CaseStudyEntry> = {
  /* ── Featured ─────────────────────────────────────────────────────────── */

  mediconnect: {
    title: "MediConnect — Telemedicine Backend API",
    markdown: `## Overview
MediConnect is a Django REST API for remote medical consultations. Patients book appointments with doctors, hold video consultations, and receive prescriptions and medical records.

## Architecture
The backend uses Django and Django REST Framework with PostgreSQL. Authentication uses JWT through djangorestframework-simplejwt, with separate registration and role-based access for patients, doctors and administrators.

Video consultations are provided by the Whereby API. Medical documents are stored in Supabase object storage, which is S3-compatible.

## What I built
1) **Role-based accounts**
Separate registration and permissions for patients, doctors and administrators, with personalised dashboards for patients and doctors.

2) **Appointment lifecycle**
Doctor profiles with specialisation and availability scheduling, and a booking flow that carries an appointment through consultation to prescription.

3) **Video consultation integration**
Integrated the Whereby API so a booked appointment can be joined as a video consultation.

4) **Medical record storage**
Document upload and categorisation backed by Supabase storage.

5) **Testing**
A Pytest suite with global fixtures and integration flows. Tests run in a mocked mode by default, and tests that call the real external APIs are marked separately and switched on through environment variables.

## Notes
The repository is a backend API. It includes a public landing page with a doctor directory.`,
  },

  "ai-support-agent": {
    title: "AI Support Agent — Multi-Tenant RAG Support Platform",
    markdown: `## Overview
AI Support Agent is a multi-tenant customer support platform. A company uploads its own documents, and the system answers customer questions from that knowledge base using retrieval-augmented generation (RAG) instead of relying on the model's general training.

## Architecture
The backend is Django 5 with a Django Ninja REST API and OpenAPI documentation. PostgreSQL with pgvector stores document embeddings for similarity search. Celery workers with Redis handle slow work, such as document processing and model calls, outside the request cycle.

Answers are generated with Groq as the primary model and OpenAI as a fallback. Document embeddings are computed locally with a Hugging Face sentence-transformers model, so a paid embedding API is not required.

## What I built
1) **Retrieval pipeline**
Document ingestion for PDF, DOCX, CSV, JSON, Markdown and plain text, followed by embedding and vector search against the tenant's own documents.

2) **Multi-channel support**
Website chat, WhatsApp through Twilio, and email through SMTP and Resend, all feeding one conversation model.

3) **Tenant isolation**
A multi-tenant design where each company's documents and conversations are kept separate.

4) **Background processing**
Celery and Redis for asynchronous tasks, plus a health-check endpoint that reports database and Redis connectivity.

5) **Dashboard and containers**
A web dashboard for document management and conversation history, and Docker support for the application and its services.

## Notes
Tests use pytest, pytest-django and factory-boy, with coverage focused on the email workflows.`,
  },

  verd: {
    title: "Verd — Offline-First Crop Disease Detection App",
    markdown: `## Overview
Verd is a Flutter mobile app that helps farmers and gardeners identify plant and vegetable diseases from a photo. It is designed to keep working where internet access is unreliable.

Verd was a team project, built for the AgriScan AI Hackathon, where it reached the finals. My role was Lead Mobile Developer.

## Architecture
The app uses Riverpod for state management and GoRouter for navigation. Firebase provides authentication, Firestore, storage, messaging, analytics and crash reporting. Hive and SharedPreferences hold local data.

Detection is hybrid. When the device is online the app uses the Gemini API. When it is offline it falls back to an on-device TensorFlow Lite model, with Grad-CAM used to visualise which regions of the image drove a prediction.

Other app features include a Learning Center of crop disease knowledge, push notifications, and an interface localised into 13 languages.

## My contribution
1) **Led the mobile application development**
Owned the Flutter application and its technical implementation across the hackathon.

2) **Frontend implementation**
Built the app's screens, navigation and interaction flow.

3) **Backend and integration work for the app**
Connected the app to its services: Firebase authentication, Firestore sync and storage, and the Gemini API for online inference.

4) **Machine-learning model integration**
Integrated the machine-learning model into the Flutter application, embedding the TensorFlow Lite model for on-device inference and applying Grad-CAM so a prediction can be explained visually. The underlying model was not trained by me.

5) **Offline-first behaviour**
Hive-based local storage for scan data, with history synced to Firestore once a signed-in user is back online.

## Notes
The project scaffolding targets Android, iOS, web and desktop, with mobile as the main focus.`,
  },

  "offline-voice-translator": {
    title: "Offline AI Voice Translator — On-Device Speech Translation",
    markdown: `## Overview
The Offline AI Voice Translator is a Flutter app that listens to speech, transcribes it, translates it and speaks the result, using pretrained models that run on the device.

My contribution was integration engineering. I did not train the underlying models. I researched the available options, selected suitable pretrained models, and made them work together inside a Flutter app.

## Architecture
The pipeline has four stages: audio capture, speech-to-text with Sherpa-ONNX, machine translation with CTranslate2 running OPUS-MT models, and text-to-speech with Piper. Hive stores local data such as history and favourites.

## What I built
1) **Model research and selection**
Compared options for offline speech recognition, translation and speech synthesis, and chose the combination that could run inside a mobile-oriented app.

2) **Pipeline orchestration**
Connected speech, transcription, translation and speech output into one flow, so a spoken phrase in one language produces spoken output in another.

3) **Platform constraints**
Worked around Windows, mobile and ONNX runtime constraints that came up while integrating the native model runtimes with Flutter.

4) **Interface**
Built the initial user interface, and later collaborated on refining it.`,
  },

  /* ── Earlier work and in-progress ─────────────────────────────────────── */

  "fusion-fiesta": {
    title: "Fusion Fiesta — College Event Management App",
    markdown: `## Overview
Fusion Fiesta is a cross-platform college event management app built with Flutter. It was an earlier learning project.

## Architecture
The code is organised by role: admin, organizer and student, each with its own screens, state and data access. GoRouter handles navigation with route guards that check the signed-in user's role, and GetIt provides dependency injection.

## What I built
1) **Role-based portals**
Separate experiences for administrators, organizers and students in one app.

2) **Route guards**
Navigation checks that stop a user reaching screens outside their role.

3) **QR-based attendance**
Event check-in using QR codes.`,
  },

  tasteflow: {
    title: "Tasteflow — Food Ordering & Delivery Platform",
    markdown: `## Overview
Tasteflow is a full-stack food ordering and delivery platform built with Flask. It was an earlier learning project.

## Architecture
Flask Blueprints separate the admin, customer, owner and authentication areas. SQLAlchemy models the relational data with Alembic migrations, and Jinja2 renders pages on the server, with vanilla JavaScript for interactivity.

## What I built
1) **Three user roles**
Customers, restaurant owners and administrators, each with their own portal and permissions.

2) **Scoped data access**
Queries that limit owners to their own restaurant's data.

3) **Testing**
A Pytest suite covering access rules and main user journeys.`,
  },

  "baby-shophub": {
    title: "Baby Shophub — E-Commerce Mobile App",
    markdown: `## Overview
Baby Shophub is a Flutter e-commerce app for baby products, with Google sign-in. It was an earlier learning project.

## Architecture
Supabase provides the PostgreSQL database and user sessions. The app separates customer and administrator flows, with shared UI components in a common directory and data access wrapped in service classes.

## What I built
1) **Customer and admin areas**
A shopping flow for customers and a separate administrator dashboard, chosen at sign-in.

2) **Service layer**
Database queries wrapped in services so screens do not talk to the backend directly.

3) **Deep links**
Links that open a specific product screen from outside the app.`,
  },

  "bistro-bliss": {
    title: "Bistro Bliss — Restaurant Website",
    markdown: `## Overview
Bistro Bliss is a responsive restaurant website with menu browsing and a reservation form. It was an earlier front-end learning project.

## Architecture
Built with Next.js, TypeScript and Tailwind CSS, using shadcn/ui components on Radix primitives for menus, dialogs and date selection. Forms use React Hook Form with Zod validation.

## What I built
1) **Responsive layout**
Pages that adapt from small phones to wide desktop screens.

2) **Reservation form**
A booking form with typed validation and clear error messages.

3) **Component foundation**
Reusable components on accessible primitives.`,
  },

  "devdocs-ai": {
    title: "DevDocs AI — Documentation Generator Prototype",
    markdown: `## Overview
DevDocs AI is an experimental prototype that reads a GitHub repository and uses language models to draft documentation for it. It is a work in progress and not a finished product.

## Architecture
A Next.js and TypeScript application with Supabase for data. The AI layer is written to work with several model providers so the provider can be changed, and Redis-based rate limiting is used to protect the AI endpoints.

## What I built
1) **Multi-provider AI layer**
An abstraction over more than one language model provider.

2) **Rate limiting**
Request limits on the endpoints that call paid model APIs.

3) **Subscription groundwork**
Early work on tier-based access.

## Notes
The output quality is not yet where I want it, so this is listed as earlier work.`,
  },

  "aspire-edge": {
    title: "AspireEdge — Career Guidance Platform (In Development)",
    markdown: `## Overview
AspireEdge is a career guidance platform for people from school students through to working professionals. It is still in development and is not a finished product.

## Architecture
The plan splits the system into a Spring Boot backend API with PostgreSQL and a cross-platform Flutter client. Docker Compose provides a local database, and Spring profiles switch between local and hosted databases.

## Status
The project is unfinished. It is included to show direction and current learning, not as completed production work.`,
  },
};
