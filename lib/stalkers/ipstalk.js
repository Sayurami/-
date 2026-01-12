// ipStalkService.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const stalkIpAddress = async (ipAddress) => {
  const apiUrl = `https://bk9.fun/stalk/ip?q=${encodeURIComponent(ipAddress)}`;
  
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`IP Stalk API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.status || !data.BK9) {
      throw new Error("Invalid IP Stalk API response structure");
    }

    const ipInfo = data.BK9;
    
    return {
      metadata: {
        ip: ipAddress,
        cached: ipInfo.cached || false,
        cacheTimestamp: ipInfo.cacheTimestamp ? new Date(ipInfo.cacheTimestamp * 1000).toISOString() : null,
        lastUpdated: new Date().toISOString()
      },
      location: {
        continent: ipInfo.continent,
        country: ipInfo.country,
        countryCode: ipInfo.countryCode,
        region: ipInfo.regionName,
        city: ipInfo.city,
        zipCode: ipInfo.zip,
        coordinates: {
          latitude: ipInfo.lat,
          longitude: ipInfo.lon
        },
        timezone: ipInfo.timezone,
        currency: ipInfo.currency
      },
      network: {
        isp: ipInfo.isp,
        organization: ipInfo.org,
        as: ipInfo.as,
        reverseDNS: ipInfo.reverse,
        isMobile: ipInfo.mobile,
        isProxy: ipInfo.proxy,
        isHosting: ipInfo.hosting
      }
    };
    
  } catch (error) {
    throw new Error(`Failed to stalk IP address: ${error.message}`);
  }
};

module.exports = { stalkIpAddress };
