export const analyticsAPI = {
  async fetchGitHubData() {
    try {
      const response = await fetch(
        'https://api.github.com/repos/microsoft/vscode/stats/contributors'
      );
      if (!response.ok) throw new Error('GitHub API limit reached');
      return response.json();
    } catch (error) {
      // Fallback to another API if GitHub fails
      return null;
    }
  },

  async fetchCryptoData() {
    try {
      const response = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json'
      );
      if (!response.ok) throw new Error('Failed to fetch crypto data');
      return response.json();
    } catch (error) {
      return null;
    }
  },

  async fetchJSONPlaceholderAnalytics() {
    try {
      const [posts, users, comments, albums] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts').then((r) =>
          r.json()
        ),
        fetch('https://jsonplaceholder.typicode.com/users').then((r) =>
          r.json()
        ),
        fetch('https://jsonplaceholder.typicode.com/comments').then((r) =>
          r.json()
        ),
        fetch('https://jsonplaceholder.typicode.com/albums').then((r) =>
          r.json()
        ),
      ]);
      return { posts, users, comments, albums };
    } catch (error) {
      throw new Error('Failed to fetch analytics data');
    }
  },

  async fetchQuoteData() {
    try {
      const response = await fetch('https://api.quotable.io/quotes?limit=50');
      if (!response.ok) throw new Error('Failed to fetch quotes');
      return response.json();
    } catch (error) {
      return null;
    }
  },
};

export const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};
