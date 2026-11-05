import { TopicModule } from "@/types/photography";

export const exposureTriangleModule: TopicModule = {
  slug: "exposure-triangle",
  title: "The Exposure Triangle",
  subtitle: "System Equilibrium & Reciprocity",
  tagline: "Unify Aperture, Shutter Speed, and ISO into a balanced photographic equation of light and creative intent.",
  description:
    "The Exposure Triangle is the fundamental framework of photographic capture. Learn how Aperture, Shutter Speed, and ISO operate in reciprocity: changing one setting alters exposure, requiring creative compensation from the other two.",
  difficulty: "Beginner to Intermediate",
  estimatedMinutes: 10,
  iconName: "triangle",
  keyPrinciples: [
    "Exposure Value (EV) measures the total light density needed to create a balanced, neither-too-dark-nor-too-bright image.",
    "Aperture controls light volume and depth of field; Shutter Speed controls time duration and motion; ISO controls electrical gain and noise.",
    "Reciprocity means multiple different combinations of the three settings can produce the identical exposure brightness.",
    "Always identify your creative priority first: Do you care most about motion (shutter speed) or depth of field (aperture)?",
  ],
  contentSections: [
    {
      title: "1. The Triangle Analogy: Filling a Bucket of Water",
      content:
        "Imagine collecting rainwater to fill a bucket to its exact rim. If underfilled, your photo is dark (underexposed); if overflowing, your highlights are blown out and clipped (overexposed). Aperture is the diameter of your funnel (wide funnel lets in a torrent, narrow funnel drips slowly). Shutter Speed is how long you leave the funnel open under the rain. ISO is the magnifying booster you use if the bucket was only half-full.",
      highlightBox: {
        title: "The Law of Reciprocity",
        text: "If you cut light in half with your aperture (e.g. from f/2.8 to f/4, -1 stop), you must double the light elsewhere (e.g. slowing shutter speed from 1/500s to 1/250s, +1 stop) to keep exposure identical.",
        type: "info",
      },
    },
    {
      title: "2. The Three Levers & Their Unique Trade-offs",
      content:
        "Every setting you adjust introduces both an exposure change and an artistic side-effect: 1) Aperture: More light = shallower depth of field (blurry background); Less light = deeper depth of field (everything sharp). 2) Shutter Speed: More light = risk of motion blur or camera shake; Less light = frozen high-speed action. 3) ISO: More brightness = increased digital grain and reduced dynamic range; Less brightness = cleaner colors and shadow recovery.",
    },
    {
      title: "3. Underexposure, Overexposure, and the Histogram",
      content:
        "An underexposed photo lacks sufficient light; shadows turn into muddy, featureless black with crushed details that cannot be recovered. An overexposed photo receives too much light; skies and bright highlights turn into pure solid white ('blown highlights'), with permanently lost information. Reading your camera's histogram ensures your exposure graph is centered without clipping against the left wall (shadows) or right wall (highlights).",
    },
    {
      title: "4. Exposure Compensation (+/- EV) Demystified",
      content:
        "Your camera's built-in light meter assumes the world averages to 18% neutral gray. When you point your camera at a pristine snowbank or white wedding dress, the meter thinks the scene is too bright and automatically makes it look dark and dingy gray! Exposure Compensation allows you to dial in +1 or +2 EV to tell the camera 'this is bright snow, keep it bright white', or dial -1 EV when photographing a black tuxedo or night stage.",
      highlightBox: {
        title: "Crucial Educational Caveat",
        text: "Recommended camera settings are starting baselines, never rigid universal formulas. True exposure depends on ambient light levels, subject velocity, lens maximum aperture, and camera sensor format.",
        type: "warning",
      },
    },
  ],
  practicalExamples: [
    {
      title: "Action Sports Priority",
      setting: "Shutter Speed First",
      scenario: "Indoor gym volleyball game",
      explanation:
        "Lock shutter speed to 1/1000s to freeze the spike. Open aperture to f/2.8 for maximum light. Now raise ISO to whatever is needed (e.g. ISO 3200) to balance the exposure.",
      badge: "Motion Priority",
    },
    {
      title: "Portrait Bokeh Priority",
      setting: "Aperture First",
      scenario: "Outdoor portrait session in shaded park",
      explanation:
        "Set aperture to f/1.8 to dissolve the background. Keep ISO at 100 for clean skin tones. Let shutter speed float to whatever the meter requires (e.g. 1/400s).",
      badge: "Aperture Priority",
    },
    {
      title: "Landscape Clarity Priority",
      setting: "Depth of Field First",
      scenario: "Coastal sunset with rocky tidal pools",
      explanation:
        "Lock aperture to f/11 for front-to-back sharpness. Lock ISO to 100 on a tripod. The shutter speed will naturally fall to 1/4s or 1s, which also smooths the ocean foam.",
      badge: "Landscape Priority",
    },
  ],
  scenarios: [
    {
      scenario: "1. Portrait in Direct Daylight",
      iso: "ISO 100",
      aperture: "f/2.8",
      shutterSpeed: "1/2000s",
      whyItWorks: "Wide aperture isolates your subject with buttery background blur. 1/2000s prevents the intense midday sun from blowing out skin highlights at f/2.8.",
      adjustments: "If your camera shutter caps out at 1/4000s and the scene is still overexposed, stop down to f/4 or attach a Neutral Density (ND) filter to the lens.",
    },
    {
      scenario: "2. Vast Landscape Photography",
      iso: "ISO 100",
      aperture: "f/8.0 – f/11",
      shutterSpeed: "1/125s (Handheld) or 1s (Tripod)",
      whyItWorks: "f/8 to f/11 provides deep depth of field across the entire scene without diffraction softening. Base ISO 100 ensures maximum dynamic range for sky highlights.",
      adjustments: "If wind blows tree foliage at 1/15s, increase ISO to 400 to allow a faster shutter speed like 1/60s to freeze leaf flutter.",
    },
    {
      scenario: "3. Indoor Evening Social Gathering",
      iso: "ISO 1600 – 3200",
      aperture: "f/2.0 – f/2.8",
      shutterSpeed: "1/160s",
      whyItWorks: "1/160s freezes casual human gestures, laughing, and hand toasts. A wide aperture gathers dim indoor light, and elevated ISO amplifies the signal.",
      adjustments: "If subjects are sitting still, you can drop shutter speed to 1/100s and lower ISO to 1200 for a cleaner file.",
    },
    {
      scenario: "4. Outdoor Track & Sports Action",
      iso: "ISO 400 – 800",
      aperture: "f/4.0",
      shutterSpeed: "1/1000s – 1/2000s",
      whyItWorks: "1/1000s+ is mandatory to freeze sprinting runners and airborne dust. Moderate ISO compensates for the extremely brief shutter window.",
      adjustments: "If shooting into shaded stadium bleachers, bump ISO to 1600 or 3200 to keep the 1/1000s shutter speed active.",
    },
    {
      scenario: "5. Night Cityscape on a Tripod",
      iso: "ISO 100",
      aperture: "f/8.0",
      shutterSpeed: "15s – 25s",
      whyItWorks: "Base ISO 100 delivers pristine black skies with zero noise. f/8 keeps buildings sharp and renders street lamps into sharp starbursts. The long shutter collects ample light.",
      adjustments: "Always turn off in-body image stabilization (IBIS) when mounted on a tripod to prevent the gyro sensor from introducing micro-vibrations.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Treating recommended settings as rigid rules instead of starting points.",
      correction:
        "Light is constantly shifting. A cloud passing in front of the sun instantly robs your scene of 2 stops of light. Always test a shot, review your histogram, and adapt.",
    },
    {
      mistake: "Changing all three settings randomly at the same time when an image is dark.",
      correction:
        "Adjust methodically! Decide which creative variable matters most (motion vs. depth of field), set that first, and use the remaining settings to achieve proper exposure.",
    },
    {
      mistake: "Judging exposure accuracy solely on the camera's back LCD screen in bright sunlight.",
      correction:
        "Your eyes adjust to sunlight, making photos appear artificially dim or bright on screen. Always verify exposure using the camera's histogram or highlight zebra warnings.",
    },
  ],
  quizQuestions: [
    {
      id: "et-q1",
      question: "If you change your aperture from f/4 to f/2.8 (+1 stop of light), what must you do to your shutter speed to maintain identical exposure?",
      options: [
        "Double your exposure time (e.g. from 1/250s to 1/125s).",
        "Cut your exposure time in half (e.g. from 1/250s to 1/500s).",
        "Keep shutter speed unchanged and double your ISO.",
        "Change your focal length to 50mm.",
      ],
      correctIndex: 1,
      explanation:
        "Opening from f/4 to f/2.8 admits twice as much light (+1 stop). To balance the triangle (reciprocity), you must cut the shutter time in half (e.g. 1/250s to 1/500s) to keep total light constant.",
    },
    {
      id: "et-q2",
      question: "You are photographing a sunny beach portrait at f/1.8 and ISO 100. Your image is blown out white even at 1/4000s. What is the best solution?",
      options: [
        "Raise ISO to 800.",
        "Attach a Neutral Density (ND) filter or stop down the aperture to f/4 or f/5.6.",
        "Slow your shutter speed to 1/60s.",
        "Switch from RAW to JPEG.",
      ],
      correctIndex: 1,
      explanation:
        "When the scene is brighter than your camera's maximum shutter speed can balance at f/1.8, you must either restrict light optically with an ND filter or close the aperture.",
    },
    {
      id: "et-q3",
      question: "Why does an exposure histogram that bunches hard against the far left edge indicate a problem?",
      options: [
        "It means the photo has severe lens flare.",
        "It indicates underexposure where shadow details are completely crushed to pure black with irrecoverable data loss.",
        "It means the shutter speed was too fast for the lens.",
        "It indicates overexposure in the sky highlights.",
      ],
      correctIndex: 1,
      explanation:
        "The left side of a histogram represents 0% luminance (pure black). Graph data pushed against the left border means shadows are clipped with zero recorded texture.",
    },
  ],
  suggestedAiPrompts: [
    "How does the sunny 16 rule work as an exposure triangle baseline?",
    "What is the zone system and how can I expose for highlights to preserve dynamic range?",
    "Why does shooting in RAW give me 2 to 3 stops of latitude when recovering exposure in Lightroom?",
  ],
};
