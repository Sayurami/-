// npmStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkNpmPackage = async (packageName) => {
  const apiUrl = `https://bk9.fun/stalk/npm?package=${encodeURIComponent(packageName)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`npm Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.BK9) {
      throw new Error("Invalid npm Stalk API response structure");
    }

    const pkg = data.BK9;
    
    // Extract info from the array into a more usable format
    const infoMap = {};
    pkg.info.forEach(item => {
      const key = item.type.replace(/\s+/g, ''); // Remove spaces for cleaner keys
      infoMap[key] = item.result;
    });

    return {
      metadata: {
        package: packageName,
        //owner: data.owner,
        lastUpdated: new Date().toISOString()
      },
      packageInfo: {
        name: pkg.name,
        version: pkg.version || infoMap.Version,
        description: pkg.desc,
        license: infoMap.License,
        keywords: pkg.keywords,
        published: {
          date: pkg.date_published,
          relative: infoMap.Lastpublish,
          info: pkg.published_info
        },
        collaborators: pkg.collaborator.filter(c => c.username).map(c => c.username)
      },
      stats: {
        weeklyDownloads: parseInt(infoMap.DownloadsWeeklyDownloads.replace(/,/g, '')) || 0,
        weeklyDependents: parseInt(pkg.weekly_dependents) || 0
      },
      commands: {
        installation: pkg.installation
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk npm package: ${error.message}`);
  }
};

module.exports = { stalkNpmPackage };
