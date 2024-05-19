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

puts "Participantes do BBB 21 foram criados com sucesso!"
