"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

interface ApertureOption {
  label: string;
  value: number; // f-number
}

interface ShutterOption {
  label: string;
  value: number; // seconds
}

interface IsoOption {
  label: string;
  value: number;
}

const apertureOptions: ApertureOption[] = [
  { label: "f/1.4", value: 1.4 },
  { label: "f/1.8", value: 1.8 },
  { label: "f/2.0", value: 2.0 },
  { label: "f/2.8", value: 2.8 },
  { label: "f/4.0", value: 4.0 },
  { label: "f/5.6", value: 5.6 },
  { label: "f/8.0", value: 8.0 },
  { label: "f/11", value: 11.0 },
  { label: "f/16", value: 16.0 },
  { label: "f/22", value: 22.0 },
];

const shutterOptions: ShutterOption[] = [
  { label: "1/4000s", value: 1 / 4000 },
  { label: "1/2000s", value: 1 / 2000 },
  { label: "1/1000s", value: 1 / 1000 },
  { label: "1/500s", value: 1 / 500 },
  { label: "1/250s", value: 1 / 250 },
  { label: "1/125s", value: 1 / 125 },
  { label: "1/60s", value: 1 / 60 },
  { label: "1/30s", value: 1 / 30 },
  { label: "1/15s", value: 1 / 15 },
  { label: "1/8s", value: 1 / 8 },
  { label: "1/4s", value: 1 / 4 },
  { label: "1/2s", value: 1 / 2 },
  { label: "1s", value: 1 },
  { label: "2s", value: 2 },
  { label: "5s", value: 5 },
  { label: "10s", value: 10 },
  { label: "30s", value: 30 },
];

const isoOptions: IsoOption[] = [
  { label: "ISO 50", value: 50 },
  { label: "ISO 100", value: 100 },
  { label: "ISO 200", value: 200 },
  { label: "ISO 400", value: 400 },
  { label: "ISO 800", value: 800 },
  { label: "ISO 1600", value: 1600 },
  { label: "ISO 3200", value: 3200 },
  { label: "ISO 6400", value: 6400 },
  { label: "ISO 12800", value: 12800 },
];

function getSceneLuminanceDescription(ev: number): { scene: string; icon: string; advice: string } {
  if (ev >= 16) {
    return {
      scene: "Blinding Snow / Sand in Full Sun",
      icon: "☀️",
      advice: "Extremely high light volume. Use fast shutter speed (1/2000s+) or stop down to avoid clipping highlights.",
    };
  }
  if (ev >= 14) {
    return {
      scene: "Bright Daylight / Clear Sunlight",
      icon: "🌤️",
      advice: "Classic Sunny 16 conditions. Base ISO 100 is ideal. Great for high shutter speed action or crisp landscapes.",
    };
  }
  if (ev >= 12) {
    return {
      scene: "Overcast Sky / Open Daylight Shade",
      icon: "⛅",
      advice: "Soft, even light. Excellent for flattering portraits without harsh squinting shadows.",
    };
  }
  if (ev >= 9) {
    return {
      scene: "Deep Shade / Heavy Storm Clouds / Sunset",
      icon: "🌥️",
      advice: "Light dropping quickly. Open aperture to f/2.8 or elevate ISO to 400–800 to maintain handheld stability.",
    };
  }
  if (ev >= 6) {
    return {
      scene: "Bright Commercial Interior / Office",
      icon: "🏢",
      advice: "Typical commercial fluorescent/LED lighting. Watch out for fluorescent shutter banding lines.",
    };
  }
  if (ev >= 3) {
    return {
      scene: "Cozy Domestic Living Room / Evening",
      icon: "🛋️",
      advice: "Dim domestic lamps. Requires wide aperture (f/1.8–f/2.8) and ISO 1600–3200 for handheld shooting.",
    };
  }
  if (ev >= 0) {
    return {
      scene: "Night Cityscape / Illuminated Streets",
      icon: "🌃",
      advice: "Use a tripod and base ISO 100 with long exposures (5s–15s) for pristine, noise-free results.",
    };
  }
  return {
    scene: "Deep Night / Astrophotography",
    icon: "🌌",
    advice: "Extreme low light. Tripod mandatory. Use wide open f/2.8 or f/1.8 with ISO 3200+ and 15s–25s exposures.",
  };
}

export default function CalculatorPage() {
  const [apertureIdx, setApertureIdx] = useState(3); // f/2.8
  const [shutterIdx, setShutterIdx] = useState(3); // 1/500s
  const [isoIdx, setIsoIdx] = useState(1); // ISO 100

  const selectedAperture = apertureOptions[apertureIdx];
  const selectedShutter = shutterOptions[shutterIdx];
  const selectedIso = isoOptions[isoIdx];

  // Deterministic EV100 calculation
  // EV100 = log2(N^2 / t) - log2(ISO / 100)
  const calculation = useMemo(() => {
    const N = selectedAperture.value;
    const t = selectedShutter.value;
    const iso = selectedIso.value;

    const rawEv = Math.log2((N * N) / t) - Math.log2(iso / 100);
    const evRounded = Math.round(rawEv * 10) / 10;
    const sceneInfo = getSceneLuminanceDescription(evRounded);

    // Calculate equivalent reciprocal exposures at this same EV at ISO 100
    // t = N^2 / 2^EV
    const calcReciprocal = (fNum: number): string => {
      const requiredTime = (fNum * fNum) / Math.pow(2, rawEv);
      if (requiredTime >= 1) {
        return `${Math.round(requiredTime * 10) / 10}s`;
      }
      const fraction = Math.round(1 / requiredTime);
      return `1/${fraction}s`;
    };

    return {
      ev: evRounded,
      sceneInfo,
      reciprocals: [
        { label: "Shallow Bokeh Focus (f/1.8)", aperture: "f/1.8", shutter: calcReciprocal(1.8) },
        { label: "Everyday Street (f/4.0)", aperture: "f/4.0", shutter: calcReciprocal(4.0) },
        { label: "Peak Lens Sharpness (f/8.0)", aperture: "f/8.0", shutter: calcReciprocal(8.0) },
        { label: "Deep Scenery (f/11)", aperture: "f/11", shutter: calcReciprocal(11.0) },
      ],
    };
  }, [selectedAperture, selectedShutter, selectedIso]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <PageHeader
        badge="Phase 3 • Optical Calculations"
        title="Exposure & EV Calculator"
        description="Compute standard Exposure Values (EV100), evaluate scene luminance, and discover equivalent reciprocal camera settings."
      />

      {/* Main Workspace */}
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Parameter Selectors */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                  EV
                </span>
                Camera Parameter Controls
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono text-emerald-400 border border-emerald-500/30">
                Live Math Engine
              </span>
            </div>

            <div className="mt-6 space-y-6">
              {/* 1. Aperture Selector */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="aperture-select" className="uppercase tracking-wider text-neutral-300 font-semibold">
                    Aperture (f-stop)
                  </label>
                  <span className="text-amber-400 font-bold">{selectedAperture.label}</span>
                </div>
                <div className="mt-2">
                  <select
                    id="aperture-select"
                    value={apertureIdx}
                    onChange={(e) => setApertureIdx(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 focus:outline-none"
                  >
                    {apertureOptions.map((opt, i) => (
                      <option key={opt.label} value={i}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Controls light volume and depth of field (lower f-stop = wider opening and blurrier background).
                </p>
              </div>

              {/* 2. Shutter Speed Selector */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="shutter-select" className="uppercase tracking-wider text-neutral-300 font-semibold">
                    Shutter Speed (duration)
                  </label>
                  <span className="text-sky-400 font-bold">{selectedShutter.label}</span>
                </div>
                <div className="mt-2">
                  <select
                    id="shutter-select"
                    value={shutterIdx}
                    onChange={(e) => setShutterIdx(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 focus:outline-none"
                  >
                    {shutterOptions.map((opt, i) => (
                      <option key={opt.label} value={i}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Controls exposure duration and motion blur (faster speeds freeze fast-moving action).
                </p>
              </div>

              {/* 3. ISO Sensitivity Selector */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="iso-select" className="uppercase tracking-wider text-neutral-300 font-semibold">
                    ISO Sensitivity (gain)
                  </label>
                  <span className="text-emerald-400 font-bold">{selectedIso.label}</span>
                </div>
                <div className="mt-2">
                  <select
                    id="iso-select"
                    value={isoIdx}
                    onChange={(e) => setIsoIdx(Number(e.target.value))}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 focus:outline-none"
                  >
                    {isoOptions.map((opt, i) => (
                      <option key={opt.label} value={i}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Controls sensor amplification (lower ISO delivers clean, grain-free images with highest dynamic range).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Computed Exposure Results */}
          <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                Calculated Exposure
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold font-mono text-neutral-100">
                  EV {calculation.ev}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  (EV100 Standard)
                </span>
              </div>
            </div>

            {/* Scene Luminance Match */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                <span className="text-xl">{calculation.sceneInfo.icon}</span>
                <span>{calculation.sceneInfo.scene}</span>
              </div>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                {calculation.sceneInfo.advice}
              </p>
            </div>

            {/* Reciprocal Equivalent Options */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-semibold">
                Equivalent Reciprocal Settings:
              </span>
              <p className="text-[11px] text-neutral-500 mb-3">
                All combinations below yield the identical exposure brightness at your chosen ISO:
              </p>
              <div className="space-y-2">
                {calculation.reciprocals.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/40 px-3.5 py-2 text-xs"
                  >
                    <span className="text-neutral-300 font-medium">{r.label}</span>
                    <span className="font-mono text-amber-400 font-semibold">{r.shutter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct AI Mentor Question */}
            <div className="border-t border-neutral-800 pt-4">
              <Link
                href={`/chat?prompt=${encodeURIComponent(`I am calculating exposure for a scene at EV ${calculation.ev} using ${selectedAperture.label}, ${selectedShutter.label}, and ${selectedIso.label}. What are the trade-offs of this setup?`)}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <span>Ask AI Mentor About EV {calculation.ev}</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
