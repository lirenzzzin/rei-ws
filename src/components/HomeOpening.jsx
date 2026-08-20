import { useEffect, useState } from "react";
import AnimatedLink from "./AnimatedLink";
import Container from "./Container";

// A hero B usa fontes distintas por contexto. O poster continua sendo a
// fonte de verdade quando o vídeo não pode tocar ou a preferência reduz motion.
const desktopPoster = new URL(
  "../../assets/novidades/endframe_air.jpg",
  import.meta.url,
).href;
const mobilePoster = new URL(
  "../../assets/home/hero/iphone-air-in-hand-transparent.png",
  import.meta.url,
).href;
const campaignVideo = new URL(
  "../../assets/novidades/air.mp4",
  import.meta.url,
).href;

function HomeOpening() {
  const [isReady, setIsReady] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // O frame seguinte deixa o estado inicial pintado antes do reveal curto.
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="home-opening"
      aria-labelledby="home-opening-title"
      data-campaign-state={isReady ? "ready" : "pending"}
      data-video-ended={videoEnded ? "true" : "false"}
    >
      <Container className="home-opening-layout">
        <div className="home-opening-copy" data-campaign-copy>
          <p className="type-eyebrow text-muted">Encontre o que muda para você</p>
          <h1 id="home-opening-title">
            <span>Não escolha pelo número.</span>{" "}
            <span>Escolha pelo que muda</span>{" "}
            <span>para você.</span>
          </h1>
          <p>
            Compare gerações, tamanhos e acabamentos com contexto, sem transformar
            a escolha em uma ficha técnica.
          </p>
          <div className="home-opening-actions">
            <AnimatedLink
              href="/catalogo"
              transitionType="nav-forward"
              className="home-opening-cta"
            >
              Começar comparação <span aria-hidden="true">→</span>
            </AnimatedLink>
            <a className="home-opening-continuation" href="#novidades">
              Ver os modelos <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </Container>

      <div
        className="home-opening-media"
        role="img"
        aria-label="iPhone Air visto de perfil em uma composição de campanha"
      >
        <picture className="home-opening-poster">
          <source media="(max-width: 719px)" srcSet={mobilePoster} />
          <img src={desktopPoster} alt="" width="1068" height="350" />
        </picture>
        <video
          className="home-opening-video"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={desktopPoster}
          onEnded={() => setVideoEnded(true)}
          aria-hidden="true"
        >
          <source src={campaignVideo} type="video/mp4" />
        </video>
        <span className="home-opening-media-mask" aria-hidden="true" />
      </div>

      <a href="#novidades" className="home-scroll-cue">
        Role para descobrir <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}

export default HomeOpening;
