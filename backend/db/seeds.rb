puts "Generating participants for this season..."

participants = [
  "Juliette Freire",
  "Gilberto Nogueira",
  "Fiuk",
  "Camilla de Lucas",
  "Arthur Picoli",
  "Pocah",
  "Carla Diaz",
  "Sarah Andrade",
  "Rodolffo Matthaus",
  "Thaís Braz",
  "Viih Tube",
  "Caio Afiune",
  "João Luiz Pedrosa",
  "Kerline Cardoso",
  "Lucas Penteado",
  "Lumena Aleluia",
  "Nego Di",
  "Projota",
  "Karol Conká",
  "Arcrebiano de Araújo",
]

participants.each do |participant_name|
  Participant.create(name: participant_name)
end

puts "Participants created successfully!"

puts "Creating the first Contest..."
first_participant_id = rand(1..20)
second_participant_id = rand(1..20)

until second_participant_id != first_participant_id
  second_participant_id = rand(1..20)
end

Contest.create(first_participant_id: first_participant_id, 
               second_participant_id: second_participant_id
)
