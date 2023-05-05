import React from 'react';
import { GameInterface } from '../messages/types';
import MatchResume from './MatchResume';

type Props = {
  games: GameInterface[] | undefined;
  currentId: number | undefined;
};

const MatchHistory = ({ games, currentId }: Props) => {
  return (
    <div className="p-4 m-2 rounded-lg">
      <h2 className="text-2xl underline font-semibold mb-4">Match History</h2>
      {games && games.map((game) => (
        <MatchResume key={game?.id} game={game} currentUserId={currentId}/>
      ))}
    </div>
  );
};

export default MatchHistory;
