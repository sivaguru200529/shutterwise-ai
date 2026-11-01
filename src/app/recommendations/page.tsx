import { PageHeader } from "@/components/ui/PageHeader";

interface ScenarioCardData {
  title: string;
  category: string;
  description: string;
  keyChallenge: string;
  baselineConcept: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const scenarios: ScenarioCardData[] = [
  {
    title: "Portrait Photography",
    category: "Subject Isolation & Depth",
    description: "Capturing individuals or groups with flattering natural skin tones, soft background blur (bokeh), and precise eye autofocus.",
    keyChallenge: "Balancing shallow depth of field against ensuring both eyes remain razor-sharp.",
    baselineConcept: "Wide aperture (f/1.8 – f/2.8) to isolate subject; shutter speed at least 1/200s to avoid minor subject movement.",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Landscape Photography",
    category: "Vast Horizons & Texture",
    description: "Capturing expansive vistas, dramatic skies, mountain ridges, and coastlines with front-to-back optical clarity.",
    keyChallenge: "Achieving deep depth of field across the entire frame without diffraction softness.",
    baselineConcept: "Mid-aperture (f/8 – f/11) for optimal lens sharpness; lowest native ISO (100) on a sturdy tripod.",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "Street Photography",
    category: "Decisive Moments & Documentary",
    description: "Navigating unpredictable public spaces, reacting swiftly to human interactions, geometries, and fleeting natural light.",
    keyChallenge: "Reacting instantly to fleeting moments before subjects move or realize they are being framed.",
    baselineConcept: "Zone focusing or Aperture Priority at f/5.6 or f/8; shutter speed locked to 1/250s+; Auto ISO with upper ceiling.",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
  },
  {
    title: "Night & Astrophotography",
    category: "Low-Light & Celestial",
    description: "Revealing nocturnal cityscapes, illuminated architecture, starry skies, or the Milky Way core in near-total darkness.",
    keyChallenge: "Gathering enough photon volume without inducing motion trails from the Earth's rotation.",
    baselineConcept: "Wide open aperture (f/1.8 – f/2.8); manual infinity focus; shutter speed calculated via the 500 Rule on a tripod.",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    title: "Sports & High-Speed Action",
    category: "Motion Freeze & Velocity",
    description: "Capturing athletes, sprinting wildlife, fast vehicles, or active children with crisp focus and frozen motion.",
    keyChallenge: "Freezing erratic subject velocity while working within available light limitations.",
    baselineConcept: "Fast shutter speeds (1/1000s to 1/2000s+); continuous burst mode (CH); continuous predictive autofocus (AF-C).",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Indoor & Low-Light Events",
    category: "Ambient Lighting & Mixed Kelvin",
    description: "Working inside dimly lit rooms, auditoriums, weddings, or dining spaces with mixed color temperatures.",
    keyChallenge: "Preventing camera shake and subject blur when indoor light levels are 100x dimmer than daylight.",
    baselineConcept: "Fast prime lenses (f/1.8); elevated ISO (1600 – 3200); minimum shutter speed around 1/125s for human stillness.",
    icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
];

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <PageHeader
        badge="Scenario Presets & Guidelines"
        title="Camera Settings Guide"
        description="Starting baselines and optical strategies for six common photography genres."
        statusNotice={{
          label: "Crucial Educational Caveat",
          message:
            "Recommended settings are starting baselines, never rigid universal formulas. Real-world exposures depend strictly on ambient light levels, subject velocity, lens maximum aperture, and camera sensor format. Dynamic recommendation engine planned for Phase 3.",
          type: "warning",
        }}
      />

      {/* Scenarios Grid */}
      <section className="py-12 sm:py-16 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <article
                  key={index}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 shadow-sm transition-all duration-200 hover:border-neutral-700 hover:bg-[#1a1a1f]"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-mono font-medium text-amber-400/90 border border-neutral-700">
                        Coming Soon (Phase 3)
                      </span>
                    </div>

                    {/* Title & Category */}
                    <div className="mt-5">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                        {scenario.category}
                      </span>
                      <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-100">
                        {scenario.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                        {scenario.description}
                      </p>
                    </div>

                    {/* Key Photographic Challenge */}
                    <div className="mt-5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Primary Challenge:
                      </span>
                      <p className="mt-1 text-xs text-neutral-300">
                        {scenario.keyChallenge}
                      </p>
                    </div>

                    {/* Baseline Optical Strategy */}
                    <div className="mt-3 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                        Baseline Strategy:
                      </span>
                      <p className="mt-1 text-xs text-neutral-200 font-medium">
                        {scenario.baselineConcept}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 border-t border-neutral-800/80 pt-4 flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-mono text-[11px]">Engine: Phase 3</span>
                    <span className="text-neutral-400">No fabricated values</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Educational Principles Footer Card */}
          <div className="mt-16 rounded-2xl border border-neutral-800 bg-[#161619] p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
              <span className="text-amber-500">✦</span>
              Why Universal Settings Don&apos;t Exist in Photography
            </h3>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Every photograph is taken under unique conditions. A portrait shot outdoors at 1:00 PM requires drastically different settings than the same portrait shot at sunset or inside a coffee shop.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                <span className="font-semibold text-neutral-200 block mb-1">1. Ambient Luminance</span>
                Direct sunlight delivers ~10,000 foot-candles of light, while typical indoor lighting delivers only 10 to 50 foot-candles.
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">
                <span className="font-semibold text-neutral-200 block mb-1">2. Focal Length & Motion</span>
                A 200mm telephoto lens requires at least 1/250s handheld to prevent shake, whereas a 24mm wide angle can be held steady at 1/30s.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
