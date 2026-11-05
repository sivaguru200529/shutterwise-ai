"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

interface ScenarioCardData {
  id: string;
  title: string;
  category: "Portraits" | "Landscapes" | "Street" | "Night" | "Action" | "Indoor";
  tagline: string;
  description: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  lensChoice: string;
  keyChallenge: string;
  baselineConcept: string;
  aiPrompt: string;
}

const scenarios: ScenarioCardData[] = [
  {
    id: "portrait",
    title: "Portrait Photography",
    category: "Portraits",
    tagline: "Subject Isolation & Creamy Bokeh",
    description: "Capturing individuals or couples with flattering skin tones, gentle natural lighting, and pleasant background blur.",
    aperture: "f/1.8 – f/2.8",
    shutterSpeed: "1/200s – 1/400s",
    iso: "ISO 100 – 200",
    lensChoice: "50mm or 85mm Prime Lens",
    keyChallenge: "Balancing shallow depth of field against ensuring both eyes remain razor-sharp.",
    baselineConcept: "Wide aperture isolates subject; minimum 1/200s shutter speed prevents subtle head turn blur.",
    aiPrompt: "What are the best camera settings and lens choices for outdoor portraits during golden hour?",
  },
  {
    id: "landscape",
    title: "Landscape Photography",
    category: "Landscapes",
    tagline: "Vast Horizons & Front-to-Back Texture",
    description: "Capturing expansive vistas, dramatic mountain ridges, and coastlines with critical edge-to-edge optical sharpness.",
    aperture: "f/8.0 – f/11",
    shutterSpeed: "1/125s (Handheld) or 1s+ (Tripod)",
    iso: "Base ISO 100",
    lensChoice: "16–35mm Ultra-Wide or 24–70mm Standard Zoom",
    keyChallenge: "Achieving deep depth of field across the entire frame without diffraction softness.",
    baselineConcept: "Mid-aperture (f/8–f/11) hits lens sweet spot; native Base ISO 100 delivers maximum dynamic range.",
    aiPrompt: "How do I choose the best aperture and focus point for front-to-back sharp landscape photography?",
  },
  {
    id: "street",
    title: "Street & Documentary",
    category: "Street",
    tagline: "Decisive Moments & Dynamic Geometry",
    description: "Navigating unpredictable public spaces, reacting swiftly to human interactions, urban architecture, and natural shadows.",
    aperture: "f/5.6 – f/8.0",
    shutterSpeed: "1/250s – 1/500s",
    iso: "Auto ISO (ceiling 3200)",
    lensChoice: "28mm, 35mm, or 50mm Compact Prime",
    keyChallenge: "Reacting instantly to fleeting human moments before subjects notice or move out of the frame.",
    baselineConcept: "Zone focusing or Aperture Priority at f/5.6 gives deep enough focus plane to snap photos instantly without hunting.",
    aiPrompt: "What is zone focusing in street photography and what settings should I use with a 35mm lens?",
  },
  {
    id: "night",
    title: "Night & Astrophotography",
    category: "Night",
    tagline: "Nocturnal Cityscapes & Deep Skies",
    description: "Revealing illuminated architecture, highway car light trails, or the Milky Way core in near-total darkness.",
    aperture: "f/2.8 (Astro) or f/8.0 (Cityscape)",
    shutterSpeed: "10s – 25s (Tripod Mandatory)",
    iso: "ISO 100 (City) or ISO 3200 (Stars)",
    lensChoice: "14–24mm Fast Wide Angle on Sturdy Tripod",
    keyChallenge: "Gathering enough photon volume without inducing star trails or excessive digital sensor noise.",
    baselineConcept: "Use a solid tripod and a 2-second shutter delay. For star points, follow the 500 Rule (500 ÷ focal length).",
    aiPrompt: "How do I take sharp night photos of city lights and traffic trails on a tripod?",
  },
  {
    id: "action",
    title: "Sports & High-Speed Action",
    category: "Action",
    tagline: "Motion Freeze & Split-Second Velocity",
    description: "Capturing running athletes, sprinting dogs, birds in flight, or sports matches with frozen clarity.",
    aperture: "f/2.8 – f/4.0",
    shutterSpeed: "1/1000s – 1/2000s",
    iso: "ISO 400 – 1600 (Daylight) / 3200+ (Indoor)",
    lensChoice: "70–200mm f/2.8 Telephoto Zoom",
    keyChallenge: "Freezing erratic subject velocity while working within available light limitations.",
    baselineConcept: "Fast shutter speeds (1/1000s+) eliminate motion trails; continuous predictive autofocus (AF-C) tracks subjects.",
    aiPrompt: "What shutter speed do I need to freeze fast outdoor sports and what autofocus mode should I use?",
  },
  {
    id: "indoor",
    title: "Indoor & Low-Light Events",
    category: "Indoor",
    tagline: "Ambient Light & Natural Human Connection",
    description: "Working inside dimly lit rooms, dining spaces, or birthday parties without blinding, ugly direct pop-up flash.",
    aperture: "f/1.8 – f/2.8",
    shutterSpeed: "1/125s – 1/160s",
    iso: "ISO 1600 – 3200",
    lensChoice: "35mm or 50mm f/1.8 Fast Prime",
    keyChallenge: "Preventing camera shake and subject blur when indoor light levels are 100x dimmer than daylight.",
    baselineConcept: "Fast prime lenses (f/1.8) admit 4x more light than budget kit lenses; elevated ISO bridges the remaining exposure gap.",
    aiPrompt: "Why are my indoor photos always dark or blurry without flash, and how can I fix them?",
  },
];

const categories = ["All", "Portraits", "Landscapes", "Street", "Night", "Action", "Indoor"] as const;

export default function RecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredScenarios = scenarios.filter((s) => {
    if (selectedCategory === "All") return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <PageHeader
        badge="Phase 3 • Preset Guides"
        title="Camera Settings Guide"
        description="Field-tested starting baselines, lens recommendations, and optical strategies for six major photography genres."
        statusNotice={{
          label: "Crucial Educational Caveat",
          message:
            "Recommended settings are starting baselines, never rigid universal formulas. Real-world exposures depend strictly on ambient light levels, subject velocity, lens maximum aperture, and camera sensor format.",
          type: "warning",
        }}
      />

      {/* Main Content Area */}
      <section className="py-10 sm:py-14 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-neutral-950 border-amber-500 shadow-sm shadow-amber-500/20"
                    : "bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.map((scenario) => (
              <article
                key={scenario.id}
                className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 shadow-md transition-all duration-200 hover:border-neutral-700 hover:bg-[#1a1a1f]"
              >
                <div>
                  {/* Category Pill & Title */}
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                      {scenario.category}
                    </span>
                    <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[10px] font-mono text-neutral-400 border border-neutral-700">
                      Field Preset
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-neutral-100">
                    {scenario.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-neutral-400">
                    {scenario.tagline}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                    {scenario.description}
                  </p>

                  {/* Settings Triple Box */}
                  <div className="mt-5 rounded-xl border border-neutral-800 bg-neutral-900/70 p-3.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-semibold">
                      Starting Exposure Triangle:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="rounded-lg bg-neutral-800/60 p-2 border border-neutral-700/40">
                        <span className="block text-[9px] text-neutral-400 uppercase">Aperture</span>
                        <span className="font-bold text-amber-400 mt-0.5 block">{scenario.aperture}</span>
                      </div>
                      <div className="rounded-lg bg-neutral-800/60 p-2 border border-neutral-700/40">
                        <span className="block text-[9px] text-neutral-400 uppercase">Shutter</span>
                        <span className="font-bold text-sky-400 mt-0.5 block">{scenario.shutterSpeed}</span>
                      </div>
                      <div className="rounded-lg bg-neutral-800/60 p-2 border border-neutral-700/40">
                        <span className="block text-[9px] text-neutral-400 uppercase">ISO</span>
                        <span className="font-bold text-emerald-400 mt-0.5 block">{scenario.iso}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lens Choice */}
                  <div className="mt-3 rounded-lg border border-neutral-800/80 bg-neutral-900/40 px-3 py-2 text-xs">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                      Recommended Optics:
                    </span>
                    <span className="text-neutral-200 font-medium">{scenario.lensChoice}</span>
                  </div>

                  {/* Baseline Optical Strategy */}
                  <div className="mt-3 rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-3 text-xs leading-relaxed">
                    <span className="text-[10px] font-mono uppercase text-amber-400/90 block mb-1 font-semibold">
                      Optical Strategy:
                    </span>
                    <p className="text-neutral-300">{scenario.baselineConcept}</p>
                  </div>
                </div>

                {/* Card Footer: Ask AI Mentor */}
                <div className="mt-6 border-t border-neutral-800/80 pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400">
                    Challenge: {scenario.keyChallenge.slice(0, 24)}...
                  </span>
                  <Link
                    href={`/chat?prompt=${encodeURIComponent(scenario.aiPrompt)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-mono font-bold text-amber-400 hover:bg-amber-500/20 transition-colors"
                  >
                    <span>Ask Mentor</span>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m14.31 8 5.74 9.94" />
                      <path d="M9.69 8h11.48" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Educational Principles Footer Card */}
          <div className="mt-16 rounded-2xl border border-neutral-800 bg-[#161619] p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
              <span className="text-amber-500">✦</span>
              Why Universal Settings Don&apos;t Exist in Photography
            </h3>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Every photograph is taken under unique conditions. A portrait shot outdoors at 1:00 PM requires drastically different settings than the same portrait shot at sunset or inside a coffee shop.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                <span className="font-semibold text-amber-400 block mb-1">1. Ambient Luminance Shift</span>
                Direct sunlight delivers ~10,000 foot-candles of light, while typical indoor lighting delivers only 10 to 50 foot-candles—a 10-stop exposure disparity.
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                <span className="font-semibold text-sky-400 block mb-1">2. Focal Length & Kinetic Motion</span>
                A 200mm telephoto lens requires at least 1/250s handheld to prevent shake, whereas a 24mm wide-angle lens can be stabilized easily at 1/30s.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
