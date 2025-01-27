"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Track {
  id: string
  name: string
  audio: string
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [volume, setVolume] = useState(0.5)
  const [tracks, setTracks] = useState<Track[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    fetchTracks()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const fetchTracks = async () => {
    try {
      const response = await fetch(
        "https://api.jamendo.com/v3.0/tracks/?client_id=5a357adb&format=json&limit=10&fuzzytags=electronic",
      )
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        setTracks(
          data.results.map((track: any) => ({
            id: track.id,
            name: track.name,
            audio: track.audio,
          })),
        )
        setCurrentTrack(data.results[0])
      } else {
        console.error("No tracks found")
      }
    } catch (error) {
      console.error("Error fetching tracks:", error)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeTrack = (direction: "next" | "prev") => {
    if (tracks.length === 0) return

    const currentIndex = tracks.findIndex((track) => track.id === currentTrack?.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % tracks.length
    } else {
      newIndex = (currentIndex - 1 + tracks.length) % tracks.length
    }

    setCurrentTrack(tracks[newIndex])
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.src = tracks[newIndex].audio
      audioRef.current.play()
    }
  }

  return (
    <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
      {currentTrack && <audio ref={audioRef} src={currentTrack.audio} />}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => changeTrack("prev")}
        className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-700"
      >
        <SkipBack size={16} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={togglePlay}
        className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-700"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => changeTrack("next")}
        className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-700"
      >
        <SkipForward size={16} />
      </Button>
      <div className="flex items-center space-x-2">
        <Volume2 size={16} className="text-cyan-400" />
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
          className="w-20"
        />
      </div>
      <meta name="google-adsense-account" content="ca-pub-8997726626133132"></meta>
      {currentTrack && <div className="text-cyan-400 text-xs truncate max-w-[150px]">{currentTrack.name}</div>}
    </div>
  )
}

export default MusicPlayer

