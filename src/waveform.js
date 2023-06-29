import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformComponent = () => {
  const waveformRef = useRef(null);
  const [startTime, setStartTime] = useState("0:00");
  const [endTime, setEndTime] = useState("0:00");

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "lightgrey",
      progressColor: "black",
      backend: "WebAudio",
      barHeight: 0.7,
      barRadius: 5,
      barGap: 3,
      barWidth: 3,
      height: 40,
      responsive: true,
    });

    wavesurfer.load(
      "https://cdn.pixabay.com/download/audio/2021/11/01/audio_67c5757bac.mp3?filename=watr-fluid-10149.mp3&g-recaptcha-response=03AAYGu2RAy3nYgHqPI2hSP036yie61vMMngsxkGkgA02ZSo-Gj0V0Tm8Jza4F0xfhLTUWUb4FOHPQCAJpKIHt7pSttCX0p0jWoOX-tXi1b60XE9wKJyfWfUm7ayHD4Sl-mh6Tppic-E1L2VFEMvEtgUeTQXXYV2gme8DYasBIql0J5VfVn0Zbq1IqUhM-WxGCkV9FPCyWnLltDl2-KgkU2b32TDEyk858l8iZiYyLL8UVCe3SzStuOItAysQtZVf1-QKC9NLEB02kSX0DWf5bfbutupSp_hTFjrkPigKikcqJ1h6HIcsnrzv_AJuawlxprc3lXtcLEXScpVXFAzjzUVQHm7LPUoRu_XEpJEFxUvkKtnRUpo6_eqLD0SZFaaJAX9_s7ey4v2P4YqgALLlwbI029oZrBcDPJMM9C6TA0s0j82R5DLRvJ553e372oVCYhXX1uSWfXW0i0-HWjQHg_MEFAaQNk0YtKdmOpTKpdazNEiB0H_BNHMXfEDC8HUKbx8avty5ddPS5&remote_template=1"
    );

    wavesurfer.on("ready", () => {
      const duration = wavesurfer.getDuration();
      setEndTime(formatTime(duration));
      console.log("WaveSurfer is ready");
    });

    wavesurfer.on("interaction", () => {
      try {
        wavesurfer.play();
      } catch (err) {
        console.error("Error playing: ", err);
      }
    });

    wavesurfer.on("drag", (progress) => {
      if (wavesurfer.isReady) {
        const currentTime = progress * wavesurfer.getDuration();
        setStartTime(formatTime(currentTime));
      }
    });

    wavesurfer.on("click", (progress) => {
      if (wavesurfer.isReady) {
        const currentTime = progress * wavesurfer.getDuration();
        setStartTime(formatTime(currentTime));
      }
    });

    wavesurfer.on("audioprocess", () => {
      if (wavesurfer.isReady) {
        const currentTime = wavesurfer.getCurrentTime();
        setStartTime(formatTime(currentTime));
      }
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div id="trackWtime">
      <span className="times">{startTime}</span>
      <div className="trackwave" ref={waveformRef}></div>
      <span className="times">{endTime}</span>
    </div>
  );
};

export default WaveformComponent;
