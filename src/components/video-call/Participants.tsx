import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/store/store";
import { Participant } from "@/store/types";

// Props for a single participant component.
type SingleParticipantProps = {
  participant: Participant;
  lastItem: boolean;
};

// A component to display a single participant.
const SingleParticipant: React.FC<SingleParticipantProps> = ({
  participant,
  lastItem,
}) => {
  return (
    <div>
      <div>{participant.identity}</div>
      {lastItem && <span>Last Participant</span>}
    </div>
  );
};

// Props for the Participants list component.
type ParticipantsProps = {
  participants: Participant[];
};

// A component to render a list of participants.
const Participants: React.FC<ParticipantsProps> = ({ participants }) => {
  return (
    <div>
      {participants.map((participant, index) => {
        const isLastItem = index === participants.length - 1;
        return (
          <SingleParticipant
            key={participant.id} // Use a unique key from the participant object.
            participant={participant}
            lastItem={isLastItem}
          />
        );
      })}
    </div>
  );
};

// Map Redux state to props without transformation (the state already holds Participant objects).
const mapStoreStateToProps = (state: RootState) => ({
  participants: state.room.participants,
});

export default connect(mapStoreStateToProps)(Participants);
