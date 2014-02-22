json.array!(@drawings) do |drawing|
  json.extract! drawing, :id, :name, :commands
  json.url drawing_url(drawing, format: :json)
end