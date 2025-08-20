// api/news.js

export default async function handler(req, res) {
  const { country = "in", category = "general", page = 1, pageSize = 10 } = req.query;

  const apiKey = process.env.WORLDNEWS_API_KEY;

  // World News API uses "source-country" for country filter
  // category filtering works with "topic" param (optional)
  let url = `https://api.worldnewsapi.com/top-news?source-country=${country}&language=en&page=${page}&number=${pageSize}`;

  if (category && category !== "general") {
    url += `&topic=${category}`;
  }

  try {
    const response = await fetch(url, {
      headers: { "x-api-key": apiKey },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news");
    }

    return res.status(200).json({
      status: "ok",
      totalResults: data.totalResults || 0,
      articles: data.news || [],
    });
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
}
