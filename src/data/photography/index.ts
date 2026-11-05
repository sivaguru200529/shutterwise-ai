import { TopicModule, TopicSlug } from "@/types/photography";
import { isoModule } from "./iso";
import { apertureModule } from "./aperture";
import { shutterSpeedModule } from "./shutter-speed";
import { exposureTriangleModule } from "./exposure-triangle";
import { lightingModule } from "./lighting";
import { troubleshootingModule } from "./troubleshooting";

export const allPhotographyModules: TopicModule[] = [
  isoModule,
  apertureModule,
  shutterSpeedModule,
  exposureTriangleModule,
  lightingModule,
  troubleshootingModule,
];

export function getAllTopics(): TopicModule[] {
  return allPhotographyModules;
}

export function getTopicBySlug(slug: string): TopicModule | undefined {
  return allPhotographyModules.find((mod) => mod.slug === slug);
}

export function getNextTopic(currentSlug: TopicSlug): TopicModule | null {
  const index = allPhotographyModules.findIndex((mod) => mod.slug === currentSlug);
  if (index === -1 || index === allPhotographyModules.length - 1) {
    return null;
  }
  return allPhotographyModules[index + 1];
}

export function getPrevTopic(currentSlug: TopicSlug): TopicModule | null {
  const index = allPhotographyModules.findIndex((mod) => mod.slug === currentSlug);
  if (index <= 0) {
    return null;
  }
  return allPhotographyModules[index - 1];
}

export {
  isoModule,
  apertureModule,
  shutterSpeedModule,
  exposureTriangleModule,
  lightingModule,
  troubleshootingModule,
};
