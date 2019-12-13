defmodule ChatWeb.Emoting do
  require Logger

  @emojis String.split(
            "🐮🦆🐹🦊🐤🐝🐊🐆🐓🌴❄️🍋🌯🥪🍿🥜🍺🥤🥢⚽️🏀🏈🏅🎮🚗🚦",
            "",
            trim: true
          )

  def generate_user_id do
    Enum.map(1..2, fn _ -> [Enum.random(@emojis)] end)
    |> Enum.join("")
  end

  def user_joined do
    "👋👋👋👋👋👋"
  end

  def get_character(_input = " ") do
    "   "
  end

  def get_character(_input) do
    Enum.random(@emojis)
  end

  def emojify_message(message) do
    String.split(message, "", trim: true)
    |> Enum.map(&get_character/1)
    |> Enum.join("")
  end
end
