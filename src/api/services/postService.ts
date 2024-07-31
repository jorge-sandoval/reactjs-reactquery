import { Config } from '../models/config';
import { Post } from '../models/post';
import BaseService from './baseService';

class PostService extends BaseService<Post> {
  constructor(config: Config = { delay: 500, failRate: 0 }, items: Post[] = []) {
    super('posts', config, items);
  }
}

const defaultPosts = [
  { 
    id: '1', userId: '1', title: 'eum et est occaecati',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    id: '2', userId: '2', title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    id: '3', userId: '3', title: 'nesciunt quas',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
  }
];

const postService = new PostService(
  { delay: 500, failRate: 0.01 },
  defaultPosts
);

export default postService;