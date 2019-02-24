defmodule ChatWeb.Emoting do
  require Logger

  @emojis String.graphemes(
    "🐮🐹🦊🐤🐝🐊🐆🐓🌴❄️🍋🌯🥪🍿🥜🍺🥤🥢⚽️🏀🏈🏅🎮🚗🚦"
  )

  def generate_user_id do
    Enum.map(1..2, fn(_) -> [Enum.random(@emojis)] end)
    |> Enum.join("")
  end

  def emojify_message(message) do
    String.graphemes(message)
    |> Enum.map(fn(char) -> 
      if (char == " "), do: "   ", else: Enum.random(@emojis)
    end)
    |> Enum.join("")
  end
end