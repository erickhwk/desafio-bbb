class Vote < ApplicationRecord
  belongs_to :contest
  belongs_to :participant

  validate :participant_must_be_in_contest

  private

  def participant_must_be_in_contest
    return if contest.nil?

    unless [contest.first_participant_id, contest.second_participant_id].include?(participant_id)
      errors.add(:participant_id, 'is not a valid contestant.')
    end
  end
end
