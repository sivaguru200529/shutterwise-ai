import { TopicModule } from "@/types/photography";

export const apertureModule: TopicModule = {
  slug: "aperture",
  title: "Aperture & Depth of Field",
  subtitle: "Light Admission, Sharpness & Bokeh",
  tagline: "Master the optical iris inside your lens, isolate subjects with cinematic blur, and command front-to-back sharpness.",
  description:
    "Aperture is the mechanical opening in your lens that controls both the volume of light entering the camera and the depth of field in focus. Learn why small f-numbers mean big openings and how to choose the right f-stop for every genre.",
  difficulty: "Beginner",
  estimatedMinutes: 9,
  iconName: "aperture",
  keyPrinciples: [
    "Aperture is expressed as an f-number (f-stop), representing the ratio of lens focal length to entrance pupil diameter.",
    "Smaller f-numbers (e.g. f/1.8) mean a wider physical opening, admitting more light and producing shallow depth of field (blurry background).",
    "Larger f-numbers (e.g. f/11) mean a smaller physical opening, admitting less light and keeping foreground and background in focus.",
    "Extreme narrow apertures (f/16, f/22) induce optical diffraction, which softens overall image resolution.",
  ],
  contentSections: [
    {
      title: "1. What is Aperture & The Entrance Pupil?",
      content:
        "Inside every photographic lens is an iris diaphragm made of overlapping curved blades. When you turn your camera dial, these blades expand or contract to control the physical diameter of the opening through which light rays pass on their journey to the sensor. Think of it exactly like the pupil of the human eye: in darkness, your pupil dilates to admit maximum light; in glaring midday sun, it constricts to a tiny pinpoint.",
      highlightBox: {
        title: "Optical Concept",
        text: "Aperture is one of only two controls (along with Shutter Speed) that physically dictates how many optical photons strike the sensor surface.",
        type: "info",
      },
    },
    {
      title: "2. Why Smaller f-Numbers Mean Wider Openings",
      content:
        "Beginners are frequently confused by the counter-intuitive inverse scale: why is f/1.8 huge while f/16 is tiny? The letter 'f' in f-stop stands for 'focal length', and the slash is a mathematical division fraction! An aperture of f/2 on a 50mm lens means the effective entrance diameter is 50mm ÷ 2 = 25mm. An aperture of f/16 on that same lens is 50mm ÷ 16 = 3.125mm. Just like 1/2 of a pizza is much larger than 1/16 of a pizza, f/2 is an exponentially larger opening than f/16!",
      highlightBox: {
        title: "Focal Fraction Rule",
        text: "f/Stop = Focal Length ÷ Entrance Pupil Diameter. Because it is a denominator, a smaller number produces a larger opening.",
        type: "tip",
      },
    },
    {
      title: "3. Understanding Depth of Field (DoF) & Bokeh",
      content:
        "Depth of field refers to the zone of acceptable sharpness in front of and behind your exact point of focus. Wide apertures (f/1.4, f/1.8, f/2.8) produce a 'shallow' depth of field: your subject's eyes are tack-sharp, while the background melts away into smooth, out-of-focus blur known as 'bokeh'. Narrow apertures (f/8, f/11) increase depth of field, keeping both foreground foliage and distant mountains crisp.",
    },
    {
      title: "4. Aperture in Portraits vs. Landscapes",
      content:
        "In portraiture, subject isolation is paramount. Shooting at f/1.8 or f/2.8 eliminates distracting background clutter (park benches, passing cars) and draws the viewer's gaze directly into the subject's face. In landscape photography, you want the viewer to feel the vastness of the environment. Shooting at f/8 or f/11 ensures foreground rocks, middle-ground lakes, and distant mountain peaks all retain critical sharpness.",
      highlightBox: {
        title: "Diffraction Warning",
        text: "Avoid stopping down to f/22 just to get maximum sharpness. At very narrow apertures, light waves bend around the blade edges (diffraction), causing the entire image to appear slightly soft.",
        type: "warning",
      },
    },
  ],
  practicalExamples: [
    {
      title: "f/1.4 – f/1.8",
      setting: "Ultra-Wide Opening",
      scenario: "Dreamy portrait, close-up details, or dim night street scene",
      explanation:
        "Extremely shallow depth of field. Razor-thin focus plane where the eyelashes may be sharp while the ears are already softly blurred. Admits maximum light in dim scenes.",
      badge: "Cinematic Bokeh",
    },
    {
      title: "f/2.8 – f/4",
      setting: "Moderate Wide Opening",
      scenario: "Environmental portraits, food photography, sports",
      explanation:
        "Provides sufficient background separation while keeping the subject's entire face and hair in sharp focus. Common maximum aperture on professional zoom lenses.",
      badge: "Versatile Pro",
    },
    {
      title: "f/5.6 – f/8",
      setting: "Lens Sweet Spot",
      scenario: "Street scenes, group portraits, architectural exteriors",
      explanation:
        "Almost all camera lenses achieve their absolute peak optical resolution and contrast between f/5.6 and f/8. Deep depth of field with edge-to-edge sharpness.",
      badge: "Peak Sharpness",
    },
    {
      title: "f/11 – f/16",
      setting: "Deep Focus Opening",
      scenario: "Vast landscapes, cityscapes, sunstar effects",
      explanation:
        "Maximum practical depth of field without devastating diffraction blur. Narrow aperture creates distinct starburst spikes around point light sources like the sun or street lamps.",
      badge: "Deep Horizon",
    },
  ],
  scenarios: [
    {
      scenario: "Individual Studio Portrait",
      iso: "ISO 100",
      aperture: "f/2.0",
      shutterSpeed: "1/250s",
      whyItWorks: "f/2.0 melts the backdrop while keeping both eyes crisp. Low ISO preserves true skin tones.",
      adjustments: "If photographing two people standing together, stop down to f/4 so both individuals remain in the focus plane.",
    },
    {
      scenario: "Mountain Vista Landscape",
      iso: "ISO 100",
      aperture: "f/8.0",
      shutterSpeed: "1/125s",
      whyItWorks: "f/8 strikes the ideal balance between deep depth of field and peak lens MTF optical sharpness.",
      adjustments: "If foreground wildflowers are very close to your lens (under 1 meter), step down to f/11 or use focus stacking.",
    },
    {
      scenario: "Product Flat Lay on Tabletop",
      iso: "ISO 200",
      aperture: "f/5.6",
      shutterSpeed: "1/60s",
      whyItWorks: "Ensures the entire item from top labels to bottom edge is tack sharp without blurring the edges.",
      adjustments: "Use a tripod to prevent camera shake if shutter speed drops below 1/60s.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Shooting group photos of 4+ people at f/1.8.",
      correction:
        "At f/1.8, the depth of field is only a few centimeters deep. People standing slightly behind or in front of the center person will be out of focus. Use f/4 or f/5.6 for group shots.",
    },
    {
      mistake: "Stopping down to f/22 on landscapes thinking it gives the 'sharpest possible' image.",
      correction:
        "Diffraction physically softens optical rays when passing through tiny apertures like f/22. For landscapes, f/8 or f/11 is noticeably sharper across the entire sensor.",
    },
    {
      mistake: "Blaming camera autofocus when the issue is actually a depth-of-field that is too shallow.",
      correction:
        "If you focus on a nose at f/1.4, the eyes will be blurred. Either step back (which increases depth of field) or stop down to f/2.8.",
    },
  ],
  quizQuestions: [
    {
      id: "ap-q1",
      question: "Which of the following aperture values admits the LARGEST amount of physical light?",
      options: ["f/16", "f/8", "f/2.8", "f/1.4"],
      correctIndex: 3,
      explanation:
        "Because f-stop is a fraction (focal length ÷ aperture diameter), smaller f-numbers represent physically wider entrance pupils. f/1.4 admits 16 times more light than f/5.6 and 128 times more light than f/16!",
    },
    {
      id: "ap-q2",
      question: "What effect does changing your aperture from f/8 to f/2.0 have on your photograph?",
      options: [
        "It darkens the image and increases background sharpness.",
        "It brightens the image and creates a much shallower depth of field (blurrier background).",
        "It stops motion blur and makes clouds freeze.",
        "It increases digital sensor noise.",
      ],
      correctIndex: 1,
      explanation:
        "Opening to f/2.0 admits significantly more light (brightening the exposure) while narrowing the focus plane to produce pleasing background blur (bokeh).",
    },
    {
      id: "ap-q3",
      question: "Why do professional landscape photographers rarely use f/22?",
      options: [
        "Because f/22 causes optical diffraction, which softens fine details across the frame.",
        "Because f/22 cannot focus on distant clouds.",
        "Because cameras cannot shoot at ISO 100 at f/22.",
        "Because f/22 only works with zoom lenses.",
      ],
      correctIndex: 0,
      explanation:
        "When light passes through a pinhole-sized aperture like f/22, the light waves bend and interfere with each other (diffraction), reducing overall contrast and micro-detail.",
    },
  ],
  suggestedAiPrompts: [
    "What is the hyperfocal distance and how does it help landscape photography at f/8?",
    "Why does sensor size (Full Frame vs APS-C vs Micro Four Thirds) change apparent depth of field at f/2.8?",
    "How do circular aperture blades affect the quality and shape of background bokeh balls?",
  ],
};
