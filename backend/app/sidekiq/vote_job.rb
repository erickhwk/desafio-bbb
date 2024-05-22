class VoteJob
  include Sidekiq::Job

  def perform(contest_id, participant_id)
    contest = Contest.find(contest_id)
    vote = contest.votes.new(participant_id: participant_id)

    if vote.save
      Rails.logger.info "Vote registered successfully."
    else
      Rails.logger.error "Failed to register vote: #{vote.errors.full_messages.join(', ')}"
    end
  end
end
