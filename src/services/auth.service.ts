import { Compare, Hash, createToken } from "../utils";
import { context } from "../utils/types";

class Auth {
  async login(args: any, ctx: context) {}
  async register() {}
  async changePassword() {}
}

export default new Auth();
