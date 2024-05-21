class Api::V1::ContestsController < ApplicationController
before_action :set_contests, only: [:show, :votes_summary]

  def show
    render json: {
      id: @contest.id,
      first_participant: { id: @contest.first_participant_id, name: @contest.first_participant.name},
      second_participant: { id: @contest.second_participant_id, name: @contest.second_participant.name }
    }
  end

  def votes_summary
    @total_votes = Vote.where(contest_id: @contest.id).count
    @votes_for_participant_1 = Vote.where(participant_id: @contest.first_participant_id, contest_id: @contest.id).count
    @votes_for_participant_2 = Vote.where(participant_id: @contest.second_participant_id, contest_id: @contest.id).count
    @votes_in_last_hour = Vote.votes_in_last_hour_for_contest(@contest.id)

    render json: {
      total_votes: @total_votes,
      votes_in_last_hour: @votes_in_last_hour,
      participants: {
        participant_1: { name: @contest.first_participant.name, votes: @votes_for_participant_1 },
        participant_2: { name: @contest.second_participant.name, votes: @votes_for_participant_2 }
      }
    }
  end

  private

  def set_contests
    @contest = Contest.find(params[:id])
  end
end
