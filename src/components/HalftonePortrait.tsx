import { useEffect, useRef } from "react";

/**
 * HalftonePortrait — scroll-driven WebGL halftone portrait (no dependencies).
 *
 *  scroll 0      -> sharp continuous-tone photo
 *  scrolling down-> horizontal slice smear + fine halftone across the face,
 *                   then a dim drifting dot cloud with a faint warm haze
 *  scrolling up  -> re-forms into the sharp photo
 *  page load     -> starts as the cloud and resolves in about 1.3s
 *
 * Size and position it with CSS on the wrapper (aspect ratio 2/3, e.g.
 * height: min(78vh, 820px); aspect-ratio: 2 / 3). It never changes any other
 * element. Falls back to a plain <img> if WebGL or the shader is unavailable.
 */

const VERT = `
    attribute vec2 aPos; varying vec2 vUv;
    void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.,1.); }`;

const FRAG = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform vec2  uRes;
    uniform float uP, uTime, uDpr, uCell;

    float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
    float vnoise(vec2 p){
      vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
    }
    float lumAt(vec2 uv){ return texture2D(uTex, clamp(uv,0.001,0.999)).r; }

    void main(){
      float p = uP;
      vec2 uv = vUv;
      vec2 frag = gl_FragCoord.xy;

      float smear  = smoothstep(0.04, 0.45, p);          // slice smear strength
      float cloud  = smoothstep(0.30, 0.95, p);          // dispersal into particles
      float bandC  = 0.60 - 0.18*p;                      // band centre (eyes) drifts down
      float bandW  = mix(0.05, 0.55, smoothstep(0.0,0.8,p));
      float mask   = 1.0 - smoothstep(bandW*0.55, bandW, abs(uv.y - bandC));
      mask *= smear;

      // horizontal slice jitter + motion-blur taps inside the band
      float row = floor(uv.y*150.0);
      float jit = (hash(vec2(row, floor(uTime*6.0))) - 0.5);
      vec2 suv  = uv + vec2(jit*0.07*mask, 0.0);
      float blurW = 0.035*mask;
      float lum = 0.0;
      for(int i=-3;i<=3;i++){ lum += lumAt(suv + vec2(float(i)/3.0*blurW, 0.0)); }
      lum /= 7.0;

      // photo layer (continuous tone, gently lifted and warmed)
      float ph = pow(lum, 0.82)*1.18;
      vec3 photo = vec3(ph, ph*0.965, ph*0.925);

      // halftone / particle layer (3x3 neighbour search so dots can drift)
      float cellPx = mix(1.0, 1.44, smoothstep(0.12, 0.8, p)) * uCell * uDpr;
      vec2 cid0 = floor(frag/cellPx);
      float acc = 0.0; float amber = 0.0; float dotLum = 0.0;
      for(int j=-1;j<=1;j++){
        for(int i=-1;i<=1;i++){
          vec2 cid = cid0 + vec2(float(i),float(j));
          float r1 = hash(cid), r2 = hash(cid+7.1), r3 = hash(cid+3.7);
          vec2 drift = (vec2(r2,r3)-0.5) * cellPx * 6.5 * cloud * cloud
                     + vec2(sin(uTime*0.6+r1*6.28), cos(uTime*0.5+r2*6.28)) * cellPx*0.5*cloud;
          vec2 centre = (cid+0.5)*cellPx + drift;
          float l = lumAt(vec2(centre.x/uRes.x + jit*0.07*mask, centre.y/uRes.y));
          float lp = pow(l,0.85);
          float present = step(r1, mix(1.0, clamp(lp*2.3+0.22,0.0,1.0), cloud));
          float rad = (0.05 + 0.55*lp) * cellPx * (1.0 - 0.45*cloud*r1);
          float d = length(frag - centre);
          float a = (1.0 - smoothstep(rad-0.9, rad+0.3, d)) * present * smoothstep(0.04, 0.14, lp);
          // rim light: compare against a wider blur
          float isAmber = cloud*step(0.90, hash(cid+1.3))*0.9;
          if(a > acc){ acc = a; amber = isAmber; dotLum = lp; }
        }
      }
      vec3 cream = vec3(0.945,0.933,0.91);
      vec3 amb   = vec3(1.0,0.55,0.35);
      vec3 dots  = mix(cream*(0.60+0.50*dotLum), amb, amber) * acc;

      float hm = clamp(0.10 + mask*0.95 + smoothstep(0.35,0.7,p), 0.0, 1.0);
      float photoA = 1.0 - smoothstep(0.42, 0.85, p);
      vec3 col = photo*(1.0-hm)*photoA + dots*hm;

      // warm haze behind the head as it disperses
      vec2 hc = (uv - vec2(0.5,0.62)) * vec2(1.0,0.85);
      float hz = smoothstep(0.0,0.30,uv.x)*smoothstep(1.0,0.70,uv.x)*smoothstep(0.0,0.30,uv.y)*smoothstep(1.0,0.70,uv.y);
      float haze = exp(-pow(length(hc)/0.30, 2.0)) * hz * smoothstep(0.25,0.8,p) * (0.55+0.45*vnoise(uv*7.0+uTime*0.12));
      col += vec3(0.50,0.24,0.12) * haze * 0.40;

      col *= mix(1.0, 0.72, smoothstep(0.55,1.0,p));

      // edge and bottom fades into the page background
      float edge = smoothstep(0.0,0.07,uv.x)*smoothstep(1.0,0.93,uv.x)*smoothstep(0.0,0.30,uv.y)*smoothstep(1.0,0.90,uv.y);
      col *= edge;
      // premultiplied alpha: black is fully transparent, so no box shows on any page background
      gl_FragColor = vec4(col, max(max(col.r, col.g), col.b));
    }`;

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Pixels of scroll over which the dissolve completes. Default: 55% of viewport height. */
  scrollRange?: number;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || "shader compile failed");
  }
  return shader;
}

export default function HalftonePortrait({ src, alt = "Portrait", className, style, scrollRange }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let disposed = false;
    let running = false;
    let visible = true;
    let raf = 0;
    let p = 1;
    let target = 0;
    let intro = true;
    let introStart: number | null = null;
    let dpr = 1;
    let cell = 3.2;
    let lastW = 0;
    let lastH = 0;
    let resizeTimer = 0;
    const t0 = performance.now();

    let canvas: HTMLCanvasElement | null = null;
    let gl: WebGLRenderingContext | null = null;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    const u: Record<string, WebGLUniformLocation | null> = {};

    const showFallback = () => {
      if (disposed || host.querySelector("img")) return;
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.style.cssText = "width:100%;height:100%;object-fit:contain;display:block";
      host.appendChild(img);
    };

    const updateTarget = () => {
      if (reduced) { target = 0; return; }
      const range = scrollRange ?? window.innerHeight * 0.55;
      target = Math.min(1, Math.max(0, window.scrollY / range));
    };

    const draw = (now: number) => {
      if (!gl || !canvas) return;
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uP, p);
      gl.uniform1f(u.uTime, (now - t0) / 1000);
      gl.uniform1f(u.uDpr, dpr);
      gl.uniform1f(u.uCell, cell);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let last = 0;
    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.1, last ? (now - last) / 1000 : 0.016);
      last = now;
      if (intro) {
        if (introStart === null) introStart = now;
        const k = Math.min(1, (now - introStart) / 1300);
        p = Math.pow(1 - k, 4);               // ease-out from cloud (1) to sharp (0)
        if (k >= 1 || window.scrollY > 40) { intro = false; if (k >= 1) p = 0; }
      } else {
        p += (target - p) * (1 - Math.exp(-dt * 9));   // frame-rate independent smoothing
        if (Math.abs(target - p) < 0.0005) p = target;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (running || !gl) return; running = true; raf = requestAnimationFrame(loop); };
    const stop = () => { running = false; last = 0; cancelAnimationFrame(raf); };

    const resize = () => {
      if (!canvas || !gl) return;
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      const r = host.getBoundingClientRect();
      lastW = r.width; lastH = r.height;
      cell = Math.max(1.6, r.height / 200);          // dot pitch scales with portrait size
      canvas.width = Math.max(2, Math.round(r.width * dpr));
      canvas.height = Math.max(2, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      draw(performance.now());
    };
    const onResize = () => {
      // ignore tiny height changes (mobile address bar) so the canvas never flickers
      const r = host.getBoundingClientRect();
      if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 48) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };
    const onVisibility = () => (document.hidden ? stop() : visible && start());
    const onLost = (e: Event) => { e.preventDefault(); stop(); };

    const img = new Image();
    img.decoding = "async";
    img.onerror = showFallback;
    img.onload = () => {
      if (disposed) return;
      canvas = document.createElement("canvas");
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", alt);
      canvas.style.cssText = "width:100%;height:100%;display:block";
      gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: true });
      if (!gl) { canvas = null; showFallback(); return; }
      try {
        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link failed");
        gl.useProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "aPos");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        for (const n of ["uTex", "uRes", "uP", "uTime", "uDpr", "uCell"]) u[n] = gl.getUniformLocation(prog, n);
        gl.uniform1i(u.uTex, 0);
      } catch {
        canvas = null; gl = null; showFallback(); return;
      }
      host.appendChild(canvas);
      canvas.addEventListener("webglcontextlost", onLost);
      resize();
      updateTarget();
      if (reduced || window.scrollY > 40) { p = target; intro = false; }
      ro = new ResizeObserver(onResize);
      ro.observe(host);
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", updateTarget, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); });
      io.observe(host);
      start();
    };
    img.src = src;

    return () => {
      disposed = true;
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", updateTarget);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
      ro?.disconnect();
      canvas?.removeEventListener("webglcontextlost", onLost);
      canvas?.remove();
      host.querySelector("img")?.remove();
    };
  }, [src, alt, scrollRange]);

  return <div ref={hostRef} className={className} style={style} />;
}
