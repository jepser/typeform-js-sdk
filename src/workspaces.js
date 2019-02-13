import { isMemberPropValid, createMemberPatchQuery } from './utils';

export default http => new Workspaces(http);

class Workspaces {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Create a workspace.
   * 
   * @param {Object} args
   * @param {string} args.name Name of the new workspace.
   * @returns {Promise} Promise that resolves with a created workspace.
   */
  add({ name }  = {}) {
    if (name === undefined) {
      throw new Error(`A name is required`);
    }

    return this._http.request({
      method: 'post',
      url: `/workspaces`,
      data: {
        name
      }
    });
  }

  /**
   * Add members to a workspace.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the workspace.
   * @param {string|string[]} args.members Array of (or individual) email of member(s) to add to a workspace.
   * @returns {Promise} Promise that resolves when member(s) are added to a workspace.
   */
  addMembers({ id, members }  = {}) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`);
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members;
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'add'
    });

    return this.update({ id, data: membersQuery });
  }

  /**
   * Delete a workspace.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the workspace.
   * @returns {Promise} Promise that resolves when a workspace is deleted.
   */
  delete({ id }  = {}) {
    return this._http.request({
      method: 'delete',
      url: `/workspaces/${id}`
    });
  }

  /**
   * Retrieve a workspace.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the workspace.
   * @returns {Promise} Promise that resolves with desired workspace.
   */
  get({ id }  = {}) {
    return this._http.request({
      method: 'get',
      url: `/workspaces/${id}`
    });
  }

  /**
   * Retrieve all workspaces in your account.
   * 
   * @param {Object} args
   * @param {string} [args.search] Returns items that contain the specified string.
   * @param {number} [args.page] The page of results to retrieve. Default `1` is the first page of results.
   * @param {number} [args.pageSize] Number of results to retrieve per page. Default is 10. Maximum is 200.
   * @returns {Promise} Promise that resolves with all matching workspaces.
   */
  list({ search, page, pageSize } = {}) {
    return this._http.request({
      method: 'get',
      url: '/workspaces',
      params: {
        page,
        page_size: pageSize,
        search
      }
    });
  }

  /**
   * Remove members from a workspace.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the workspace.
   * @param {string|string[]} args.members Array of (or individual) email of member(s) to remove from a workspace.
   * @returns {Promise} Promise that resolves when member(s) are removed from a workspace.
   */
  removeMembers({ id, members }  = {}) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`);
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members;
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'remove'
    });

    return this.update({ id, data: membersQuery });
  }

  /**
   * Update a workspace.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the workspace.
   * @param {Object} args.data Data to update.
   * @returns {Promise} Promise that resolves when the workspace is updated.
   */
  update({ id, data }  = {}) {
    return this._http.request({
      method: 'patch',
      url: `/workspaces/${id}`,
      data
    });
  }
}
