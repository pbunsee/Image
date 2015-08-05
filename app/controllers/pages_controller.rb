class PagesController < ApplicationController
  def home
  end

  def about
  end

  def contact
	name = params["name"]
	message = params["message"]
	
	mandrill = Mandrill::API.new ENV['MANDRILL_APIKEY']
	
	message_to_mandrill = {
		:subject=> "Message from project site",
		:from_name=> @name,
		:text=> message,
		:to=> [{
			:email=> "shum.katie@gmail.com",
			:name=> "IMAGE-NY"
		}],
		:html=> "<html>test html string</html>",
		:from_email=> "shum.katie@gmail.com"
	}
	sending = mandrill.messages.send message_to_mandrill
	puts sending

  end
end
