class Participant < ApplicationRecord
  has_many :contest_first_participants, class_name: 'Contest', foreign_key: 'first_participant_id', dependent: :destroy
  has_many :contest_second_participants, class_name: 'Contest', foreign_key: 'second_participant_id', dependent: :destroy
  has_many :votes
end
