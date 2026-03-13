import { db } from "@/lib/db";

export async function getPodcastEpisodes() {
  return db.podcastEpisode.findMany({
    orderBy: { episodeNumber: "desc" },
  });
}

export async function getPodcastEpisodeById(id: string) {
  return db.podcastEpisode.findUnique({
    where: { id },
  });
}

export async function getLatestEpisodes(limit: number = 3) {
  return db.podcastEpisode.findMany({
    orderBy: { episodeNumber: "desc" },
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
  return db.podcastEpisode.create({
    data,
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
  return db.podcastEpisode.update({
    where: { id },
    data,
  });
}

export async function deletePodcastEpisode(id: string) {
  return db.podcastEpisode.delete({
    where: { id },
  });
}
