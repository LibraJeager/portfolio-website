import { useEffect, useRef } from "react";
import * as THREE from "three";

function parseCssRgb(value, fallback = "241, 236, 227") {
  const source = (value || fallback)
    .split(",")
    .map((part) => Number.parseFloat(part.trim()))
    .filter((part) => Number.isFinite(part));

  const [r = 241, g = 236, b = 227] = source;
  return new THREE.Vector3(r / 255, g / 255, b / 255);
}

function createRenderTarget(width, height) {
  return new THREE.WebGLRenderTarget(width, height, {
    depthBuffer: false,
    stencilBuffer: false,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType,
  });
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simulationFragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uPrev;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec2 uDelta;
  uniform vec3 uTint;
  uniform float uSpeed;
  uniform float uActive;
  uniform float uRadius;
  uniform float uDissipation;

  void main() {
    vec2 texel = 1.0 / uResolution;

    vec2 flow = uDelta * (0.9 + uSpeed * 1.8);

    vec4 prev = texture2D(uPrev, vUv - flow * 0.8);
    vec4 blur = prev * 0.42;
    blur += texture2D(uPrev, vUv + vec2(texel.x, 0.0)) * 0.14;
    blur += texture2D(uPrev, vUv - vec2(texel.x, 0.0)) * 0.14;
    blur += texture2D(uPrev, vUv + vec2(0.0, texel.y)) * 0.14;
    blur += texture2D(uPrev, vUv - vec2(0.0, texel.y)) * 0.14;

    vec3 baseColor = blur.rgb * uDissipation;
    float baseAlpha = blur.a * (uDissipation - 0.004);

    vec2 p = vUv - uPointer;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    p.x *= aspect;

    vec2 dir = normalize(uDelta + vec2(0.00001, 0.0));
    vec2 perp = vec2(-dir.y, dir.x);

    float along = dot(p, dir);
    float across = dot(p, perp);

    float head = exp(
      - (along * along) / max(uRadius * uRadius * 0.26, 0.000001)
      - (across * across) / max(uRadius * uRadius * 0.10, 0.000001)
    );

    float tail = exp(
      - ((along + uRadius * (4.0 + uSpeed * 6.0)) * (along + uRadius * (4.0 + uSpeed * 6.0)))
        / max(uRadius * uRadius * (7.0 + uSpeed * 10.0), 0.000001)
      - (across * across) / max(uRadius * uRadius * 0.18, 0.000001)
    );

    float energy = (head * 0.9 + tail * 0.55) * uActive;

    vec3 injected = uTint * energy * (0.07 + uSpeed * 0.10);
    float injectedAlpha = energy * (0.12 + uSpeed * 0.16);

    vec3 color = baseColor + injected;
    float alpha = clamp(baseAlpha + injectedAlpha, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

const displayFragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uOpacity;

  void main() {
    vec2 texel = 1.0 / uResolution;

    vec4 c = texture2D(uTexture, vUv);
    vec4 b = c * 0.46;
    b += texture2D(uTexture, vUv + vec2(texel.x, 0.0)) * 0.135;
    b += texture2D(uTexture, vUv - vec2(texel.x, 0.0)) * 0.135;
    b += texture2D(uTexture, vUv + vec2(0.0, texel.y)) * 0.135;
    b += texture2D(uTexture, vUv - vec2(0.0, texel.y)) * 0.135;

    vec3 color = mix(c.rgb, b.rgb, 0.7) * 0.88;
    float density = max(max(color.r, color.g), color.b);
    float alpha = smoothstep(0.02, 0.34, max(b.a, density * 0.75)) * uOpacity;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function WebGLSmoke() {
  const hostRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const host = hostRef.current;
    if (!host) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cleanup = () => {};

    const mount = () => {
      cleanup();

      if (!pointerQuery.matches || motionQuery.matches) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.domElement.className = "webgl-smoke-layer is-visible";
      host.appendChild(renderer.domElement);

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);

      const simulationScene = new THREE.Scene();
      const displayScene = new THREE.Scene();

      const simulationUniforms = {
        uPrev: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uDelta: { value: new THREE.Vector2(0, 0) },
        uTint: { value: parseCssRgb("241, 236, 227") },
        uSpeed: { value: 0 },
        uActive: { value: 0 },
        uRadius: { value: 0.034 },
        uDissipation: { value: 0.975 },
      };

      const displayUniforms = {
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uOpacity: { value: 0.34 },
      };

      const simulationMaterial = new THREE.ShaderMaterial({
        uniforms: simulationUniforms,
        vertexShader,
        fragmentShader: simulationFragmentShader,
        transparent: false,
      });

      const displayMaterial = new THREE.ShaderMaterial({
        uniforms: displayUniforms,
        vertexShader,
        fragmentShader: displayFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      simulationScene.add(new THREE.Mesh(geometry, simulationMaterial));
      displayScene.add(new THREE.Mesh(geometry, displayMaterial));

      let readTarget = createRenderTarget(1, 1);
      let writeTarget = createRenderTarget(1, 1);

      const pointer = {
        targetX: window.innerWidth * 0.5,
        targetY: window.innerHeight * 0.5,
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5,
        prevX: window.innerWidth * 0.5,
        prevY: window.innerHeight * 0.5,
        intensity: 0,
      };

      let rafId = 0;

      const syncTheme = () => {
        const styles = getComputedStyle(document.documentElement);
        const tint = styles.getPropertyValue("--smoke-particle").trim() || "241, 236, 227";
        const opacity =
          Number.parseFloat(styles.getPropertyValue("--smoke-canvas-opacity")) || 0.34;

        simulationUniforms.uTint.value.copy(parseCssRgb(tint));
        displayUniforms.uOpacity.value = opacity;
      };

      const themeObserver = new MutationObserver(syncTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        renderer.setSize(w, h, false);

        const simW = Math.max(180, Math.floor(w * 0.22));
        const simH = Math.max(110, Math.floor(h * 0.22));

        readTarget.setSize(simW, simH);
        writeTarget.setSize(simW, simH);

        simulationUniforms.uResolution.value.set(simW, simH);
        displayUniforms.uResolution.value.set(simW, simH);
      };

      const clearTargets = () => {
        renderer.setRenderTarget(readTarget);
        renderer.clear();
        renderer.setRenderTarget(writeTarget);
        renderer.clear();
        renderer.setRenderTarget(null);
      };

      const swapTargets = () => {
        const temp = readTarget;
        readTarget = writeTarget;
        writeTarget = temp;
      };

      const onPointerMove = (event) => {
        pointer.targetX = event.clientX;
        pointer.targetY = event.clientY;
        pointer.intensity = Math.min(pointer.intensity + 0.16, 1);
      };

      const onLeave = () => {
        pointer.intensity *= 0.7;
      };

      const render = () => {
        pointer.x += (pointer.targetX - pointer.x) * 0.22;
        pointer.y += (pointer.targetY - pointer.y) * 0.22;

        const dx = pointer.x - pointer.prevX;
        const dy = pointer.y - pointer.prevY;
        const speedPx = Math.hypot(dx, dy);
        const speed = Math.min(speedPx / 52, 1);

        pointer.intensity = Math.max(pointer.intensity * 0.93, speed * 0.85);

        simulationUniforms.uPrev.value = readTarget.texture;
        simulationUniforms.uPointer.value.set(
          pointer.x / Math.max(window.innerWidth, 1),
          1 - pointer.y / Math.max(window.innerHeight, 1)
        );
        simulationUniforms.uDelta.value.set(
          dx / Math.max(window.innerWidth, 1),
          -dy / Math.max(window.innerHeight, 1)
        );
        simulationUniforms.uSpeed.value = speed;
        simulationUniforms.uActive.value = pointer.intensity;
        simulationUniforms.uRadius.value = 0.022 + speed * 0.026;

        renderer.setRenderTarget(writeTarget);
        renderer.render(simulationScene, camera);
        renderer.setRenderTarget(null);

        swapTargets();

        displayUniforms.uTexture.value = readTarget.texture;
        renderer.render(displayScene, camera);

        pointer.prevX = pointer.x;
        pointer.prevY = pointer.y;

        rafId = window.requestAnimationFrame(render);
      };

      syncTheme();
      resize();
      clearTargets();
      rafId = window.requestAnimationFrame(render);

      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("blur", onLeave);
      document.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("blur", onLeave);
        document.removeEventListener("mouseleave", onLeave);

        themeObserver.disconnect();

        readTarget.dispose();
        writeTarget.dispose();
        geometry.dispose();
        simulationMaterial.dispose();
        displayMaterial.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    };

    mount();

    const handleMediaChange = () => mount();

    if (pointerQuery.addEventListener) {
      pointerQuery.addEventListener("change", handleMediaChange);
      motionQuery.addEventListener("change", handleMediaChange);
    } else {
      pointerQuery.addListener(handleMediaChange);
      motionQuery.addListener(handleMediaChange);
    }

    return () => {
      if (pointerQuery.removeEventListener) {
        pointerQuery.removeEventListener("change", handleMediaChange);
        motionQuery.removeEventListener("change", handleMediaChange);
      } else {
        pointerQuery.removeListener(handleMediaChange);
        motionQuery.removeListener(handleMediaChange);
      }
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" />;
}