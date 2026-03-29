import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fetchCreatures } from "@/lib/api";
import type { OceanZone } from "@/types/domain";

const zoneTabs: { label: string; value: OceanZone }[] = [
  { label: "All", value: "all" },
  { label: "Sunlight", value: "sunlight" },
  { label: "Twilight", value: "twilight" },
  { label: "Midnight", value: "midnight" },
  { label: "Abyss", value: "abyss" },
];

const ExplorerPage = () => {
  const [zone, setZone] = useState<OceanZone>("all");
  const [search, setSearch] = useState("");

  const trimmedSearch = useMemo(() => search.trim(), [search]);

  const creaturesQuery = useQuery({
    queryKey: ["creatures", zone, trimmedSearch],
    queryFn: () => fetchCreatures(zone, trimmedSearch),
    staleTime: 30_000,
  });

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14">
      <section className="mx-auto max-w-6xl rounded-3xl border border-border/45 bg-card/30 p-6 shadow-deep sm:p-10">
        <div className="text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-primary/80">Explorer Module</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">Deep Sea Species Explorer</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
            Filter by ocean zone and search species details. Data is fetched from the backend API and gracefully falls back
            to local data if the API is unavailable.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {zoneTabs.map((tab) => (
              <Button
                key={tab.value}
                type="button"
                size="sm"
                variant={zone === tab.value ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setZone(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="mx-auto w-full max-w-xl">
            <label htmlFor="search" className="sr-only">
              Search creatures
            </label>
            <input
              id="search"
              type="search"
              placeholder="Search by species, trait, or adaptation"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-border/60 bg-background/70 px-4 font-body text-sm outline-none transition-colors focus:border-primary/60"
            />
          </div>
        </div>

        {creaturesQuery.isLoading && (
          <p className="mt-10 text-center font-body text-sm text-muted-foreground">Loading creature records...</p>
        )}

        {creaturesQuery.isError && (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-center">
            <p className="font-body text-sm text-destructive">Unable to fetch records right now. Please retry.</p>
            <Button type="button" className="mt-4 rounded-full" onClick={() => creaturesQuery.refetch()}>
              Retry Fetch
            </Button>
          </div>
        )}

        {!creaturesQuery.isLoading && !creaturesQuery.isError && (
          <div className="mt-10">
            {creaturesQuery.data && creaturesQuery.data.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {creaturesQuery.data.map((creature, index) => (
                  <motion.article
                    key={creature.id}
                    className="rounded-2xl border border-border/40 bg-secondary/40 p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    whileHover={{ y: -4, borderColor: "hsl(185 80% 55% / 0.45)" }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl" aria-hidden="true">
                        {creature.emoji}
                      </span>
                      <span className="rounded-full border border-primary/30 px-2 py-1 font-body text-[10px] uppercase tracking-wider text-primary">
                        {creature.zone}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl text-foreground">{creature.name}</h2>
                    <p className="mt-2 font-body text-xs text-primary/80">Depth: {creature.depth}</p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{creature.description}</p>
                    <p className="mt-3 rounded-lg border border-border/30 bg-background/40 p-3 font-body text-xs text-foreground/80">
                      {creature.highlight}
                    </p>
                  </motion.article>
                ))}
              </div>
            ) : (
              <p className="text-center font-body text-sm text-muted-foreground">No records matched your filters.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default ExplorerPage;
