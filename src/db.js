/* eslint max-len:0 */
import DataStore from 'nedb';

export const users = new DataStore({filename: './data/users', autoload: true});
export const chat = new DataStore({filename: './data/chat', autoload: true});
export const chatRoom = new DataStore({filename: './data/chatRoom', autoload: true});
