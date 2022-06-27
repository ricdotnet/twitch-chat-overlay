import { Client } from 'tmi.js';
import { reactive } from 'vue';

function useTmiClient(): any[] {
  const client = new Client({
    channels: ['ricdotnet'],
  });
  client.connect();

  interface IMessage {
    username: string;
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

  client.on('message', (channel, tags, message, self) => {
    state.messages.push({
      username: channel,
      content: message,
      tags: tags,
    });
  });

  return [state];
}

export { useTmiClient };
