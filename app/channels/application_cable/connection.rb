module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'Tubo_My', current_user&.name
    end

    protected

    def find_verified_user
      # env['warden'].user
      if current_user = env['warden'].user # For Devise. Credit: @secretpray
        current_user
        # binding.break
      else
        # reject_unauthorized_connection
        nil # Allow not logged in users to access the connection
      end
    end
  end
end
