const fetch = require("node-fetch");

async function githubStalk(link) {
  try {
    // Validate the provided link
    if (!link || !link.includes("github.com")) {
      throw new Error("Invalid GitHub repo link provided.");
    }

    // Parse the user and repo from the URL
    const parts = link.split("/");
    const user = parts[3];
    const repo = parts[4];

    if (!user || !repo) {
      throw new Error("Unable to extract user and repository information from the link.");
    }

    // Fetch data from the API
    const response = await fetch(`https://itzpire.com/stalk/github_repo?username=${user}&repoName=${repo}`);
    const { data } = await response.json();

    // Extract relevant data
    const { name, owner, stargazers_count, forks_count, language, default_branch, visibility } = data;
    const { login: ownerLogin, avatar_url: avatar } = owner;

    // Return the formatted data
    return {
      name,
      ownerLogin,
      stars: stargazers_count,
      forks: forks_count,
      language,
      branch: default_branch,
      visibility,
      avatar,
    };
  } catch (error) {
    console.error("Error fetching GitHub repo details:", error.message);
    return null; // Return null in case of failure
  }
}

module.exports = { githubStalk };
