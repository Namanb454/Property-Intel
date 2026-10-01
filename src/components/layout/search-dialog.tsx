"use client";

import { useRouter } from "next/navigation";
import { useRef, type FormEvent } from "react";
import { routes } from "@/config/navigation";
import { Button, Icon, IconButton } from "@/components/ui";

/** Search button that opens a search box; results are shown on the insights page. */
export function SearchDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (!query) return;
    dialogRef.current?.close();
    router.push(`${routes.insights}?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <IconButton icon="search" label="Search" onClick={() => dialogRef.current?.showModal()} />
      <dialog
        ref={dialogRef}
        aria-label="Search"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
        className="mx-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] rounded-panel bg-surface p-0 text-ink backdrop:bg-ink/40"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3">
          <Icon name="search" size={20} className="ml-2 shrink-0 text-text-muted" />
          <label htmlFor="site-search" className="sr-only">
            Search stories
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            autoFocus
            placeholder="Search stories, cities and guides"
            className="h-12 grow bg-transparent text-base outline-none placeholder:text-text-muted"
          />
          <Button type="submit">Search</Button>
        </form>
      </dialog>
    </>
  );
}
