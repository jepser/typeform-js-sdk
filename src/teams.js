import { isMemberPropValid, createMemberPatchQuery } from './utils';

export default http => new Teams(http);

class Teams {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Retrieve information about your team, including the total number of seats
   * and which Typeform users are currently occupying seats on your team.
   * 
   * @returns {Promise} Promise that resolves with information about your team as well as seats on your team.
   */
  get() {
    return this._http.request({
      method: 'get',
      url: '/teams/mine'
    });
  }

  /**
   * Add team members.
   * 
   * @param {Object} args
   * @param {string|string[]} args.members Array of strings, or string, of email address(es) to add to team.
   * @returns {Promise} Promise that resolves on success.
   */
  addMembers({ members }  = {}) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`);
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members;
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'add'
    });

    return this._http.request({
      method: 'patch',
      url: '/teams/mine',
      data: membersQuery
    });
  }

  /**
   * Remove team members.
   * 
   * @param {Object} args
   * @param {string|string[]} Array of strings, or string, of email address(es) to remove from team.
   * @returns {Promise} Promise that resolves on success.
   */
  removeMembers({ members }){
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`);
    }

    const membersToRemove = !Array.isArray(members) ? [members] : members;
    const membersQuery = createMemberPatchQuery({
      members: membersToRemove,
      operation: 'remove'
    });

    return this._http.request({
      method: 'delete',
      url: '/teams/mine',
      data: membersQuery
    });
  }
}
