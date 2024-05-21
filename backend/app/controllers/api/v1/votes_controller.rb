require 'net/http'
require 'uri'
require 'json'
class Api::V1::VotesController < ApplicationController
  before_action :validate_recaptcha, only: :create
  
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

  def validate_recaptcha
    recaptcha_token = params[:recaptcha_token]
    secret_key = ENV['RECAPTCHA_SECRET_KEY']
    uri = URI.parse("https://www.google.com/recaptcha/api/siteverify")
    response = Net::HTTP.post_form(uri, {
      'secret' => secret_key,
      'response' => recaptcha_token
    })
    result = JSON.parse(response.body)

    unless result['success']
      render json: { errors: ['reCAPTCHA verification failed'] }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { errors: ['reCAPTCHA verification failed', e.message] }, status: :unprocessable_entity
  end
end
