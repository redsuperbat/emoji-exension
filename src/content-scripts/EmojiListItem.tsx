import { Component } from 'solid-js';
import { Emoji } from './emoji';

export const EmojiListItem: Component<{
  emoji: Emoji;
  focused: boolean;
  query: string;
}> = (props) => {
  const slugStart = () => props.emoji.slug.slice(0, props.query.length);
  const slugEnd = () => props.emoji.slug.slice(props.query.length);
  return (
    <div
      class="p-1 hover:bg-slate-300 rounded-md"
      classList={{
        'bg-slate-300': props.focused,
      }}
    >
      {props.emoji.character} :<span class="font-bold">{slugStart()}</span>
      <span>{slugEnd()}</span>:
    </div>
  );
};
