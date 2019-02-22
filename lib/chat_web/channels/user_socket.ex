defmodule ChatWeb.UserSocket do
  use Phoenix.Socket

  @emojis "🐮😀🐹🦊🐤🐝🐊🐆🐓🌴❄️🍋🌯🥪🍿🥜🍺🥤🥢⚽️🏀🏈🏅🎮🚗🚦"

  ## Channels
  # channel "room:*", ChatWeb.RoomChannel
  channel "room:lobby", ChatWeb.RoomChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(params, socket, _connect_info) do
    {:ok, assign(socket, :user_id, generate_user_id)}
  end

  def generate_user_id do
    chars = String.split(@emojis, "")
    Enum.map([1,2], fn(_) -> [Enum.random(chars)] end)
    |> Enum.join("")
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     ChatWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
