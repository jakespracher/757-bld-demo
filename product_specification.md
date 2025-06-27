# HRBT Traffic Haikus

I want to create a dead simple website that displays on its homepage a haiku that explains whether there is traffic on the Hampton Roads Bridge Tunnel or not. It is notoriously jammed, so the haikus should be funny. If its jammed, it can alternate between frustration, solace, or suggesting other things to do. They should always be humorous. If its clear, it should comment on the profound luck or state of the universe.

I want to pull data from the tomtom traffic api and use openAI to generate the haikus. I want to use nextjs on vercel.

The haikus should refresh once every five minutes.

I want to use supabase for the backend, and use this starter kit:

```
Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, follow the steps below.

Clone and run locally

You'll first need a Supabase project which can be made via the Supabase dashboard

Create a Next.js app using the Supabase Starter template npx command

npx create-next-app --example with-supabase with-supabase-app
yarn create next-app --example with-supabase with-supabase-app
pnpm create next-app --example with-supabase with-supabase-app
Use cd to change into the app's directory

cd with-supabase-app
Rename .env.example to .env.local and update the following:

NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
Both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY can be found in your Supabase project's API settings

You can now run the Next.js local development server:

npm run dev
The starter kit should now be running on localhost:3000.

This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete components.json and re-install shadcn/ui
```