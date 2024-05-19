class Contest < ApplicationRecord
  belongs_to :first_participant, class_name: 'Participant'
  belongs_to :second_participant, class_name: 'Participant'
  has_many :votes
end
