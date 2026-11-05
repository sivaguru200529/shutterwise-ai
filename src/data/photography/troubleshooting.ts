import { TopicModule } from "@/types/photography";

export const troubleshootingModule: TopicModule = {
  slug: "photography-troubleshooting",
  title: "Photography Troubleshooting Guide",
  subtitle: "Diagnostic Solutions for the 10 Most Common Shooting Errors",
  tagline: "Diagnose why your photos turn out dark, blurry, noisy, or yellow — and apply concrete optical fixes on the spot.",
  description:
    "Don't let unexpected shooting errors ruin once-in-a-lifetime moments. Explore our field-tested diagnostic guide covering the 10 most common camera and lighting problems, complete with step-by-step solutions and direct AI Mentor assistance.",
  difficulty: "Beginner to Intermediate",
  estimatedMinutes: 12,
  iconName: "troubleshooting",
  keyPrinciples: [
    "Never guess: analyze your EXIF metadata (Aperture, Shutter Speed, ISO, and focal length) to diagnose failures.",
    "Inspect the histogram: optical exposure errors can be diagnosed in seconds without relying on camera LCD brightness.",
    "Distinguish between camera shake (whole frame blurred) and motion blur (only moving subject blurred).",
    "Use our 6-part troubleshooting framework: Identify problem -> Find optical cause -> Apply baseline settings -> Field technique.",
  ],
  contentSections: [
    {
      title: "The Systematic Troubleshooting Mindset",
      content:
        "Every photographic failure is governed by physical and optical laws—not bad luck or an inferior camera. When a shot fails, do not frantically turn dials at random. Follow the ShutterWise systematic methodology: 1) Check your exposure meter and histogram, 2) Verify whether blur is caused by focus, camera shake, or subject movement, 3) Check your ISO noise threshold, and 4) Inspect ambient light direction.",
      highlightBox: {
        title: "The 6-Part Framework",
        text: "Whenever you experience an error, ask: What is the problem? What optical physical law caused it? What baseline settings fix it? What physical field technique prevents it?",
        type: "tip",
      },
    },
  ],
  troubleshootingItems: [
    {
      id: "dark-images",
      title: "1. Images Are Too Dark (Underexposed)",
      symptom: "Photo appears dim, gloomy, and shadow details are crushed to solid black.",
      possibleCauses: [
        "Shutter speed is too fast for the ambient light level.",
        "Aperture is stopped down too narrow (e.g. f/11 or f/16).",
        "ISO is locked too low (e.g. ISO 100 in a dark indoor room).",
        "Camera light meter was fooled by a bright light source in the background.",
      ],
      howToIdentify:
        "Histogram graph is jammed hard against the left boundary; shadows lack visible texture.",
      stepByStepSolution: [
        "1. Open your lens aperture to its widest setting (e.g. f/1.8, f/2.8, or f/4).",
        "2. Lower your shutter speed, ensuring it remains above the safe reciprocal handheld limit (e.g. 1/125s).",
        "3. If the photo is still dark, raise your ISO to 800, 1600, or 3200.",
        "4. If shooting in Aperture Priority, dial Exposure Compensation to +1.0 or +1.7 EV.",
      ],
      recommendedAdjustments: {
        aperture: "Open to f/1.8 – f/2.8",
        shutterSpeed: "1/125s (minimum handheld)",
        iso: "Increase to ISO 800 – 1600",
        technique: "Check spot metering on the subject's face rather than evaluative metering on the bright background.",
      },
      practicalExample:
        "Taking a portrait indoors against a bright window: the camera meters for the bright window, leaving the person in silhouette. Dialing +1.7 EV exposure compensation brings the person's face to perfect brightness.",
      aiPrompt: "My photos are coming out completely dark indoors. Can you help me fix my exposure settings?",
    },
    {
      id: "overexposed-images",
      title: "2. Images Are Overexposed (Blown Out / Washed Out)",
      symptom: "Photo looks blindingly bright, with skies turned to pure white and washed out skin.",
      possibleCauses: [
        "Shutter speed is too slow for the bright light level.",
        "Aperture is wide open (f/1.4 or f/1.8) under direct midday sun.",
        "ISO was accidentally left on a high setting (e.g. ISO 3200 from night before).",
        "Exposure compensation is accidentally set to positive (+2 EV).",
      ],
      howToIdentify:
        "Histogram graph is smashed against the far right wall; highlight zebra stripes flash across bright areas.",
      stepByStepSolution: [
        "1. Check your ISO dial immediately: lower it to base native ISO 100.",
        "2. Increase your shutter speed (e.g. from 1/250s to 1/1000s or 1/2000s).",
        "3. Stop down your aperture by 1 to 2 stops (e.g. from f/1.8 to f/2.8 or f/4).",
        "4. If you must shoot at f/1.4 in midday sun, attach a Neutral Density (ND) filter to block light.",
      ],
      recommendedAdjustments: {
        aperture: "Stop down to f/4.0 or f/5.6",
        shutterSpeed: "1/1000s – 1/2000s",
        iso: "Lock at base ISO 100",
        technique: "Enable highlight warning ('blinkies') on your camera to see blown highlights instantly.",
      },
      practicalExample:
        "Shooting an outdoor wedding in direct noon sunlight: skies and bride's white dress lose all lace detail. Bumping shutter speed to 1/2000s restores delicate dress texture and rich blue skies.",
      aiPrompt: "My outdoor beach photos are completely blown out white. What settings should I change?",
    },
    {
      id: "blurry-images-camera-shake",
      title: "3. Entire Image is Blurry (Camera Shake)",
      symptom: "Nothing in the photograph is sharp—even brick walls, buildings, and stationary objects are smeared.",
      possibleCauses: [
        "Shutter speed is too slow for handheld shooting (slower than reciprocal rule).",
        "Involuntary hand tremors or breathing while pressing the shutter.",
        "Punching or stabbing the shutter release button aggressively.",
      ],
      howToIdentify:
        "Every element in the image has a directional ghosting trail or uniform micro-blur.",
      stepByStepSolution: [
        "1. Check your focal length: ensure shutter speed is at least 1 / (Focal Length).",
        "2. Raise your shutter speed to at least 1/160s or 1/250s.",
        "3. Tuck both elbows firmly against your chest ribs and create a 3-point stable grip.",
        "4. Squeeze the shutter gently on a slow exhalation like a marksman.",
        "5. Turn on in-lens Optical Image Stabilization (OIS) or In-Body Stabilization (IBIS).",
      ],
      recommendedAdjustments: {
        shutterSpeed: "Minimum 1/160s on 50mm, 1/320s on 200mm",
        technique: "Elbows tucked, gentle trigger squeeze, brace against a wall or use a monopod/tripod.",
      },
      practicalExample:
        "Walking through a museum at night shooting at 1/15s handheld: every painting looks blurry. Increasing shutter speed to 1/125s and raising ISO to 1600 produces tack-sharp paintings.",
      aiPrompt: "All my handheld photos look slightly blurry even when I focus correctly. How do I stop camera shake?",
    },
    {
      id: "too-much-noise",
      title: "4. Images Contain Too Much Digital Noise / Grain",
      symptom: "Photo looks gritty, speckled, with colored blotches in dark shadow regions.",
      possibleCauses: [
        "ISO is set excessively high (e.g. ISO 12800 or 25600 on an APS-C or Micro 4/3 sensor).",
        "Image was severely underexposed in-camera and shadow sliders were pushed +3 EV in editing.",
        "Long exposure noise on hot sensors without dark-frame subtraction.",
      ],
      howToIdentify:
        "Zooming to 100% reveals multicolored artifacts and mottled sandpaper texture.",
      stepByStepSolution: [
        "1. Expose properly in-camera: an image shot cleanly at ISO 3200 has less noise than an underexposed image shot at ISO 800 boosted in editing!",
        "2. Open your aperture wider (f/1.8 or f/2.8) to admit more optical photons.",
        "3. Slow down your shutter speed if on a tripod or stabilized.",
        "4. Use modern AI denoising (e.g. Lightroom Denoise or Topaz) in post-processing.",
      ],
      recommendedAdjustments: {
        iso: "Cap ISO to 3200 or 6400",
        aperture: "Widest aperture available on lens",
        technique: "Expose to the right (ETTR) to maximize photon capture without clipping highlights.",
      },
      practicalExample:
        "Shooting an indoor birthday party at ISO 6400: shadows look noisy. Opening from f/4 to f/1.8 admits 8 times more light, allowing ISO to be lowered to 800 for a clean image.",
      aiPrompt: "How can I reduce digital noise in my low-light photos without making my pictures blurry?",
    },
    {
      id: "background-not-blurred",
      title: "5. Background is Not Blurred (Too Much Depth of Field)",
      symptom: "Subject blends awkwardly into a distracting, cluttered background with harsh telephone poles and cars.",
      possibleCauses: [
        "Aperture is set to a narrow f-stop (f/8, f/11, f/16).",
        "Subject is standing right against the wall or background.",
        "Lens has a short focal length (wide-angle 18mm or 24mm) positioned far away.",
        "Small sensor size (smartphone or compact camera sensor).",
      ],
      howToIdentify:
        "Both subject and background elements are equally in focus with no visual separation.",
      stepByStepSolution: [
        "1. Switch your camera to Aperture Priority (A/Av) and dial to the lowest f-number (f/1.8, f/2.8).",
        "2. Increase subject-to-background distance: pull your subject 10–15 feet away from the background.",
        "3. Decrease camera-to-subject distance: step closer to your subject.",
        "4. Use a longer focal length (e.g. 85mm or 135mm prime, or zoom in to 70mm+).",
      ],
      recommendedAdjustments: {
        aperture: "Lowest f-number (f/1.8 – f/2.8)",
        technique: "Maximize subject separation from the background and use a longer focal length.",
      },
      practicalExample:
        "Outdoor portrait at f/8 with subject leaning against a brick wall: the wall is distracting. Moving the subject 10 feet into the open and shooting at f/2.0 dissolves the brick wall into creamy bokeh.",
      aiPrompt: "I want that blurry background portrait look, but everything stays in focus. How do I get bokeh?",
    },
    {
      id: "moving-subjects-blurred",
      title: "6. Moving Subjects Appear Blurred (Motion Blur)",
      symptom: "Background is tack sharp, but the running child, dog, or sports player has motion trails.",
      possibleCauses: [
        "Shutter speed is too slow for the velocity of the subject (e.g. 1/60s on a running dog).",
        "Using Auto mode, which prioritizes low ISO over high shutter speed.",
      ],
      howToIdentify:
        "The ground and nearby trees are sharp, proving the camera was held steady, but the moving subject is smeared.",
      stepByStepSolution: [
        "1. Switch to Shutter Priority (S/Tv) or Manual mode.",
        "2. Set shutter speed to 1/500s for walking/casual movement, or 1/1000s–1/2000s for running children/sports.",
        "3. Switch autofocus mode to Continuous Predictive AF (AF-C or AI Servo).",
        "4. Switch drive mode to Continuous High Burst (CH).",
      ],
      recommendedAdjustments: {
        shutterSpeed: "1/1000s – 1/2000s",
        technique: "AF-C tracking with eye/face detection; burst shooting mode.",
      },
      practicalExample:
        "Soccer match: shooting at 1/125s causes player legs to look like ghost streaks. Setting shutter to 1/1000s instantly freezes airborne cleats and splashing grass.",
      aiPrompt: "My dog is always blurry when running in the backyard. What camera settings freeze fast pet action?",
    },
    {
      id: "indoor-photos-yellow",
      title: "7. Indoor Photos Look Sickly Yellow or Orange",
      symptom: "Skin tones look unnaturally orange/yellow, and white tablecloths or walls look amber.",
      possibleCauses: [
        "White balance is set to Daylight (5600K) or Cloudy (6500K) under warm domestic tungsten bulbs (2700K).",
        "Auto White Balance (AWB) struggled with mixed domestic illumination.",
      ],
      howToIdentify:
        "Everything white in the scene has a distinct warm amber or yellow color tint.",
      stepByStepSolution: [
        "1. Open White Balance (WB) settings and select Tungsten / Incandescent (represented by a light bulb icon).",
        "2. Or set Custom Kelvin White Balance to roughly 3000K–3200K.",
        "3. Shoot in RAW format: RAW allows lossless, perfect 1-click white balance correction in editing.",
      ],
      recommendedAdjustments: {
        technique: "Set WB to Incandescent/Tungsten (3000K) or shoot RAW and sample a white shirt with the eyedropper.",
      },
      practicalExample:
        "Living room dinner: default Daylight white balance makes faces look jaundiced. Switching to Tungsten WB neutralizes the yellow cast, restoring natural skin tones.",
      aiPrompt: "Why do all my indoor evening photographs have an ugly yellow color cast, and how do I fix white balance?",
    },
    {
      id: "harsh-shadows-portraits",
      title: "8. Portraits Have Dark, Harsh Eye & Nose Shadows",
      symptom: "Deep black shadows under the eyes ('raccoon eyes'), stark nose shadow, and subject squinting.",
      possibleCauses: [
        "Photographing in direct overhead midday sun (11:00 AM – 2:00 PM).",
        "Hard pinpoint light source pointing directly down on the subject.",
      ],
      howToIdentify:
        "Shadow edges on the face are razor sharp and intensely black with extreme contrast.",
      stepByStepSolution: [
        "1. Move your subject into 'open shade'—under a building awning, tree canopy, or porch.",
        "2. Turn your subject around so the sun is behind them (backlit) and expose for their face.",
        "3. Use a reflector below their chest to bounce gentle sunlight upward into eye sockets.",
        "4. Hold a translucent diffusion panel overhead to turn hard sunlight into soft window-like light.",
      ],
      recommendedAdjustments: {
        technique: "Move to open shade; use a 5-in-1 reflector; turn subject with sun at their back.",
      },
      practicalExample:
        "Midday park portrait: harsh sun casts deep black sockets under eyes. Moving the subject 5 steps under a leafy tree canopy provides gorgeous, even, soft light with natural eye catchlights.",
      aiPrompt: "How do I take flattering portraits in direct midday sunlight without harsh facial shadows?",
    },
    {
      id: "grainy-night-photos",
      title: "9. Night Photographs Look Muddy & Grainy",
      symptom: "Night street shots or city skylines look degraded with noisy black skies and lack punch.",
      possibleCauses: [
        "Handheld shooting forcing Auto ISO to ISO 12800+ to avoid blur.",
        "Camera underexposed the dark sky and noise was amplified.",
      ],
      howToIdentify:
        "Dark sky areas show severe colored speckles and loss of sharp building edges.",
      stepByStepSolution: [
        "1. Mount the camera on a sturdy tripod or rest it on a flat wall or bench.",
        "2. Lock your ISO to base ISO 100 for clean dynamic range.",
        "3. Set aperture to f/8 for lens sharpness and starburst light effects.",
        "4. Let shutter speed lengthen to 10s–25s to gather clean light naturally over time.",
        "5. Use a 2-second timer so your finger pressing the button doesn't vibrate the camera.",
      ],
      recommendedAdjustments: {
        iso: "ISO 100",
        aperture: "f/8.0",
        shutterSpeed: "10s – 20s (on Tripod)",
        technique: "Turn off lens stabilization when mounted on tripod; use 2s shutter timer.",
      },
      practicalExample:
        "City skyline handheld at ISO 12800 looks like noisy static. Placing the camera on a bridge railing at ISO 100 and 15 seconds produces crystal-clear water reflections and crisp architecture.",
      aiPrompt: "What are the best tripod settings for crisp, noise-free night city photography?",
    },
    {
      id: "photos-lack-sharpness",
      title: "10. Photographs Lack Crispness & Micro-Contrast",
      symptom: "Images look slightly hazy, mushy, or soft when zoomed in, lacking that 'pro pop'.",
      possibleCauses: [
        "Shooting at extreme aperture extremes (wide open f/1.4 on a budget lens, or f/22 suffering from diffraction).",
        "Dirty front lens element (fingerprint smudges, dust, condensation).",
        "Autofocus grabbed the subject's ear or shirt collar instead of their eye.",
        "Cheap UV filter on the front of the lens degrading optical resolution.",
      ],
      howToIdentify:
        "No single element in the photo has crisp micro-contrast; fine hair looks smudged.",
      stepByStepSolution: [
        "1. Clean your lens with a microfiber cloth and lens cleaning fluid.",
        "2. Remove cheap protective UV filters that cause ghosting and softness.",
        "3. Stop down 1 to 2 stops from wide open: an f/1.8 lens is dramatically sharper at f/2.8 or f/4.",
        "4. Avoid f/16 and f/22 where optical diffraction softens image sharpness.",
        "5. Enable Eye Autofocus (Eye-AF) to guarantee focus locks on the iris.",
      ],
      recommendedAdjustments: {
        aperture: "f/2.8 – f/8 (lens sweet spot)",
        technique: "Clean lens glass; use Single-point or Eye-AF; inspect focus at 100% playback.",
      },
      practicalExample:
        "Shooting a 50mm f/1.8 lens wide open at f/1.8: hair looks hazy. Stopping down slightly to f/2.8 transforms the image into razor-sharp perfection with punchy contrast.",
      aiPrompt: "Why do my photos look soft and lack that professional sharpness even when in focus?",
    },
  ],
  commonMistakes: [
    {
      mistake: "Assuming the camera body or sensor is 'broken' when settings are simply misconfigured.",
      correction:
        "99% of blurry or dark photos are caused by exposure triangle mismatches (e.g. 1/30s handheld shutter speed). Methodically check settings before blaming hardware.",
    },
    {
      mistake: "Deleting disappointing photos immediately on the back LCD screen.",
      correction:
        "Keep them and review their EXIF data on your computer! Studying your failed photos and reading the exact shutter speed, aperture, and ISO is how you improve the fastest.",
    },
  ],
  quizQuestions: [
    {
      id: "tb-q1",
      question: "You review a photo: the background buildings are tack sharp, but the walking person's legs are blurred. What is the diagnosis?",
      options: [
        "Camera shake caused by hand tremor.",
        "Subject motion blur caused by a shutter speed that was too slow for the walking speed.",
        "The lens front element had a fingerprint.",
        "ISO was too low.",
      ],
      correctIndex: 1,
      explanation:
        "Because the background is sharp, the camera was completely still! The blur is isolated to the moving subject, indicating a faster shutter speed (e.g. 1/250s+) was required.",
    },
    {
      id: "tb-q2",
      question: "Why do indoor photos taken under ordinary house lamps look yellowish-orange on default camera settings?",
      options: [
        "Because house light bulbs have a warm color temperature (around 2700K–3000K) and the camera was set to Daylight (5600K) white balance.",
        "Because indoor walls always reflect yellow rays.",
        "Because the camera sensor cannot detect blue light indoors.",
        "Because the shutter speed was too fast.",
      ],
      correctIndex: 0,
      explanation:
        "Standard household lamps emit warm tungsten light (~2700K). If white balance is set to Daylight (5600K), the camera fails to compensate, leaving a heavy orange-yellow tint.",
    },
    {
      id: "tb-q3",
      question: "You want a creamy blurred background in a portrait, but the background remains sharp and distracting. Which adjustment will help most?",
      options: [
        "Change aperture to f/16 and raise ISO.",
        "Switch to the lowest f-number (e.g. f/1.8 or f/2.8) and move the subject further away from the background.",
        "Speed up shutter speed to 1/2000s.",
        "Set white balance to Tungsten.",
      ],
      correctIndex: 1,
      explanation:
        "A wide aperture (small f-number) produces a shallow depth of field, and pulling the subject away from the background amplifies the background blur (bokeh).",
    },
  ],
  suggestedAiPrompts: [
    "I took a photo and it looks blurry all over. How do I know if it's camera shake or missed focus?",
    "Can you diagnose my camera settings if I tell you what my photo looks like?",
    "What is the best way to clean my camera sensor if I see black spots in the sky at f/11?",
  ],
};
