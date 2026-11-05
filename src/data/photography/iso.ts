import { TopicModule } from "@/types/photography";

export const isoModule: TopicModule = {
  slug: "iso",
  title: "ISO Sensitivity",
  subtitle: "Sensor Amplification & Signal Clarity",
  tagline: "Understand electronic sensor gain, maintain clean detail, and conquer low light without excessive noise.",
  description:
    "ISO is the third pillar of the exposure triangle. Learn how sensor sensitivity works, why higher ISO does not capture more physical photons, and how to balance brightness against digital grain.",
  difficulty: "Beginner",
  estimatedMinutes: 8,
  iconName: "iso",
  keyPrinciples: [
    "ISO represents the electrical amplification applied to the digital camera sensor's readout signal.",
    "Base ISO (usually 100 or 6400 on dual-gain sensors) delivers maximum dynamic range and lowest noise.",
    "Higher ISO allows faster shutter speeds in dark environments, but introduces luminance and chrominance noise.",
    "Always set your Aperture and Shutter Speed based on optical needs first before elevating ISO.",
  ],
  contentSections: [
    {
      title: "1. What is ISO in Digital Photography?",
      content:
        "Historically in film cameras, ISO (or ASA) measured the chemical sensitivity of film emulsion to light. In digital photography, your camera's physical sensor has a fixed physical sensitivity to incoming photons. When you raise the ISO setting on your camera dial, you are not making the sensor 'catch more light'; you are applying an electronic gain (analog and digital amplification) to the voltage output of each pixel sensor before recording the raw file.",
      highlightBox: {
        title: "Optical Truth",
        text: "Only Aperture and Shutter Speed physically control how much optical light hits your sensor. ISO simply amplifies the signal you already collected.",
        type: "info",
      },
    },
    {
      title: "2. The Relationship Between ISO and Digital Noise",
      content:
        "Every digital circuit has a baseline floor of random thermal and electrical fluctuations, known as the 'noise floor'. In bright daylight, the volume of incoming photons (signal) vastly overpowers the background noise—this is high Signal-to-Noise Ratio (SNR). When shooting in dim light with few photons, cranking up the ISO amplifies the tiny light signal, but simultaneously amplifies the background electrical noise. This manifests as speckled grain (luminance noise) and colored blotches (chrominance noise).",
      highlightBox: {
        title: "Trade-off Summary",
        text: "Higher ISO = Brighter image in dark environments, but reduced dynamic range, lower color fidelity, and visible grain.",
        type: "warning",
      },
    },
    {
      title: "3. What is Base ISO?",
      content:
        "Base ISO is the lowest native ISO setting available on your camera sensor (typically ISO 100 on Canon/Sony/Nikon or ISO 64/160 on select models) that requires no electronic attenuation. Shooting at your camera's base ISO delivers the cleanest possible signal, maximum dynamic range (the ability to preserve both dark shadows and bright highlights), and truest color saturation.",
    },
    {
      title: "4. When to Increase vs. When to Keep ISO Low",
      content:
        "The golden rule of ISO is: Keep it as low as possible, but as high as necessary. Keep ISO at 100 or 200 whenever you have abundant natural sunlight or when your camera is locked on a sturdy tripod shooting static subjects. Increase your ISO when hand-holding your camera in low light and your shutter speed risks dipping below the blur threshold, or when capturing fast-moving sports indoors where freezing movement requires 1/500s or faster.",
    },
  ],
  practicalExamples: [
    {
      title: "Bright Sunny Afternoon",
      setting: "ISO 100",
      scenario: "Outdoor portrait or landscape under direct sun",
      explanation:
        "Abundant photons exist. Keeping ISO at 100 preserves delicate sky highlights and gives pristine, grain-free skin textures.",
      badge: "Cleanest Signal",
    },
    {
      title: "Overcast / Deep Shade",
      setting: "ISO 400 – 800",
      scenario: "Forest trail or cloudy afternoon street photography",
      explanation:
        "Diffused clouds reduce illumination by 2 to 3 stops. A modest ISO bump lets you maintain a safe handheld shutter speed of 1/250s.",
      badge: "Balanced",
    },
    {
      title: "Indoor Living Room at Night",
      setting: "ISO 1600 – 3200",
      scenario: "Family gathering under ordinary domestic incandescent lamps",
      explanation:
        "Domestic light bulbs are hundreds of times dimmer than daylight. ISO 1600–3200 provides enough signal amplification to shoot at 1/125s without motion blur.",
      badge: "Elevated Gain",
    },
    {
      title: "Night Sky / Astrophotography",
      setting: "ISO 3200 – 6400",
      scenario: "Milky Way core on a moonless night with an f/2.8 lens",
      explanation:
        "Extreme low-light requires strong signal amplification during a 15–20 second exposure to capture faint celestial detail.",
      badge: "Extreme Low Light",
    },
  ],
  scenarios: [
    {
      scenario: "Bright Beach / Snow Landscape",
      iso: "ISO 100",
      aperture: "f/8",
      shutterSpeed: "1/500s",
      whyItWorks: "Maximum photon density. Base ISO maximizes dynamic range across bright sand and reflective water.",
      adjustments: "If clouds roll in, elevate to ISO 200 or open aperture to f/5.6.",
    },
    {
      scenario: "Indoor High School Basketball",
      iso: "ISO 3200 – 6400",
      aperture: "f/2.8",
      shutterSpeed: "1/1000s",
      whyItWorks: "High shutter speed is mandatory to freeze players in motion under dim gymnasium lights.",
      adjustments: "Noise reduction in post-processing is preferable to motion-blurred players.",
    },
    {
      scenario: "Sunset Golden Hour Portrait",
      iso: "ISO 200 – 400",
      aperture: "f/1.8",
      shutterSpeed: "1/400s",
      whyItWorks: "Wide aperture admits generous light; low ISO retains rich golden warmth without speckles.",
      adjustments: "As the sun dips below horizon, steadily increase ISO to 800 to maintain 1/250s.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Using ISO 100 on a moving subject in dim light because you fear noise.",
      correction:
        "A noisy photo can be salvaged with modern noise-reduction software, but a photo ruined by motion blur can never be fixed. Prioritize freezing the motion with proper shutter speed first, then set ISO to match.",
    },
    {
      mistake: "Leaving ISO locked on a high setting (e.g. ISO 3200) when walking into bright sunlight.",
      correction:
        "Your images will be severely overexposed, blown out, and clipped. Make it a habit to reset your camera back to base ISO 100 whenever you finish a shoot.",
    },
    {
      mistake: "Using extended 'Low ISO' (like ISO 50) without realizing it cuts highlight dynamic range.",
      correction:
        "Extended low ISO is accomplished via digital pull processing, which actually clips bright sky highlights faster than native base ISO 100.",
    },
  ],
  quizQuestions: [
    {
      id: "iso-q1",
      question: "What actually happens inside your camera sensor when you increase the ISO setting?",
      options: [
        "The physical sensor expands to capture more light photons.",
        "The camera electronically amplifies the sensor's electrical readout signal.",
        "The lens iris opens wider to let in more sunlight.",
        "The sensor shutter speed decreases automatically.",
      ],
      correctIndex: 1,
      explanation:
        "In digital cameras, the sensor's physical sensitivity is fixed. Increasing ISO applies electronic gain (amplification) to the signal generated by incoming photons.",
    },
    {
      id: "iso-q2",
      question: "Why should you generally use Base ISO (usually ISO 100) on a bright sunny day?",
      options: [
        "Because ISO 100 makes the camera autofocus faster.",
        "Because Base ISO delivers the highest dynamic range, richest color, and least digital noise.",
        "Because high ISO only works indoors.",
        "Because lenses cannot focus at ISO 400.",
      ],
      correctIndex: 1,
      explanation:
        "Base ISO provides the highest signal-to-noise ratio, yielding maximum dynamic range and clean, noise-free images.",
    },
    {
      id: "iso-q3",
      question: "You are photographing a speaker on stage in a dim auditorium. Your shutter speed is 1/60s and shots are blurry due to hand movement. What should you do?",
      options: [
        "Lower your ISO to 100 to reduce noise.",
        "Increase shutter speed to 1/200s and raise ISO to 1600 or 3200 to compensate for the lost exposure.",
        "Switch to manual focus and keep settings unchanged.",
        "Close your aperture to f/16.",
      ],
      correctIndex: 1,
      explanation:
        "Sharpness comes first! Faster shutter speed (1/200s) eliminates camera shake, while raising ISO brightens the image to compensate for the shorter light collection time.",
    },
  ],
  suggestedAiPrompts: [
    "What is Auto ISO with minimum shutter speed, and why do professionals use it?",
    "How does dual-native ISO work on modern mirrorless cameras?",
    "Why does high ISO cause banding and reduced dynamic range in shadow recovery?",
  ],
};
