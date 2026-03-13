import { db } from "@/lib/db";

export async function getPodcastEpisodes() {
  return db.podcast_episodes.findMany({
    orderBy: { episode_number: "desc" },
  });
}

export async function getPodcastEpisodeById(id: string) {
  return db.podcast_episodes.findUnique({
    where: { id },
  });
}

export async function getLatestEpisodes(limit: number = 3) {
  return db.podcast_episodes.findMany({
    orderBy: { episode_number: "desc" },
    take: limit,
  });
}

export async function createPodcastEpisode(data: {
  title: string;
  description?: string;
  audioUrl?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  duration?: number;
  episodeNumber: number;
  publishedAt?: Date;
}) {
  const id = `ep_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return db.podcast_episodes.create({
    data: {
      id,
      title: data.title,
      description: data.description,
      audio_url: data.audioUrl,
      spotify_url: data.spotifyUrl,
      apple_url: data.appleUrl,
      duration: data.duration,
      episode_number: data.episodeNumber,
      published_at: data.publishedAt,
    },
  });
}

export async function updatePodcastEpisode(
  id: string,
  data: {
    title?: string;
    description?: string;
    audioUrl?: string;
    spotifyUrl?: string;
    appleUrl?: string;
    duration?: number;
    episodeNumber?: number;
    publishedAt?: Date;
  }
) {
  return db.podcast_episodes.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      audio_url: data.audioUrl,
      spotify_url: data.spotifyUrl,
      apple_url: data.appleUrl,
      duration: data.duration,
      episode_number: data.episodeNumber,
      published_at: data.publishedAt,
    },
  });
}

export async function deletePodcastEpisode(id: string) {
  return db.podcast_episodes.delete({
    where: { id },
  });
}
