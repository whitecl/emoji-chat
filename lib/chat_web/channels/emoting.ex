defmodule ChatWeb.Emoting do
  require Logger

  @emojis String.graphemes(
    "🐮🦆🐹🦊🐤🐝🐊🐆🐓🌴❄️🍋🌯🥪🍿🥜🍺🥤🥢⚽️🏀🏈🏅🎮🚗🚦"
  )

  def generate_user_id do
    Enum.map(1..2, fn(_) -> [Enum.random(@emojis)] end)
    |> Enum.join("")
  end

  def user_joined do
    "👋👋👋👋👋👋"
  end

  def get_character(input = " ") do
    "   "
  end
  def get_character(input) do
    Enum.random(@emojis)
  end

  def emojify_message(message) do
    String.graphemes(message)
    |> Enum.map(&get_character/1)
    |> Enum.join("")
  end
end