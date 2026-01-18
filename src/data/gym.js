// src/data/gyms.js
// NOTE:
// - No copyrighted photos embedded
// - Real official links provided for photos & location
// - External ratings shown as context only

function svgDataUri(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
  
  function letterLogo(name) {
    const initials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
  
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3b82f6"/>
          <stop offset="1" stop-color="#22c55e"/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="22" fill="url(#g)"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="34" font-weight="800" fill="white">${initials}</text>
    </svg>`;
  
    return svgDataUri(svg);
  }
  
  export const gyms = [
    {
      id: "central-rock-orlando",
      name: "Central Rock Gym – Orlando",
      location: "Orlando, FL",
      website: "https://centralrockgym.com/orlando/",
      galleryUrl: "https://centralrockgym.com/orlando/",
      instagramUrl: "https://www.instagram.com/centralrockorlando/",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Central+Rock+Gym+Orlando",
      logoUrl: letterLogo("Central Rock"),
      tags: ["Bouldering", "Top Rope", "Training"],
      heroNote:
        "Large modern climbing gym offering bouldering, ropes, classes, and a strong training environment.",
      externalRatings: [
        { source: "Google (external)", rating: 4.8 },
      ],
    },
  
    {
      id: "blue-swan-boulders",
      name: "Blue Swan Boulders",
      location: "Orlando, FL",
      website: "https://blueswanboulders.com/",
      galleryUrl: "https://blueswanboulders.com/",
      instagramUrl: "https://www.instagram.com/blueswanboulders/",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Blue+Swan+Boulders+Orlando",
      logoUrl: letterLogo("Blue Swan"),
      tags: ["Bouldering", "Training"],
      heroNote:
        "Bouldering-only gym with frequent resets, community events, and a strong local following.",
      externalRatings: [
        { source: "Google (external)", rating: 4.7 },
      ],
    },
  
    {
      id: "rox-lake-nona",
      name: "ROX Climbing Gym (Lake Nona)",
      location: "Orlando, FL",
      website:
        "https://lakenonaperformanceclub.com/program/rox-climbing-gym/",
      galleryUrl:
        "https://lakenonaperformanceclub.com/program/rox-climbing-gym/",
      instagramUrl: "https://www.instagram.com/lakenonaperformanceclub/",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=ROX+Climbing+Gym+Lake+Nona",
      logoUrl: letterLogo("ROX"),
      tags: ["Bouldering", "Top Rope", "Lead", "Training"],
      heroNote:
        "Full-service climbing gym inside Lake Nona Performance Club with ropes, bouldering, and training.",
      externalRatings: [
        { source: "Google (external)", rating: 4.7 },
      ],
    },
  
    {
      id: "high-point-orlando",
      name: "High Point Climbing & Fitness – Orlando",
      location: "Orlando, FL",
      website:
        "https://www.highpointclimbing.com/locations/orlando",
      galleryUrl:
        "https://www.highpointclimbing.com/locations/orlando",
      instagramUrl: "https://www.instagram.com/highpointclimbing/",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=High+Point+Climbing+Orlando",
      logoUrl: letterLogo("High Point"),
      tags: ["Bouldering", "Top Rope", "Lead", "Training"],
      heroNote:
        "Massive climbing and fitness facility with tall rope walls, bouldering, and extensive training areas.",
      externalRatings: [
        { source: "Google (external)", rating: 4.5 },
      ],
    },
  
    {
      id: "aiguille-longwood",
      name: "Aiguille Rock Climbing Center",
      location: "Longwood, FL",
      website: "https://www.aiguille.com/",
      galleryUrl: "https://www.aiguille.com/",
      instagramUrl: "https://www.instagram.com/aiguilleclimbing/",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Aiguille+Rock+Climbing+Center",
      logoUrl: letterLogo("Aiguille"),
      tags: ["Bouldering", "Top Rope", "Training"],
      heroNote:
        "One of Central Florida’s longest-running climbing gyms, offering ropes, bouldering, and instruction.",
      externalRatings: [
        { source: "Google (external)", rating: 4.1 },
      ],
    },
  ];