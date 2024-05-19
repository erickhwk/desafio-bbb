class Api::V1::ContestsController < ApplicationController
before_action :set_contests, only: [:show, :votes_summary]

  def index
    @contests = Contest.all

    render json: @contests
  end

  def show
    render json: @contest
  end

  def votes_summary
    @total_votes = Vote.where(contest_id: @contest.id).count
    @votes_for_participant_1 = Vote.where(participant_id: @contest.first_participant_id, contest_id: @contest.id).count
    @votes_for_participant_2 = Vote.where(participant_id: @contest.second_participant_id, contest_id: @contest.id).count

    render json: {
      total_votes: @total_votes,
      participants: {
        participant_1: { id: @contest.first_participant_id, votes: @votes_for_participant_1 },
        participant_2: { id: @contest.second_participant_id, votes: @votes_for_participant_2 }
      }
    }
  end

  private

  def set_contests
    @contest = Contest.find(params[:id])
  end
end
