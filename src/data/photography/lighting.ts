import { TopicModule } from "@/types/photography";

export const lightingModule: TopicModule = {
  slug: "lighting-fundamentals",
  title: "Lighting Fundamentals",
  subtitle: "Quality, Direction & Color Temperature",
  tagline: "Photography literally translates to 'drawing with light'. Master light quality, direction, and color to transform flat snapshots into compelling art.",
  description:
    "Light is the raw medium of every photograph. Learn the physical difference between hard and soft light, how light direction sculpts three-dimensional depth, and how to harness Golden Hour and Blue Hour.",
  difficulty: "Beginner to Intermediate",
  estimatedMinutes: 9,
  iconName: "light",
  keyPrinciples: [
    "Light Quality is determined by the relative size of the light source compared to the subject: larger light source = softer shadows.",
    "Light Direction (front, side, back, top) defines the mood, texture, and three-dimensional sculpting of your subject.",
    "Hard light creates crisp, dramatic, well-defined shadow edges; soft light produces gentle, gradual, flattering shadow transitions.",
    "Color temperature changes dynamically throughout the day, from the rich 3200K amber of Golden Hour to the cool 8000K twilight of Blue Hour.",
  ],
  contentSections: [
    {
      title: "1. Hard Light vs. Soft Light: The Relative Size Rule",
      content:
        "The most critical law of lighting optics is: The larger the light source is relative to your subject, the softer the light will be. The sun is massive, but because it is 93 million miles away, it acts as a tiny pinpoint in the sky, casting harsh, black shadows with razor-sharp edges (hard light). On an overcast day, cloud cover diffuses the sunlight across the entire sky—the entire sky dome becomes the light source, casting soft, wrapping, flattering light with virtually no harsh shadows.",
      highlightBox: {
        title: "The Relative Size Rule",
        text: "Want softer light on a portrait? Move your light source closer to your subject (making it relatively larger) or shoot through a diffuser/softbox.",
        type: "tip",
      },
    },
    {
      title: "2. The Four Primary Directions of Light",
      content:
        "Where your light originates relative to your subject dictates how shadows fall: 1) Front Lighting: Light source is directly behind the camera. Illuminates the subject evenly, but flattens contours, eliminates shadows, and reduces three-dimensional depth. 2) Side Lighting (90°): Light strikes from one side. Casts long shadows across wrinkles, pores, and textures, producing dramatic, sculpted, three-dimensional portraits. 3) Backlighting (180°): Light is behind the subject facing the camera. Creates an illuminated halo (rim light) around hair and shoulders, separating the subject from a dark background. 4) Top Lighting: Light is overhead (like midday sun). Casts unflattering dark shadows under eyes ('raccoon eyes') and nose.",
    },
    {
      title: "3. Golden Hour & Blue Hour",
      content:
        "Golden Hour occurs roughly one hour after sunrise and one hour before sunset, when the sun is low on the horizon. Sunlight travels through a thicker layer of Earth's atmosphere, which scatters short blue wavelengths and bathes the landscape in warm, golden, amber tones (around 3200K) with long, gentle shadows. Blue Hour occurs right after sunset (or before sunrise) when the sun is below the horizon; the sky glows deep indigo and sapphire (around 7000K–9000K), creating a stunning contrast with glowing city streetlights.",
    },
    {
      title: "4. Reflectors, Diffusers & Modifiers",
      content:
        "You don't need expensive studio strobes to control light. An inexpensive 5-in-1 reflector allows you to bounce natural sunlight back into deep facial shadows (acting as a fill light). A translucent diffusion panel placed between the subject and the direct sun instantly converts harsh, squinting midday sunlight into smooth, flattering window-quality light.",
      highlightBox: {
        title: "Window Light Secret",
        text: "A north-facing window (or any window with indirect daylight) is one of the most beautiful, free, soft light sources in the world for portraits and food photography.",
        type: "info",
      },
    },
  ],
  practicalExamples: [
    {
      title: "Soft Window Light Portrait",
      setting: "Large Diffused Source",
      scenario: "Indoor portrait with subject seated 45° to a large window",
      explanation:
        "Window acts as a giant softbox. The gentle transition between illuminated cheek and soft shadow cheek sculpts the face naturally without harsh lines.",
      badge: "Flattering Natural",
    },
    {
      title: "Golden Hour Silhouette / Rim",
      setting: "Direct Low Backlight",
      scenario: "Subject standing on hill with low setting sun behind their head",
      explanation:
        "Exposing for the golden sky turns the subject into a crisp silhouette with a glowing amber rim around hair and shoulders.",
      badge: "Cinematic Warmth",
    },
    {
      title: "Midday Harsh Sun with Diffuser",
      setting: "Overhead Sun Modified",
      scenario: "Outdoor editorial portrait at 1:00 PM",
      explanation:
        "Holding a translucent white diffuser panel over the model's head softens the harsh vertical sun, eliminating deep eye sockets and blown-out forehead highlights.",
      badge: "Modifier Solution",
    },
    {
      title: "Blue Hour City Skyline",
      setting: "Mixed Natural Twilight & Artificial Tungsten",
      scenario: "Cityscape overlooking illuminated bridges 20 minutes after sunset",
      explanation:
        "The deep blue sky perfectly balances the warm golden sodium glow of city streetlamps and illuminated skyscraper windows.",
      badge: "Color Harmony",
    },
  ],
  scenarios: [
    {
      scenario: "Outdoor Golden Hour Portrait",
      iso: "ISO 100",
      aperture: "f/2.2",
      shutterSpeed: "1/500s",
      whyItWorks: "Backlight the subject with the setting sun and use an amber reflector or fill light in front to balance eye brightness.",
      adjustments: "Watch out for lens flare reducing contrast. Use a lens hood or shield the top of the lens with your hand.",
    },
    {
      scenario: "Artisan Coffee Mug Product Shot",
      iso: "ISO 200",
      aperture: "f/4.0",
      shutterSpeed: "1/125s",
      whyItWorks: "Position product beside a window for 90° side light. Use a white foam board on the opposite side to bounce gentle fill light into the shadows.",
      adjustments: "Side light brings out the tactile ceramic texture and rising steam.",
    },
    {
      scenario: "Moody Black & White Street Portrait",
      iso: "ISO 400",
      aperture: "f/2.8",
      shutterSpeed: "1/250s",
      whyItWorks: "Seek out hard light slicing between tall skyscrapers to isolate the subject in high-contrast chiaroscuro.",
      adjustments: "Expose for the bright highlights so shadows fall into deep, rich black.",
    },
  ],
  commonMistakes: [
    {
      mistake: "Placing your subject directly facing the harsh midday sun.",
      correction:
        "Your subject will squint painfully, and their eye sockets will become black 'raccoon shadows'. Turn them around so the sun is behind them (backlighting), or move into open shade.",
    },
    {
      mistake: "Using the camera's built-in pop-up flash firing straight ahead.",
      correction:
        "Direct on-axis pop-up flash acts like a deer-in-headlights spotlight: it flattens facial contours, creates oily skin reflections, and leaves an ugly harsh black shadow on the wall behind.",
    },
    {
      mistake: "Ignoring the color temperature of mixed lighting in indoor rooms.",
      correction:
        "Cool daylight coming through a window (5600K) mixed with warm tungsten lamps (2700K) creates bizarre orange-and-blue skin color casts. Turn off incandescent lamps when shooting beside window light.",
    },
  ],
  quizQuestions: [
    {
      id: "light-q1",
      question: "Why does an overcast, cloudy sky produce soft light while direct midday sun produces harsh light?",
      options: [
        "Because clouds change the physical color temperature of light to green.",
        "Because the entire cloud layer acts as a massive, diffused light source relative to the subject.",
        "Because clouds reduce the speed of light.",
        "Because cameras cannot expose properly in direct sun.",
      ],
      correctIndex: 1,
      explanation:
        "Light softness depends on the relative size of the light source. The sun is a small point in the sky; an overcast sky turns the entire cloud deck into a giant soft light source.",
    },
    {
      id: "light-q2",
      question: "What is 'Rim Light' and how is it created?",
      options: [
        "Light positioned directly below the subject's chin.",
        "Backlight positioned behind the subject facing toward the camera, highlighting hair and edge contours.",
        "Direct front flash bouncing off the floor.",
        "Light filtered through a red glass filter.",
      ],
      correctIndex: 1,
      explanation:
        "Rim light (or edge light) comes from behind the subject, tracing an illuminated outline around the hair and shoulders that separates them from a dark background.",
    },
    {
      id: "light-q3",
      question: "When is 'Golden Hour' and why is it beloved by photographers?",
      options: [
        "Exactly at 12:00 PM midday when the sun is at its highest intensity.",
        "Around sunrise and sunset, when low-angled sunlight is warm, diffused, and casts long flattering shadows.",
        "At midnight when stars are golden.",
        "During total solar eclipses.",
      ],
      correctIndex: 1,
      explanation:
        "Golden Hour occurs during low sun angles after sunrise and before sunset. The long atmospheric path filters out blue rays and produces soft, warm amber illumination.",
    },
  ],
  suggestedAiPrompts: [
    "How does Rembrandt lighting work in portraiture and how do I position the key light?",
    "What is the difference between high-key and low-key lighting setups?",
    "How do I choose the correct Kelvin white balance when shooting outdoors during Blue Hour?",
  ],
};
