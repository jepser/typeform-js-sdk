export const buildUrlWithParams = (url, params = {}) => {
  const queryParams = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== null)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

  return queryParams ? `${url}?${queryParams}` : url;
}

export const createMemberPatchQuery = ({ members, operation }) => {
  return members.map(member => ({
    op: operation,
    path: '/members',
    value: {
      email: member
    }
  }));
}

export const createOrUpdateWebhook = (http, { uid, tag, url, enable = false } = {}) => {
  if (url === undefined) {
    throw new Error(`Please provide an url for ${tag}`);
  }

  if (tag === undefined) {
    throw new Error(`Please provide a tag name for the webhook`);
  }

  return http.request({
    method: 'put',
    url: `/forms/${uid}/webhooks/${tag}`,
    data: {
      url,
      enable
    }
  });
}

export const isMemberPropValid = members => {
  if (members === undefined || !(typeof members === 'string' || Array.isArray(members))) {
    return false;
  }

  return true;
}
