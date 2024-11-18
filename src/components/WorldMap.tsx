// import React, { useEffect, useRef } from 'react';
// import { SunriseData } from '../types';

// interface WorldMapProps {
//   sunriseData: SunriseData[];
// }

// const WorldMap: React.FC<WorldMapProps> = ({ sunriseData }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // Helper function to draw a cute worm
//   const drawWorm = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
//     // Save context state
//     ctx.save();

//     // Body
//     ctx.fillStyle = '#ff9f43';
//     ctx.beginPath();
//     ctx.ellipse(x, y, size * 0.5, size, 0, 0, Math.PI * 2);
//     ctx.fill();

//     // Eyes
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(x + size * 0.2, y - size * 0.3, size * 0.2, 0, Math.PI * 2);
//     ctx.arc(x + size * 0.2, y + size * 0.3, size * 0.2, 0, Math.PI * 2);
//     ctx.fill();

//     // Pupils
//     ctx.fillStyle = 'black';
//     ctx.beginPath();
//     ctx.arc(x + size * 0.3, y - size * 0.3, size * 0.1, 0, Math.PI * 2);
//     ctx.arc(x + size * 0.3, y + size * 0.3, size * 0.1, 0, Math.PI * 2);
//     ctx.fill();

//     // Smile
//     ctx.strokeStyle = '#e17055';
//     ctx.lineWidth = size * 0.1;
//     ctx.beginPath();
//     ctx.arc(x - size * 0.1, y, size * 0.3, 0.1 * Math.PI, 0.9 * Math.PI);
//     ctx.stroke();

//     // Restore context state
//     ctx.restore();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const img = new Image();
//     img.src = 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=2070';

//     img.onload = () => {
//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw world map with slight dimming for better contrast
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Calculate terminator points
//       const now = new Date();
//       const julianDate = (now.getTime() / 86400000) + 2440587.5;
//       const SECONDS_IN_DAY = 86400;
//       const time = (now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()) / SECONDS_IN_DAY;

//       // Collect terminator points for worm placement
//       const terminatorPoints: Array<{ x: number, y: number }> = [];
//       for (let lat = -90; lat <= 90; lat += 10) {
//         const lng = calculateSunriseLongitude(lat, julianDate, time);
//         const x = ((lng + 180) / 360) * canvas.width;
//         const y = ((90 - lat) / 180) * canvas.height;
//         terminatorPoints.push({ x, y });
//       }

//       // Draw glow effect
//       ctx.beginPath();
//       ctx.strokeStyle = 'rgba(255, 200, 50, 0.2)';
//       ctx.lineWidth = 8;
//       drawTerminatorPath(ctx, canvas.width, canvas.height, julianDate, time);
//       ctx.stroke();

//       // Draw main line
//       ctx.beginPath();
//       ctx.strokeStyle = 'rgba(255, 200, 50, 0.8)';
//       ctx.lineWidth = 3;
//       drawTerminatorPath(ctx, canvas.width, canvas.height, julianDate, time);
//       ctx.stroke();

//       // Draw worms along terminator line
//       terminatorPoints.forEach((point, index) => {
//         if (index % 2 === 0) { // Draw every other point to avoid overcrowding
//           drawWorm(ctx, point.x, point.y, 12);
//         }
//       });

//       // Draw city markers with glow effect
//       sunriseData.forEach(data => {
//         const x = ((data.city.longitude + 180) / 360) * canvas.width;
//         const y = ((90 - data.city.latitude) / 180) * canvas.height;

//         // Glow effect
//         ctx.beginPath();
//         ctx.arc(x, y, 6, 0, Math.PI * 2);
//         ctx.fillStyle = data.progress > 0 && data.progress < 100
//           ? 'rgba(251, 191, 36, 0.3)'
//           : 'rgba(148, 163, 184, 0.3)';
//         ctx.fill();

//         // Main marker
//         ctx.beginPath();
//         ctx.arc(x, y, 4, 0, Math.PI * 2);
//         ctx.fillStyle = data.progress > 0 && data.progress < 100 ? '#fbbf24' : '#94a3b8';
//         ctx.fill();

//         // City name label with background
//         const cityName = data.city.name;
//         ctx.font = 'bold 12px system-ui';
//         const textWidth = ctx.measureText(cityName).width;

//         // Label background
//         ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
//         ctx.fillRect(x - textWidth / 2 - 4, y - 24, textWidth + 8, 16);

//         // Label text
//         ctx.fillStyle = 'white';
//         ctx.textAlign = 'center';
//         ctx.fillText(cityName, x, y - 12);
//       });
//     };
//   }, [sunriseData]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={1024}
//       height={512}
//       className="w-full rounded-lg object-cover"
//     />
//   );
// };

// // Helper function to draw terminator path
// function drawTerminatorPath(
//   ctx: CanvasRenderingContext2D,
//   width: number,
//   height: number,
//   julianDate: number,
//   time: number
// ) {
//   for (let lat = -90; lat <= 90; lat += 1) {
//     const lng = calculateSunriseLongitude(lat, julianDate, time);
//     const x = ((lng + 180) / 360) * width;
//     const y = ((90 - lat) / 180) * height;

//     if (lat === -90) {
//       ctx.moveTo(x, y);
//     } else {
//       ctx.lineTo(x, y);
//     }
//   }
// }

// // Helper function to calculate sunrise longitude
// function calculateSunriseLongitude(lat: number, jd: number, time: number): number {
//   const RAD = Math.PI / 180;
//   const DEG = 180 / Math.PI;

//   // Calculate solar declination
//   const n = jd - 2451545.0;
//   const L = 280.460 + 0.9856474 * n;
//   const g = 357.528 + 0.9856003 * n;
//   const lambda = L + 1.915 * Math.sin(g * RAD) + 0.020 * Math.sin(2 * g * RAD);

//   const epsilon = 23.439 - 0.0000004 * n;
//   const sinDec = Math.sin(epsilon * RAD) * Math.sin(lambda * RAD);
//   const dec = Math.asin(sinDec) * DEG;

//   // Calculate hour angle
//   const latRad = lat * RAD;
//   const decRad = dec * RAD;

//   const cosH = (Math.sin(-0.83 * RAD) - Math.sin(latRad) * Math.sin(decRad)) /
//     (Math.cos(latRad) * Math.cos(decRad));

//   if (cosH < -1 || cosH > 1) return NaN;

//   const H = Math.acos(cosH) * DEG;
//   const lng = -15 * (time * 24 - 12) - H;

//   return lng;
// }

// export default WorldMap;

import React, { useEffect, useRef } from 'react';
import { SunriseData } from '../types';

interface WorldMapProps {
  sunriseData: SunriseData[];
}

const WorldMap: React.FC<WorldMapProps> = ({ sunriseData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the world map image
    const worldMapImg = new Image();
    worldMapImg.src = 'https://cdn.britannica.com/37/245037-050-79129D52/world-map-continents-oceans.jpg';

    // Load the worm image
    const wormImg = new Image();
    wormImg.src = 'https://www.giantbomb.com/a/uploads/scale_small/3/34651/3390802-worms_game_png22.png'; // replace with the actual path to your worm image

    // Draw images when they are loaded
    worldMapImg.onload = () => {
      wormImg.onload = () => {
        // Draw the world map and terminator line
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(worldMapImg, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const now = new Date();
        const julianDate = (now.getTime() / 86400000) + 2440587.5;
        const SECONDS_IN_DAY = 86400;
        const time = (now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()) / SECONDS_IN_DAY;

        const terminatorPoints: Array<{ x: number, y: number }> = [];
        for (let lat = -90; lat <= 90; lat += 10) {
          const lng = calculateSunriseLongitude(lat, julianDate, time);
          const x = ((lng + 180) / 360) * canvas.width;
          const y = ((90 - lat) / 180) * canvas.height;
          terminatorPoints.push({ x, y });
        }

        // Draw glow and main line for terminator
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 200, 50, 0.2)';
        ctx.lineWidth = 8;
        drawTerminatorPath(ctx, canvas.width, canvas.height, julianDate, time);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 200, 50, 0.8)';
        ctx.lineWidth = 3;
        drawTerminatorPath(ctx, canvas.width, canvas.height, julianDate, time);
        ctx.stroke();

        // Draw worms using worm image along the terminator line
        terminatorPoints.forEach((point, index) => {
          if (index % 2 === 0) { // Draw every other point to avoid overcrowding
            const wormSize = 24; // Adjust size as necessary
            ctx.drawImage(wormImg, point.x - wormSize / 2, point.y - wormSize / 2, wormSize, wormSize);
          }
        });

        // Draw city markers
        sunriseData.forEach(data => {
          const x = ((data.city.longitude + 180) / 360) * canvas.width;
          const y = ((90 - data.city.latitude) / 180) * canvas.height;

          // Glow effect
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = data.progress > 0 && data.progress < 100
            ? 'rgba(251, 191, 36, 0.3)'
            : 'rgba(148, 163, 184, 0.3)';
          ctx.fill();

          // Main marker
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = data.progress > 0 && data.progress < 100 ? '#fbbf24' : '#94a3b8';
          ctx.fill();

          // City name label with background
          const cityName = data.city.name;
          ctx.font = 'bold 12px system-ui';
          const textWidth = ctx.measureText(cityName).width;

          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(x - textWidth / 2 - 4, y - 24, textWidth + 8, 16);

          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText(cityName, x, y - 12);
        });
      };
    };
  }, [sunriseData]);

  return (
    <canvas
      ref={canvasRef}
      width={1024}
      height={512}
      className="w-full rounded-lg object-cover"
    />
  );
};

// Helper function to draw terminator path
function drawTerminatorPath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  julianDate: number,
  time: number
) {
  for (let lat = -90; lat <= 90; lat += 1) {
    const lng = calculateSunriseLongitude(lat, julianDate, time);
    const x = ((lng + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;

    if (lat === -90) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
}

// Helper function to calculate sunrise longitude
function calculateSunriseLongitude(lat: number, jd: number, time: number): number {
  const RAD = Math.PI / 180;
  const DEG = 180 / Math.PI;

  // Calculate solar declination
  const n = jd - 2451545.0;
  const L = 280.460 + 0.9856474 * n;
  const g = 357.528 + 0.9856003 * n;
  const lambda = L + 1.915 * Math.sin(g * RAD) + 0.020 * Math.sin(2 * g * RAD);

  const epsilon = 23.439 - 0.0000004 * n;
  const sinDec = Math.sin(epsilon * RAD) * Math.sin(lambda * RAD);
  const dec = Math.asin(sinDec) * DEG;

  // Calculate hour angle
  const latRad = lat * RAD;
  const decRad = dec * RAD;

  const cosH = (Math.sin(-0.83 * RAD) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  if (cosH < -1 || cosH > 1) return NaN;

  const H = Math.acos(cosH) * DEG;
  const lng = -15 * (time * 24 - 12) - H;

  return lng;
}

export default WorldMap; 