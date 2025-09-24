import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { creatorToolCategories } from "@/data/creatorTools";
import { useLanguage } from "@/contexts/LanguageContext";

const CreatorToolsShowcase = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section className="section bg-gradient-to-b from-white via-emerald-50/40 to-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">
            {isEnglish ? "Latest creator tool stacks" : "সর্বশেষ ক্রিয়েটর টুল স্ট্যাক"}
          </p>
          <h2 className="section-heading">
            {isEnglish
              ? "Track the tools your peers monetise"
              : "যে টুল দিয়ে সহকর্মীরা আয় করছে তা অনুসরণ করুন"}
          </h2>
          <p className="section-subheading mt-4 text-muted-foreground">
            {isEnglish
              ? "We scrape open data hubs and community lists to highlight software that is converting across creator collectives."
              : "আমরা ওপেন ডেটা হাব ও কমিউনিটি তালিকা থেকে সংগ্রহ করে এমন সফটওয়্যার দেখাই যা ক্রিয়েটর কালেক্টিভে ফল দিচ্ছে।"}
          </p>
        </div>

        <Tabs defaultValue={creatorToolCategories[0]?.id} className="mt-16 space-y-10">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent p-0">
            {creatorToolCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-[1px] hover:border-emerald-200 hover:text-emerald-900 data-[state=active]:border-emerald-500 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-900"
              >
                {isEnglish ? category.title.en : category.title.bn}
              </TabsTrigger>
            ))}
          </TabsList>

          {creatorToolCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-base text-muted-foreground">
                  {isEnglish ? category.summary.en : category.summary.bn}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {category.tools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="h-full border-emerald-100/80 bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl font-semibold text-emerald-900">
                          {tool.name}
                        </CardTitle>
                        <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                          {isEnglish ? "Hot" : "হট"}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-6 text-muted-foreground">
                        {isEnglish ? tool.description.en : tool.description.bn}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-emerald-700">
                          {isEnglish ? "Why it matters now" : "এখন কেন জরুরি"}
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {isEnglish ? tool.highlight.en : tool.highlight.bn}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                          {isEnglish ? tool.metrics.en : tool.metrics.bn}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-emerald-700">
                          {isEnglish ? "Top affiliate routes" : "শীর্ষ অ্যাফিলিয়েট রুট"}
                        </p>
                        <ul className="space-y-3">
                          {tool.countries.map((country) => (
                            <li
                              key={`${tool.id}-${country.countryCode}`}
                              className="rounded-2xl border border-emerald-100/80 bg-emerald-50/40 p-4"
                            >
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-emerald-900">
                                    {isEnglish ? country.countryName.en : country.countryName.bn}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {isEnglish ? country.demandTrend.en : country.demandTrend.bn}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="outline"
                                    className="rounded-full border-emerald-300 bg-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-700"
                                  >
                                    #{country.popularityRank}
                                  </Badge>
                                  <a
                                    href={country.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                                  >
                                    {isEnglish ? "Open link" : "লিঙ্ক খুলুন"}
                                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {tool.sources.length > 0 && (
                        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/80 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                            {isEnglish ? "Data signals" : "তথ্যের উৎস"}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {tool.sources.map((source) => {
                              let label = source.replace(/^https?:\/\//, "").replace(/^www\./, "");
                              if (label.length > 42) {
                                label = `${label.slice(0, 39)}...`;
                              }
                              return (
                                <a
                                  key={`${tool.id}-${source}`}
                                  href={source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition hover:border-emerald-400 hover:text-emerald-800"
                                >
                                  {label}
                                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CreatorToolsShowcase;
