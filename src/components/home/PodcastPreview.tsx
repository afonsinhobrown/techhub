"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Headphones,
  Play,
  Pause,
  Clock,
  Calendar,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Últimos episódios - dados do banco
const recentEpisodes = [
  {
    id: "1",
    title: "IA no Desenvolvimento: Ferramenta ou Substituto?",
    duration: "45 min",
    publishedAt: "2026-02-01",
  },
  {
    id: "2",
    title: "Carreira Tech: Do Júnior ao Sênior em 2026",
    duration: "38 min",
    publishedAt: "2026-02-15",
  },
];

export function PodcastPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background border-y border-border">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
              {/* Video Player */}
              <video
                ref={videoRef}
                src="/videos/podcast-trailer.mp4"
                className="w-full h-auto object-cover aspect-video"
                muted={isMuted}
                loop
                playsInline
                poster="/images/podcast-thumbnail.png"
              />
              
              {/* Custom Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all">
                {/* Play/Pause Button */}
                <button 
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Mute Button */}
              <button 
                onClick={toggleMute}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Episode Badge */}
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-purple-600 text-white gap-1">
                  <Headphones className="w-3 h-3" />
                  TRAILER - TechHub Talks
                </Badge>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl bg-green-500/30 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-xl bg-purple-600/30 blur-xl" />
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6">
              <Headphones className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">
                TechHub Talks
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Podcast sobre IA e Tecnologia
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              Discussões reais sobre inteligência artificial, desenvolvimento e 
              carreira tech. Sem filtros, com perspectivas diversas de quem vive 
              a tecnologia no dia a dia.
            </p>

            {/* Recent Episodes */}
            <div className="space-y-3 mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Últimos episódios
              </p>
              {recentEpisodes.map((episode) => (
                <Link
                  key={episode.id}
                  href="/podcast"
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-purple-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <Play className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-purple-400 transition-colors">
                      {episode.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/podcast">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                  <Headphones className="w-4 h-4" />
                  Ver todos os episódios
                </Button>
              </Link>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Seguir no Spotify
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
