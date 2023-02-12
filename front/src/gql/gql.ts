/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\nmutation Relogin {\n  relogin {\n    id\n    username\n  }\n}\n": types.ReloginDocument,
    "\nmutation Logout {\n  logout\n}\n": types.LogoutDocument,
    "\nmutation ToggleLike($postId: ID!) {\n  toggleLike(postId: $postId)\n}\n": types.ToggleLikeDocument,
    "\nmutation Mutation($title: String!, $content: String!) {\n  createPost(title: $title, content: $content) {\n    title\n  }\n}\n": types.MutationDocument,
    "\nquery GetAllPosts {\n  allPosts {\n    id\n    title\n    content\n    author {\n      username\n    }\n    likes {\n      userId\n    }\n  }\n}\n": types.GetAllPostsDocument,
    "\nmutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    id\n    username\n  }\n}\n": types.LoginDocument,
    "\nmutation Register($username: String!, $password: String!) {\n  register(username: $username, password: $password) {\n    id\n    username\n  }\n}\n": types.RegisterDocument,
    "\nquery GetUserPosts($username: String!) {\n  posts(username: $username) {\n    id\n    title\n    content\n    author {\n      username\n    }\n    likes {\n      userId\n    }\n  }\n}\n": types.GetUserPostsDocument,
    "\nquery GetUsers {\n  users {\n    username\n    posts {\n      title\n      content\n    }\n  }\n}\n": types.GetUsersDocument,
    "\nsubscription UserCreated {\n  userCreated {\n    username\n  }\n}\n": types.UserCreatedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Relogin {\n  relogin {\n    id\n    username\n  }\n}\n"): (typeof documents)["\nmutation Relogin {\n  relogin {\n    id\n    username\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Logout {\n  logout\n}\n"): (typeof documents)["\nmutation Logout {\n  logout\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation ToggleLike($postId: ID!) {\n  toggleLike(postId: $postId)\n}\n"): (typeof documents)["\nmutation ToggleLike($postId: ID!) {\n  toggleLike(postId: $postId)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Mutation($title: String!, $content: String!) {\n  createPost(title: $title, content: $content) {\n    title\n  }\n}\n"): (typeof documents)["\nmutation Mutation($title: String!, $content: String!) {\n  createPost(title: $title, content: $content) {\n    title\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAllPosts {\n  allPosts {\n    id\n    title\n    content\n    author {\n      username\n    }\n    likes {\n      userId\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAllPosts {\n  allPosts {\n    id\n    title\n    content\n    author {\n      username\n    }\n    likes {\n      userId\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    id\n    username\n  }\n}\n"): (typeof documents)["\nmutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    id\n    username\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Register($username: String!, $password: String!) {\n  register(username: $username, password: $password) {\n    id\n    username\n  }\n}\n"): (typeof documents)["\nmutation Register($username: String!, $password: String!) {\n  register(username: $username, password: $password) {\n    id\n    username\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetUserPosts($username: String!) {\n  posts(username: $username) {\n    id\n    title\n    content\n    author {\n      username\n    }\n    likes {\n      userId\n    }\n  }\n}\n"): (typeof documents)["\nquery GetUserPosts($username: String!) {\n  posts(username: $username) {\n    id\n    title\n    content\n    author {\n      username\n    }\n    likes {\n      userId\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetUsers {\n  users {\n    username\n    posts {\n      title\n      content\n    }\n  }\n}\n"): (typeof documents)["\nquery GetUsers {\n  users {\n    username\n    posts {\n      title\n      content\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nsubscription UserCreated {\n  userCreated {\n    username\n  }\n}\n"): (typeof documents)["\nsubscription UserCreated {\n  userCreated {\n    username\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;