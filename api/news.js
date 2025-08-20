// api/news.js

export default async function handler(req, res) {
  const { country = "in", category = "general", page = 1, pageSize = 10 } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

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

    const articles = (data.news || []).map((item) => ({
      title: item.title,
      description: item.text,
      url: item.url,
      urlToImage: item.image || "https://via.placeholder.com/300x200",
      publishedAt: item.publish_date,
      author: item.author || "Unknown",
      source: { name: item.source || "World News" },
    }));

    return res.status(200).json({
      status: "ok",
      totalResults: data.totalResults || articles.length,
      articles,
    });
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
}
