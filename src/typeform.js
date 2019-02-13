import { clientConstructor } from './create-client';
import forms from './forms';
import images from './images';
import teams from './teams';
import themes from './themes';
import workspaces from './workspaces';
import responses from './responses';
import webhooks from './webhooks';

export const createClient = (args = {}) => {
  if (args.token === undefined) {
    throw new Error('Token is missing');
  }

  const http = clientConstructor(args);

  return {
    forms: forms(http),
    images: images(http),
    teams: teams(http),
    themes: themes(http),
    workspaces: workspaces(http),
    responses: responses(http),
    webhooks: webhooks(http)
  }
}

export default createClient;
