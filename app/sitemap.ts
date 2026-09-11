import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://connexode.com";
  const currentDate = new Date();

  const routes = [
    "",
    "/about",
    "/services",
    "/careers",
    "/community",
    "/events",
    "/contact",
    "/join",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/about" ? 0.9 : 0.8,
  }));
}
