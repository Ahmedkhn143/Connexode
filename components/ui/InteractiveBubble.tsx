"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveBubble() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = -((e.clientY - rect.top) / height - 0.5);
      mouse.targetX = x * 2.0;
      mouse.targetY = y * 2.0;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener("resize", handleResize);

    // --- Vertex Shader ---
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // --- Fragment Shader (Raymarching Deformed Sphere with Glossy Fresnel Lighting) ---
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform int uIsLight;

      // 3D Noise helper for liquid morphing
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + .1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(in vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0-2.0*f);
        return mix(mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
                       mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                       mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
      }

      // SDF of deformed sphere
      float map(vec3 p) {
        float d = length(p) - 1.0;
        
        // Liquid morphing deformation using noise waves
        float wave = noise(p * 2.2 + uTime * 0.8) * 0.22;
        wave += noise(p * 4.5 - uTime * 1.2) * 0.08;
        
        // Influence of mouse position
        float mouseDist = length(p.xy - uMouse * 0.5);
        float mouseInfluence = smoothstep(1.5, 0.0, mouseDist) * 0.12;
        
        return d - wave + mouseInfluence;
      }

      // Calculate Normals
      vec3 getNormal(vec3 p) {
        vec2 e = vec2(0.001, 0.0);
        return normalize(vec3(
          map(p + e.xyy) - map(p - e.xyy),
          map(p + e.yxy) - map(p - e.yxy),
          map(p + e.yyx) - map(p - e.yyx)
        ));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - uResolution * 0.5) / min(uResolution.x, uResolution.y);
        
        // Camera setup
        vec3 ro = vec3(0.0, 0.0, 3.2); // ray origin
        vec3 rd = normalize(vec3(uv, -1.0)); // ray direction
        
        float t = 0.0;
        vec3 p;
        bool hit = false;
        
        // Raymarching loop
        for(int i = 0; i < 40; i++) {
          p = ro + rd * t;
          float d = map(p);
          if (d < 0.001) {
            hit = true;
            break;
          }
          t += d;
          if (t > 5.0) break;
        }
        
        vec4 color = vec4(0.0); // transparent background
        
        if (hit) {
          vec3 normal = getNormal(p);
          vec3 viewDir = normalize(ro - p);
          
          // Light direction (follows the mouse slightly)
          vec3 lightDir = normalize(vec3(uMouse, 1.5));
          
          // Lighting components
          float diffuse = max(dot(normal, lightDir), 0.0);
          
          // Specular highlights (glossy look)
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
          
          // Fresnel (edge glow)
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
          
          // Theme Color selection
          vec3 baseColor;
          vec3 glowColor;
          
          if (uIsLight == 1) {
            // Light Theme: Glossy Cyan-Teal/Slate glass
            baseColor = mix(vec3(0.03, 0.57, 0.7), vec3(0.49, 0.13, 0.8), normal.y * 0.5 + 0.5);
            glowColor = vec3(0.0, 0.75, 0.85);
          } else {
            // Dark Theme: Glowing Cyber neon Cyan/Purple
            baseColor = mix(vec3(0.0, 0.96, 1.0), vec3(0.66, 0.33, 0.97), normal.y * 0.5 + 0.5);
            glowColor = vec3(0.0, 0.96, 1.0);
          }
          
          vec3 finalColor = baseColor * (diffuse * 0.4 + 0.3);
          finalColor += vec3(1.0) * spec * 0.7; // white specular highlight
          finalColor += glowColor * fresnel * 0.6; // outer glowing rim
          
          color = vec4(finalColor, 0.92);
        }
        
        gl_FragColor = color;
      }
    `;

    // Helper: compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation failed: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Create Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed.");
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering screen)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uIsLightLoc = gl.getUniformLocation(program, "uIsLight");

    gl.viewport(0, 0, width, height);

    let startTime = Date.now();

    // Render Loop
    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001;

      // Smooth mouse interpolation for liquid feel
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass uniforms
      gl.uniform2f(uResolutionLoc, width, height);
      gl.uniform1f(uTimeLoc, currentTime);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform1i(uIsLightLoc, theme === "light" ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block bg-transparent"
    />
  );
}
