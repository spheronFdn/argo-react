import React from "react";
import "./Particle.scss";
import Particles from "react-particles-js";
import { IParticleModel } from "./model";

const Particle: React.FC<IParticleModel> = ({ type }) => {
  return (
    <div className="Particle">
      <Particles
        params={
          type === "home"
            ? {
                particles: {
                  number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area: 800,
                    },
                  },
                  color: {
                    value: "#ffffff",
                  },
                  shape: {
                    type: "circle",
                    stroke: {
                      width: 0,
                      color: "#000000",
                    },
                    image: {
                      src: "img/github.svg",
                      width: 100,
                      height: 100,
                    },
                  },
                  opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                      enable: true,
                      speed: 1,
                      opacity_min: 0.1,
                      sync: false,
                    },
                  },
                  size: {
                    value: 3,
                    random: true,
                    anim: {
                      enable: true,
                      speed: 2,
                      size_min: 0.1,
                      sync: false,
                    },
                  },
                  line_linked: {
                    distance: 100,
                    color: "#fff",
                    opacity: 1,
                    width: 1,
                  },
                  move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200,
                    },
                  },
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: false,
                    },
                    onclick: {
                      enable: false,
                    },
                    resize: true,
                  },
                },
              }
            : {
                particles: {
                  number: {
                    value: 150,
                    density: {
                      enable: true,
                      value_area: 1803.4120608655228,
                    },
                  },
                  color: {
                    value: "#ffffff",
                  },
                  shape: {
                    type: "circle",
                    stroke: {
                      width: 2,
                      color: "#000000",
                    },
                    polygon: {
                      nb_sides: 4,
                    },
                    image: {
                      src: "img/github.svg",
                      width: 100,
                      height: 100,
                    },
                  },
                  opacity: {
                    value: 0.4008530152163807,
                    random: false,
                    anim: {
                      enable: false,
                      speed: 1,
                      opacity_min: 0.1,
                      sync: false,
                    },
                  },
                  size: {
                    value: 1.5,
                    random: true,
                    anim: {
                      enable: false,
                      speed: 40,
                      size_min: 0.1,
                      sync: false,
                    },
                  },
                  line_linked: {
                    enable: true,
                    distance: 0,
                    color: "#ffffff",
                    opacity: 0.3687847739990702,
                    width: 0.6413648243462091,
                  },
                  move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200,
                    },
                  },
                },
                interactivity: {
                  detect_on: "window",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "repulse",
                    },
                    onclick: {
                      enable: false,
                      mode: "bubble",
                    },
                    resize: true,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1,
                      },
                    },
                    bubble: {
                      distance: 400,
                      size: 40,
                      duration: 2,
                    },
                    repulse: {
                      distance: 100,
                      duration: 0.4,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
              }
        }
      />
    </div>
  );
};

export default Particle;
