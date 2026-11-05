import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllTopics,
  getTopicBySlug,
  getNextTopic,
  getPrevTopic,
} from "@/data/photography";
import { LessonLayout } from "@/components/learning/LessonLayout";
import { TopicSlug } from "@/types/photography";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((t) => ({
    topic: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const mod = getTopicBySlug(topic);
  if (!mod) {
    return {
      title: "Lesson Not Found — ShutterWise AI",
    };
  }

  return {
    title: `${mod.title} — Photography Knowledge Hub | ShutterWise AI`,
    description: mod.description,
  };
}

export default async function TopicLessonPage({ params }: PageProps) {
  const { topic } = await params;
  const currentModule = getTopicBySlug(topic);

  if (!currentModule) {
    notFound();
  }

  const prevTopic = getPrevTopic(currentModule.slug as TopicSlug);
  const nextTopic = getNextTopic(currentModule.slug as TopicSlug);

  return (
    <LessonLayout
      module={currentModule}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
    />
  );
}
