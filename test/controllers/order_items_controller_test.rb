require 'test_helper'

class OrderItemsControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get updatedestroy" do
    get :updatedestroy
    assert_response :success
  end

end
