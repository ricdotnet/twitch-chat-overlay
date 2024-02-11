import { Client } from 'tmi.js';
import { reactive } from 'vue';

const keys: string[] = ['KEKW', 'xD', 'POG', 'noKeke', 'pepeDS', 'deezNuts'];
const emotes: any = {
  KEKW: {
    img: 'https://cdn.betterttv.net/emote/5e9c6c187e090362f8b0b9e8/1x',
  },
  xD: {
    img: 'https://cdn.betterttv.net/emote/6121946776ea4e2b9f789acc/1x',
  },
  POG: {
    img: 'https://cdn.betterttv.net/emote/5ff827395ef7d10c7912c106/1x',
  },
  noKeke: {
    img: 'https://cdn.betterttv.net/emote/5eacf997d023b362f639d5b0/1x',
  },
  pepeDS: {
    img: 'https://cdn.betterttv.net/emote/5b444de56b9160327d12534a/1x',
  },
  deezNuts: {
    img: 'https://cdn.betterttv.net/emote/5ecae6e6fdee545e30652525/1x'
  }
};

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
    if (state.messages.length >= 10) {
      state.messages.shift();
    }
    
    state.messages.push({
      username: tags.username,
      content: '&nbsp;' + await replaceHelper(message) + '&nbsp;',
      tags: tags,
    });

    if ( state.messages.length === 1 ) {
      // await removeMessage();
    }
  });

  async function removeMessage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        state.messages.shift();
        if ( state.messages.length ) {
          return resolve(removeMessage());
        }
        return resolve(null);
      }, 10000);
    });
  }

  return [state];
}

async function replaceHelper(m: string): Promise<string> {
  return new Promise((resolve) => {

    const tokens = m.split(' ');

    for ( const token in tokens ) {
      if ( keys.includes(tokens[token]) ) {
        tokens[token] = `<img src="${emotes[tokens[token]].img}" alt="smh" /> `;
      }
    }

    let string = '';
    for ( const token of tokens ) {
      string += token + ' ';
    }

    return resolve(string);
  });
}

export { useTmiClient };
