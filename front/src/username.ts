let username: string | undefined = undefined;

export const setUsername = (value: string): string => {
  username = value;
  return username;
}

export const getUsername = (): string | undefined => {
  return username;
}

export const clearUsername = (): void => {
  username = undefined;
}
