import { Config } from '../models/config';
import { Post } from '../models/post';
import BaseService from './baseService';

class PostService extends BaseService<Post> {
  constructor(config: Config = { delay: 500, failRate: 0 }, items: Post[] = []) {
    super('posts', config, items);
  }
}

const defaultPosts = [
  { id: '1', title: 'eum et est occaecati' },
  { id: '2', title: 'qui est esse' },
  { id: '3', title: 'nesciunt quas' }
];

const postService = new PostService(
  { delay: 500, failRate: 0.01 },
  defaultPosts
);

export default postService;