Rails.configuration.stripe = {
  publishable_key: ENV['pk_test_DLeacr8Dmx6ik7owXk6S79xa'],
  secret_key:      ENV['sk_test_egDTSGf9uBZu4K4XfM0zWd7i'],
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]

