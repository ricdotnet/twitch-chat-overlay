import { Client } from 'tmi.js';
import { reactive } from 'vue';

const emotes: any[] = [
  {
    keys: ['KEKW'],
    img: 'https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/1x',
  },
  {
    keys: ['xd', 'XD', 'xD'],
    img: 'https://cdn.betterttv.net/emote/6121946776ea4e2b9f789acc/1x',
  },
  {
    keys: ['POG'],
    img: 'https://cdn.betterttv.net/emote/5ff827395ef7d10c7912c106/1x',
  },
  {
    keys: ['kekNo'],
    img: 'https://cdn.betterttv.net/emote/5eacf997d023b362f639d5b0/1x',
  },
  {
    keys: ['pepeDS'],
    img: 'https://cdn.betterttv.net/emote/5b444de56b9160327d12534a/1x',
  }
];

function useTmiClient(): any[] {
  const client = new Client({
    channels: ['ricdotnet'],
  });
  client.connect();

  interface IMessage {
    username: string | undefined;
    content: string;
    tags: {};
  }

  interface IState {
    messages: IMessage[];
  }

  const state = reactive<IState>({
    messages: [],
  });

  client.on('connected', () => {
    console.log('connected to twitch chat...');
  });

  client.on('message', async (channel, tags, message, self) => {

    state.messages.push({
      username: tags.username,
      content: await replaceHelper(message),
      tags: tags,
    });
  });

  return [state];
}

async function replaceHelper(m: string): Promise<string> {
  return new Promise((resolve) => {

    const tokens = m.split(' ');

    // todo: this is shit XD
    for ( const emote of emotes ) {
      for ( const key of emote.keys ) {
        for (const token in tokens) {
          if (tokens[token] === key) {
            tokens[token] = `<img src="${emote.img}" />`;
          }
        }
      }
    }

    let string = '';
    for (const token of tokens) {
      string += token + ' ';
    }

    return resolve(string);
  });
}

export { useTmiClient };
