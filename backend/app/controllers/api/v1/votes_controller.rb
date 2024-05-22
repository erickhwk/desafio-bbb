require 'httparty'
class Api::V1::VotesController < ApplicationController
  before_action :validate_recaptcha, only: :create
  
  def create
    contest_id = params[:contest_id]
    participant_id = params[:vote][:participant_id]
    VoteJob.perform_async(contest_id, participant_id)
    
    render json: { message: 'Vote received for processing.' }, status: :accepted
  end

  

  private

  def vote_params
    params.require(:vote).permit(:participant_id)
  end

  def validate_recaptcha
    recaptcha_token = params[:recaptcha_token]
    secret_key = ENV['RECAPTCHA_SECRET_KEY']
    uri = "https://www.google.com/recaptcha/api/siteverify"

    response = HTTParty.post(uri, body: {
      secret: secret_key,
      response: recaptcha_token
    })

    result = JSON.parse(response.body)

    unless result['success']
      render json: { errors: ['reCAPTCHA verification failed'] }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { errors: ['reCAPTCHA verification failed', e.message] }, status: :unprocessable_entity
  end
end