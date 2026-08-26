"use client";

import { useState } from "react";
import { RoomDetail } from "@/services/room.service";
import { Button } from "@/components/ui/button";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  MonitorUp,
  Film,
  Gamepad2,
  Sparkles,
  Smile,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";

interface RoomStageProps {
  room: RoomDetail;
}

type StageMode = "HANG_OUT" | "MEDIA" | "GAMES";

export function RoomStage({ room }: RoomStageProps) {
  const [activeTab, setActiveTab] = useState<StageMode>("HANG_OUT");
  const [micEnabled, setMicEnabled] = useState(false);
  const [camEnabled, setCamEnabled] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
    toast.info(micEnabled ? "Microphone muted" : "Microphone unmuted");
  };

  const toggleCam = () => {
    setCamEnabled(!camEnabled);
    toast.info(camEnabled ? "Camera turned off" : "Camera turned on");
  };

  const toggleScreen = () => {
    setScreenSharing(!screenSharing);
    toast.info(screenSharing ? "Screen sharing stopped" : "Screen sharing started");
  };

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden bg-background">
      {/* Activity Navigation Switcher */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 bg-muted/20">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("HANG_OUT")}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "HANG_OUT"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            Live Hangout
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("MEDIA")}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "MEDIA"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Film className="h-3.5 w-3.5" />
            Watch Together
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("GAMES")}
            className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "GAMES"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5" />
            Mini Games
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Room Live</span>
        </div>
      </div>

      {/* Stage Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-center items-center">
        {activeTab === "HANG_OUT" && (
          <div className="w-full max-w-4xl space-y-4">
            {/* Live Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* User Tile */}
              <div className="relative aspect-video rounded-3xl border border-border/70 bg-card overflow-hidden flex flex-col items-center justify-center p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/15 text-primary text-2xl font-bold">
                  {room.owner.username.substring(0, 2).toUpperCase()}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {room.owner.username} (Host)
                </p>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground">
                  <Volume2 className="h-3 w-3 text-emerald-500" />
                  <span>Audio Active</span>
                </div>
              </div>

              {/* Your Tile */}
              <div className="relative aspect-video rounded-3xl border border-border/70 bg-card overflow-hidden flex flex-col items-center justify-center p-6 shadow-sm">
                {camEnabled ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/20 text-emerald-600 text-2xl font-bold">
                      YOU
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Camera Active
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-muted text-muted-foreground text-2xl font-bold">
                      YOU
                    </div>
                    <p className="mt-3 text-sm font-semibold text-muted-foreground">
                      Camera Off
                    </p>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground">
                  {micEnabled ? (
                    <>
                      <Mic className="h-3 w-3 text-emerald-500" />
                      <span>Mic On</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="h-3 w-3 text-destructive" />
                      <span>Muted</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Cozy Hangout Info Banner */}
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    Cozy Hangout Session
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Invite friends or switch to Watch Together to enjoy synchronized videos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "MEDIA" && (
          <div className="w-full max-w-4xl space-y-4">
            <div className="relative aspect-video rounded-3xl border border-border/70 bg-card overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Film className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                Watch Party Cinema
              </h3>
              <p className="mt-1 text-xs max-w-sm text-muted-foreground">
                Paste a video link or pick a media stream to watch synchronously with everyone in this room.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Paste YouTube or video stream URL..."
                  className="rounded-xl border border-input bg-background px-4 py-2 text-xs w-72 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <Button size="sm" className="rounded-xl text-xs">
                  Load Stream
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "GAMES" && (
          <div className="w-full max-w-4xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                    <Gamepad2 className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-foreground">
                    Room Trivia Clash
                  </h4>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Test your group knowledge with fun trivia categories: pop culture, geography, and memory questions.
                  </p>
                </div>
                <Button size="sm" className="mt-6 rounded-xl text-xs">
                  Start Game
                </Button>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                    <Smile className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-foreground">
                    Quick Draw & Guess
                  </h4>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    A collaborative sketchpad where one person draws and the rest guess in real time chat.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="mt-6 rounded-xl text-xs">
                  Launch Sketchpad
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hangout Control Bar */}
      <div className="border-t border-border/60 bg-card/60 p-3 sm:p-4 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variant={micEnabled ? "default" : "outline"}
            size="sm"
            onClick={toggleMic}
            className="rounded-xl gap-2 text-xs font-semibold h-10 px-4"
          >
            {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4 text-destructive" />}
            <span>{micEnabled ? "Mute" : "Unmute"}</span>
          </Button>

          <Button
            type="button"
            variant={camEnabled ? "default" : "outline"}
            size="sm"
            onClick={toggleCam}
            className="rounded-xl gap-2 text-xs font-semibold h-10 px-4"
          >
            {camEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4 text-destructive" />}
            <span>{camEnabled ? "Turn Off Camera" : "Turn On Camera"}</span>
          </Button>

          <Button
            type="button"
            variant={screenSharing ? "default" : "outline"}
            size="sm"
            onClick={toggleScreen}
            className="rounded-xl gap-2 text-xs font-semibold h-10 px-4"
          >
            <MonitorUp className="h-4 w-4 text-primary" />
            <span>{screenSharing ? "Stop Sharing" : "Share Screen"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomStage;
