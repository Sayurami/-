// githubStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkGitHubRepo = async (repoUrl) => {
  // Extract repo path from URL
  const repoPath = repoUrl.replace(/^https?:\/\/github.com\//i, '').replace(/\/$/, '');
  const apiUrl = `https://bk9.fun/stalk/githubrepo?url=https://github.com/${encodeURIComponent(repoPath)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`GitHub Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.BK9) {
      throw new Error("Invalid GitHub Stalk API response structure");
    }

    const repo = data.BK9;
    
    return {
      repo: {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        isPrivate: repo.private,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        size: repo.size,
        stars: repo.stargazers_count,
        watchers: repo.watchers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        language: repo.language,
        license: repo.license,
        defaultBranch: repo.default_branch,
        visibility: repo.visibility,
        topics: repo.topics,
        cloneUrls: {
          https: repo.clone_url,
          ssh: repo.ssh_url,
          git: repo.git_url
        }
      },
      owner: {
        username: repo.owner.login,
        id: repo.owner.id,
        avatar: repo.owner.avatar_url,
        profileUrl: repo.owner.html_url,
        type: repo.owner.type
      },
      urls: {
        issues: repo.issues_url.replace('{/number}', ''),
        pulls: repo.pulls_url.replace('{/number}', ''),
        contributors: repo.contributors_url,
        languages: repo.languages_url,
        stargazers: repo.stargazers_url
      },
      features: {
        hasIssues: repo.has_issues,
        hasProjects: repo.has_projects,
        hasWiki: repo.has_wiki,
        hasPages: repo.has_pages,
        hasDownloads: repo.has_downloads,
        isTemplate: repo.is_template,
        allowForking: repo.allow_forking
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk GitHub repository: ${error.message}`);
  }
};

module.exports = { stalkGitHubRepo };
