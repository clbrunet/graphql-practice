import { subscriptionType } from 'nexus';
import { PubSub } from 'graphql-subscriptions';
import { USER_CREATED } from '../constants.js';

export const pubsub = new PubSub();

export const Subscription = subscriptionType({
  definition(t) {
    t.nonNull.field('userCreated', {
      type: 'User',
      subscribe: (_root, _args, _ctx) => pubsub.asyncIterator([USER_CREATED]),
      resolve: (root, _args, _context) => {
        return root;
      },
    });
  },
});
