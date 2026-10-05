-- Your Schedule cloud sync schema.
-- Run this in the Supabase SQL editor for the project used by the app.

create table if not exists public.schedule_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  collection text not null check (collection in ('events', 'routines', 'routineCompletions', 'weekNotes', 'settings')),
  record_id text not null,
  data jsonb,
  client_updated_at timestamptz not null,
  deleted_at timestamptz,
  server_updated_at timestamptz not null default now(),
  primary key (user_id, collection, record_id)
);

create index if not exists schedule_records_user_collection_idx
  on public.schedule_records (user_id, collection);

create or replace function public.set_schedule_record_server_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.server_updated_at = now();
  return new;
end;
$$;

drop trigger if exists schedule_records_set_server_updated_at on public.schedule_records;

create trigger schedule_records_set_server_updated_at
before update on public.schedule_records
for each row
execute function public.set_schedule_record_server_updated_at();

alter table public.schedule_records enable row level security;

drop policy if exists "Users can read own schedule records" on public.schedule_records;
drop policy if exists "Users can insert own schedule records" on public.schedule_records;
drop policy if exists "Users can update own schedule records" on public.schedule_records;

create policy "Users can read own schedule records"
on public.schedule_records
for select
using (auth.uid() = user_id);

create policy "Users can insert own schedule records"
on public.schedule_records
for insert
with check (auth.uid() = user_id);

create policy "Users can update own schedule records"
on public.schedule_records
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
