import { TopicModule } from "@/types/photography";

export const shutterSpeedModule: TopicModule = {
  slug: "shutter-speed",
  title: "Shutter Speed & Motion",
  subtitle: "Temporal Duration & Kinetic Control",
  tagline: "Control time itself: freeze lightning-fast athletic motion or turn roaring waterfalls into ethereal silk.",
  description:
    "Shutter speed is the length of time your camera's physical curtain or electronic sensor collects incoming light. Learn how temporal duration controls light volume, prevents camera shake, and gives you creative command over motion.",
  difficulty: "Beginner",
  estimatedMinutes: 9,
  iconName: "shutter",
  keyPrinciples: [
    "Shutter speed controls how long the sensor is exposed to light (fractions of a second to multiple minutes).",
    "Fast shutter speeds (1/1000s+) freeze rapid action; slow speeds (1/30s or slower) accumulate light and motion trails.",
    "The Reciprocal Rule states handheld shutter speed should be at least 1 / (Focal Length) to prevent camera shake blur.",
    "Camera shake (whole image blurry) is different from subject motion blur (background sharp, only moving person blurred).",
  ],
  contentSections: [
    {
      title: "1. What is Shutter Speed?",
      content:
        "Inside your camera, positioned directly in front of the image sensor, sits a mechanical shutter curtain mechanism (or electronic shutter timing circuit). When you press the shutter release button, the curtain travels open, exposing the sensor to light for a precisely calibrated duration before closing. This duration is measured in fractions of a second (e.g. 1/1000s, 1/250s) or whole seconds (e.g. 2s, 15s, 30s).",
      highlightBox: {
        title: "The Time Factor",
        text: "Doubling exposure time (e.g. from 1/500s to 1/250s) exactly doubles the volume of physical photons gathered by your camera sensor (+1 EV).",
        type: "info",
      },
    },
    {
      title: "2. Freezing Action vs. Creative Motion Blur",
      content:
        "Every moving subject travels a measurable physical distance across your sensor during exposure. At 1/2000s, a hummingbird's wing or a basketball player jumping towards the rim moves an imperceptible fraction of a millimeter, freezing the subject in crystal-clear suspension. Conversely, at 1/2s, ocean waves or a roaring waterfall wash continuously across the sensor, smoothing water into misty, glass-like textures.",
    },
    {
      title: "3. Camera Shake vs. Subject Motion Blur",
      content:
        "Beginners often confuse two entirely different types of blur: 1) Camera Shake occurs when involuntary hand tremors move the camera itself while the shutter is open. This ruins the entire photograph—even solid brick walls and street signs will be blurry. 2) Subject Motion Blur occurs when the camera is held steady, but the subject moves faster than the shutter duration. In subject blur, the background remains razor-sharp while only the runner or passing car shows a motion streak.",
      highlightBox: {
        title: "Diagnostic Tip",
        text: "Inspect static background objects in your photo. If the background is sharp but the person is blurred, your shutter was too slow for the subject. If the background is also smeared, camera shake caused the failure.",
        type: "tip",
      },
    },
    {
      title: "4. The Reciprocal Focal Length Rule",
      content:
        "How slow can you hold your camera handheld without causing camera shake? Use the optical Reciprocal Rule: your minimum handheld shutter speed should equal 1 divided by your lens focal length (adjusted for crop factor). On a 50mm lens on a full-frame camera, never shoot slower than 1/50s handheld (safely 1/80s or 1/125s). On a long 200mm telephoto lens, any slight hand tremor is magnified 4x, requiring at least 1/200s or 1/250s to guarantee crisp sharpness.",
      highlightBox: {
        title: "Modern Stabilization (IBIS/OIS)",
        text: "Optical in-lens stabilization (OIS) or in-body sensor stabilization (IBIS) can provide 3 to 5 stops of shake compensation for static scenes, but stabilization NEVER stops a moving subject from blurring!",
        type: "warning",
      },
    },
  ],
  practicalExamples: [
    {
      title: "1/1000s – 1/4000s",
      setting: "Ultra-Fast Shutter",
      scenario: "Sports, birds in flight, splashing water droplets",
      explanation:
        "Freezes fast-moving human movement, athlete sprints, and wingbeats. Requires bright daylight or a wide aperture (f/2.8) and high ISO to compensate for the brief light window.",
      badge: "High Velocity",
    },
    {
      title: "1/500s",
      setting: "Action Baseline",
      scenario: "Active pets, running children, passing cyclists",
      explanation:
        "The gold standard starting point for children playing, candid street action, and casual sports. Eliminates subject blur for normal running speeds.",
      badge: "Dynamic Action",
    },
    {
      title: "1/250s",
      setting: "General Portrait & Walkaround",
      scenario: "Street photography, walking subjects, studio portraits",
      explanation:
        "Completely eliminates handheld camera shake on standard prime lenses and cleanly captures natural human head turns and gestures.",
      badge: "Everyday Standard",
    },
    {
      title: "1/125s",
      setting: "Stationary Human Baseline",
      scenario: "Posed portrait, seated subject, indoor conversation",
      explanation:
        "The slowest recommended shutter speed for human subjects. Any slower and subtle chest breathing or blinking will cause soft focus.",
      badge: "Posed Subjects",
    },
    {
      title: "1/60s – 1/30s",
      setting: "Handheld Limit Threshold",
      scenario: "Static architecture, still life, slow panning shots",
      explanation:
        "The danger zone for handheld shooting without optical stabilization. Requires steady breathing, elbows tucked against ribs, and a calm stance.",
      badge: "Handheld Limit",
    },
    {
      title: "1s – 30s+",
      setting: "Long Exposure Landscape & Night",
      scenario: "Silky waterfalls, coastal surf, starry night skies, car light trails",
      explanation:
        "A sturdy tripod is 100% mandatory! The shutter stays open for seconds, turning car headlights into ribbons of light and waves into fog.",
      badge: "Tripod Mandatory",
    },
  ],
  scenarios: [
    {
      scenario: "Kids Playing Soccer Outdoors",
      iso: "ISO 400",
      aperture: "f/4.0",
      shutterSpeed: "1/1000s",
      whyItWorks: "1/1000s freezes fast kicks, ball flight, and unpredictable motion. Moderate ISO ensures proper brightness under afternoon skies.",
      adjustments: "If clouds roll in and images turn dark, raise ISO to 800 or 1600 rather than lowering the shutter speed.",
    },
    {
      scenario: "Silky Waterfall in Shaded Forest",
      iso: "ISO 100",
      aperture: "f/11",
      shutterSpeed: "1.5s",
      whyItWorks: "1.5 seconds creates silky, smooth water ribbons. f/11 restricts light and provides edge-to-edge sharpness on rocks.",
      adjustments: "Camera must be locked on a tripod. Use a 2-second shutter delay or remote release so pressing the button does not shake the camera.",
    },
    {
      scenario: "Night City Traffic Light Trails",
      iso: "ISO 100",
      aperture: "f/8.0",
      shutterSpeed: "10s",
      whyItWorks: "10 seconds records dozens of passing vehicles as continuous red and white light streaks while keeping street buildings crisp.",
      adjustments: "If light trails are too short, increase shutter speed to 15s or 20s and stop down aperture to f/11.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Relying on in-body image stabilization (IBIS) to freeze a running dog.",
      correction:
        "Image stabilization only stabilizes the camera; it has zero effect on the subject. A running dog at 1/30s will still be a blur, even with an 8-stop gimbal or IBIS. You must increase shutter speed to 1/1000s.",
    },
    {
      mistake: "Hand-holding a 1-second waterfall exposure.",
      correction:
        "No human can hold a camera perfectly still for one second. The rocks, trees, and entire scenery will be completely blurred. Use a tripod or set the camera on a solid wall.",
    },
    {
      mistake: "Jabbing or stabbing the shutter button forcefully.",
      correction:
        "Physically mashing the shutter button jolts the camera body right as the curtain opens. Gently squeeze the button with the pad of your index finger, exhaling smoothly.",
    },
  ],
  quizQuestions: [
    {
      id: "ss-q1",
      question: "You are photographing a fast-moving basketball game. Which shutter speed will freeze the players' movement best?",
      options: ["1/30s", "1/125s", "1/1000s", "1.5 seconds"],
      correctIndex: 2,
      explanation:
        "1/1000s or faster is essential to freeze high-velocity athletic movements, ball flight, and airborne jumps without motion streaks.",
    },
    {
      id: "ss-q2",
      question: "According to the Reciprocal Rule, what is the minimum safe handheld shutter speed when using a 200mm telephoto lens without stabilization?",
      options: ["1/15s", "1/50s", "1/200s", "2 seconds"],
      correctIndex: 2,
      explanation:
        "The reciprocal rule states handheld shutter speed should be at least 1 / (Focal Length). For 200mm, that is at least 1/200s (or 1/250s) to prevent hand tremor blur.",
    },
    {
      id: "ss-q3",
      question: "You review your landscape photo: the waterfall water is silky, but the nearby rocks and trees are also blurry. What happened?",
      options: [
        "The ISO was set too low.",
        "Your aperture was too wide.",
        "Camera shake occurred because the camera was not locked down on a solid tripod during the long exposure.",
        "The lens autofocus failed.",
      ],
      correctIndex: 2,
      explanation:
        "When static objects like rocks and trees are blurry alongside moving water, the camera moved during the exposure. A tripod is mandatory for long exposures.",
    },
  ],
  suggestedAiPrompts: [
    "How does motion panning work at 1/30s to keep a car sharp while blurring the background?",
    "What is the difference between a mechanical shutter, electronic front-curtain shutter (EFCS), and full electronic shutter?",
    "Why do LED lights and stadium lamps cause banding lines at fast electronic shutter speeds?",
  ],
};
