puts "Generating participants for this season..."

participants = [
  "Pelé",
  "Ayrton Senna",
  "Xuxa",
  "Gisele Bündchen",
  "Paulo Coelho",
  "Roberto Carlos",
  "Ivete Sangalo",
  "Neymar",
  "Anitta",
  "Ronaldinho Gaúcho",
  "Silvio Santos",
  "Fernanda Montenegro",
  "Chico Buarque",
  "Caetano Veloso",
  "Gilberto Gil",
  "Adriana Lima",
  "Wesley Safadão",
  "Sandy",
  "Zezé Di Camargo",
  "Luciano Huck",
  "Marina Silva",
  "Lázaro Ramos",
  "Taís Araújo",
  "Rodrigo Santoro"
]

participants.each do |participant_name|
  Participant.create(name: participant_name)
end

puts "Participants created successfully!"

puts "Creating the first Contest..."

last_participant_index = participants.length-1

first_participant_id = rand(1..last_participant_index)
second_participant_id = rand(1..last_participant_index)

until second_participant_id != first_participant_id
  second_participant_id = rand(1..last_participant_index)
end

Contest.create(first_participant_id: first_participant_id, 
               second_participant_id: second_participant_id
)

puts "Contest created successfully!"