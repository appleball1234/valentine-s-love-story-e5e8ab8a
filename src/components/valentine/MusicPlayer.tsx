import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Generate a soft romantic ambient pad using Web Audio API
const createRomanticAmbience = (audioCtx: AudioContext): { start: () => void; stop: () => void; gainNode: GainNode } => {
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioCtx.destination);

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  // Soft chord tones (C major 7 / Am - romantic feel)
  const frequencies = [261.63, 329.63, 392.0, 493.88, 523.25]; // C4, E4, G4, B4, C5

  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0.06 - i * 0.008; // softer higher notes

    // Gentle vibrato
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.3 + i * 0.1;
    lfoGain.gain.value = 1.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    // Gentle volume swell
    const tremolo = audioCtx.createOscillator();
    const tremoloGain = audioCtx.createGain();
    tremolo.frequency.value = 0.15 + i * 0.05;
    tremoloGain.gain.value = 0.015;
    tremolo.connect(tremoloGain);
    tremoloGain.connect(gain.gain);
    tremolo.start();

    osc.connect(gain);
    gain.connect(masterGain);
    
    oscillators.push(osc);
    gains.push(gain);
  });

  return {
    start: () => {
      oscillators.forEach(osc => osc.start());
      masterGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 2);
    },
    stop: () => {
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
      setTimeout(() => oscillators.forEach(osc => { try { osc.stop(); } catch {} }), 1200);
    },
    gainNode: masterGain,
  };
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambienceRef = useRef<ReturnType<typeof createRomanticAmbience> | null>(null);

  const toggle = useCallback(() => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ambience = createRomanticAmbience(audioCtxRef.current);
      ambienceRef.current = ambience;
      ambience.start();
      setIsPlaying(true);
    } else {
      ambienceRef.current?.stop();
      ambienceRef.current = null;
      setIsPlaying(false);
    }
    setHasInteracted(true);
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ambienceRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-30">
      <motion.button
        onClick={toggle}
        className="p-3 rounded-full bg-card/80 backdrop-blur-sm shadow-romantic border border-primary/20 hover:border-primary/40 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="on"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Volume2 className="w-5 h-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hint to play music */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute top-full right-0 mt-2 whitespace-nowrap"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-body text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft border border-primary/10"
          >
            🎵 Tap for music
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};
