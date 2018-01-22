"use strict";

const agent = require("superagent");

const superagentAdapter = config => {
  const { headers, method, url, data, params } = config;

  let request = agent[method.toLowerCase()](url).set(headers);

  const shouldSendData = config =>
    /^p(?:os|u)t$/i.test(config.method.toLowerCase()) && config.data;

  if (shouldSendData(config)) {
    request = request.send(data);
  }

  if (params) {
    request = request.query(params);
  }

  return request.then(({
    body: data,
    status,
    statusMessage: statusText,
    headers,
    config
  }) => {
    return {
      data,
      status,
      statusText,
      headers,
      config,
      request
    };
  });
};

module.exports = superagentAdapter;
