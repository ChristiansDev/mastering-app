import 'media-chrome/react';
import 'media-chrome/react/menu';

import { MediaTheme } from 'media-chrome/react/media-theme';

export default function PlayerMedia() {
  return (
    <>
      <template
        id="media-theme-sutro-audio"
        dangerouslySetInnerHTML={{
          __html: `
          <!-- Sutro Audio -->
          <style>
            :host {
              --media-font-family: Roboto, helvetica neue, segoe ui, arial, sans-serif;
              --media-control-background: transparent;
              --media-control-hover-background: transparent;
              --media-tooltip-display: none;

              display: block;
              width: 100%;
              height: 100%;
            }

            media-controller {
              --base: 20px;
              --media-range-track-height: calc(0.125 * var(--base));
              --media-control-height: calc(2 * var(--base));

              -webkit-font-smoothing: antialiased;
              border-radius: 16px;
              overflow: hidden;
              background: var(--media-secondary-color, #17507B);
              font-size: calc(0.75 * var(--base));
              font-family: Roboto, Arial, sans-serif;
            }

            media-controller[breakpointmd] {
              --base: 20px;
              min-height: 84px;
            }

            .info,
            media-control-bar {
              transition: opacity 0.3s ease-in-out;
            }

            media-controller:has(media-time-range[dragging]) :is(.info, media-control-bar) {
              opacity: 0.4;
            }

            .media-button {
              --media-control-hover-background: rgba(255, 255, 255, 0.12);
              border-radius: 8px;
              position: relative;
              padding: 0;
            }

            .media-button svg {
              fill: none;
              stroke: var(--media-primary-color, #fff);
              stroke-width: 1;
              stroke-linecap: round;
              stroke-linejoin: round;
            }

            .bg-shape1,
            .bg-shape2 {
              position: absolute;
              width: 50%;
              height: 100%;
              max-height: 132px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              filter: blur(80px);
              mix-blend-mode: plus-lighter;
              opacity: 0.24;
            }

            .bg-shape2 {
              right: 0;
            }
          </style>

          <media-controller
            audio
            breakpoints="md:480"
            defaultsubtitles="{{defaultsubtitles}}"
            defaultduration="{{defaultduration}}"
            gesturesdisabled="{{disabled}}"
            hotkeys="{{hotkeys}}"
            nohotkeys="{{nohotkeys}}"
            defaultstreamtype="on-demand"
          >
            <slot name="media" slot="media"></slot>

            <svg class="bg-shape1" viewBox="0 0 193 115">
              <path fill="#fff" d="M50.117 51.13c-40.5-6.5-28 13.5-44 30.5-32.5 51.5 75 32.001 77 13.5 2-18.5 45-19.5 86-3.5 41 16.001 16.5-21 12.5-68s-37-14.5-66.5 16.5-24.5 17.5-65 11Z"/>
            </svg>

            <svg class="bg-shape2" viewBox="0 0 178 138">
              <path fill="#fff" d="M26.386 103.374C-14.708 79.891-.175 60.583 18.869 34.491c43.6-58.446 66.15-36.529 139.819 20.352 73.668 56.88-88.202 102.802-73.668 74.623 14.533-28.18-17.54-2.61-58.634-26.092Z"/>
            </svg>

            <style>
              .controls {
                position: relative;
                z-index: 1;
                box-sizing: border-box;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding: 16px 16px 6px;
              }

              [breakpointmd] .controls {
                min-height: 84px;
                display: grid;
                align-items: center;
                grid-template-columns: repeat(3, 1fr);
                padding: 16px;
              }

              .info {
                display: grid;
                align-items: end;
                margin-bottom: 16px;
              }

              .info div {
                grid-area: 1 / 1;
              }

              [breakpointmd] .info {
                display: flex;
                align-items: center;
                margin-bottom: 0;
              }

              .info-text {
                position: relative;
                padding: 16px;
              }

              .info h1,
              .info h2 {
                font-family: var(--media-font-family);
                line-height: 1.2;
                margin: 0;
                font-weight: 400;
                color: var(--media-primary-color, #fff);
              }

              .title {
                font-size: 14px;
              }

              .byline {
                font-size: 14px;
                opacity: 0.6;
              }

              .info-poster {
                position: relative;
                width: 100%;
                aspect-ratio: 1;
                border-radius: 6px;
                overflow: hidden;
                box-shadow:
                  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                  rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
                  rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
              }

              [breakpointmd] .info-poster {
                width: 52px;
              }

              slot[name='poster']::slotted(*) {
                object-fit: cover;
                aspect-ratio: 1;
              }

              .poster-gradient {
                --gradient-steps: hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%,
                  hsl(0 0% 0% / 0.104) 22.5%, hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%,
                  hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%, hsl(0 0% 0% / 0.55) 52.9%,
                  hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
                  hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%,
                  hsl(0 0% 0%) 100%;

                position: absolute;
                bottom: 0;
                width: 100%;
                height: 100px;
                background: linear-gradient(to bottom, var(--gradient-steps));
              }

              [breakpointmd] .poster-gradient {
                display: none;
              }
            </style>
            <div class="controls">
              <div class="info">
                <div class="info-poster">
                  <slot name="poster"></slot>
                  <div class="poster-gradient"></div>
                </div>
                <div class="info-text">
                  <template if="mediatitle">
                    <h1 class="title">{{mediatitle}}</h1>
                  </template>
                  <template if="mediabyline">
                    <h2 class="byline">{{mediabyline}}</h2>
                  </template>
                </div>
              </div>

              <!-- Control Bar -->
              <style>
                media-control-bar {
                  margin: auto;
                }
              </style>
              <media-control-bar>
                <!-- Playback Rate -->
                <media-playback-rate-button class="media-button"></media-playback-rate-button>

                <!-- Seek Backward -->
                <media-seek-backward-button class="media-button" seekoffset="10">
                  <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 32 32"
                  >
                    <path d="m10 13 3-3" />
                    <path
                      stroke="none"
                      fill="currentColor"
                      d="m11.88 16.08-.95 5.793H9.72l.76-4.631h-.033L9 18.074l.179-1.087 1.564-.908h1.137ZM14.12 22c-.48 0-.874-.119-1.18-.356-.308-.24-.518-.585-.63-1.036-.11-.45-.112-.993-.008-1.626.106-.632.288-1.17.545-1.616.259-.445.58-.783.96-1.015A2.441 2.441 0 0 1 15.101 16c.477 0 .87.117 1.177.35.307.235.517.573.631 1.016.116.444.121.982.017 1.616-.104.635-.286 1.178-.545 1.629-.259.449-.58.793-.964 1.033a2.412 2.412 0 0 1-1.296.356Zm.168-1.016c.33 0 .619-.167.867-.5.247-.334.426-.835.536-1.502.072-.438.088-.803.047-1.095-.039-.294-.127-.515-.265-.662a.698.698 0 0 0-.534-.22c-.325 0-.614.165-.866.497-.25.33-.428.823-.536 1.48-.073.445-.089.816-.048 1.114.041.296.13.519.269.668.138.147.314.22.53.22Z"
                    />
                    <path
                      d="M19.277 22h2.017c.39 0 .706-.432.706-.964v-7.072c0-.532-.316-.964-.706-.964H10"
                    />
                  </svg>
                </media-seek-backward-button>

                <!-- Play/Pause -->
                <style>
                  @keyframes bounce-scale-play {
                    0% {
                      transform: scale(0.75, 0.75);
                    }
                    50% {
                      transform: scale(115%, 115%);
                    }
                    100% {
                      transform: scale(1, 1);
                    }
                  }

                  media-play-button #icon-play {
                    opacity: 0;
                    transform-box: view-box;
                    transform-origin: center center;
                    transform: scale(0.5, 0.5);
                    transition: all 0.5s;
                  }

                  media-play-button[mediapaused] #icon-play {
                    opacity: 1;
                    transform: scale(1, 1);
                    animation: 0.35s bounce-scale-play ease-in-out;
                  }

                  @keyframes bounce-pause-left {
                    0% {
                      font-size: 10px;
                    }
                    50% {
                      font-size: 3px;
                    }
                    100% {
                      font-size: 4px;
                    }
                  }

                  @keyframes bounce-pause-right {
                    0% {
                      font-size: 10px;
                      transform: translateX(-8px);
                    }
                    50% {
                      font-size: 3px;
                      transform: translateX(1px);
                    }
                    100% {
                      font-size: 4px;
                      transform: translateX(0);
                    }
                  }

                  media-play-button #pause-left,
                  media-play-button #pause-right {
                    /* Using font-size to animate height because using scale was resulting in unexpected positioning */
                    font-size: 4px;
                    opacity: 1;
                    transform: translateX(0);
                    transform-box: view-box;
                  }

                  media-play-button:not([mediapaused]) #pause-left {
                    animation: 0.3s bounce-pause-left ease-out;
                  }

                  media-play-button:not([mediapaused]) #pause-right {
                    animation: 0.3s bounce-pause-right ease-out;
                  }

                  media-play-button[mediapaused] #pause-left,
                  media-play-button[mediapaused] #pause-right {
                    opacity: 0;
                    font-size: 10px;
                  }

                  media-play-button[mediapaused] #pause-right {
                    transform-origin: right center;
                    transform: translateX(-8px);
                  }
                </style>
                <media-play-button mediapaused class="media-button">
                  <svg slot="icon" viewBox="0 0 32 32">
                    <g>
                      <path
                        id="icon-play"
                        d="M20.7131 14.6976C21.7208 15.2735 21.7208 16.7265 20.7131 17.3024L12.7442 21.856C11.7442 22.4274 10.5 21.7054 10.5 20.5536L10.5 11.4464C10.5 10.2946 11.7442 9.57257 12.7442 10.144L20.7131 14.6976Z"
                      />
                    </g>
                    <g id="icon-pause">
                      <rect id="pause-left" x="10.5" width="1em" y="10.5" height="11" rx="0.5" />
                      <rect id="pause-right" x="17.5" width="1em" y="10.5" height="11" rx="0.5" />
                    </g>
                  </svg>
                </media-play-button>

                <!-- Seek Forward -->
                <media-seek-forward-button class="media-button" seekoffset="10">
                  <svg slot="icon" viewBox="0 0 32 32">
                    <path d="m22 13-3-3" />
                    <path
                      stroke="none"
                      fill="currentColor"
                      d="m17.88 16.08-.95 5.793h-1.21l.76-4.631h-.033L15 18.074l.179-1.087 1.564-.908h1.137ZM20.12 22c-.48 0-.874-.119-1.18-.356-.308-.24-.518-.585-.63-1.036-.11-.45-.112-.993-.008-1.626.106-.632.288-1.17.545-1.616.259-.445.58-.783.96-1.015A2.441 2.441 0 0 1 21.101 16c.477 0 .87.117 1.177.35.307.235.517.573.631 1.016.116.444.121.982.017 1.616-.104.635-.286 1.178-.545 1.629-.259.449-.58.793-.964 1.033a2.412 2.412 0 0 1-1.296.356Zm.168-1.016c.33 0 .619-.167.866-.5.248-.334.427-.835.537-1.502.073-.438.088-.803.047-1.095-.039-.294-.127-.515-.265-.662a.698.698 0 0 0-.534-.22c-.326 0-.614.165-.866.497-.25.33-.428.823-.536 1.48-.073.445-.088.816-.048 1.114.041.296.13.519.269.668.137.147.314.22.53.22Z"
                    />
                    <path
                      d="M12.723 22h-2.017c-.39 0-.706-.432-.706-.964v-7.072c0-.532.316-.964.706-.964H22"
                    />
                  </svg>
                </media-seek-forward-button>

                <!-- Volume/Mute -->
                <style>
                  media-mute-button {
                    position: relative;
                    z-index: 1;
                  }

                  media-mute-button .muted-path {
                    transition: clip-path 0.2s ease-out;
                  }

                  media-mute-button #muted-path-2 {
                    transition-delay: 0.2s;
                  }

                  media-mute-button .muted-path {
                    clip-path: inset(0);
                  }

                  media-mute-button:not([mediavolumelevel='off']) #muted-path-1 {
                    clip-path: inset(0 0 100% 0);
                  }

                  media-mute-button:not([mediavolumelevel='off']) #muted-path-2 {
                    clip-path: inset(0 0 100% 0);
                  }

                  media-mute-button .muted-path {
                    opacity: 0;
                  }

                  media-mute-button[mediavolumelevel='off'] .muted-path {
                    opacity: 1;
                  }

                  media-mute-button .vol-path {
                    opacity: 1;
                    transition: opacity 0.4s;
                  }

                  media-mute-button[mediavolumelevel='off'] .vol-path {
                    opacity: 0;
                  }

                  media-mute-button[mediavolumelevel='low'] #vol-high-path,
                  media-mute-button[mediavolumelevel='medium'] #vol-high-path {
                    opacity: 0;
                  }
                </style>
                <media-mute-button class="media-button">
                  <svg slot="icon" viewBox="0 0 32 32">
                    <g id="vol-paths">
                      <path
                        id="speaker-path"
                        d="M16.5 20.486v-8.972c0-1.537-2.037-2.08-2.802-.745l-1.026 1.79a2.5 2.5 0 0 1-.8.85l-1.194.78A1.5 1.5 0 0 0 10 15.446v1.11c0 .506.255.978.678 1.255l1.194.782a2.5 2.5 0 0 1 .8.849l1.026 1.79c.765 1.334 2.802.792 2.802-.745Z"
                      />
                      <path
                        id="vol-low-path"
                        class="vol-path"
                        d="M18.5 18C19.6046 18 20.5 17.1046 20.5 16C20.5 14.8954 19.6046 14 18.5 14"
                      />
                      <path
                        id="vol-high-path"
                        class="vol-path"
                        d="M18 21C20.7614 21 23 18.7614 23 16C23 13.2386 20.7614 11 18 11"
                      />
                      <path id="muted-path-1" class="muted-path" d="M23 18L19 14" />
                      <path id="muted-path-2" class="muted-path" d="M23 14L19 18" />
                    </g>
                  </svg>
                </media-mute-button>

              </media-control-bar>

              <!-- Time Display -->
              <style>
                .times {
                  display: flex;
                  gap: 3px;
                  font-size: calc(0.7 * var(--base));
                }

                .time-display {
                  padding: 0;
                  line-height: 1;
                }

                [breakpointmd] .times {
                  display: block;
                }

                [breakpointmd] .time-display {
                  display: block;
                  text-align: right;
                  line-height: 1.2;
                }

                [breakpointmd] media-duration-display {
                  opacity: 0.6;
                }

                .small-time-range {
                  width: 100%;
                  height: calc(2 * var(--base));
                  border-radius: calc(0.25 * var(--base));

                  --media-range-track-backdrop-filter: invert(10%) blur(5px) brightness(110%);
                  --media-range-track-background: rgba(255, 255, 255, 0.2);
                  --media-range-track-pointer-background: rgba(255, 255, 255, 0.5);
                  --media-range-track-border-radius: calc(0.25 * var(--base));

                  --media-time-range-buffered-color: rgba(255, 255, 255, 0.4);
                  --media-range-bar-color: rgb(255, 255, 255);

                  --media-range-thumb-background: #fff;
                  --media-range-thumb-transition: opacity 0.1s linear;
                  --media-range-thumb-height: 12px;
                  --media-range-thumb-width: 12px;
                  --media-range-thumb-border-radius: 12px;
                }

                [breakpointmd] .small-time-range {
                  display: none;
                }
              </style>
              <div class="times">
                <media-time-display class="time-display"></media-time-display>
                <media-time-range class="small-time-range">
                  <span slot="preview"></span>
                </media-time-range>
                <media-duration-display class="time-display"></media-duration-display>
              </div>
            </div>

            <!-- Time Range / Progress Bar -->
            <style>
              .big-time-range {
                --media-range-track-height: 4px;
                --media-range-track-background: rgba(255, 255, 255, 0.25);
                --media-range-track-pointer-background: rgba(255, 255, 255, 0.5);
                --media-time-range-buffered-color: rgba(255, 255, 255, 0.3);
                --media-range-track-box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.07);
                --media-range-padding-left: 0;
                --media-range-padding-right: 0;
                --media-preview-time-background: var(--_secondary-color);
                --media-preview-box-margin: 0 0 3px;
                --media-range-thumb-transform: translateY(-3px);
                --media-range-thumb-height: 12px;
                --media-range-thumb-width: 6px;
                --media-range-thumb-border-radius: 2px;

                display: none;
                position: absolute;
                left: 15px;
                width: calc(100% - 30px);
                height: 10px;
                bottom: -3px;
              }

              [breakpointmd] .big-time-range {
                display: block;
              }

              media-preview-time-display {
                font-size: calc(0.65 * var(--base));
                line-height: 1;
              }
            </style>
            <media-time-range class="big-time-range">
              <media-preview-time-display slot="preview"></media-preview-time-display>
            </media-time-range>
          </media-controller>` }}
      />

      <MediaTheme
        template="media-theme-sutro-audio"
        style={{ "--media-primary-color": "#dedede", "--media-secondary-color": "#ef8d2f", "--media-accent-color": "#231816" }}
      >
        <video
          slot="media"
          src="https://stream.mux.com/fXNzVtmtWuyz00xnSrJg4OJH6PyNo6D02UzmgeKGkP5YQ/low.mp4"
          playsInline
          crossOrigin="anonymous"
        ></video>
      </MediaTheme>
    </>
  );
}