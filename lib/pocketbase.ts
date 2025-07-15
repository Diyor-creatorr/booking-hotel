import PocketBase from 'pocketbase';

const url = 'https://slowly-home.pockethost.io/'

export const pb = new PocketBase(url)
pb.autoCancellation(false);

