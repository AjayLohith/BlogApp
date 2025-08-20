// api/news.js

export default async function handler(req, res) {
  // Query params from frontend
  const { country = "us", category = "general", page = 1, pageSize = 20 } = req.query;

  try {
    // Call NewsAPI from the backend
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`
    );

    const data = await response.json();

    // Handle NewsAPI errors
    if (data.status === "error") {
      return res.status(400).json({ error: data.message });
    }

    // Send back JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
