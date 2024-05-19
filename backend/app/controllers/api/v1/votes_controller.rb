class Api::V1::VotesController < ApplicationController
  
  def create
    @contest = Contest.find(params[:contest_id])
    @vote = @contest.votes.new(vote_params)

    if @vote.save
      render json: { message: 'Voto registrado com sucesso.' }, status: :created
    else
      render json: { errors: @vote.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:participant_id)
  end
end
