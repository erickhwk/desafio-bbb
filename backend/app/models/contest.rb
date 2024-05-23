class Contest < ApplicationRecord
  belongs_to :first_participant, class_name: 'Participant'
  belongs_to :second_participant, class_name: 'Participant'
  has_many :votes

  def activate!
    Contest.update_all(status: false)
    update(status: true)
  end
end
