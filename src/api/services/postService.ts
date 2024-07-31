import { Config } from '../models/config';
import { Post } from '../models/post';
import BaseService from './baseService';

class PostService extends BaseService<Post> {
  constructor(config: Config = { delay: 500, failRate: 0 }) {
    super('posts', config);
  }
}

const postService = new PostService({ delay: [500, 1500], failRate: 0.01 });

export default postService;