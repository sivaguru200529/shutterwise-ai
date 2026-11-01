import { PageHeader } from "@/components/ui/PageHeader";
import { LearningCard } from "@/components/ui/LearningCard";

export default function LearnPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <PageHeader
        badge="Photography Fundamentals"
        title="Learning Modules"
        description="Master the optical mechanics of exposure, sensor sensitivity, shutter duration, and the physical qualities of natural light."
        statusNotice={{
          label: "Phase 1 Curriculum Foundation",
          message:
            "Foundational guides and optical concepts are outlined below. In-depth interactive lessons and quizzes are planned for Phase 3 and Phase 6. No fake lesson simulations are rendered.",
          type: "neutral",
        }}
      />

      {/* Learning Cards Grid */}
      <section className="py-12 sm:py-16 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. ISO */}
            <LearningCard
              title="ISO Sensitivity"
              subtitle="Sensor Amplification"
              description="ISO measures the electrical gain or sensitivity applied to your camera sensor's signal. Lower values yield pristine images, while higher values amplify weak signals in dim light at the cost of digital grain (noise)."
              opticalConcept="Higher ISO amplifies both the optical light signal and background sensor noise. It does not physically capture more photons."
              status="Core Pillar"
              metrics={[
                { label: "Standard Range", value: "ISO 100 – 6400+" },
                { label: "Core Trade-off", value: "Signal Gain vs Noise" },
                { label: "Daylight Base", value: "ISO 100 / 200" },
                { label: "Night Baseline", value: "ISO 1600 – 3200" },
              ]}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              }
            />

            {/* 2. Aperture */}
            <LearningCard
              title="Aperture (f-stop)"
              subtitle="Lens Light Admission"
              description="The circular iris inside your lens that opens and closes to modulate light volume. Expressed in f-numbers: smaller numbers (f/1.8) mean a wider opening, admitting more light and blurring the background (shallow depth of field)."
              opticalConcept="f-stop is the focal length divided by entrance pupil diameter. Each 1-stop decrease (e.g. f/4 to f/2.8) doubles light admission."
              status="Core Pillar"
              metrics={[
                { label: "Standard Scale", value: "f/1.4 to f/22" },
                { label: "Core Trade-off", value: "Light Volume vs DoF" },
                { label: "Shallow Focus", value: "f/1.4 – f/2.8" },
                { label: "Deep Scenery", value: "f/8 – f/11" },
              ]}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M14.31 8 20.05 17.94" />
                  <path d="M9.69 8h11.48" />
                  <path d="M7.38 12l5.74-9.94" />
                  <path d="M9.69 16 3.95 6.06" />
                  <path d="M14.31 16H2.83" />
                  <path d="M16.62 12l-5.74 9.94" />
                </svg>
              }
            />

            {/* 3. Shutter Speed */}
            <LearningCard
              title="Shutter Speed"
              subtitle="Temporal Duration"
              description="The length of time the physical shutter curtain or electronic sensor remains open to record light. Fast speeds freeze rapid movement; slow speeds accumulate light and record creative motion blur."
              opticalConcept="Exposure time t is inversely proportional to EV. Slower speeds risk camera shake unless stabilized by a tripod or optical IBIS."
              status="Core Pillar"
              metrics={[
                { label: "Common Range", value: "1/4000s to 30s" },
                { label: "Core Trade-off", value: "Motion Freeze vs Blur" },
                { label: "Handheld Rule", value: "1 / Focal Length" },
                { label: "Action Freeze", value: "1/1000s or faster" },
              ]}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />

            {/* 4. Exposure Triangle */}
            <LearningCard
              title="Exposure Triangle"
              subtitle="System Equilibrium"
              description="The optical harmony connecting ISO, Aperture, and Shutter Speed. Because exposure value is constant for a given scene luminance, altering one setting requires offsetting another to prevent under or overexposure."
              opticalConcept="Reciprocity: admitting light through a wider aperture for half the duration delivers identical photon volume to the sensor."
              status="Foundational System"
              metrics={[
                { label: "Relationship", value: "Three-way Balance" },
                { label: "Light Metric", value: "Exposure Value (EV)" },
                { label: "Reciprocity", value: "f/2.8 @ 1/500s = f/4 @ 1/250s" },
                { label: "Goal", value: "Intentional Creative Control" },
              ]}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 21h20L12 3z" />
                </svg>
              }
            />

            {/* 5. Lighting Basics */}
            <LearningCard
              title="Lighting Basics"
              subtitle="Quality & Direction"
              description="Photography is literally 'drawing with light.' Understanding hard light (harsh shadows, high contrast) vs soft diffused light (gradual tones, cloudy sky) and directional angles transforms every composition."
              opticalConcept="The apparent size of the light source relative to the subject determines shadow edge sharpness. Larger source = softer shadows."
              status="Phase 5 Module"
              isComingSoon={true}
              metrics={[
                { label: "Key Dimensions", value: "Quality, Angle, Color" },
                { label: "Soft Light", value: "Overcast / Big Softbox" },
                { label: "Hard Light", value: "Midday Direct Sun" },
                { label: "Golden Hour", value: "Low Sun, Warm Kelvin" },
              ]}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                </svg>
              }
            />
          </div>

          {/* Educational Note */}
          <div className="mt-16 rounded-2xl border border-neutral-800 bg-[#161619] p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
              <span className="text-amber-500">❖</span>
              The Three-Step Learning Pathway
            </h3>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              In Phase 3 of ShutterWise AI, these topics will expand into deep-dive interactive lessons equipped with reciprocal exposure visualizers, live depth-of-field simulators, and real-time knowledge check quizzes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

